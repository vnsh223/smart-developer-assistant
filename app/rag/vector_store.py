import os
from pathlib import Path

# Vercel's filesystem is read-only except for /tmp.
# Set these BEFORE importing ChromaDB.
os.environ["HOME"] = "/tmp"
os.environ["XDG_CACHE_HOME"] = "/tmp/.cache"
os.environ["SENTENCE_TRANSFORMERS_HOME"] = "/tmp/sentence_transformers"

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma


# Find the project root and company policy document.
project_root = Path(__file__).resolve().parents[2]
document_path = project_root / "documents" / "company_policy.txt"

# Load the policy text.
text = document_path.read_text(encoding="utf-8")

# Split the text into smaller chunks for retrieval.
splitter = RecursiveCharacterTextSplitter(
    chunk_size=300,
    chunk_overlap=50,
)
chunks = splitter.create_documents([text])

# Create the vector store in Vercel's writable temporary directory.
vector_store = Chroma.from_documents(
    documents=chunks,
    collection_name="company_policy",
    persist_directory="/tmp/chroma_db",
)
