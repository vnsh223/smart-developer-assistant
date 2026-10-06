from pathlib import Path

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
        response = agent.invoke({
            "messages": [
                {
                    "role": "user",
                    "content": request.question
                }
            ]
        })

        answer = response["messages"][-1].content

        return {
            "answer": answer
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Agent error: {str(e)}"
        )