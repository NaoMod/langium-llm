import type {
    LanguageClientOptions,
    ServerOptions,
} from 'vscode-languageclient/node.js';
import * as vscode from 'vscode';
import * as path from 'node:path';
import { LanguageClient, TransportKind } from 'vscode-languageclient/node.js';

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
                    case 'sendMessage':
                        webviewView.webview.postMessage({
                            command: 'geminiMessage',
                            text: 'User: ' + message.text,
                        });
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

    private getWebviewContent(webviewView: vscode.WebviewView): string {
        const styleUri = this.getWebviewUri('media/style.css', webviewView);
        const scriptUri = this.getWebviewUri('media/script.js', webviewView);
        const FILE_EXTENSION = <%= file-extension %>;

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
            Open a new editor with '${FILE_EXTENSION}' extension to input a Langium model to the LLM.
          </p>
          
          <div class="chat-container" id="chat"></div>
          
          <div class="input-container">
            <textarea id="messageInput" placeholder="Ask LLM" rows="3" oninput="toggleSendButton()"></textarea>
            <button id="sendButton" onclick="sendMessage()" disabled>
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
/*
async function preparePromptForLLM(userQuestion: string) {
    let userInput: string, mainPrompt: PromptTemplate, formattedPrompt: string;

    const editor = vscode.window.activeTextEditor;
    const dttMode: boolean =
      editor !== undefined &&
      editor.document.languageId === 'digital-twin-transportation';

    if (dttMode) {
        const inputVariables: string[] = ['langiumGrammar', 'userQuestion'];

        mainPrompt = new PromptTemplate({
            inputVariables: inputVariables,
            template:
          'Given the following Langium grammar, {userQuestion}? \n {langiumGrammar} \n',
        });

        if (editor && editor.document.getText() !== '') {
            mainPrompt.template += 'Consider this input model: \n {userInput} \n.';
            userInput = editor.document.getText();
            // eslint-disable-next-line quotes
            inputVariables.push("userInput");

            mainPrompt.template += `
            I expect the response directly in the corresponding VALID Langium textual syntax according to the grammar provided, without any markdown and/or backticks, neither Model object root element. Also terminal types must be valid.`;

            formattedPrompt = await mainPrompt.format({
                langiumGrammar: langiumGrammar,
                userInput: userInput,
                userQuestion: userQuestion,
            });
        } else {
            mainPrompt.template += `
            I expect the response directly in the corresponding VALID Langium textual syntax according to the grammar provided, without any markdown and/or backticks, neither Model object root element. Also terminal types must be valid.`;

            formattedPrompt = await mainPrompt.format({
                langiumGrammar: langiumGrammar,
                userQuestion: userQuestion,
            });
        }
    } else {
        mainPrompt = new PromptTemplate({
            inputVariables: ['userQuestion'],
            template: '{userQuestion}',
        });

        formattedPrompt = await mainPrompt.format({
            userQuestion: userQuestion,
        });
    }

    console.log('formattedPrompt => ', `${formattedPrompt}`);

    return askToGemini(formattedPrompt, true);
}
*/

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
        documentSelector: [{ scheme: '*', language: '<%= language-id %>' }],
    };

    // Create the language client and start the client.
    const client = new LanguageClient(
        '<%= language-id %>',
        '<%= RawLanguageName %>',
        serverOptions,
        clientOptions
    );

    // Start the client. This will also launch the server
    client.start();
    return client;
}
