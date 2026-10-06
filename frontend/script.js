const questionInput = document.getElementById("question");
const askButton = document.getElementById("ask-button");
const chatBox = document.getElementById("chat-box");


// Convert basic Markdown to HTML
function formatMessage(message) {

    // Escape HTML first for safety
    message = message
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Convert **bold** to <strong>
    message = message.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );

    // Convert line breaks
    message = message.replace(/\n/g, "<br>");

    return message;
}


// Add a message to the chat
function addMessage(sender, message, type) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    if (type === "user") {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("assistant-message");
    }

    messageDiv.innerHTML = `
        <div class="message-label">${sender}</div>
        <div class="message-content">${formatMessage(message)}</div>
    `;

    chatBox.appendChild(messageDiv);

    // Scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}


// Ask the AI agent
async function askAgent() {

    const question = questionInput.value.trim();

    // Don't send an empty question
    if (!question) {
        return;
    }

    // Show user's question
    addMessage("👤 You", question, "user");

    // Clear input
    questionInput.value = "";

    // Disable button while waiting
    askButton.disabled = true;
    askButton.textContent = "Thinking...";

    try {

        const response = await fetch("/ask", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })
        });


        // Check if API returned an error
        if (!response.ok) {
            throw new Error("Something went wrong with the server.");
        }


        const data = await response.json();


        // Show AI response
        addMessage(
            "🤖 Assistant",
            data.answer,
            "assistant"
        );

    } catch (error) {

        // Show error message
        addMessage(
            "⚠️ Error",
            "Sorry, something went wrong. Please try again.",
            "assistant"
        );

        console.error(error);

    } finally {

        // Enable button again
        askButton.disabled = false;
        askButton.textContent = "Ask";
    }
}


// Ask when button is clicked
askButton.addEventListener("click", askAgent);


// Press Enter to ask
questionInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        askAgent();
    }
});


// Fill input with example question
function useExample(question) {

    questionInput.value = question;

    questionInput.focus();
}