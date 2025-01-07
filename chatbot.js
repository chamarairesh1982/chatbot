let chatbotData = { questions: [] }; // Ensure a default structure

// Load Sinhala text data from JSON file
async function loadChatbotData() {
  try {
    const response = await fetch('data.json');
    chatbotData = await response.json();

    if (!chatbotData.questions) {
      chatbotData.questions = []; // Fallback to an empty array
      console.warn('Warning: questions array is missing in chatbot data.');
    }
  } catch (error) {
    console.error('Failed to load chatbot data:', error);
  }
}

// Display messages in chatbox
function displayMessage(sender, message) {
  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML += `<p><strong>${sender}:</strong> ${message}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle user input and respond
function sendMessage() {
  const userInput = document.getElementById('user-input');
  const userMessage = userInput.value.trim();
  if (userMessage === '') return;

  displayMessage('ඔබ', userMessage);

  if (!chatbotData || !chatbotData.questions) {
    displayMessage('චැට්බොට්', 'දත්ත පූරණය වී නැත. කරුණාකර පිටුව නැවත පුරනය කරන්න.');
    return;
  }

  // Normalize the user input (trim and remove extra spaces)
  const normalizedUserMessage = normalizeString(userMessage);

  // Search for an answer by normalizing both question and user message
  const response = chatbotData.questions.find(q => normalizeString(q.question) === normalizedUserMessage);

  if (response) {
    displayMessage('චැට්බොට්', response.answer);
  } else {
    displayMessage('චැට්බොට්', 'කණගාටුයි, මට එම ප්‍රශ්නයට පිළිතුරු දිය නොහැක.');
  }

  userInput.value = '';
}

// Function to normalize a string (trim and remove extra spaces)
function normalizeString(str) {
  return str.trim().replace(/\s+/g, ' ').toLowerCase(); // Normalizing the string
}

// Initialize chatbot
loadChatbotData();
