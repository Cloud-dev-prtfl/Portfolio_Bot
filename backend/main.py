import json
import os
import asyncio

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
from pydantic import BaseModel

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

json_knowledge_base = {}
client = genai.Client()


class UserQuery(BaseModel):
    message: str


@app.on_event("startup")
async def on_startup() -> None:
    global json_knowledge_base

    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    portfolio_path = os.path.join(project_root, "Portfolio.json")

    with open(portfolio_path, "r", encoding="utf-8") as file:
        json_knowledge_base = json.load(file)

    print("Knowledge base loaded.")


@app.post("/chat")
async def chat(user_query: UserQuery) -> dict[str, str]:
    minified_json_data = json.dumps(json_knowledge_base, separators=(",", ":"))
    user_message = user_query.message
    system_instruction = (
        "You are an AI assistant representing Shubham. Your sole purpose is to "
        "answer questions about his professional experience, skills, and "
        "background using strictly the provided JSON data. Do not use external "
        "knowledge. If the answer is not in the JSON, politely decline. "
        f"[KNOWLEDGE_BASE]: {minified_json_data}"
    )

    max_attempts = 3
    for attempt in range(1, max_attempts + 1):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=user_message,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction
                ),
            )
            assistant_text = response.text or ""
            return {"response": assistant_text}
        except Exception as error:
            error_text = str(error)
            is_retryable = "503" in error_text or "UNAVAILABLE" in error_text

            if is_retryable and attempt < max_attempts:
                await asyncio.sleep(attempt)
                continue

            if is_retryable:
                raise HTTPException(
                    status_code=503,
                    detail=(
                        "The AI model is temporarily busy. "
                        "Please retry in a few seconds."
                    ),
                ) from error

            raise HTTPException(status_code=500, detail=error_text) from error
