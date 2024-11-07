
---

# **HealthCare AI: Medical Translation and Transcription App**

This project is a full-stack web application that allows users to record speech, transcribe it, translate it into a target language, and then play the translation as audio. The application consists of a **frontend** (HTML, CSS, JavaScript) and a **backend** (Flask API). The backend is responsible for handling audio processing, transcription, translation, and text-to-speech (TTS).

## **Table of Contents**
1. [Code Documentation](#code-documentation)
   - [Frontend Structure](#frontend-structure)
   - [Backend Structure](#backend-structure)
   - [AI Tools](#ai-tools)
   - [Security Considerations](#security-considerations)
2. [User Guide](#user-guide)
   - [Features](#features)
   - [Running the Application](#running-the-application)
3. [License](#license)

---

## **Code Documentation**

### **Frontend Structure**
The frontend handles user interactions, such as starting and stopping the recording, displaying transcriptions and translations, and playing the audio translation.

- **HTML (index.html)**: Contains the structure of the webpage, including input fields for transcriptions, translations, and buttons for interaction (Record, Stop, Speak).
- **CSS (style.css)**: Styles the layout of the page, ensuring the app is visually appealing and responsive.
- **JavaScript (script.js)**: Manages the logic for recording audio, displaying transcriptions and translations, and playing audio from the backend.

### **Backend Structure**
The backend is built using **Flask**, a lightweight Python web framework, and handles the following operations:

- **Audio Transcription** using **OpenAI’s Whisper API**.
- **Text Translation** using **OpenAI GPT-4 or GPT-3.5 models**.
- **Text-to-Speech (TTS)** conversion using **gTTS (Google Text-to-Speech)**.

#### **Backend Files**
1. **app.py**: 
   - Contains the Flask application that exposes API routes to handle the transcription, translation, and text-to-speech operations.
   - **/transcribe-and-translate**: Accepts audio data, transcribes it using OpenAI’s Whisper model, and translates the transcription into the target language using OpenAI models.
   - **/speak-translation**: Accepts translated text and returns the corresponding audio.

#### **Backend Routes**
- **POST /transcribe-and-translate**: Receives the audio recording, performs transcription via OpenAI Whisper, translates the transcribed text using OpenAI, and returns the translation.
- **POST /speak-translation**: Accepts the translated text and returns an audio file (MP3 format) of the translated text using **gTTS** (Google Text-to-Speech).

### **AI Tools**
- **OpenAI Whisper API**: Used to transcribe the recorded speech into text. This is done via OpenAI's powerful automatic speech recognition (ASR) model, Whisper.
- **OpenAI GPT-4 or GPT-3.5 Models**: Used to translate the transcribed text into the target language. The translation can be customized based on the target language selected by the user.
- **gTTS (Google Text-to-Speech)**: Converts the translated text into speech. This audio is returned to the frontend and played on the user's device.

### **Security Considerations**
- **Input Validation**: Ensure that input data (audio, language selection, etc.) is validated to prevent malicious code execution or invalid requests.
- **Audio File Handling**: Securely handle the audio files processed by the backend to avoid memory issues or security vulnerabilities.
- **Rate Limiting**: Consider applying rate limiting to API endpoints to prevent abuse or excessive usage of the services (e.g., OpenAI, gTTS).
- **CORS**: Properly configure CORS (Cross-Origin Resource Sharing) for API requests from the frontend to the backend.

---

## **User Guide**

### **Features**
- **Recording Audio**: Users can record their voice by clicking the "Start Recording" button. The audio is captured using the browser’s built-in microphone access.
- **Transcription**: After recording is stopped, the app sends the audio to the backend, where it is transcribed using OpenAI’s Whisper model.
- **Translation**: The transcribed text is then translated into the selected target language using OpenAI models.
- **Speak Translation**: The translated text can be converted into speech and played back to the user through the "Speak" button.

### **Running the Application**

#### **Set Up the Backend**
1. **Install Dependencies**:
   You’ll need to install Flask, OpenAI API client, gTTS (Google Text-to-Speech), and other dependencies:
   ```bash
   pip install Flask openai gtts
   ```

2. **Set Up OpenAI API**:
   - You need an OpenAI account and API key. Set up the OpenAI API client by adding your API key:
     ```bash
     export OPENAI_API_KEY="your_openai_api_key"
     ```
   - Make sure your environment variables for OpenAI API credentials are properly configured.

3. **Run the Flask Backend**:
   To start the backend server, run:
   ```bash
   python app.py
   ```
   The Flask app will run on `http://127.0.0.1:5000`, and you’ll be able to interact with the frontend from this address.

#### **Set Up the Frontend**
1. Ensure the **HTML**, **CSS**, and **JavaScript** files are correctly placed in the project structure.
2. Open the `index.html` in your web browser to access the application. You can serve the frontend files using a local server or an IDE with a "Live Server" feature.

#### **Test the App**
1. Click **Start Recording** to record your voice.
2. After stopping the recording, the transcription and translation will appear in their respective sections.
3. Click **Speak** to play the translated text as audio.

### **Interacting with the App**
- **Record**: Click the "Start Recording" button to begin recording audio. When you are done, click "Stop Recording".
- **Transcription and Translation**: After the recording stops, the transcribed text is displayed, followed by the translated text.
- **Speak**: After the translation is displayed, click the "Speak" button to hear the translation in audio form.

---

## **License**
This project is licensed under the GNU v3.0 License - see the [LICENSE](LICENSE) file for details.

---
