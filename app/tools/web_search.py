from langchain_community.tools import DuckDuckGoSearchRun
from langchain_core.tools import tool


search = DuckDuckGoSearchRun()


@tool
def web_search(query: str) -> str:
    """Search the web for current or useful information."""

    result = search.run(query)

    return result