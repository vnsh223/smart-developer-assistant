from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from app.agent.agent import agent


app = FastAPI(
    title="Smart Developer Assistant Agent",
    description="LLM-powered developer assistant with tools and RAG.",
    version="1.0.0"
)


class QuestionRequest(BaseModel):
    question: str = Field(
        ...,
        min_length=1,
        description="Question for the AI agent"
    )


class AnswerResponse(BaseModel):
    answer: str


@app.get("/")
def home():
    return {
        "message": "Developer Assistant Agent is running"
    }


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