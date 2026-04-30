from fastapi.testclient import TestClient

from main import app


def main() -> None:
    payload = {"message": "What is your experience?"}
    with TestClient(app) as client:
        response = client.post("/chat", json=payload, timeout=60)
        print(f"Status code: {response.status_code}")
        try:
            print("Response JSON:", response.json())
        except ValueError:
            print("Response text:", response.text)


if __name__ == "__main__":
    main()
