import requests


def main() -> None:
    url = "http://127.0.0.1:8000/chat"
    payload = {"message": "What is your experience?"}

    response = requests.post(url, json=payload, timeout=60)
    print(f"Status code: {response.status_code}")
    try:
        print("Response JSON:", response.json())
    except ValueError:
        print("Response text:", response.text)


if __name__ == "__main__":
    main()
