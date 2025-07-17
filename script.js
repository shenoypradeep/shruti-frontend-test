document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form")
  const userInput = document.getElementById("user-input")
  const chatMessages = document.getElementById("chat-messages")
  const sendButton = document.getElementById("send-button")

  // Function to add a message to the chat interface
  function addMessage(role, content) {
    // Remove welcome message if present
    const welcomeMessage = chatMessages.querySelector(".welcome-message")
    if (welcomeMessage) {
      welcomeMessage.remove()
    }

    const messageBubble = document.createElement("div")
    messageBubble.classList.add("message-bubble", role)

    const avatar = document.createElement("div")
    avatar.classList.add("avatar")
    avatar.textContent = role === "user" ? "You" : "AI"
    // Avatars colors are set in CSS, but can be overridden here if needed

    const messageContent = document.createElement("div")
    messageContent.classList.add("message-content")
    messageContent.textContent = content

    if (role === "user") {
      messageBubble.appendChild(messageContent)
      messageBubble.appendChild(avatar)
    } else {
      messageBubble.appendChild(avatar)
      messageBubble.appendChild(messageContent)
    }
    chatMessages.appendChild(messageBubble)
    chatMessages.scrollTop = chatMessages.scrollHeight // Scroll to bottom
  }

  // Function to show typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement("div")
    typingDiv.classList.add("typing-indicator", "bot")
    typingDiv.id = "typing-indicator"
    typingDiv.innerHTML = `
            <div class="avatar">AI</div>
            <div class="message-content">
                Shruti is typing<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
            </div>
        `
    chatMessages.appendChild(typingDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  // Function to hide typing indicator
  function hideTypingIndicator() {
    const typingDiv = document.getElementById("typing-indicator")
    if (typingDiv) {
      typingDiv.remove()
    }
  }

  // Handle form submission
  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault() // Prevent default form submission

    const userMessage = userInput.value.trim()
    if (!userMessage) return

    addMessage("user", userMessage)
    userInput.value = "" // Clear input field
    sendButton.disabled = true // Disable send button
    userInput.disabled = true // Disable input field

    showTypingIndicator()

    // --- SIMULATED BOT RESPONSE (FRONTEND ONLY) ---
    // In a real application, you would make an API call to your backend here.
    // Example:
// --- REAL BOT RESPONSE via SHRUTI BACKEND ---
try {
  const response = await fetch("https://shruti-backend.onrender.com/api/chat", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage }),
  });

  const data = await response.json();
  const botResponse = data.reply || "⚠️ Shruti did not return a response.";

  hideTypingIndicator();
  addMessage("bot", botResponse);
} catch (error) {
  hideTypingIndicator();
  addMessage("bot", "⚠️ There was a problem reaching Shruti.");
  console.error("Fetch error:", error);
}

sendButton.disabled = false;
userInput.disabled = false;
userInput.focus();



    // For this frontend-only demo, we simulate a response after a delay.
    setTimeout(() => {
      hideTypingIndicator()
      // let botResponse =
      //   "I'm Shruti, your Vedic Space AI assistant. I can provide information on Vedic concepts, cosmology, and related topics. How can I help you today?"

      // if (userMessage.toLowerCase().includes("brahmanda")) {
      //   botResponse =
      //     "In Vedic cosmology, Brahmanda refers to the 'cosmic egg' or the universe, often described as a spherical entity containing all of creation. It's a profound concept encompassing both the material and spiritual realms."
      // } else if (userMessage.toLowerCase().includes("mantra")) {
      //   botResponse =
      //     "A mantra is a sacred utterance, a word or phrase, often in Sanskrit, repeated to aid in meditation or prayer. It's believed to create positive vibrations and focus the mind."
      // } else if (userMessage.toLowerCase().includes("vedic")) {
      //   botResponse =
      //     "Vedic refers to the ancient Indian scriptures known as the Vedas, which are a vast body of religious texts originating in ancient India. They are the oldest scriptures of Hinduism and contain hymns, philosophical treatises, and rituals."
      // } else if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
      //   botResponse = "Namaste! How can I assist you with Vedic Space today?"
      // }

      addMessage("bot", botResponse)
      sendButton.disabled = false // Re-enable send button
      userInput.disabled = false // Re-enable input field
      userInput.focus() // Focus input for next message
    }, 1500) // Simulate a 1.5-second delay for bot response
  })
})
