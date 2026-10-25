<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=30&duration=3500&pause=1000&color=46E3B7&center=true&vCenter=true&width=700&lines=Smart+Developer+Assistant;LLM+Agent+with+Tool+Calling;RAG+%2B+FastAPI+%2B+LangChain+%2B+Groq" alt="Typing SVG" />

### An LLM-powered agent that understands your question and picks the right tool to answer it.

<br>

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-F55036?style=for-the-badge&logo=groq&logoColor=white)
![ChromaDB](https://img.shields.io/badge/Chroma-FF6446?style=for-the-badge)
![Pytest](https://img.shields.io/badge/Pytest-0A9EDC?style=for-the-badge&logo=pytest&logoColor=white)

<br>

[![Live on Render](https://img.shields.io/badge/🚀_Live_Demo-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://smart-developer-assistant.onrender.com/)
[![Live on Vercel](https://img.shields.io/badge/▲_Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://smart-developer-assistant-theta.vercel.app/)
[![API Docs](https://img.shields.io/badge/📘_API_Docs-Swagger_UI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://smart-developer-assistant.onrender.com/docs)

<br>

![Last Commit](https://img.shields.io/github/last-commit/vnsh223/smart-developer-assistant?style=flat-square&color=46E3B7)
![Repo Size](https://img.shields.io/github/repo-size/vnsh223/smart-developer-assistant?style=flat-square&color=46E3B7)
![Stars](https://img.shields.io/github/stars/vnsh223/smart-developer-assistant?style=flat-square&color=46E3B7)
![License](https://img.shields.io/badge/license-MIT-46E3B7?style=flat-square)

<br>

[Live Demo](#-live-demo) •
[Features](#-features) •
[Architecture](#-architecture) •
[Tech Stack](#-tech-stack) •
[Getting Started](#-getting-started) •
[API Usage](#-api-usage) •
[Testing](#-testing) •
[Deployment](#-deployment)

</div>

---

## 📖 Overview

**Smart Developer Assistant** is an AI agent built with **LangChain** and **Groq**. Instead of answering everything from the model's memory, the agent *reasons about each question* and dynamically chooses the best tool: a calculator, a live currency API, web search, or a RAG pipeline over company documents.

It is exposed through a **FastAPI** REST endpoint with **Pydantic** validation and covered by **Pytest** tests.

> 💡 **Why this project?** It demonstrates the full path from an idea to a deployed AI service: agent design, tool calling, retrieval-augmented generation, API design, testing, and cloud deployment.

---

## 🌍 Live Demo

| Platform | Link |
|---|---|
| 🟢 **Render** (primary) | [smart-developer-assistant.onrender.com](https://smart-developer-assistant.onrender.com/) |
| ▲ **Vercel** | [smart-developer-assistant-theta.vercel.app](https://smart-developer-assistant-theta.vercel.app/) |
| 📘 **Swagger API Docs** | [smart-developer-assistant.onrender.com/docs](https://smart-developer-assistant.onrender.com/docs) |

> ⏳ Hosted on free tiers, so the first request may take 30-60 seconds to wake the server up.

### Try it in 3 steps

1. Open the [API Docs](https://smart-developer-assistant.onrender.com/docs) (wait up to a minute if the server is waking up).
2. Click **`POST /ask`** → **Try it out**.
3. Paste a question and hit **Execute**.

```json
{ "question": "Convert 100 USD to INR." }
```

| Try asking | Tool the agent will use |
|---|---|
| `What is 25 multiplied by 20?` | 🧮 Calculator |
| `Convert 100 USD to INR.` | 💱 Currency Converter |
| `What is the latest Python version?` | 🌐 Web Search |
| `How many paid leave days do employees get?` | 📚 Company Policy RAG |

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 🤖 | **LLM-Powered Agent** | Groq-hosted LLM decides which tool to call |
| 🔧 | **Dynamic Tool Selection** | Picks the right tool per query, automatically |
| 🧮 | **Calculator** | Accurate mathematical operations |
| 💱 | **Currency Conversion** | Live exchange rates via the Frankfurter API |
| 🌐 | **Web Search** | Current information via DuckDuckGo |
| 📚 | **RAG Policy Search** | Answers from company documents, grounded in source text |
| 🗄️ | **Vector Database** | Chroma stores and retrieves document embeddings |
| 🚀 | **REST API** | Fast FastAPI backend with auto-generated Swagger docs |
| 🛡️ | **Request Validation** | Pydantic models reject bad input |
| 🧪 | **Automated Tests** | Pytest suite for API endpoints |
| ⚠️ | **Error Handling** | Graceful failures instead of crashes |

---

## 🏗️ Architecture

```mermaid
flowchart TD
    U([👤 User]) --> API[🚀 FastAPI<br/>POST /ask]
    API --> AGENT[🤖 AI Agent<br/>LangChain + Groq]
    AGENT -->|LLM decides which tool| ROUTER{🔧 Tool Router}

    ROUTER --> CALC[🧮 Calculator]
    ROUTER --> CUR[💱 Currency API<br/>Frankfurter]
    ROUTER --> WEB[🌐 Web Search<br/>DuckDuckGo]
    ROUTER --> RAG[📚 RAG Tool]

    RAG --> CHROMA[(🗄️ Chroma<br/>Vector DB)]
    CHROMA --> DOCS[📄 company_policy.txt]

    CALC --> LLM[🧠 LLM]
    CUR --> LLM
    WEB --> LLM
    CHROMA --> LLM

    LLM --> ANS[✅ Final Answer]
    ANS --> U
```

### How it works

1. **User** sends a question to the `/ask` endpoint.
2. **FastAPI** validates the request with Pydantic.
3. The **Agent** reads the question and decides which tool fits best.
4. The selected **tool** runs and returns its result.
5. The **LLM** turns the tool output into a clear, natural-language answer.

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**⚙️ Backend**
- 🐍 Python
- ⚡ FastAPI
- 🛡️ Pydantic

**🧠 AI & LLM**
- 🦜 LangChain (Tools & Agents)
- 🤖 Groq

**📚 RAG & Vector Store**
- 🔎 Retrieval-Augmented Generation
- 🗄️ Chroma

</td>
<td valign="top" width="50%">

**🔌 External APIs & Tools**
- 💱 Frankfurter API (currency)
- 🌐 DuckDuckGo Search (web)
- 🔗 Requests (HTTP)

**🧰 Testing, Dev & Deploy**
- 🧪 Pytest
- 🌿 Git & GitHub
- 🔐 python-dotenv
- ☁️ Render & Vercel

</td>
</tr>
</table>

---

## 📁 Project Structure

```text
smart-developer-assistant/
│
├── app/
│   ├── agent/
│   │   └── agent.py            # Agent setup & tool orchestration
│   │
│   ├── rag/
│   │   └── vector_store.py     # Chroma vector store logic
│   │
│   ├── tools/
│   │   ├── calculator.py       # Math tool
│   │   ├── currency.py         # Currency conversion tool
│   │   ├── rag_tool.py         # Company policy search tool
│   │   └── web_search.py       # Web search tool
│   │
│   └── main.py                 # FastAPI app & routes
│
├── documents/
│   └── company_policy.txt      # Knowledge base for RAG
│
├── tests/
│   └── test_api.py             # API tests
│
├── index.py                    # Vercel entry point
├── .gitignore
├── pytest.ini
├── requirements.txt
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10 or higher
- A free [Groq API key](https://console.groq.com/keys)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/vnsh223/smart-developer-assistant.git
cd smart-developer-assistant
```

### 2️⃣ Create a virtual environment

```bash
python -m venv venv
```

Activate it:

| OS | Command |
|---|---|
| 🐧 Linux / 🍎 macOS | `source venv/bin/activate` |
| 🪟 Windows | `venv\Scripts\activate` |

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Configure environment variables

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key
```

> [!WARNING]
> Never commit your `.env` file or API key to GitHub. Make sure `.env` is listed in `.gitignore`.

### 5️⃣ Run the app

```bash
uvicorn app.main:app --reload
```

| Resource | URL |
|---|---|
| 🌐 App | http://127.0.0.1:8000 |
| 📘 Swagger Docs | http://127.0.0.1:8000/docs |

---

## 📡 API Usage

### `POST /ask`

Send a question to the AI agent. It automatically chooses the right tool.

**Request**

```json
{
  "question": "What is 25 multiplied by 20?"
}
```

**Response**

```json
{
  "answer": "25 multiplied by 20 is 500."
}
```

<details>
<summary><b>📟 cURL examples</b></summary>

<br>

**Live API (Render)**

```bash
curl -X POST "https://smart-developer-assistant.onrender.com/ask" \
  -H "Content-Type: application/json" \
  -d '{"question": "What is 25 multiplied by 20?"}'
```

**Live API (Vercel)**

```bash
curl -X POST "https://smart-developer-assistant-theta.vercel.app/ask" \
  -H "Content-Type: application/json" \
  -d '{"question": "What is 25 multiplied by 20?"}'
```

**Local**

```bash
curl -X POST "http://127.0.0.1:8000/ask" \
  -H "Content-Type: application/json" \
  -d '{"question": "Convert 100 USD to INR."}'
```

</details>

### 💬 Example Questions

| Question | Tool Used |
|---|---|
| `What is 25 multiplied by 20?` | 🧮 Calculator |
| `Convert 100 USD to INR.` | 💱 Currency Converter |
| `What is the latest Python version?` | 🌐 Web Search |
| `How many paid leave days do employees get?` | 📚 Company Policy RAG |

---

## 🧪 Testing

Run the test suite:

```bash
pytest
```

**Test coverage includes:**

- ✅ Home endpoint
- ✅ Health check endpoint
- ✅ Empty question validation

**Example output:**

```text
================ 3 passed ================
```

---

## ☁️ Deployment

The app is deployed on two platforms.

| Platform | Notes |
|---|---|
| **Render** | Runs the FastAPI server with a writable filesystem. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |
| **Vercel** | Runs as a serverless Python function through `index.py`. Set `GROQ_API_KEY` under *Settings → Environment Variables* and redeploy. |

Pushing to the `main` branch triggers an automatic redeploy on both platforms.

---

## 🗺️ Roadmap

- [x] Deployed on Render
- [x] Deployed on Vercel
- [ ] Add conversation memory
- [ ] Support uploading custom documents for RAG
- [ ] Add Docker support
- [ ] Add a simple web UI

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

<div align="center">

**Vansh Kumar**

[![GitHub](https://img.shields.io/badge/GitHub-vnsh223-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/vnsh223)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-vanshkumar01-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vanshkumar01/)

<br>

⭐ **If you found this project useful, please consider giving it a star!** ⭐

</div>
