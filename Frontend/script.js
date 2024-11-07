let mediaRecorder;
let audioChunks = [];
const speakButton = document.getElementById('speakButton');
const stopButton = document.getElementById('stopButton');
const transcriptionDisplay = document.getElementById('transcriptionDisplay');
const translationDisplay = document.getElementById('translationDisplay');
const targetLanguageSelect = document.getElementById('targetLanguage'); // New target language dropdown

console.log("JavaScript loaded");

// Start recording when the 'Start Recording' button is pressed
speakButton.addEventListener('click', async () => {
    try {
        console.log("Starting recording...");

        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        audioChunks = [];  // Reset audio chunks

        mediaRecorder.ondataavailable = (event) => {
            console.log("Data available from recorder");
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            console.log("Recording stopped, processing audio...");

            // Combine audio chunks into a single Blob
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

            // Log to confirm Blob creation
            console.log("Audio Blob created:", audioBlob);

            // Get the target language from the dropdown
            const targetLanguage = targetLanguageSelect.value;

            // Send audio and target language to backend
            const formData = new FormData();
            formData.append('audio', audioBlob);
            formData.append('target_language', targetLanguage);

            try {
                console.log("Sending audio and target language to backend...");
                const response = await fetch('https://healthcareaibackend.vercel.app/transcribe-and-translate', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json();
                    transcriptionDisplay.textContent = result.transcription;
                    translationDisplay.textContent = result.translation;
                } else {
                    console.error("Error in response:", response.statusText);
                    transcriptionDisplay.textContent = "Transcription failed";
                }
            } catch (error) {
                console.error("Error sending audio:", error);
                transcriptionDisplay.textContent = "Error connecting to server";
            }
        };

        mediaRecorder.start();
        console.log("Recording started");

        // Disable the record button during recording
        speakButton.disabled = true;
        stopButton.disabled = false;
    } catch (error) {
        console.error("Error starting recording:", error);
        alert("Could not access microphone. Please check your permissions.");
    }
});

// Stop recording when the 'Stop Recording' button is pressed
stopButton.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        console.log("Recording stopped");
    }
    // Re-enable the buttons after stopping
    speakButton.disabled = false;
    stopButton.disabled = true;
});
