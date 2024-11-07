let mediaRecorder;
let audioChunks = [];

const recordBtn = document.getElementById('recordButton');
const stopBtn = document.getElementById('stopButton');
const speakBtn = document.getElementById('speakButton');
const transcriptionElement = document.getElementById('transcriptionDisplay');
const translationElement = document.getElementById('translationDisplay');

const targetLanguageSelect = document.getElementById('targetLanguage');

// Start recording when Record button is clicked
recordBtn.onclick = async () => {
    transcriptionElement.innerText = 'Your transcription will appear here.';
    translationElement.innerText = 'Your translation will appear here.';
    audioChunks = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        sendAudioForProcessing(audioBlob);
    };

    mediaRecorder.start();
    recordBtn.disabled = true;
    stopBtn.disabled = false;
};

// Stop recording when Stop button is clicked
stopBtn.onclick = () => {
    mediaRecorder.stop();
    recordBtn.disabled = false;
    stopBtn.disabled = true;
};

// Send audio file to the backend for transcription and translation
async function sendAudioForProcessing(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('target_language', targetLanguageSelect.value);

    try {
        const response = await fetch('https://healthcareaibackend.vercel.app/transcribe-and-translate', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            transcriptionElement.innerText = data.transcription;
            translationElement.innerText = data.translation;
            speakBtn.disabled = false; // Enable speak button after translation
        } else {
            alert('Error processing audio');
        }
    } catch (error) {
        console.error(error);
        alert('Error sending audio to backend');
    }
}

// Send translation to the backend to generate and play audio
speakBtn.onclick = async () => {
    const translationText = translationElement.innerText;

    const response = await fetch('https://healthcareaibackend.vercel.app/speak-translation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: translationText, target_language: targetLanguageSelect.value }),
    });

    if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
    } else {
        alert('Error generating speech');
    }
};
