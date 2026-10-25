from pathlib import Path

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma


# Find our document
project_root = Path(__file__).resolve().parents[2]
document_path = project_root / "documents" / "company_policy.txt"

# Read the document
text = document_path.read_text(encoding="utf-8")

# Split the document into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=300,
    chunk_overlap=50
)

chunks = splitter.create_documents([text])


# Create Chroma vector store
vector_store = Chroma.from_documents(
    documents=chunks,
    collection_name="company_policy",
    persist_directory="/tmp/chroma_db"
)
