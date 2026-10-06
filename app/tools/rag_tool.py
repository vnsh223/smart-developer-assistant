from langchain_core.tools import tool

from app.rag.vector_store import vector_store


# Create a retriever from our vector store
retriever = vector_store.as_retriever(
    search_kwargs={"k": 1}
)


@tool
def company_policy_search(query: str) -> str:
    """Search company policy documents for relevant information."""

    docs = retriever.invoke(query)

    return "\n\n".join(
        doc.page_content
        for doc in docs
    )