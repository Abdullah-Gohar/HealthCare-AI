import os
import requests
import tempfile
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.serving import run_simple
import traceback

API_KEY = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)

client = openai.OpenAI()

def transcribe_audio(audio):
    # Create a temporary file for the audio data
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
        temp_file.write(audio.read())
        temp_filename = temp_file.name

    # Prepare headers and files for the OpenAI API request
    headers = {
        "Authorization": f"Bearer {API_KEY}",
    }
    with open(temp_filename, "rb") as audio_file:
        files = {
            "file": audio_file,
            "model": (None, "whisper-1"),
        }
        response = requests.post("https://api.openai.com/v1/audio/transcriptions", headers=headers, files=files)

    # Clean up the temporary file
    os.remove(temp_filename)

    # Check and return the transcription or raise an error
    if response.status_code == 200:
        return response.json().get("text", "")
    else:
        print(traceback.format_exc())
        raise Exception(f"Transcription failed: {response.status_code}, {response.text}")

def translate_text(text, target_language):
    
    try:
        prompt = f"Translate the following text into {target_language}: {text}"
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a translator that returns only the translations of text provided."},
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        translated_text = completion.choices[0].message.content
        return translated_text
        
            
    except:
        raise Exception(f"Translation failed")

# Debugging route
@app.route('/', methods=['GET'])
def test():
    return jsonify({"message": "Hello, World!"})


@app.route('/transcribe-and-translate', methods=['POST'])
def transcribe_and_translate():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    target_language = request.form.get('target_language', 'es')
    audio_file = request.files['audio']

    try:
        # Transcribe and then translate
        transcription = transcribe_audio(audio_file)
        print("Transcription:", transcription)
        translation = translate_text(transcription, target_language)  # Specify the target language
        print("Translation:", translation)
        return jsonify({"transcription": transcription, "translation": translation})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

