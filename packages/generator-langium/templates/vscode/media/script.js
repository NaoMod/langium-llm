const vscode = acquireVsCodeApi();
const chatContainer = document.getElementById("chat");
const inputField = document.getElementById("messageInput");
const typingIndicator = document.createElement("div"); // Create the typing indicator dynamically
typingIndicator.className = "typing-indicator";
typingIndicator.id = "typingIndicator";
typingIndicator.innerHTML =
  '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';

let typingTimer, userAvatarUri, aiAvatarUri, selectedText;

vscode.postMessage({ command: "requestUserAvatarUri" }); // Send message to VS Code
vscode.postMessage({ command: "requestAiAvatarUri" });

// Listener for getting data from the extension
window.addEventListener("message", (event) => {
  const message = event.data; // Data sent by the extension
  // Add message to the chat
  const chat = document.getElementById("chat");
  switch (message.command) {
    case "userAvatarUri":
      console.log("userAvatarUri  => ", message.text);
      userAvatarUri = message.text;
      break;
    case "aiAvatarUri":
      console.log("aiAvatarUri  => ", message.text);
      aiAvatarUri = message.text;
      break;
    case "geminiMessage":
      const llmResponseObject = message.text;

      if (llmResponseObject && llmResponseObject.type && llmResponseObject.type == "DEFAULT") {
        const messageElement = document.createElement("div");
        messageElement.className = "message user2";
        messageElement.textContent = llmResponseObject.message;

        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-container");

        const avatar = document.createElement("img");
        avatar.src = aiAvatarUri;
        avatar.classList.add("avatar");
        avatar.style.marginLeft = "10px";

        const messageContent = document.createElement("div");
        messageContent.classList.add("message-content");
        messageContent.style.marginLeft = "auto";

        const username = document.createElement("div");
        username.classList.add("username");
        username.textContent = "LLM";

        messageContent.appendChild(username);
        messageContent.appendChild(messageElement);

        messageContainer.appendChild(messageContent);
        messageContainer.appendChild(avatar);

        chat.appendChild(messageContainer);
        chat.appendChild(typingIndicator); // Add typing indicator just below user1's message
      }

      if (llmResponseObject && llmResponseObject.type && llmResponseObject.type == "REFRESH") {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("infoMessage");

        const messageElement = document.createElement("div");
        messageElement.textContent = llmResponseObject.message;
        messageContainer.appendChild(messageElement);
        chat.appendChild(messageContainer);
      }

      if (llmResponseObject && llmResponseObject.type && llmResponseObject.type == "ERROR") {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("errorMessage");

        const messageElement = document.createElement("div");
        messageElement.textContent = llmResponseObject.message;
        messageContainer.appendChild(messageElement);
        chat.appendChild(messageContainer);
      }

      // Always
      chat.scrollTop = chat.scrollHeight; // Scroll to the bottom
      typingIndicator.style.display = "none"; // Hide typing indicator after receiving a message

      break;
  }
});

function sendMessage() {
  const messageText = inputField.value;
  if (messageText.trim() === "") return; // Prevent sending empty messages

  const messageElement = document.createElement("div");
  messageElement.className = "message user1";
  messageElement.textContent = messageText; // Keep the formatting of the text
  chatContainer.appendChild(messageElement);

  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");

  const avatar = document.createElement("img");
  avatar.src = userAvatarUri;
  avatar.classList.add("avatar");

  const messageContent = document.createElement("div");
  messageContent.classList.add("message-content");

  const username = document.createElement("div");
  username.classList.add("username");
  username.textContent = "User";

  messageContent.appendChild(username);
  messageContent.appendChild(messageElement);

  messageContainer.appendChild(avatar);
  messageContainer.appendChild(messageContent);

  chat.appendChild(messageContainer);

  chatContainer.appendChild(typingIndicator); // Add the typing's indicator just below the LLM user

  chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom of the chat

  vscode.postMessage({ command: "sendMessage", text: messageText }); // Send message to VS Code

  inputField.value = ""; // Clear the messageUser2 after sending
  typingIndicator.style.display = "block"; // Show typing indicator while waiting for response
  sendButton.disabled = true; // Disable the button after sending
  clearTimeout(typingTimer); // Stop the timer when sending
}

function toggleSendButton() {
  sendButton.disabled = inputField.value.trim() === ""; // Enable/disable the button based on messageUser2 content
}

function executeCommand(command) {
  // Send a message to the extension backend
  console.log("executeCommand, selectedText=", selectedText);
  vscode.postMessage({ command: command, text: selectedText });
}
