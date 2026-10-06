from dotenv import load_dotenv
from langchain.agents import create_agent
from langchain_groq import ChatGroq

from app.tools.calculator import calculator
from app.tools.currency import currency_converter
from app.tools.web_search import web_search
from app.tools.rag_tool import company_policy_search

load_dotenv()

llm = ChatGroq(
    model="openai/gpt-oss-20b",
    temperature=0
)

system_prompt = """
You are a helpful Developer Assistant.

You have access to three tools:

1. Calculator
   - Use it for mathematical calculations.

2. Currency Converter
   - Use it when the user asks to convert currencies.

3. Web Search
   - Use it when the user needs current or web-based information.

Rules:
- Use a tool when it is appropriate instead of guessing.
- For calculations, use the calculator tool.
- For currency conversion, use the currency converter tool.
- For current information, use web search.
- If a tool fails, explain the problem clearly.
- Give the user a concise and easy-to-understand final answer.
"""

agent = create_agent(
    model=llm,
    tools=[
        calculator,
        currency_converter,
        web_search,
        company_policy_search
    ],
    system_prompt=system_prompt
)