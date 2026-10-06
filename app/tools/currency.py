import requests
from langchain_core.tools import tool


@tool
def currency_converter(amount: float, from_currency: str, to_currency: str) -> str:
    """Convert an amount from one currency to another using the latest exchange rate."""

    from_currency = from_currency.upper()
    to_currency = to_currency.upper()

    url = f"https://api.frankfurter.dev/v2/rate/{from_currency}/{to_currency}"

    response = requests.get(url)
    response.raise_for_status()

    data = response.json()

    rate = data["rate"]
    converted_amount = amount * rate

    return f"{amount} {from_currency} = {converted_amount:.2f} {to_currency}"