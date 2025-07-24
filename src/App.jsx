import React, { useState, useRef } from 'react';

function App() {
  // State to control the visibility of the questions section
  const [showQuestions, setShowQuestions] = useState(false);
  // Ref to the questions section to enable smooth scrolling
  const questionsRef = useRef(null);

  // This function runs when the button is clicked
  const handleStartAnalysis = () => {
    // 1. Make the questions section visible
    setShowQuestions(true);

    // 2. Scroll to the questions section smoothly after it has been rendered
    setTimeout(() => {
      questionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100); // A small delay ensures the element exists before scrolling
  };

  return (
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
          
          {/* --- NEW BUTTON --- */}
          <button className="cta-button" onClick={handleStartAnalysis}>
            Start Your Analysis
          </button>
        </header>
      </main>

      <div className="side-gallery right">
        <img src="/violin3.jpg" alt="Violin on top of sheet music" />
        <img src="/violin4.jpg" alt="Violin against a dark background" />
      </div>

      {/* --- NEW QUESTIONS SECTION (Conditionally Rendered) --- */}
      {/* This entire div will only appear after the button is clicked */}
      {showQuestions && (
        <div className="questions-area-container">
          <div className="questions-area" ref={questionsRef}>
            <h2>Practice Analysis</h2>
            
            <div className="question">
              <label htmlFor="piece-name">What piece of music are you playing?</label>
              <input type="text" id="piece-name" className="question-input" placeholder="e.g., Bach Partita No. 2 in D minor" />
            </div>

            <div className="question">
              <label htmlFor="tempo">What tempo (in BPM) are you taking it?</label>
              <input type="number" id="tempo" className="question-input" placeholder="e.g., 60" />
            </div>

            <div className="piece-description">
              <h3>Traditional Interpretation & Challenges</h3>
              <p>
                <strong>Note:</strong> The following is a general example. A real analysis would be tailored to the piece you enter.
              </p>
              <p>
                A piece like Bach's Partitas is traditionally played with great attention to baroque stylistic elements, such as precise articulation and controlled vibrato. Common difficult measures often involve complex string crossings, intricate double stops, and maintaining a clear polyphonic texture where multiple musical lines are played simultaneously. Intonation in the extended chordal passages is a frequent challenge for many musicians.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
