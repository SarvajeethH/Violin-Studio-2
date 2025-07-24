import React, { useState, useRef, useEffect } from 'react';

// --- SIMULATION of a Back-End Server ---
const fetchPieceInfoAPI = async (pieceName) => {
  console.log(`Simulating web search for: ${pieceName}`);
  const pieceDatabase = {
    "bach partita no 2 in d minor": {
      title: "Partita No. 2 in D minor, BWV 1004",
      description: "A cornerstone of the solo violin repertoire by J.S. Bach. It is renowned for its final movement, the 'Chaconne,' a monumental work demanding profound emotional depth and technical mastery through a continuous set of variations on a bass line.",
      usualTempo: 76,
      practiceTempo: 60,
    },
    "mendelssohn violin concerto in e minor": {
      title: "Violin Concerto in E minor, Op. 64",
      description: "A seminal work of the Romantic era by Felix Mendelssohn. The concerto is celebrated for its structural innovations and its soaring, lyrical melodies that demand both brilliant virtuosity and deep musical sensitivity from the soloist.",
      usualTempo: 120,
      practiceTempo: 90,
    }
  };
  return new Promise(resolve => {
    setTimeout(() => {
      const normalizedName = pieceName.trim().toLowerCase();
      const result = pieceDatabase[normalizedName] || { title: pieceName, description: "Information for this piece could not be found. AI analysis will proceed based on the audio data alone.", notFound: true };
      resolve(result);
    }, 2500);
  });
};

const getCriticalAIAnalysis = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      const feedback = [
        { timestamp: "0:04", note: "Intonation is sharp on the G#. This pitch deviation is outside the acceptable tolerance for this note." },
        { timestamp: "0:09", note: "Rhythmic accuracy issue. The dotted quarter note was held for approximately 85% of its required value, rushing the following eighth note." },
        { timestamp: "0:17", note: "Articulation lacks clarity in this passage. The staccato notes are not detached enough, blurring the phrasing." },
        { timestamp: "0:22", note: "Bow change is audible. The transition from down-bow to up-bow creates an unintended accent inconsistent with reference recordings." },
      ];
      resolve(feedback);
    }, 4000);
  });
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

function App() {
  const [uiStage, setUiStage] = useState('welcome'); // welcome | questions | describing | recording | analyzing | feedback
  const [pieceName, setPieceName] = useState('');
  const [userTempo, setUserTempo] = useState('');
  const [pieceInfo, setPieceInfo] = useState(null);
  const [permission, setPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioURL, setAudioURL] = useState('');
  const [volume, setVolume] = useState(0);
  const [aiFeedback, setAiFeedback] = useState([]);

  const questionsRef = useRef(null);
  const recorderRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationFrameRef = useRef(null);

  const handleInitialScroll = () => {
    setUiStage('questions');
    setTimeout(() => questionsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };
  
  const handleSubmitQuestions = async () => {
    if (!pieceName) { alert("Please enter the name of the piece."); return; }
    setUiStage('analyzing');
    const info = await fetchPieceInfoAPI(pieceName);
    setPieceInfo(info);
    setUiStage('describing');
  };

  const handleMoveToRecording = () => {
    setUiStage('recording');
    setTimeout(() => recorderRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleRecordClick = async () => {
    if (!permission) {
        try {
            const streamData = await navigator.mediaDevices.getUserMedia({ audio: true });
            setPermission(true);
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContextRef.current = audioContext;
            analyserRef.current = audioContext.createAnalyser();
            sourceRef.current = audioContext.createMediaStreamSource(streamData);
            sourceRef.current.connect(analyserRef.current);
            mediaRecorderRef.current = new MediaRecorder(streamData);
            startRecordingFlow();
        } catch (err) { alert("Microphone access was denied."); return; }
    } else {
        isRecording ? stopRecordingFlow() : startRecordingFlow();
    }
  };

  const startRecordingFlow = () => {
    audioChunksRef.current = [];
    setAudioURL('');
    setAiFeedback([]);
    mediaRecorderRef.current.start();
    setIsRecording(true);
    setRecordingTime(0);
    timerIntervalRef.current = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    visualizeVolume();
    mediaRecorderRef.current.ondataavailable = (event) => audioChunksRef.current.push(event.data);
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      setAudioURL(URL.createObjectURL(audioBlob));
    };
  };

  const stopRecordingFlow = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    clearInterval(timerIntervalRef.current);
    cancelAnimationFrame(animationFrameRef.current);
    setVolume(0);
  };

  const visualizeVolume = () => {
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);
      analyserRef.current.getByteFrequencyData(dataArray);
      let sum = 0;
      dataArray.forEach(value => sum += value);
      setVolume(sum / dataArray.length);
    };
    draw();
  };

  const analyzeRecording = async () => {
    setUiStage('analyzing');
    const feedback = await getCriticalAIAnalysis();
    setAiFeedback(feedback);
    setUiStage('feedback');
  };

  return (
    <div className="App-container">
      {/* --- THIS IS THE START OF THE PROJECT. IT IS NOW FULLY INCLUDED. --- */}
      <div className="App">
        <div className="side-gallery left">
          <img src="/violin1.jpg" alt="Close-up of a violin body" />
          <img src="/violin2.jpg" alt="Person playing a violin" />
        </div>
        <main className="main-content">
          <header className="App-header">
            <h1>Violin Studio</h1>
            <p className="welcome-message">
              Welcome to the AI-Optimized Acoustic Enhancer Dashboard!
            </p>
            <p className="description">
              This application is designed to help you grow as a musician by providing cutting-edge tools to refine your sound. Our AI-powered features analyze your playing and offer feedback to enhance your acoustic quality. Take your violin skills to the next level and unlock your true potential.
            </p>
            <button className="cta-button" onClick={handleInitialScroll}>
              Start Your Analysis
            </button>
          </header>
        </main>
        <div className="side-gallery right">
          <img src="/violin3.jpg" alt="Violin on top of sheet music" />
          <img src="/violin4.jpg" alt="Violin against a dark background" />
        </div>
      </div>

      {/* --- THIS CONTAINER HOLDS ALL SUBSEQUENT INTERACTIVE SECTIONS --- */}
      {(uiStage !== 'welcome') && (
        <div className="interactive-container" ref={questionsRef}>
          {/* STAGE 1: QUESTIONS */}
          <div className="questions-area">
            <h2>Practice Analysis</h2>
            <div className="question">
              <label htmlFor="piece-name">What piece of music are you playing?</label>
              <input type="text" id="piece-name" className="question-input" placeholder="e.g., Bach Partita No 2 in D Minor" value={pieceName} onChange={(e) => setPieceName(e.target.value)} />
            </div>
            <div className="question">
              <label htmlFor="tempo">What tempo (in BPM) are you taking it?</label>
              <input type="number" id="tempo" className="question-input" placeholder="e.g., 60" value={userTempo} onChange={(e) => setUserTempo(e.target.value)} />
            </div>
            <button className="cta-button" onClick={handleSubmitQuestions} disabled={uiStage !== 'questions'}>
              Submit for Description
            </button>
          </div>

          {/* STAGE 2: PIECE DESCRIPTION */}
          {pieceInfo && (uiStage === 'describing' || uiStage === 'recording' || uiStage === 'feedback') && (
              <div className="piece-info-section">
                  <h3>About: {pieceInfo.title}</h3>
                  <p className="piece-info-description">{pieceInfo.description}</p>
                  {!pieceInfo.notFound && 
                      <div className="tempo-analysis">
                          <div className="tempo-box"><span>Suggested Practice</span><div className="tempo-value">{pieceInfo.practiceTempo} BPM</div></div>
                          <div className="tempo-box"><span>Typical Performance</span><div className="tempo-value">{pieceInfo.usualTempo} BPM</div></div>
                      </div>
                  }
                  <button className="cta-button" onClick={handleMoveToRecording}>Move to Recording</button>
              </div>
          )}
          
          {/* STAGE 3: RECORDER */}
          {(uiStage === 'recording' || uiStage === 'feedback') && (
              <div className="audio-recorder-section" ref={recorderRef}>
                  <h3>Record Your Performance</h3>
                  <div className="recorder-widget">
                      <button className={`record-button-new ${isRecording ? 'recording' : ''}`} onClick={handleRecordClick}></button>
                      <div className="volume-meter">
                          <div className="volume-level" style={{ width: `${Math.min(volume * 2, 100)}%` }}></div>
                      </div>
                  </div>
                  {isRecording && <div className="timer">{formatTime(recordingTime)}</div>}
                  {audioURL && (
                      <div className="audio-result">
                          <h4>Your Recording:</h4>
                          <audio src={audioURL} controls className="audio-player" />
                          <button className="cta-button analyze-button" onClick={analyzeRecording}>Analyze My Recording</button>
                      </div>
                  )}
              </div>
          )}

          {/* LOADING & FEEDBACK STAGES */}
          {uiStage === 'analyzing' && (
              <div className="analysis-indicator">
                  <div className="spinner"></div>
                  {pieceInfo ? "Comparing your performance against reference recordings..." : "Looking up piece information..."}
              </div>
          )}
          {uiStage === 'feedback' && aiFeedback.length > 0 && (
              <div className="performance-feedback-section">
                  <h3>Performance Analysis</h3>
                  <ul className="feedback-list">
                      {aiFeedback.map((item, index) => (
                          <li key={index}><strong>Timestamp [{item.timestamp}]:</strong> {item.note}</li>
                      ))}
                  </ul>
              </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
