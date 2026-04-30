import json
import os
import asyncio
import logging

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

load_dotenv()

app = FastAPI()

logger = logging.getLogger(__name__)

default_origins = "http://127.0.0.1:5173,http://localhost:5173"
allowed_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ALLOW_ORIGINS", default_origins).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

json_knowledge_base = {}
client = genai.Client()
system_instruction_text = ""


class UserQuery(BaseModel):
    message: str = Field(min_length=1, max_length=1000)


@app.on_event("startup")
async def on_startup() -> None:
    global json_knowledge_base, system_instruction_text

    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    portfolio_path = os.path.join(project_root, "Portfolio.json")

    with open(portfolio_path, "r", encoding="utf-8") as file:
        json_knowledge_base = json.load(file)

    minified_json_data = json.dumps(json_knowledge_base, separators=(",", ":"))
    system_instruction_text = (
        "You are Shubham speaking directly in first person. Always answer using "
        "'I', 'me', and 'my'. Never refer to Shubham in third person. Your sole "
        "purpose is to answer questions about my professional experience, skills, "
        "and background using strictly the provided JSON data. Do not use external "
        "knowledge. If the answer is not in the JSON, politely decline. "
        f"[KNOWLEDGE_BASE]: {minified_json_data}"
    )

    print("Knowledge base loaded.")


@app.post("/chat")
async def chat(user_query: UserQuery) -> dict[str, str]:
    user_message = user_query.message.strip()
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    max_attempts = 3
    for attempt in range(1, max_attempts + 1):
        try:
            response = await asyncio.to_thread(
                client.models.generate_content,
                model="gemini-2.5-flash",
                contents=user_message,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction_text
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

            logger.exception("Unhandled chat generation error")
            raise HTTPException(
                status_code=500,
                detail="Internal server error while generating response.",
            ) from error
