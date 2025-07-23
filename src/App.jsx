import React from 'react';

function App() {
  return (
    <div className="App">
      <div className="side-gallery left">
        <img src="/violin1.jpg" alt="Violin" />
        <img src="/violin2.jpg" alt="Violin" />
      </div>
      <main className="main-content">
        <header className="App-header">
          {/* You can add your logo back here if you have one in the public folder */}
          {/* <img src="/logo.png" alt="Violin Studio logo" className="logo" /> */}
          
          <h1>Violin Studio</h1>
          
          <p className="welcome-message">
            Welcome to the AI-Optimized Acoustic Enhancer Dashboard!
          </p>
          
          <p className="description">
            This application is designed to help you grow as a musician by providing cutting-edge tools to refine your sound. Our AI-powered features analyze your playing and offer feedback to enhance your acoustic quality. Take your violin skills to the next level and unlock your true potential.
          </p>
        </header>
      </main>
      <div className="side-gallery right">
        <img src="/violin3.jpg" alt="Violin" />
        <img src="/violin4.jpg" alt="Violin" />
      </div>
    </div>
  );
}

export default App;
