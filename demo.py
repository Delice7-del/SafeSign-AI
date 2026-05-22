import os
import json
from clauseguard_ai import ClauseGuardAI
from contracts_data import RENTAL_AGREEMENT


def load_api_key():
    """Read the Gemini API key from application.properties for standalone testing."""
    props_path = os.path.join(
        os.path.dirname(__file__),
        "src", "main", "resources", "application.properties"
    )
    try:
        with open(props_path, "r") as f:
            for line in f:
                line = line.strip()
                if line.startswith("groq.api.key="):
                    return line.split("=", 1)[1].strip()
    except FileNotFoundError:
        print(f"Could not find application.properties at {props_path}")
    return ""


def run_demo():
    print("Running ClauseGuard AI Standalone Test...")

    api_key = load_api_key()
    if api_key and api_key != "your-groq-key-here":
        os.environ["GROQ_API_KEY"] = api_key
        print(f"API key loaded from application.properties\n")
    else:
        print("WARNING: No valid API key found — will return mock response\n")

    ai = ClauseGuardAI(role="Tenant")
    result = ai.analyze(RENTAL_AGREEMENT)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    run_demo()
