// -----------------------------------------
// Get HTML elements
// -----------------------------------------

const questionInput = document.getElementById("question");
const askButton = document.getElementById("ask-button");
const chatBox = document.getElementById("chat-box");
const newChatButton = document.getElementById("new-chat-button");


// -----------------------------------------
// Create conversation session
// -----------------------------------------

let sessionId = crypto.randomUUID();


// -----------------------------------------
// Format AI message
// -----------------------------------------

function formatMessage(message) {

    // Make sure message is a string
    message = String(message);

    // Escape HTML characters for safety
    message = message
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Convert **text** into bold text
    message = message.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );

    // Convert new lines into HTML line breaks
    message = message.replace(/\n/g, "<br>");

    return message;
}


// -----------------------------------------
// Add message to chat
// -----------------------------------------

function addMessage(sender, message, type) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    if (type === "user") {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("assistant-message");
    }

    const labelDiv = document.createElement("div");

    labelDiv.classList.add("message-label");

    labelDiv.textContent = sender;


    const contentDiv = document.createElement("div");

    contentDiv.classList.add("message-content");

    contentDiv.innerHTML = formatMessage(message);


    messageDiv.appendChild(labelDiv);
    messageDiv.appendChild(contentDiv);

    chatBox.appendChild(messageDiv);


    // Scroll to latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}


// -----------------------------------------
// Ask AI Agent
// -----------------------------------------

async function askAgent() {

    const question = questionInput.value.trim();


    // Don't send empty question
    if (!question) {
        return;
    }


    // Show user's message
    addMessage(
        "👤 You",
        question,
        "user"
    );


    // Clear input
    questionInput.value = "";


    // Disable Ask button
    askButton.disabled = true;
    askButton.textContent = "Thinking...";


    try {

        const response = await fetch(
            "/ask",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    question: question,
                    session_id: sessionId
                })
            }
        );


        // Check server response
        if (!response.ok) {

            throw new Error(
                "Server returned an error."
            );
        }


        // Convert response to JSON
        const data = await response.json();


        // Show AI response
        addMessage(
            "🤖 Assistant",
            data.answer,
            "assistant"
        );

    } catch (error) {

        console.error(error);


        addMessage(
            "⚠️ Error",
            "Sorry, something went wrong. Please try again.",
            "assistant"
        );

    } finally {

        // Enable Ask button
        askButton.disabled = false;
        askButton.textContent = "Ask";
    }
}


// -----------------------------------------
// Start New Chat
// -----------------------------------------

async function startNewChat() {

    try {

        // Tell backend to clear current session
        const response = await fetch(
            `/clear-chat/${sessionId}`,
            {
                method: "DELETE"
            }
        );


        // Check response
        if (!response.ok) {

            throw new Error(
                "Could not clear chat history."
            );
        }


        // Create a completely new session
        sessionId = crypto.randomUUID();


        // Clear chat window
        chatBox.innerHTML = `
            <div class="message assistant-message">

                <div class="message-label">
                    🤖 Assistant
                </div>

                <div class="message-content">
                    👋 New conversation started!
                    <br><br>
                    How can I help you?
                </div>

            </div>
        `;


        // Clear input
        questionInput.value = "";


        // Put cursor in input
        questionInput.focus();

    } catch (error) {

        console.error(error);

        alert(
            "Could not start a new chat. Please try again."
        );
    }
}


// -----------------------------------------
// Ask button click
// -----------------------------------------

askButton.addEventListener(
    "click",
    askAgent
);


// -----------------------------------------
// Enter key
// -----------------------------------------

questionInput.addEventListener(
    "keydown",
    function (event) {

        // Enter sends the message
        // Shift + Enter creates a new line
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            askAgent();
        }
    }
);


// -----------------------------------------
// New Chat button click
// -----------------------------------------

newChatButton.addEventListener(
    "click",
    startNewChat
);


// -----------------------------------------
// Example question buttons
// -----------------------------------------

function useExample(question) {

    questionInput.value = question;

    questionInput.focus();
}