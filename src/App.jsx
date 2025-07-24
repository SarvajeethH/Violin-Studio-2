import React, { useState, useRef } from 'react';

// --- MOCK DATABASE & AI SIMULATION ---
const pieceDatabase = {
  "bach partita no 2 in d minor": {
    title: "Partita No. 2 in D minor, BWV 1004",
    description: "Composed by Johann Sebastian Bach between 1717 and 1723, this partita is one of the cornerstones of the solo violin repertoire. It is famous for its final movement, the monumental 'Chaconne,' which is a masterwork of emotional depth and technical complexity, featuring a continuous set of variations on a theme.",
    usualTempo: 76,
    practiceTempo: 60,
  },
  "mendelssohn violin concerto in e minor": {
    title: "Violin Concerto in E minor, Op. 64",
    description: "Felix Mendelssohn's final large-scale orchestral work, this concerto is a staple of the Romantic era. It is known for its innovative structure, such as linking all three movements without a pause, and its soaring, lyrical melodies that demand both technical virtuosity and deep musical sensitivity from the soloist.",
    usualTempo: 120,
    practiceTempo: 90,
  },
  "introduction and rondo capriccioso": {
    title: "Introduction and Rondo Capriccioso, Op. 28",
    description: "A dazzling showpiece for violin and orchestra by Camille Saint-Saëns, composed in 1863 for the virtuoso violinist Pablo de Sarasate. The piece opens with a melancholic introduction before launching into a brilliant, Spanish-flavored rondo that is famous for its fiery passagework and rhythmic vitality.",
    usualTempo: 108,
    practiceTempo: 85,
  }
};

const getMockAIAnalysis = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      const feedback = [
        { timestamp: "0:04", note: "Slight intonation issue on the G#. Try raising the pitch a little." },
        { timestamp: "0:09", note: "Rhythm is slightly rushed. Ensure the dotted quarter note gets its full value." },
        { timestamp: "0:15", note: "Excellent dynamic control here. The crescendo is very effective." },
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
  const [showQuestions, setShowQuestions] = useState(false);
  const questionsRef = useRef(null);
  const [pieceName, setPieceName] = useState('');
  const [userTempo, setUserTempo] = useState('');
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioURL, setAudioURL] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pieceInfo, setPieceInfo] = useState(null);
  const [aiFeedback, setAiFeedback] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({ audio: true });
        setPermission(true);
        setStream(streamData);
      } catch (err) { alert(err.message); }
    } else { alert("MediaRecorder not supported."); }
  };
  
  const handleRecordClick = () => {
    if (!permission) { getMicrophonePermission(); return; }
    if (isRecording) {
      mediaRecorderRef.current.stop();
      clearInterval(timerIntervalRef.current);
      setIsRecording(false);
    } else {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      setAudioURL('');
      setAiFeedback([]);
      setPieceInfo(null);
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerIntervalRef.current = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };
    }
  };

  const analyzeRecording = async () => {
    setIsAnalyzing(true);
    const normalizedPieceName = pieceName.trim().toLowerCase();
    const info = pieceDatabase[normalizedPieceName] || null;
    setPieceInfo(info);
    const feedback = await getMockAIAnalysis();
    setAiFeedback(feedback);
    setIsAnalyzing(false);
  };
  
  const handleStartAnalysis = () => {
    setShowQuestions(true);
    setTimeout(() => questionsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <div className="App-container">
      <div className="App">
        <div className="side-gallery left">
          <img src="/violin1.jpg" alt="Violin" />
          <img src="/violin2.jpg" alt="Violin" />
        </div>
        <main className="main-content">
          <header className="App-header">
            <h1>Violin Studio</h1>
            <p className="description">
              This application is designed to help you grow as a musician by providing cutting-edge tools to refine your sound. Our AI-powered features analyze your playing and offer feedback to enhance your acoustic quality. Take your violin skills to the next level and unlock your true potential.
            </p>
            <button className="cta-button" onClick={handleStartAnalysis}>
              Start Your Analysis
            </button>
          </header>
        </main>
        <div className="side-gallery right">
          <img src="/violin3.jpg" alt="Violin" />
          <img src="/violin4.jpg" alt="Violin" />
        </div>
      </div>
      
      {showQuestions && (
        <div className="questions-area-container" ref={questionsRef}>
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
            
            <div className="audio-recorder-section">
                <div className="recorder-ui">
                  <div className="timer">{formatTime(recordingTime)}</div>
                  <button 
                    className={`record-stop-button ${isRecording ? 'recording' : ''}`}
                    onClick={handleRecordClick}
                    aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                  >
                    <div className="record-icon"></div>
                  </button>
                  <div className="recording-status">
                    {isRecording ? "Recording in progress..." : "Ready to record"}
                  </div>
                </div>

                {audioURL && (
                  <div className="audio-result">
                    <h4>Your Recording:</h4>
                    <audio src={audioURL} controls className="audio-player" />
                    <button className="cta-button analyze-button" onClick={analyzeRecording} disabled={isAnalyzing}>
                      Analyze My Recording
                    </button>
                  </div>
                )}
            </div>

            {isAnalyzing && (
              <div className="analysis-indicator">
                <div className="spinner"></div>
                Analyzing... Our AI is listening closely.
              </div>
            )}

            {(pieceInfo || aiFeedback.length > 0) && !isAnalyzing && (
              <div className="results-container">
                {pieceInfo && (
                  <div className="piece-info-section">
                    <h3>About: {pieceInfo.title}</h3>
                    <p className="piece-info-description">{pieceInfo.description}</p>
                    <h4>Tempo Analysis</h4>
                    <div className="tempo-analysis">
                      <div className="tempo-box">
                        <span>Your Tempo</span>
                        <div className="tempo-value">{userTempo || 'N/A'} BPM</div>
                      </div>
                      <div className="tempo-box">
                        <span>Suggested Practice</span>
                        <div className="tempo-value">{pieceInfo.practiceTempo} BPM</div>
                      </div>
                      <div className="tempo-box">
                        <span>Typical Performance</span>
                        <div className="tempo-value">{pieceInfo.usualTempo} BPM</div>
                      </div>
                    </div>
                    {userTempo && pieceInfo.usualTempo && (
                      <p className="tempo-comment">
                        {userTempo > pieceInfo.usualTempo
                          ? "Note: Your tempo is faster than a typical performance. Ensure clarity is maintained."
                          : "Note: Your tempo is at or below a typical performance speed, which is excellent for practice."
                        }
                      </p>
                    )}
                  </div>
                )}
                
                {aiFeedback.length > 0 && (
                  <div className="performance-feedback-section">
                    <h3>Your Performance Analysis</h3>
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// THIS IS THE ONLY EXPORT. THE DUPLICATE IS NOW GONE.
export default App;
