import sys
import json
from clauseguard_ai import ClauseGuardAI

# Bridge script between Java (Spring Boot) and Python (AI logic).
# Input: JSON object read from stdin with keys "contractText" and "userRole"
# Output: JSON analysis result printed to stdout

def main():
    try:
        # Read input as JSON from stdin (avoids CLI arg length/encoding issues)
        raw_input = sys.stdin.read()
        if not raw_input.strip():
            print(json.dumps({"error": "No input received on stdin"}))
            sys.exit(1)

        data = json.loads(raw_input)
        contract_text = data.get("contractText", "").strip()
        user_role = _normalize_role(data.get("userRole", ""))

        if not contract_text:
            print(json.dumps({"error": "contractText is missing or empty"}))
            sys.exit(1)

        if not user_role:
            print(json.dumps({"error": "userRole is missing or empty"}))
            sys.exit(1)

        # Initialize the AI engine and perform analysis
        ai_engine = ClauseGuardAI(role=user_role)
        analysis_result = ai_engine.analyze(contract_text)

        if isinstance(analysis_result, dict) and analysis_result.get("error"):
            print(json.dumps(analysis_result))
            sys.exit(1)

        # Output result as JSON for Java to capture via stdout
        print(json.dumps(analysis_result))

    except json.JSONDecodeError as e:
        print(json.dumps({"error": f"Invalid JSON input: {str(e)}"}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

def _normalize_role(role: str) -> str:
    """Map API roles (lowercase) to ClauseGuardAI roles."""
    key = role.strip().lower()
    mapping = {
        "tenant": "Tenant",
        "freelancer": "Freelancer",
        "employee": "Employee",
    }
    return mapping.get(key, role.strip().capitalize())


if __name__ == "__main__":
    main()
