// ========================================
// 1. GET HTML ELEMENTS
// ========================================

const questionInput = document.getElementById("question");
const askButton = document.getElementById("ask-button");
const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");

const newChatButton = document.getElementById("new-chat-button");
const clearHistoryButton = document.getElementById("clear-history-button");
const menuButton = document.getElementById("menu-button");
const sidebar = document.getElementById("sidebar");
const recentChats = document.getElementById("recent-chats");


// ========================================
// 2. CHAT DATA
// ========================================

const STORAGE_KEY = "developer_assistant_conversations";

let sessionId = crypto.randomUUID();
let conversations = loadConversations();
let currentConversation = createConversation();


// ========================================
// 3. LOAD AND SAVE CONVERSATIONS
// ========================================

function loadConversations() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
        console.error("Could not load conversations:", error);
        return [];
    }
}

function saveConversations() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(conversations)
    );
}

function createConversation() {
    return {
        id: sessionId,
        title: "New Chat",
        messages: [],
        updatedAt: Date.now()
    };
}


// ========================================
// 4. SAFE MESSAGE FORMATTING
// ========================================

function formatMessage(message) {
    let text = String(message ?? "");

    text = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    text = text.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );

    text = text.replace(
        /`([^`]+)`/g,
        "<code>$1</code>"
    );

    text = text.replace(/\n/g, "<br>");

    return text;
}


// ========================================
// 5. ADD MESSAGE TO CHAT
// ========================================

function addMessage(sender, message, type) {
    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");
    messageDiv.classList.add(
        type === "user" ? "user-message" : "assistant-message"
    );

    const label = document.createElement("div");
    label.className = "message-label";
    label.textContent = sender;

    const content = document.createElement("div");
    content.className = "message-content";
    content.innerHTML = formatMessage(message);

    messageDiv.append(label, content);
    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}


// ========================================
// 6. SAVE MESSAGE TO CURRENT CHAT
// ========================================

function saveMessage(role, content) {
    currentConversation.messages.push({
        role: role,
        content: content
    });

    currentConversation.updatedAt = Date.now();

    // Use the first user message as the chat title
    if (
        role === "user" &&
        currentConversation.title === "New Chat"
    ) {
        currentConversation.title =
            content.length > 35
                ? content.substring(0, 35) + "..."
                : content;
    }

    const existingIndex = conversations.findIndex(
        chat => chat.id === currentConversation.id
    );

    if (existingIndex !== -1) {
        conversations[existingIndex] = currentConversation;
    } else {
        conversations.unshift(currentConversation);
    }

    // Most recently updated chats appear first
    conversations.sort((a, b) => b.updatedAt - a.updatedAt);

    saveConversations();
    renderRecentChats();
}


// ========================================
// 7. DISPLAY RECENT CONVERSATIONS
// ========================================

function renderRecentChats() {
    recentChats.innerHTML = "";

    if (conversations.length === 0) {
        const emptyMessage = document.createElement("p");

        emptyMessage.className = "empty-history";
        emptyMessage.textContent = "Your conversations will appear here.";

        recentChats.appendChild(emptyMessage);
        return;
    }

    conversations.forEach(conversation => {
        const button = document.createElement("button");

        button.className = "sidebar-action recent-chat-item";
        button.textContent = "💬 " + conversation.title;
        button.title = conversation.title;

        button.addEventListener("click", () => {
            openConversation(conversation.id);
        });

        recentChats.appendChild(button);
    });
}


// ========================================
// 8. OPEN A PREVIOUS CONVERSATION
// ========================================

function openConversation(id) {
    const selectedChat = conversations.find(
        chat => chat.id === id
    );

    if (!selectedChat) {
        return;
    }

    sessionId = selectedChat.id;
    currentConversation = selectedChat;

    chatBox.innerHTML = "";

    currentConversation.messages.forEach(message => {
        addMessage(
            message.role === "user" ? "👤 You" : "🤖 Assistant",
            message.content,
            message.role === "user" ? "user" : "assistant"
        );
    });

    if (currentConversation.messages.length === 0) {
        showWelcomeScreen();
    }

    questionInput.value = "";
    questionInput.focus();
}


// ========================================
// 9. WELCOME SCREEN
// ========================================

function showWelcomeScreen() {
    chatBox.innerHTML = `
        <div id="welcome-screen" class="welcome-screen">

            <h1>Build, Learn &amp; Explore.</h1>

            <p class="welcome-subtitle">
                Your personal AI developer assistant.
            </p>

            <p class="welcome-description">
                Get help with calculations, currency conversion,
                web research, and company policy documents.
            </p>

            <div class="feature-grid">

                <button class="feature-card"
                    data-question="What is 25 multiplied by 20?">
                    <strong>▦ Calculator</strong>
                    <span>Perform calculations</span>
                </button>

                <button class="feature-card"
                    data-question="Convert 100 USD to INR.">
                    <strong>⇄ Currency Converter</strong>
                    <span>Convert currencies</span>
                </button>

                <button class="feature-card"
                    data-question="What is the latest Python version?">
                    <strong>◎ Web Search</strong>
                    <span>Explore current information</span>
                </button>

                <button class="feature-card"
                    data-question="How many paid leave days do employees get?">
                    <strong>▤ Company Policy</strong>
                    <span>Search your documents</span>
                </button>

            </div>

            <div class="suggestions-section">
                <h3>Try asking me...</h3>

                <div class="suggestion-list">
                    <button class="suggestion-chip"
                        data-question="Explain Python decorators in simple words.">
                        Explain Python decorators
                    </button>

                    <button class="suggestion-chip"
                        data-question="Convert 100 USD to INR.">
                        Convert USD to INR
                    </button>

                    <button class="suggestion-chip"
                        data-question="What is the latest Python version?">
                        Latest Python version
                    </button>

                    <button class="suggestion-chip"
                        data-question="How many paid leave days do employees get?">
                        Company leave policy
                    </button>
                </div>
            </div>

        </div>
    `;
}


// ========================================
// 10. SEND QUESTION TO AGENT
// ========================================

async function askAgent() {
    const question = questionInput.value.trim();

    if (!question || askButton.disabled) {
        return;
    }

    // Clear the input immediately
    questionInput.value = "";
    questionInput.style.height = "auto";

    const welcome = document.getElementById("welcome-screen");

    if (welcome) {
        welcome.remove();
    }

    addMessage("👤 You", question, "user");
    saveMessage("user", question);

    askButton.disabled = true;
    askButton.textContent = "…";

    try {
        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question,
                session_id: sessionId
            })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        addMessage("🤖 Assistant", data.answer, "assistant");
        saveMessage("assistant", data.answer);

    } catch (error) {
        console.error("Agent request failed:", error);

        const errorText =
            "Sorry, I couldn't connect to the assistant. Please try again.";

        addMessage("⚠️ Error", errorText, "assistant");

    } finally {
        askButton.disabled = false;
        askButton.textContent = "↑";
        questionInput.focus();
    }
}


// ========================================
// 11. START NEW CHAT
// ========================================

async function startNewChat() {
    if (askButton.disabled) {
        return;
    }

    // Keep the previous conversation saved.
    // Clear its server-side history.
    try {
        const response = await fetch(
            `/clear-chat/${sessionId}`,
            { method: "DELETE" }
        );

        if (!response.ok) {
            throw new Error("Could not clear server history.");
        }
    } catch (error) {
        console.error("Could not clear server history:", error);

        alert("Could not start a new chat. Please try again.");
        return;
    }

    // Create a new independent conversation
    sessionId = crypto.randomUUID();
    currentConversation = createConversation();

    // Do not delete old conversations
    questionInput.value = "";

    showWelcomeScreen();
    renderRecentChats();

    questionInput.focus();
}


// ========================================
// 12. CLEAR ALL SAVED CONVERSATIONS
// ========================================

async function clearChatHistory() {
    if (!confirm("Delete all saved conversations from this browser?")) {
        return;
    }

    try {
        // Clear current backend session
        const response = await fetch(
            `/clear-chat/${sessionId}`,
            { method: "DELETE" }
        );

        if (!response.ok) {
            throw new Error("Could not clear server history.");
        }

        conversations = [];
        saveConversations();

        sessionId = crypto.randomUUID();
        currentConversation = createConversation();

        showWelcomeScreen();
        renderRecentChats();

        questionInput.value = "";

    } catch (error) {
        console.error(error);
        alert("Could not clear chat history. Please try again.");
    }
}


// ========================================
// 13. CONNECT BUTTONS
// ========================================

chatForm.addEventListener("submit", event => {
    event.preventDefault();
    askAgent();
});

questionInput.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        chatForm.requestSubmit();
    }
});

questionInput.addEventListener("input", function() {
    this.style.height = "auto";
    this.style.height = Math.min(this.scrollHeight, 150) + "px";
});

newChatButton.addEventListener("click", startNewChat);
clearHistoryButton.addEventListener("click", clearChatHistory);


// ========================================
// 14. SUGGESTION BUTTONS
// ========================================

document.addEventListener("click", event => {
    const button = event.target.closest("[data-question]");

    if (!button) {
        return;
    }

    questionInput.value = button.dataset.question;
    askAgent();
});


// ========================================
// 15. MOBILE SIDEBAR
// ========================================

menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});


// ========================================
// 16. INITIALIZE
// ========================================

renderRecentChats();