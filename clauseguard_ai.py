import json
import os
import re
from groq import Groq


class ClauseGuardAI:
    """
    Core AI logic for ClauseGuard using Groq (Llama 3.3 70B).
    """

    VALID_ROLES = ["Tenant", "Freelancer", "Employee"]

    def __init__(self, role: str):
        self.role = role.strip().capitalize()
        if self.role not in self.VALID_ROLES:
            raise ValueError(f"Role must be one of: {', '.join(self.VALID_ROLES)}")

    def analyze(self, contract_text: str) -> dict:
        api_key = os.getenv("GROQ_API_KEY", "").strip()

        if not api_key or api_key == "your-groq-key-here":
            return self._get_mock_response()

        try:
            client = Groq(api_key=api_key)

            system_prompt = f"""You are ClauseGuard AI, a legal contract assistant.
Your goal is to explain contracts to non-lawyers in simple, plain English.

Rules:
- DO NOT give legal advice.
- DO NOT use complex legal jargon.
- Customize the risk analysis based on the user's role: {self.role}.
- ALWAYS return ONLY a raw JSON object with NO markdown, NO code fences, NO extra text.

Required JSON format:
{{
    "summary": "Simple explanation of the contract",
    "goodParts": ["Favorable clause 1", "Favorable clause 2"],
    "dangerousClauses": ["Risky clause 1", "Risky clause 2"],
    "roleBasedRisks": ["Risk specific to {self.role} 1", "Risk specific to {self.role} 2"],
    "riskScore": <integer 0-100>,
    "riskLevel": "Safe | Medium Risk | High Risk"
}}"""

            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Analyze this contract:\n\n{contract_text}"}
                ],
                temperature=0.2,
                response_format={"type": "json_object"},
            )

            raw_text = response.choices[0].message.content.strip()

            # Strip markdown code fences just in case
            cleaned = self._strip_markdown_fences(raw_text)

            return json.loads(cleaned)

        except json.JSONDecodeError as e:
            return {"error": f"Failed to parse AI response as JSON: {str(e)}"}
        except Exception as e:
            return {"error": f"Groq API error: {str(e)}"}

    def _strip_markdown_fences(self, text: str) -> str:
        """Remove ```json ... ``` or ``` ... ``` wrappers if present."""
        pattern = r"^```(?:json)?\s*\n?(.*?)\n?```$"
        match = re.match(pattern, text, re.DOTALL)
        if match:
            return match.group(1).strip()
        return text

    def _get_mock_response(self) -> dict:
        return {
            "summary": f"Mock analysis: No Groq API key set. This is a placeholder response for a {self.role}.",
            "goodParts": [
                "The contract uses standard formatting.",
                "Basic terms and definitions are present."
            ],
            "dangerousClauses": [
                "Liability clauses may be overly broad.",
                "Termination conditions are vague."
            ],
            "roleBasedRisks": [
                f"As a {self.role}, review the payment and termination terms carefully.",
                f"Standard risks for a {self.role} role apply."
            ],
            "riskScore": 40,
            "riskLevel": "Medium Risk"
        }
