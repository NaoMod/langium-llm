import type {
    LanguageClientOptions,
    ServerOptions,
} from 'vscode-languageclient/node.js';
import * as vscode from 'vscode';
import * as path from 'node:path';
import { LanguageClient, TransportKind } from 'vscode-languageclient/node.js';
import { llmPromptPreparation } from "../lib/llm-services.js";
import { Model } from "../language/generated/ast.js";
import { JsonSerializer } from "../langium-services.js";
import { jsonFormat2LangiumSyntax } from '../lib/converters.js';

let client: LanguageClient;

export enum LLM_RESPONSE_TYPE {
    DEFAULT = 'DEFAULT',
    ERROR = 'ERROR',
    REFRESH = 'REFRESH',
}

export interface LLMResponse {
    type: LLM_RESPONSE_TYPE;
    message: string;
}

const FILE_EXTENSION = [".ut"];
const LANGUAGE_ID = 'urban-transportation';

// This function is called when the extension is activated
export function activate(context: vscode.ExtensionContext): void {
    client = startLanguageClient(context);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            GeminiUiViewProvider.viewType,
            new GeminiUiViewProvider(context)
        )
    );
}

class GeminiUiViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'geminiUiView';

    private _context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this._context = context;
    }

    resolveWebviewView(webviewView: vscode.WebviewView) {
        const userAvatarUri = this.getWebviewUri(
            'media/images/user_avatar.png',
            webviewView
        );
        const aiAvatarUri = this.getWebviewUri(
            'media/images/ai_avatar.png',
            webviewView
        );

        // Configuration
        webviewView.webview.options = {
            enableScripts: true,
        };

        // WebView content
        webviewView.webview.html = this.getWebviewContent(webviewView);
        webviewView.webview.onDidReceiveMessage(
            async (message) => {
                switch (message.command) {
                    case 'requestUserAvatarUri':
                        webviewView.webview.postMessage({
                            command: 'userAvatarUri',
                            text: `${userAvatarUri}`,
                        });
                        break;
                    case 'requestAiAvatarUri':
                        webviewView.webview.postMessage({
                            command: 'aiAvatarUri',
                            text: `${aiAvatarUri}`,
                        });
                        break;
                    case 'requestMessage':
                        const editor = vscode.window.activeTextEditor;
                        const editorMode: boolean =
                            editor !== undefined &&
                            editor.document.languageId === LANGUAGE_ID;
                        let editorTextInput = "";    

                        if (editor && editor.document.getText() !== "") {
                            editorTextInput = editor.document.getText();
                        }

                        llmPromptPreparation(message.text, editorMode, editorTextInput)
              .then((editorText) => {
                console.log("LLM RESPONSE: ", editorText);

                const editor = vscode.window.activeTextEditor;
                let editorContentType: string;

                // Editor execution mode
                if (
                  editor &&
                  editor.document.languageId === LANGUAGE_ID
                ) {

                  const langiumModel: Model =
                    JsonSerializer.deserialize<Model>(editorText);

                  editorText = jsonFormat2LangiumSyntax(langiumModel);

                  editorContentType = FILE_EXTENSION[0];

                  const geminiRefreshMessage: LLMResponse = {
                    type: LLM_RESPONSE_TYPE.REFRESH,
                    message: "The editor has been updated.",
                  };

                  webviewView.webview.postMessage({
                    command: "geminiMessage",
                    text: geminiRefreshMessage,
                  });

                  this.updateCurrentEditor(editorText, editorContentType);
                } else {
                  const geminiMessage: LLMResponse = {
                    type: LLM_RESPONSE_TYPE.DEFAULT,
                    message: editorText,
                  };

                  webviewView.webview.postMessage({
                    command: "geminiMessage",
                    text: geminiMessage,
                  });
                }
              })
              .catch((error) => {
                console.error(`${error}`);
                vscode.window.showErrorMessage(`${error}`);

                const geminiErrorMessage: LLMResponse = {
                  type: LLM_RESPONSE_TYPE.ERROR,
                  message: "An error has occurred.",
                };

                webviewView.webview.postMessage({
                  command: "geminiMessage",
                  text: geminiErrorMessage,
                });
              }); // Invoke the function with the original message typed
            break;
            case 'openNewEditor':
                vscode.commands.executeCommand(
                    'extension.openNewEditor',
                     message.text
                );
            break;
            }
            },
            undefined,
            this._context.subscriptions
        );
    }

    private async updateCurrentEditor(val: string, lang: string) {
        const editor = vscode.window.activeTextEditor;
        let textDocument;
    
        if (!editor) {
          // Open-up a new editor and set content
          // Create a new untitled document with initial content
          textDocument = await vscode.workspace.openTextDocument({
            language: lang,
            content: val,
          });
    
          // Show the new document in a new editor tab
          await vscode.window.showTextDocument(textDocument, {
            preview: false, // Open as a new tab, not in preview mode
          });
        } else {
          //Set content in the current editor
          // Use the editor to edit the document's text
          editor
            .edit((editBuilder) => {
              // Replace the full range of the document with new text
              const document = editor.document;
              const fullRange = new vscode.Range(
                document.positionAt(0), // Start position
                document.positionAt(document.getText().length) // End position
              );
              editBuilder.replace(fullRange, val);
            })
            .then((success) => {
              if (!success) {
                vscode.window.showErrorMessage("Failed to set document content.");
              }
            });
        }
    
        return;
      }

    private getWebviewContent(webviewView: vscode.WebviewView): string {
        const styleUri = this.getWebviewUri('media/style.css', webviewView);
        const scriptUri = this.getWebviewUri('media/script.js', webviewView);

        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Chat</title>
          <link rel="stylesheet" type="text/css" href="${styleUri}">
        </head>
        <body>
          <p class="infoMessage">
            Open a new editor with '${FILE_EXTENSION[0]}' extension to input a Langium model to the LLM.
          </p>
          
          <div class="chat-container" id="chat"></div>
          
          <div class="input-container">
            <textarea id="messageInput" placeholder="Ask LLM" rows="3" oninput="toggleSendButton()"></textarea>
            <button id="sendButton" onclick="send()" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 12L2 22L5 13L2 4L22 12Z" />
              </svg>
            </button>
          </div>
      
          <script src="${scriptUri}"></script>
        </body>
        </html>
        `;
    }

    private getWebviewUri(
        relativePath: string,
        webviewView: vscode.WebviewView
    ): string {
        const onDiskPath = vscode.Uri.file(
            path.join(this._context.extensionPath, relativePath)
        );

        return webviewView.webview.asWebviewUri(onDiskPath).toString();
    }
}

// This function is called when the extension is deactivated.
export function deactivate(): Thenable<void> | undefined {
    if (client) {
        return client.stop();
    }
    return undefined;
}

function startLanguageClient(context: vscode.ExtensionContext): LanguageClient {
    const serverModule = context.asAbsolutePath(
        path.join('out', 'language', 'main.cjs')
    );
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging.
    // By setting `process.env.DEBUG_BREAK` to a truthy value, the language server will wait until a debugger is attached.
    const debugOptions = {
        execArgv: [
            '--nolazy',
            `--inspect${process.env.DEBUG_BREAK ? '-brk' : ''}=${
                process.env.DEBUG_SOCKET || '6009'
            }`,
        ],
    };

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: debugOptions,
        },
    };

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: '*', language: 'urban-transportation' }],
    };

    // Create the language client and start the client.
    const client = new LanguageClient(
        'urban-transportation',
        'UrbanTransportation',
        serverOptions,
        clientOptions
    );

    // Start the client. This will also launch the server
    client.start();
    return client;
}
