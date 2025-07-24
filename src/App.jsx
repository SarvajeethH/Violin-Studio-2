import React, { useState, useRef, useEffect } from 'react';

// This is a "mock" AI analysis function. In a real app, this would be a call to a server.
const getMockAIAnalysis = (duration) => {
  console.log(`Generating mock feedback for a ${duration.toFixed(2)} second clip.`);
  return new Promise(resolve => {
    setTimeout(() => {
      // This data mimics what a real AI would return.
      const feedback = [
        { timestamp: "0:04", note: "Slight intonation issue on the G#. Try to raise the pitch a little." },
        { timestamp: "0:09", note: "Rhythm here is slightly rushed. Ensure the dotted quarter note gets its full value before the eighth note." },
        { timestamp: "0:15", note: "Excellent dynamic control in this passage. The crescendo is very effective." },
        { timestamp: "0:22", note: "Consider using a smoother bow change between the down-bow and up-bow to eliminate the slight accent." },
        { timestamp: "0:31", note: "The vibrato is well-paced and expressive here. Great job!" },
        { timestamp: "0:45", note: "Watch the tempo; it tends to drag slightly in this technically demanding section." }
      ];
      resolve(feedback);
    }, 4000); // Simulate a 4-second analysis time
  });
};


function App() {
  const [showQuestions, setShowQuestions] = useState(false);
  const questionsRef = useRef(null);

  // --- NEW STATE FOR AUDIO RECORDING ---
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartAnalysis = () => {
    setShowQuestions(true);
    setTimeout(() => {
      questionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // --- NEW FUNCTIONS FOR AUDIO HANDLING ---

  // Start Recording
  const startRecording = async () => {
    // Request microphone access
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    
    // Clear out any previous recording
    audioChunksRef.current = [];
    setAudioURL('');
    setAiFeedback([]);

    // What to do when data is available
    mediaRecorderRef.current.ondataavailable = event => {
      audioChunksRef.current.push(event.data);
    };

    // What to do when recording stops
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioURL(audioUrl); // Create a playable URL for the <audio> tag
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  // Stop Recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  // Analyze Recording
  const analyzeRecording = async () => {
    setIsAnalyzing(true);
    const audioBlob = new Blob(audioChunksRef.current);
    const duration = audioBlob.size / 44100 / 2; // Rough duration estimate
    const feedback = await getMockAIAnalysis(duration);
    setAiFeedback(feedback);
    setIsAnalyzing(false);
  };

  return (
    <div className="App-container">
      {/* --- INITIAL VIEW --- */}
      <div className="App">
        {/* ... (side galleries and main-content remain the same) ... */}
        <div className="side-gallery left"><img src="/violin1.jpg" alt="Violin"/></div>
        <main className="main-content">
          <header className="App-header">
            <h1>Violin Studio</h1>
            <p className="description">This application is designed to help you grow as a musician...</p>
            <button className="cta-button" onClick={handleStartAnalysis}>Start Your Analysis</button>
          </header>
        </main>
        <div className="side-gallery right"><img src="/violin4.jpg" alt="Violin"/></div>
      </div>

      {/* --- QUESTIONS SECTION --- */}
      {showQuestions && (
        <div className="questions-area-container" ref={questionsRef}>
          <div className="questions-area">
            <h2>Practice Analysis</h2>
            {/* ... (Questions remain the same) ... */}
            <div className="question"><label>What piece are you playing?</label><input type="text"/></div>
            <div className="question"><label>What tempo are you taking it?</label><input type="number"/></div>

            {/* --- NEW AUDIO RECORDER SECTION --- */}
            <div className="audio-recorder-section">
              <h3>Record Your Performance</h3>
              <p>Record up to 2 minutes of your playing. Use a quiet environment for the best results.</p>
              <div className="recorder-controls">
                <button onClick={startRecording} disabled={isRecording} className="record-button">
                  Record
                </button>
                <button onClick={stopRecording} disabled={!isRecording} className="stop-button">
                  Stop
                </button>
              </div>
              {isRecording && <div className="recording-indicator">Recording...</div>}
              {audioURL && <audio src={audioURL} controls className="audio-player" />}
              {audioURL && !isAnalyzing && (
                <button className="cta-button analyze-button" onClick={analyzeRecording}>
                  Analyze My Recording
                </button>
              )}
            </div>

            {/* --- NEW AI FEEDBACK SECTION --- */}
            {isAnalyzing && (
              <div className="analysis-indicator">
                <div className="spinner"></div>
                Analyzing audio... This may take a moment.
              </div>
            )}
            {aiFeedback.length > 0 && (
              <div className="feedback-section">
                <h3>AI Feedback</h3>
                <ul className="feedback-list">
                  {aiFeedback.map((item, index) => (
                    <li key={index}>
                      <strong>Timestamp [{item.timestamp}]:</strong> {item.note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

export default App;
