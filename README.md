## Healthcare AI - Transcription and Translation Service

This project provides an API for transcribing and translating audio files. It utilizes OpenAI's Whisper model for transcription and GPT for translation. The service can be used to transcribe audio recordings and translate the transcriptions into a specified target language.

## Features

* **Audio Transcription:** Converts spoken audio into text using OpenAI's Whisper API.
* **Text Translation:** Translates the transcribed text into a target language using OpenAI's GPT API.
* **CORS Support:** Supports cross-origin requests for use in web applications.
* **Supports Multiple Languages:** You can specify the target language for translation (default is Spanish).

## Installation

### Requirements

* Python 3.7+
* OpenAI API Key
* Flask for the web server

### Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/healthcare-ai.git
cd healthcare-ai
```

### Step 2: Install dependencies

Make sure you have pip installed, then install the required packages by running:

```bash
pip install -r requirements.txt
```

This will install the necessary dependencies:

* Flask for creating the API
* requests for making HTTP requests to OpenAI API
* openai for interacting with OpenAI's APIs

### Step 3: Set up your OpenAI API Key

Make sure you have a valid OpenAI API key. You can get one from the OpenAI API website.
Set your API key in your environment variables:

**On macOS/Linux:**

```bash
export OPENAI_API_KEY="your-api-key-here"
```

**On Windows:**

```bash
set OPENAI_API_KEY="your-api-key-here"
```

Alternatively, you can directly modify the code to include the API key in place of `os.getenv("OPENAI_API_KEY")`.

### Step 4: Run the Flask Server

Start the Flask server by running the following command:

```bash
python app.py
```

The server will be available at `http://127.0.0.1:5000` by default.

### Step 5: Testing the API

You can test the API by sending a POST request to `/transcribe-and-translate`. The request should include an audio file and optionally a target language (default is Spanish).

**Example Request:**

```bash
curl -X 'POST' \
  'http://127.0.0.1:5000/transcribe-and-translate' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'audio=@your-audio-file.wav' \
  -F 'target_language=es'
```

**Example Response:**

```json
{
  "transcription": "This is the transcribed text from the audio.",
  "translation": "Este es el texto traducido al español."
}
```

**Available Endpoints**

* `GET /`: Returns a simple "Hello, World!" message for testing.
* `POST /transcribe-and-translate`: Accepts an audio file and returns the transcription and translation. The target language can be specified as a form parameter (`target_language`).

**API Documentation**

`/transcribe-and-translate`

**Request**

* Method: POST
* Content-Type: multipart/form-data

**Parameters**

* `audio`: The audio file to be transcribed and translated.
* `target_language` (optional): The language into which the transcription will be translated. Default is `es` (Spanish).

**Response**

* Status: 200 OK
* Content-Type: application/json

**Body:**

```json
{
  "transcription": "This is the transcribed text from the audio.",
  "translation": "Este es el texto traducido al español."
}
```

**Errors:**

* `400 Bad Request`: If no audio file is provided.
* `500 Internal Server Error`: If transcription or translation fails.

