export function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'he-IL';
  window.speechSynthesis.speak(utterance);
}

export function startListening() {
  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = 'he-IL';
  recognition.start();
  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    alert('זיהוי דיבור: ' + result);
  };
}
