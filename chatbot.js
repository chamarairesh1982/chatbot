document.addEventListener("DOMContentLoaded", function () {
  const sendMessageButton = document.getElementById("send-button");
  sendMessageButton.addEventListener("click", sendMessage);
});

async function sendMessage() {
  const userMessage = document.getElementById("user-input").value;
  const chatBox = document.getElementById("chat-box");

  if (userMessage.trim() === "") return;  // Don't send empty messages

  // Display the user's message in the chat
  const userMessageDiv = document.createElement("div");
  userMessageDiv.classList.add("user-message");
  userMessageDiv.textContent = userMessage;
  chatBox.appendChild(userMessageDiv);

  // Get the response from the text files (this is a placeholder function)
  const botResponse = await getAnswerFromFiles(userMessage);

  // Display the bot's response
  const botMessageDiv = document.createElement("div");
  botMessageDiv.classList.add("bot-message");
  botMessageDiv.textContent = botResponse;
  chatBox.appendChild(botMessageDiv);

  // Clear the input field after sending the message
  document.getElementById("user-input").value = "";
}

// Placeholder function to get answer from files (replace with actual logic)
async function getAnswerFromFiles(userMessage) {
  // You would normally have a search function here
  // This is just a simple placeholder to simulate a response
  return `Bot response to: ${userMessage}`;
}
