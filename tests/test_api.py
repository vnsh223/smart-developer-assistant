from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_home():
    response = client.get("/")

    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "Smart Developer Assistant" in response.text


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_empty_question():
    response = client.post(
        "/ask",
        json={
            "question": "",
            "session_id": "test-session"
        }
    )

    assert response.status_code == 422


def test_clear_chat():
    response = client.delete(
        "/clear-chat/test-session"
    )

    assert response.status_code == 200
    assert response.json()["message"] == "Chat history cleared"