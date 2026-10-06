from pathlib import Path
from typing import Dict, List

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from app.agent.agent import agent


app = FastAPI(
    title="Smart Developer Assistant Agent",
    description="LLM-powered developer assistant with tools and RAG.",
    version="1.0.0"
)

# Store conversation history for each session
chat_histories: Dict[str, List[dict]] = {}


# Frontend directory
FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"


# Serve CSS and JavaScript files
app.mount(
    "/static",
    StaticFiles(directory=FRONTEND_DIR),
    name="static"
)


class QuestionRequest(BaseModel):
    question: str = Field(
        ...,
        min_length=1,
        description="Question for the AI agent"
    )

    session_id: str = Field(
        ...,
        min_length=1,
        description="Unique ID for the conversation"
    )

class AnswerResponse(BaseModel):
    answer: str


# Serve the frontend
@app.get("/")
def home():
    return FileResponse(FRONTEND_DIR / "index.html")


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.post("/ask", response_model=AnswerResponse)
def ask_agent(request: QuestionRequest):

    try:

        # Create history for a new session
        if request.session_id not in chat_histories:
            chat_histories[request.session_id] = []

        # Get this session's previous messages
        history = chat_histories[request.session_id]

        # Add the new user message
        history.append({
            "role": "user",
            "content": request.question
        })

        # Send complete conversation to the agent
        response = agent.invoke({
            "messages": history
        })

        # Get the latest assistant response
        answer = response["messages"][-1].content

        # Store assistant response
        history.append({
            "role": "assistant",
            "content": answer
        })

        return {
            "answer": answer
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Agent error: {str(e)}"
        )

@app.delete("/clear-chat/{session_id}")
def clear_chat(session_id: str):

    if session_id in chat_histories:
        del chat_histories[session_id]

    return {
        "message": "Chat history cleared"
    }