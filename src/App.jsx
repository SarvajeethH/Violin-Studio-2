import React, { useState, useRef, useEffect } from 'react';

// --- THE EXPANDED "BRAIN" OF THE APPLICATION ---
const pieceDatabase = {
  // Bach
  "bach brandenburg concertos": {
    title: "Brandenburg Concerto No. 4 in G major, BWV 1049",
    description: "A famous concerto grosso by J.S. Bach from his set of six. This work is notable for its brilliant and virtuosic concertino group, consisting of a violin and two 'fiauti d'echo' (recorders), demanding exceptional agility and interplay.",
    usualTempo: 100,
    practiceTempo: 80,
  },
  "bach d minor partita": {
    title: "Partita No. 2 in D minor, BWV 1004",
    description: "A cornerstone of the solo violin repertoire by J.S. Bach. It is renowned for its final movement, the 'Chaconne,' a monumental work demanding profound emotional depth and technical mastery through a continuous set of variations on a bass line.",
    usualTempo: 76,
    practiceTempo: 60,
  },
  "bach a minor concerto": {
    title: "Violin Concerto in A minor Bach",
    description: "One of Bach's most famous concertos, known for its perfectly balanced structure and expressive depth. The outer movements are rhythmically energetic, while the central Andante is a sublime, singing melody over a steady ostinato bass.",
    usualTempo: 92,
    practiceTempo: 72,
  },
  // Beethoven
  "beethoven spring sonata": {
    title: "Violin Sonata No. 5 in F major, Op. 24 'Spring'",
    description: "Composed by Ludwig van Beethoven, the 'Spring' Sonata is celebrated for its lyrical and serene character. The opening melody flows with a sense of calm and optimism, requiring a warm, beautiful tone and sensitive collaboration with the piano.",
    usualTempo: 116,
    practiceTempo: 92,
  },
  "beethoven romance in f": {
    title: "Romance for Violin and Orchestra No. 2 in F major, Op. 50",
    description: "A beautiful and elegant piece by Beethoven. It is not a flashy showpiece but rather a test of the violinist's ability to sustain a long, beautiful melodic line with pure tone and expressive phrasing.",
    usualTempo: 60,
    practiceTempo: 50,
  },
  // Kreisler
  "kreisler praeludium and allegro": {
    title: "Praeludium and Allegro 'in the style of Pugnani'",
    description: "A brilliant showpiece by Fritz Kreisler. Though attributed to Pugnani, it is Kreisler's own composition. It features a grand, dramatic introduction followed by a fiery Allegro that demands powerful bowing and commanding virtuosity.",
    usualTempo: 112,
    practiceTempo: 90,
  },
  "kreisler schon rosmarin": {
    title: "Schön Rosmarin",
    description: "A charming and graceful Viennese waltz by Fritz Kreisler. The piece requires a light, elegant touch, subtle rhythmic inflections (rubato), and a sweet, singing tone to capture its nostalgic and slightly sentimental character.",
    usualTempo: 144, // Waltz tempo
    practiceTempo: 110,
  },
  // Wieniawski
  "wieniawski legende": {
    title: "Légende, Op. 17",
    description: "A passionate and romantic work by Henryk Wieniawski. It is known for its intense, lyrical G-string melody and a dramatic, turbulent middle section, requiring rich tone and expressive depth.",
    usualTempo: 54,
    practiceTempo: 45,
  },
  "wieniawski scherzo tarantella": {
    title: "Scherzo-Tarantelle, Op. 16",
    description: "An electrifying and virtuosic piece by Henryk Wieniawski. It combines a relentless, driving tarantella rhythm with dazzling technical passages, including rapid spiccato, left-hand pizzicato, and flying staccato bowing.",
    usualTempo: 152,
    practiceTempo: 120,
  },
  "wieniawski allegro brilliante": {
    title: "Allegro de Concert, Op. 19 (Polonaise Brillante No. 2)",
    description: "A brilliant and virtuosic Polonaise by Henryk Wieniawski. It demands a high level of technical proficiency, featuring brilliant passagework, double stops, and a characteristically proud and noble Polish dance rhythm.",
    usualTempo: 100,
    practiceTempo: 80,
  },
  // Saint-Saëns
  "saint-saens introduction and rondo capriccioso": {
    title: "Introduction and Rondo Capriccioso, Op. 28",
    description: "A dazzling showpiece by Camille Saint-Saëns. It opens with a melancholic introduction before launching into a brilliant, Spanish-flavored rondo that is famous for its fiery passagework and rhythmic vitality.",
    usualTempo: 108,
    practiceTempo: 85,
  },
  // Vivaldi
  "vivaldi four seasons": {
    title: "Vivaldi Four Seasons",
    description: "A set of four violin concertos by Antonio Vivaldi, each giving musical expression to a season of the year. They are among the most famous works of the Baroque period, known for their programmatic and innovative instrumental writing.",
    usualTempo: 100,
    practiceTempo: 80,
  },
  "vivaldi a minor concerto": {
    title: "Violin Concerto in A minor, RV 356",
    description: "Part of Vivaldi's L'estro armonico, this is one of the most studied violin concertos. It is fundamental for developing Baroque style, clean string crossings, and precise intonation.",
    usualTempo: 96,
    practiceTempo: 76,
  },
  // Sarasate
  "sarasate zigeunerweisen": {
    title: "Zigeunerweisen (Gypsy Airs), Op. 20",
    description: "Pablo de Sarasate's most famous work, a fantasy on Romani themes. It features a slow, improvisatory and soulful introduction followed by an incredibly fast, virtuosic finale that demands technical fireworks and a fiery, passionate character.",
    usualTempo: 138,
    practiceTempo: 100,
  },
  "sarasate carmen fantasy": {
    title: "Carmen Fantasy, Op. 25",
    description: "A brilliant and virtuosic fantasy by Pablo de Sarasate, based on themes from Bizet's opera Carmen. It is a technical tour-de-force, incorporating famous arias like the Habanera and Seguidilla into a stunning display for the violin.",
    usualTempo: 116,
    practiceTempo: 95,
  },
  // Massenet
  "massenet meditation from thais": {
    title: "Méditation from Thaïs",
    description: "A beautiful and serene intermezzo from the opera Thaïs by Jules Massenet. It is celebrated for its exquisite, lyrical melody that soars over a gentle orchestral accompaniment, requiring a pure, singing tone and immense bow control.",
    usualTempo: 52,
    practiceTempo: 44,
  },
  // Elgar
  "elgar salut d'amor": {
    title: "Salut d'Amour (Love's Greeting), Op. 12",
    description: "A short, charming musical work composed by Edward Elgar. It is a simple, heartfelt piece known for its graceful and romantic melody, requiring sincere expression and a warm tone.",
    usualTempo: 66,
    practiceTempo: 56,
  },
  "elgar chanson de nuit": {
    title: "Chanson de Nuit, Op. 15, No. 1",
    description: "A short, lyrical 'night song' by Edward Elgar. The piece is introspective and calm, with a rich harmonic language that evokes a sense of peaceful contemplation.",
    usualTempo: 58,
    practiceTempo: 48,
  },
  "elgar chanson de matin": {
    title: "Chanson de Matin, Op. 15, No. 2",
    description: "'Morning Song' by Edward Elgar, the companion piece to Chanson de Nuit. It is brighter and more optimistic in character, with a flowing melody that suggests a fresh start to the day.",
    usualTempo: 72,
    practiceTempo: 60,
  },
  // Bartok
  "bartok romanian dances": {
    title: "Romanian Folk Dances, Sz. 56",
    description: "A suite of six short pieces by Béla Bartók, based on authentic Romanian folk melodies. The work is characterized by its unique scales, energetic rhythms, and distinct folk character, moving from slow dances to fast, virtuosic fiddling.",
    usualTempo: 144, // For the final fast dance
    practiceTempo: 112,
  },
  // Mozart
  "mozart violin concertos": {
    title: "Violin Concerto No. 3, 4, or 5",
    description: "Mozart composed five violin concertos, with Nos. 3, 4, and 5 being the most famous. They are pillars of the Classical repertoire, known for their elegance, clarity, and operatic grace, demanding impeccable phrasing and a clean technique.",
    usualTempo: 120,
    practiceTempo: 100,
  },
  "mozart twinkle twinkle": {
    title: "Variations on 'Ah, vous dirai-je, Maman', K. 265",
    description: "A set of twelve variations on the French folk song, famously known as 'Twinkle, Twinkle, Little Star'. Originally for piano, transcriptions for violin are used to teach fundamental variation techniques, bowing, and articulation.",
    usualTempo: 88,
    practiceTempo: 70,
  },
  // Others
  "accolay concerto in a minor": {
    title: "Concerto No. 1 in A minor",
    description: "A popular student concerto by Jean-Baptiste Accolay. It is a foundational piece for intermediate violinists, introducing them to the Romantic concerto style with dramatic themes and foundational virtuosic passages.",
    usualTempo: 108,
    practiceTempo: 88,
  },
  "rimsky-korsakov flight of the bumblebee": {
    title: "Flight of the Bumblebee",
    description: "An orchestral interlude by Nikolai Rimsky-Korsakov, famous for its frantic and relentless pace. On the violin, it is a virtuosic showpiece testing the limits of a player's speed and clarity in rapid chromatic passages.",
    usualTempo: 180,
    practiceTempo: 130,
  },
  "bruch scottish fantasy": {
    title: "Scottish Fantasy, Op. 46",
    description: "A four-movement fantasy for violin and orchestra by Max Bruch, based on Scottish folk melodies. It is a deeply romantic and atmospheric work, combining heroic themes, melancholic airs, and lively dance-like finales.",
    usualTempo: 72,
    practiceTempo: 60,
  },
  "lalo symphonie espagnole": {
    title: "Symphonie espagnole, Op. 21",
    description: "Essentially a five-movement violin concerto by Édouard Lalo. It is infused with Spanish character, featuring vibrant rhythms and virtuosic writing for the soloist, making it a staple of the repertoire.",
    usualTempo: 112,
    practiceTempo: 90,
  },
  "monti czardas": {
    title: "Czardas",
    description: "A well-known concert piece by Vittorio Monti based on a Hungarian csárdás. It features a slow, dramatic introduction (lassan) followed by a fast, furious main section (friss) that accelerates to a thrilling conclusion.",
    usualTempo: 140, // For the fast section
    practiceTempo: 100,
  },
  "mendelssohn concerto in e minor": {
    title: "Violin Concerto in E minor, Op. 64",
    description: "A seminal work of the Romantic era by Felix Mendelssohn. It is celebrated for its structural innovations and soaring, lyrical melodies that demand both brilliant virtuosity and deep musical sensitivity from the soloist.",
    usualTempo: 120,
    practiceTempo: 90,
  },
  "butterfly lovers concerto": {
    title: "Butterfly Lovers' Violin Concerto",
    description: "A famous work of Chinese classical music, composed by He Zhanhao and Chen Gang. It combines Chinese folk melodies, harmonies, and pentatonic scales with Western orchestral and violin techniques to tell a tragic love story.",
    usualTempo: 80,
    practiceTempo: 65,
  },
  "sibelius violin concerto": {
    title: "Violin Concerto in D minor, Op. 47",
    description: "Jean Sibelius's only concerto, it is one of the great concertos of the 20th century. Known for its dark, brooding atmosphere and immense technical demands, it is considered one of the most difficult works in the standard violin repertoire.",
    usualTempo: 108,
    practiceTempo: 84,
  },
  "vieuxtemps concerto no 5": {
    title: "Violin Concerto No. 5 in A minor, Op. 37 'Grétry'",
    description: "A concise and dramatic concerto by Henri Vieuxtemps. It is unique for its structure, playing without pause and quoting themes from a Grétry opera. It is a test of both technical brilliance and dramatic interpretation.",
    usualTempo: 112,
    practiceTempo: 90,
  },
  "viotti concerto in a minor": {
    title: "Violin Concerto No. 22 in A minor, G. 97",
    description: "A significant work by Giovanni Battista Viotti that influenced Beethoven and Brahms. It is a bridge between the Classical and Romantic styles, known for its noble themes, brilliant passage work, and formal elegance.",
    usualTempo: 120,
    practiceTempo: 96,
  },
  "corelli allegro": {
    title: "Sonata in D minor, Op. 5, No. 12 'La Follia'",
    description: "A famous set of variations by Arcangelo Corelli on the 'La Folia' theme. The 'Allegro' sections are energetic and require crisp articulation and precise rhythm, embodying the Italian Baroque style.",
    usualTempo: 110,
    practiceTempo: 90,
  },
  "borowski adoration": {
    title: "Adoration",
    description: "A short, expressive salon piece by Felix Borowski. It is beloved for its simple, reverent melody and rich harmonies, making it a staple for students learning expressive playing.",
    usualTempo: 60,
    practiceTempo: 50,
  },
  "dvorak sonatina": {
    title: "Sonatina in G major, Op. 100",
    description: "A charming work by Antonín Dvořák, written during his time in America. While composed for his children, it is filled with beautiful melodies influenced by Native American and African American music, particularly in the famous 'Larghetto' movement.",
    usualTempo: 132, // For the Finale
    practiceTempo: 108,
  },
  "shostakovich romance from the gadfly": {
    title: "Romance from The Gadfly Suite, Op. 97a",
    description: "An immensely popular and lyrical piece by Dmitri Shostakovich. Its soaring, romantic melody is emotionally charged and has made it a concert favorite, separate from its original film score context.",
    usualTempo: 76,
    practiceTempo: 63,
  },
  "brahms scherzo from fae sonata": {
    title: "Scherzo in C minor, WoO 2 (from the F-A-E Sonata)",
    description: "Johannes Brahms's contribution to the collaborative F-A-E Sonata. It is a fiery, powerful movement with a driving rhythm and dense textures, reflecting the youthful passion and energy of the composer.",
    usualTempo: 144,
    practiceTempo: 115,
  },
  "stravinsky suite italienne": {
    title: "Suite Italienne",
    description: "A suite for violin and piano by Igor Stravinsky, based on music from his neoclassical ballet Pulcinella. The music is witty, rhythmically complex, and requires a clean, precise technique to capture its anti-Romantic, 18th-century-inspired character.",
    usualTempo: 120,
    practiceTempo: 100,
  },
};

const fetchPieceInfoAPI = async (pieceName) => {
  console.log(`Simulating web search for: ${pieceName}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const normalizedName = pieceName.trim().toLowerCase();
      const dbKey = Object.keys(pieceDatabase).find(key => key.includes(normalizedName));
      const result = dbKey ? pieceDatabase[dbKey] : { title: pieceName, description: "Information for this piece could not be found. AI analysis will proceed based on the audio data alone.", notFound: true };
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
  const [uiStage, setUiStage] = useState('welcome');
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

      {(uiStage !== 'welcome') && (
        <div className="interactive-container" ref={questionsRef}>
          <div className="questions-area">
            <h2>Practice Analysis</h2>
            <div className="question">
              <label htmlFor="piece-name">What piece of music are you playing?</label>
              <input type="text" id="piece-name" className="question-input" placeholder="e.g., Bach D Minor Partita" value={pieceName} onChange={(e) => setPieceName(e.target.value)} />
            </div>
            <div className="question">
              <label htmlFor="tempo">What tempo (in BPM) are you taking it?</label>
              <input type="number" id="tempo" className="question-input" placeholder="e.g., 60" value={userTempo} onChange={(e) => setUserTempo(e.target.value)} />
            </div>
            <button className="cta-button" onClick={handleSubmitQuestions} disabled={uiStage !== 'questions'}>
              Submit for Description
            </button>
          </div>

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
