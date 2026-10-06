from pathlib import Path

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma


# Find our document
document_path = Path("documents/company_policy.txt")

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
    persist_directory="chroma_db"
)
