from pathlib import Path
from langchain_core.tools import tool

# Locate the company policy document.
PROJECT_ROOT = Path(__file__).resolve().parents[2]
POLICY_FILE = PROJECT_ROOT / "documents" / "company_policy.txt"

# Read the document once when the module loads.
POLICY_TEXT = POLICY_FILE.read_text(encoding="utf-8")

# Split the policy into small sections.
POLICY_CHUNKS = [
    chunk.strip()
    for chunk in POLICY_TEXT.split("\n")
    if chunk.strip()
]


@tool
def company_policy_search(query: str) -> str:
    """Search the company leave policy using relevant keywords."""

    # Find policy sections that share words with the question.
    query_words = set(query.lower().split())
    scored_chunks = []

    for chunk in POLICY_CHUNKS:
        chunk_words = set(chunk.lower().split())
        score = len(query_words & chunk_words)

        if score > 0:
            scored_chunks.append((score, chunk))

    # Return the most relevant matching sections.
    scored_chunks.sort(key=lambda item: item[0], reverse=True)
    results = [chunk for _, chunk in scored_chunks[:3]]

    if not results:
        return "No matching information found in the company policy."

    return "\n".join(results)
