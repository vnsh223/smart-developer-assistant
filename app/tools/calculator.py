from langchain_core.tools import tool


@tool
def calculator(a: float, b: float, operation: str) -> float:
    """Perform a basic mathematical calculation."""

    if operation == "add":
        return a + b

    elif operation == "subtract":
        return a - b

    elif operation == "multiply":
        return a * b

    elif operation == "divide":
        if b == 0:
            return 0
        return a / b

    else:
        return 0