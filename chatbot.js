// Function to fetch and process answers from text files dynamically
async function getAnswerFromFiles(userQuestion) {
    const chatContainer = document.getElementById("chat-container");
    let answer = "Sorry, I don't know the answer to that question.";

    // Get all text files in the "questions" folder (you need to make sure you have all your questions there)
    const files = [
        "questions/question1.txt",
        "questions/question2.txt", // Add more files as you have
    ];

    // Iterate through each file to find a matching question
    for (let file of files) {
        try {
            const response = await fetch(file);
            if (response.ok) {
                const fileContent = await response.text(); // Read the content of the file
                const questionStart = fileContent.indexOf("Question: ");
                const answerStart = fileContent.indexOf("Answer: ");
                
                if (questionStart !== -1 && answerStart !== -1) {
                    // Extract question and answer from the file
                    const question = fileContent.slice(questionStart + 10, answerStart).trim(); // Get the question part
                    const answerFromFile = fileContent.slice(answerStart + 8).trim(); // Get the answer part
                    
                    // Check if the question matches
                    if (userQuestion.trim() === question) {
                        answer = answerFromFile;  // Set the answer if a match is found
                        break;  // Exit the loop once the question is found
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching the file:", error);
            answer = "Sorry, there was an error processing your request.";
        }
    }

    return answer;
}

// Function to handle sending messages
async function sendMessage() {
    const userMessage = document.getElementById("user-input").value;
    const chatContainer = document.getElementById("chat-container");

    // Display the user's message in the chat
    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("user-message");
    userMessageDiv.textContent = userMessage;
    chatContainer.appendChild(userMessageDiv);

    // Get the response from the text files
    const botResponse = await getAnswerFromFiles(userMessage);

    // Display the bot's response
    const botMessageDiv = document.createElement("div");
    botMessageDiv.classList.add("bot-message");
    botMessageDiv.textContent = botResponse;
    chatContainer.appendChild(botMessageDiv);

    // Clear the input field after sending the message
    document.getElementById("user-input").value = "";
}
