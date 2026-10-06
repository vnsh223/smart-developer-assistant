# 🤖 Smart Developer Assistant Agent

An LLM-powered developer assistant that can understand user queries and dynamically use different tools to provide accurate answers.

Built with **Python, LangChain, Groq, FastAPI, RAG, and Chroma**.

## ✨ Features

- 🤖 LLM-powered AI Agent
- 🔧 Dynamic tool selection
- 🧮 Calculator for mathematical operations
- 💱 Currency conversion using Frankfurter API
- 🌐 Web search for current information
- 📚 RAG-based company policy search
- 🗄️ Chroma vector database
- 🚀 FastAPI REST API
- 🛡️ Pydantic request validation
- 🧪 Pytest API testing
- ⚠️ Error handling

## 🏗️ Architecture

```text
                    User
                      │
                      ▼
                  FastAPI
                      │
                      ▼
                 AI Agent
                      │
                LLM decides
              which tool to use
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
   Calculator    Currency API   Web Search
        │             │             │
        └─────────────┼─────────────┘
                      │
                      ▼
                 RAG + Chroma
                      │
                      ▼
                    LLM
                      │
                      ▼
                Final Answer
                      │
                      ▼
                    User


## 🛠️ Tech Stack

### Backend
- 🐍 **Python**
- ⚡ **FastAPI**
- 🛡️ **Pydantic**

### AI & LLM
- 🦜 **LangChain**
- 🤖 **Groq**
- 🔧 **LangChain Tools & Agents**

### RAG & Vector Database
- 📚 **RAG (Retrieval-Augmented Generation)**
- 🗄️ **Chroma**

### External APIs & Tools
- 💱 **Frankfurter API** — Currency conversion
- 🌐 **DuckDuckGo Search** — Web search
- 🔗 **Requests** — API integration

### Testing & Development
- 🧪 **Pytest**
- 🌿 **Git & GitHub**
- 🔐 **python-dotenv** — Environment variables


📁 Project Structure

developer-agent/
│
├── app/
│   ├── agent/
│   │   └── agent.py
│   │
│   ├── rag/
│   │   └── vector_store.py
│   │
│   ├── tools/
│   │   ├── calculator.py
│   │   ├── currency.py
│   │   ├── rag_tool.py
│   │   └── web_search.py
│   │
│   └── main.py
│
├── documents/
│   └── company_policy.txt
│
├── tests/
│   └── test_api.py
│
├── .gitignore
├── pytest.ini
├── requirements.txt
└── README.md


## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/vnsh223/smart-developer-assistant.git
cd smart-developer-assistant

2. Create a Virtual Environment
python -m venv venv

Activate the virtual environment:

Linux / macOS

source venv/bin/activate

Windows

venv\Scripts\activate
3. Install Dependencies
pip install -r requirements.txt


🔐 Environment Variables

Create a .env file in the project root directory:

GROQ_API_KEY=your_groq_api_key

Never commit your .env file or API key to GitHub.

▶️ Run the Application

Start the FastAPI server using:

uvicorn app.main:app --reload

The application will run at:

http://127.0.0.1:8000
API Documentation

FastAPI provides interactive Swagger documentation at:

http://127.0.0.1:8000/docs


📡 API Usage
POST /ask

Send a question to the AI agent.

Request
{
  "question": "What is 25 multiplied by 20?"
}
Response
{
  "answer": "25 multiplied by 20 is 500."
}

The agent automatically decides which tool to use based on the user's question.

Example Questions
What is 25 multiplied by 20?
Convert 100 USD to INR.
What is the latest Python version?
How many paid leave days do employees get?

These questions demonstrate the different capabilities of the agent:

Calculator
Currency Converter
Web Search
Company Policy RAG
🧪 Testing

Run the test suite using:

pytest

The project includes tests for:

Home endpoint
Health check endpoint
Empty question validation

Example output:

3 passed
👨‍💻 Author

Vansh Kumar

GitHub: https://github.com/vnsh223
