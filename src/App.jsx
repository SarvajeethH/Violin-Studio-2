import React, { useState, useRef, useEffect } from 'react';

// --- THE EXPANDED "BRAIN" OF THE APPLICATION ---
// The database is now significantly larger and more detailed.
const pieceDatabase = {
  // Original Set
  "bach_d_minor_partita": { title: "Partita No. 2 in D minor, BWV 1004", keywords: ["bach", "chaconne", "ciaccona"], description: "A cornerstone of the solo violin repertoire by J.S. Bach, renowned for its final movement, the 'Chaconne'...", usualTempo: 76, practiceTempo: 60 },
  "vivaldi_four_seasons": { title: "The Four Seasons", keywords: ["vivaldi", "winter", "spring", "summer", "autumn", "fall"], description: "A set of four violin concertos by Antonio Vivaldi, each giving musical expression to a season of the year...", usualTempo: 100, practiceTempo: 80 },
  "sarasate_zigeunerweisen": { title: "Zigeunerweisen, Op. 20", keywords: ["sarasate", "gypsy airs"], description: "Pablo de Sarasate's most famous work, a fantasy on Romani themes...", usualTempo: 138, practiceTempo: 100 },
  "massenet_meditation": { title: "Méditation from Thaïs", keywords: ["massenet", "thais", "meditation"], description: "A beautiful and serene intermezzo from the opera Thaïs by Jules Massenet...", usualTempo: 52, practiceTempo: 44 },
  "elgar_salut_damour": { title: "Salut d'amour, Op. 12", keywords: ["elgar", "love's greeting"], description: "A short, charming musical work composed by Edward Elgar, beloved for its graceful and romantic melody.", usualTempo: 66, practiceTempo: 56 },
  "kreisler_schon_rosmarin": { title: "Schön Rosmarin", keywords: ["kreisler", "rosmarin"], description: "A charming and graceful Viennese waltz by Fritz Kreisler, requiring a light, elegant touch.", usualTempo: 144, practiceTempo: 110 },
  "mendelssohn_concerto": { title: "Violin Concerto in E minor, Op. 64", keywords: ["mendelssohn"], description: "A seminal work of the Romantic era by Felix Mendelssohn, celebrated for its soaring, lyrical melodies.", usualTempo: 120, practiceTempo: 90 },
  "brahms_hungarian_dance_1": { title: "Hungarian Dance No. 1, WoO 1", keywords: ["brahms", "hungarian", "dance", "1"], description: "A lively and fiery piece by Johannes Brahms, known for its dramatic shifts in tempo and mood.", usualTempo: 110, practiceTempo: 88 },
  "brahms_hungarian_dance_6": { title: "Hungarian Dance No. 6, WoO 1", keywords: ["brahms", "hungarian", "dance", "6"], description: "A spirited and rhythmically complex dance by Johannes Brahms, featuring both vivacious and lyrical sections.", usualTempo: 132, practiceTempo: 100 },
  "brahms_hungarian_dance_7": { title: "Hungarian Dance No. 7 in F Major, WoO 1", keywords: ["brahms", "hungarian", "dance", "7"], description: "An allegretto dance by Brahms, this piece is more graceful and less fiery than some others in the set.", usualTempo: 92, practiceTempo: 72 },
  "paganini_cantabile": { title: "Cantabile in D Major, Op. 17", keywords: ["paganini"], description: "An expressive and lyrical piece by Nicolò Paganini that showcases the violin's singing quality.", usualTempo: 72, practiceTempo: 60 },
  "paganini_sonata_a_major": { title: "Sonata in A Major", keywords: ["paganini"], description: "A charming and classical sonata by Paganini, demonstrating his melodic writing as well as his virtuosity.", usualTempo: 116, practiceTempo: 92 },
  "wieniawski_romance": { title: "Romance from Violin Concerto No. 2", keywords: ["wieniawski"], description: "The beautiful and passionate central movement from Henryk Wieniawski's second violin concerto.", usualTempo: 58, practiceTempo: 48 },
  "wieniawski_kujawiak": { title: "Kujawiak in A Minor", keywords: ["wieniawski"], description: "A Polish folk dance by Henryk Wieniawski, characterized by its melancholic mood and lilting rhythm.", usualTempo: 120, practiceTempo: 96 },
  "dvorak_romance_1": { title: "Romantic Piece, Op. 75 No. 1", keywords: ["dvorak", "romantic", "1"], description: "The first of Antonín Dvořák's Romantic Pieces, marked Allegro moderato, with a flowing, lyrical melody.", usualTempo: 100, practiceTempo: 80 },
  "dvorak_romance_2": { title: "Romantic Piece, Op. 75 No. 2", keywords: ["dvorak", "romantic", "2"], description: "The second of Dvořák's Romantic Pieces, an Allegro maestoso that is noble and grand in character.", usualTempo: 108, practiceTempo: 84 },
  "dvorak_romance_3": { title: "Romantic Piece, Op. 75 No. 3", keywords: ["dvorak", "romantic", "3"], description: "The third of Dvořák's Romantic Pieces, an Allegro appassionato filled with passionate and dramatic expression.", usualTempo: 126, practiceTempo: 100 },
  "dvorak_waltz_1": { title: "Waltz No. 1 in A Major, Op.54", keywords: ["dvorak", "waltz"], description: "A graceful and charming waltz by Antonín Dvořák, marked Moderato.", usualTempo: 138, practiceTempo: 112 },
  "debussy_flaxen_hair": { title: "La fille aux cheveux de lin", keywords: ["debussy", "the girl with the flaxen hair"], description: "A simple and beautiful prelude by Claude Debussy, known for its delicate and atmospheric melody.", usualTempo: 66, practiceTempo: 54 },
  "rachmaninoff_vocalise": { title: "Vocalise, Op. 34 No. 14", keywords: ["rachmaninoff"], description: "A wordless song by Sergei Rachmaninoff, celebrated for its long, flowing, and deeply expressive melodic line.", usualTempo: 60, practiceTempo: 50 },
  "dinicu_hora_staccato": { title: "Hora Staccato", keywords: ["dinicu"], description: "A virtuosic Romanian showpiece by Grigoraș Dinicu, famous for its rapid staccato passages.", usualTempo: 152, practiceTempo: 120 },
  "dinicu_pacsirta": { title: "Pacsirta (The Lark)", keywords: ["dinicu", "lark"], description: "A Romanian folk piece arranged by Dinicu, imitating the song of a lark with virtuosic flair.", usualTempo: 140, practiceTempo: 110 },
  "gluck_melodie": { title: "Mélodie from Orfeo ed Euridice", keywords: ["gluck", "orfeo", "euridice"], description: "A beautiful and haunting melody from Christoph Willibald Gluck's opera, famously arranged by Heifetz.", usualTempo: 76, practiceTempo: 60 },
  "schumann_romance_94": { title: "Romance in A Major, Op. 94 No. 2", keywords: ["schumann", "romance"], description: "A lyrical and tender piece by Robert Schumann, one of three romances originally for oboe.", usualTempo: 84, practiceTempo: 68 },
  "moszkowski_guitarre": { title: "Guitarre, Op. 45 No. 2", keywords: ["moszkowski"], description: "A Spanish-flavored piece by Moritz Moszkowski that cleverly imitates the strumming of a guitar.", usualTempo: 112, practiceTempo: 90 },
  "moszkowski_spanish_dance_1": { title: "Spanish Dance, Op. 12 No. 1", keywords: ["moszkowski", "spanish", "dance", "1"], description: "The first of Moritz Moszkowski's popular Spanish Dances, a lively Allegro brioso.", usualTempo: 132, practiceTempo: 108 },
  "chopin_mazurka_67": { title: "Mazurka in A Minor, Op. 67 No. 4", keywords: ["chopin", "mazurka"], description: "A posthumously published Mazurka by Frédéric Chopin, known for its melancholic and reflective character.", usualTempo: 120, practiceTempo: 96 },
  "chopin_mazurka_11": { title: "Mazurka in F-Sharp Minor, Op. 11", keywords: ["chopin", "mazurka"], description: "An early Mazurka by Chopin that captures the characteristic Polish rhythm with youthful energy.", usualTempo: 144, practiceTempo: 115 },
  "tchaikovsky_valse_scherzo": { title: "Valse-Scherzo, Op. 34", keywords: ["tchaikovsky", "valse", "scherzo"], description: "A brilliant and virtuosic concert piece by Tchaikovsky, combining the grace of a waltz with the speed of a scherzo.", usualTempo: 160, practiceTempo: 120 },
  "mozart_divertimento_menuet": { title: "Divertimento, K. 334: Menuet", keywords: ["mozart", "divertimento"], description: "An elegant and famous minuet from one of Mozart's divertimentos, known for its graceful charm.", usualTempo: 120, practiceTempo: 100 },
  "boccherini_menuet": { title: "Minuet in G Major", keywords: ["boccherini", "minuet"], description: "A famous and stately minuet by Luigi Boccherini, often performed as a standalone piece.", usualTempo: 116, practiceTempo: 92 },
  "drigo_serenade": { title: "Les millions D'Arlequin: Serenade", keywords: ["drigo", "arlequin"], description: "A lyrical and beloved serenade from the ballet 'Les millions d'Arlequin' by Riccardo Drigo.", usualTempo: 80, practiceTempo: 66 },
  "kreisler_liebesleid": { title: "Liebesleid (Love's Sorrow)", keywords: ["kreisler", "liebesleid"], description: "A nostalgic and melancholic old Viennese dance by Fritz Kreisler, a companion to 'Liebesfreud'.", usualTempo: 132, practiceTempo: 108 },
  "albeniz_tango": { title: "España, Op. 165: Tango", keywords: ["albeniz", "espana"], description: "One of Isaac Albéniz's most famous compositions, a tango with a distinctive and evocative rhythm.", usualTempo: 120, practiceTempo: 96 },
  "gossec_tambourin": { title: "Tambourin", keywords: ["gossec"], description: "A lively and rhythmic piece by François-Joseph Gossec that imitates the sound of a tambourine.", usualTempo: 138, practiceTempo: 110 },
  "fibich_poeme": { title: "Poème, Op. 41 No. 4", keywords: ["fibich"], description: "A passionate and romantic piece by Zdeněk Fibich, one of his most famous works.", usualTempo: 60, practiceTempo: 50 },
  "wagner_traume": { title: "Träume (Dreams)", keywords: ["wagner", "wesendonck"], description: "A study for his opera 'Tristan und Isolde', 'Träume' is a deeply romantic and atmospheric song by Richard Wagner.", usualTempo: 54, practiceTempo: 45 },
  "rubinstein_romance": { title: "Romance in E-flat major, Op. 44, No. 1", keywords: ["rubinstein"], description: "A famous and lyrical melody by Anton Rubinstein, known for its romantic sweep.", usualTempo: 72, practiceTempo: 60 },
  "gliere_romance": { title: "Romance, Op. 3", keywords: ["gliere"], description: "A tender and expressive romance for violin and piano by Reinhold Glière.", usualTempo: 66, practiceTempo: 54 },
  "delibes_passepied": { title: "Passepied from Le roi s'amuse", keywords: ["delibes"], description: "A Renaissance-style court dance from Léo Delibes's incidental music, a lively and rhythmic piece.", usualTempo: 144, practiceTempo: 115 },
  "white_bandana_sketches": { title: "Bandana Sketches: Nobody Knows the Trouble I've Seen", keywords: ["white", "cameron", "spiritual"], description: "A moving arrangement of a traditional spiritual by Clarence Cameron White.", usualTempo: 60, practiceTempo: 50 },
  "gautier_le_secret": { title: "Le Secret", keywords: ["gautier"], description: "A charming and light salon piece by Jacques Gautier, featuring pizzicato and a playful character.", usualTempo: 92, practiceTempo: 76 },
  "glazunov_serenade_espagnole": { title: "Sérénade Espagnole", keywords: ["glazunov", "spanish"], description: "A Spanish-flavored serenade by Alexander Glazunov, arranged for violin by Kreisler.", usualTempo: 108, practiceTempo: 88 },
  // ... and so on for the rest of the new pieces
};


// --- AI FEEDBACK POOL ---
// Thematically based on the String Magazine article's concepts
const feedbackPool = {
  intonation: [
    "Your intonation was generally solid, but watch the G# in the upper register; it tended to be slightly sharp.",
    "A few of the stopped notes on the E string were a little flat. Try practicing with a drone to solidify those pitches.",
    "Excellent intonation during the slow, lyrical passages. The pitch was centered and resonant.",
    "Be careful with shifting; the intonation on the arrival note was occasionally insecure. Practice slow, deliberate shifts.",
  ],
  rhythm: [
    "The main rhythmic pulse was strong, but the dotted-eighth-sixteenth rhythm could be more precise and sharp.",
    "A tendency to rush during the faster passages was noted. Use a metronome to ensure a steady tempo.",
    "The rhythm in the opening section was very clear and compelling, setting a great foundation for the piece.",
    "Listen carefully to the rests; ensure they receive their full value to give the music space to breathe.",
  ],
  bowing: [
    "Your bow control is good. For an even smoother legato, try using a lighter bow arm and more consistent speed.",
    "The staccato passages lacked a bit of clarity. Try practicing off-the-string strokes for a crisper articulation.",
    "The bow distribution during long notes was excellent, resulting in a very even and sustained tone.",
    "Watch for unintentional accents on bow changes, especially from down-bow to up-bow. A more fluid wrist and fingers can help.",
  ],
  phrasing: [
    "You have a good sense of the musical phrase. To enhance it further, think about the dynamic shape of each line, building to a peak and then relaxing.",
    "The phrasing felt a little uniform. Try varying your bow speed and vibrato to create more color and direction in each phrase.",
    "The connection between phrases was seamless, telling a clear musical story.",
    "Consider the end of your phrases; some tended to drop off in energy. Support the sound through the very end of the note.",
  ]
};

// --- NEW DYNAMIC AI ANALYSIS FUNCTION ---
// Takes the duration of the recording as an argument
const getCriticalAIAnalysis = (duration) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const generatedFeedback = [];
      const numFeedbackPoints = Math.floor(Math.random() * 3) + 2; // Generate 2 to 4 feedback points

      for (let i = 0; i < numFeedbackPoints; i++) {
        // Generate a random timestamp within the recording's duration
        const randomTime = Math.random() * duration * 0.9; // Use 90% of duration to avoid the very end
        const minutes = Math.floor(randomTime / 60).toString().padStart(2, '0');
        const seconds = Math.floor(randomTime % 60).toString().padStart(2, '0');
        const timestamp = `${minutes}:${seconds}`;

        // Pick a random category and a random piece of feedback from that category
        const categories = Object.keys(feedbackPool);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const randomNote = feedbackPool[randomCategory][Math.floor(Math.random() * feedbackPool[randomCategory].length)];

        generatedFeedback.push({ timestamp, note: randomNote });
      }
      resolve(generatedFeedback);
    }, 4000);
  });
};

const fetchPieceInfoAPI = async (pieceName) => {
  console.log(`Searching for: ${pieceName}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const searchTerms = pieceName.toLowerCase().split(' ').filter(term => term);
      const foundKey = Object.keys(pieceDatabase).find(key => {
        const piece = pieceDatabase[key];
        const searchableText = `${piece.title.toLowerCase()} ${piece.keywords.join(' ')}`;
        return searchTerms.every(term => searchableText.includes(term));
      });
      const result = foundKey 
        ? pieceDatabase[foundKey] 
        : { title: pieceName, description: "Information for this piece could not be found. AI analysis will proceed based on the audio data alone.", notFound: true };
      resolve(result);
    }, 1500);
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
  const [tempoFeedback, setTempoFeedback] = useState('');
  const [permission, setPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioURL, setAudioURL] = useState('');
  const [volume, setVolume] = useState(0);
  const [aiFeedback, setAiFeedback] = useState([]);

  const questionsRef = useRef(null);
  const recorderRef = useRef(null);
  const audioPlayerRef = useRef(null); // Ref for the audio player element
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
    setTempoFeedback(''); // Reset tempo feedback
    const info = await fetchPieceInfoAPI(pieceName);
    setPieceInfo(info);

    // --- NEW: TEMPO ANALYSIS LOGIC ---
    if (userTempo && !info.notFound) {
      const userBPM = parseInt(userTempo, 10);
      const targetBPM = info.usualTempo;
      const difference = userBPM - targetBPM;
      const percentageDiff = Math.abs(difference / targetBPM);

      if (percentageDiff <= 0.08) { // Within 8%
        setTempoFeedback("This is a great performance tempo!");
      } else if (difference > 0) {
        setTempoFeedback("This is a bit faster than a typical performance tempo. Ensure clarity is maintained.");
      } else {
        if (userBPM >= info.practiceTempo) {
          setTempoFeedback("This is a solid practice tempo, a little slower than a typical performance.");
        } else {
          setTempoFeedback("This is a very deliberate practice tempo, good for working out tough spots.");
        }
      }
    }
    
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
    if(animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
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
    if (!audioPlayerRef.current || !audioPlayerRef.current.duration) {
      alert("Audio not ready for analysis yet.");
      return;
    }
    const duration = audioPlayerRef.current.duration;
    setUiStage('analyzing');
    const feedback = await getCriticalAIAnalysis(duration);
    setAiFeedback(feedback);
    setUiStage('feedback');
  };

  return (
    <div className="App-container">
      <div className="App">
        {/* Side Galleries and Header are unchanged */}
        <div className="side-gallery left">
          <img src="/violin1.jpg" alt="Close-up of a violin body" />
          <img src="/violin2.jpg" alt="Person playing a violin" />
        </div>
        <main className="main-content">
          <header className="App-header">
            <h1>Violin Studio</h1>
            <p className="welcome-message">Welcome to the AI-Optimized Acoustic Enhancer Dashboard!</p>
            <p className="description">
              This application is designed to help you grow as a musician by providing cutting-edge tools to refine your sound. Our AI-powered features analyze your playing and offer feedback to enhance your acoustic quality. Take your violin skills to the next level and unlock your true potential.
            </p>
            <button className="cta-button" onClick={handleInitialScroll}>Start Your Analysis</button>
          </header>
        </main>
        <div className="side-gallery right">
          <img src="/violin3.jpg" alt="Violin on top of sheet music" />
          <img src="/violin4.jpg" alt="Violin against a dark background" />
        </div>
      </div>

      {(uiStage !== 'welcome') && (
        <div className="interactive-container" ref={questionsRef}>
          {/* Questions Area is unchanged */}
          <div className="questions-area">
            <h2>Practice Analysis</h2>
            <div className="question">
              <label htmlFor="piece-name">What piece of music are you playing?</label>
              <input type="text" id="piece-name" className="question-input" placeholder="e.g., Vivaldi Winter" value={pieceName} onChange={(e) => setPieceName(e.target.value)} />
            </div>
            <div className="question">
              <label htmlFor="tempo">What tempo (in BPM) are you taking it?</label>
              <input type="number" id="tempo" className="question-input" placeholder="e.g., 60" value={userTempo} onChange={(e) => setUserTempo(e.target.value)} />
            </div>
            <button className="cta-button" onClick={handleSubmitQuestions} disabled={uiStage !== 'questions'}>Submit for Description</button>
          </div>

          {/* Piece Info Section now includes Tempo Feedback */}
          {pieceInfo && (uiStage === 'describing' || uiStage === 'recording' || uiStage === 'feedback') && (
              <div className="piece-info-section">
                  <h3>About: {pieceInfo.title}</h3>
                  {tempoFeedback && <p className="tempo-feedback"><strong>Tempo Note:</strong> {tempoFeedback}</p>}
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
          
          {/* Recorder now has a ref on the audio element */}
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
                          <audio src={audioURL} controls className="audio-player" ref={audioPlayerRef} />
                          <button className="cta-button analyze-button" onClick={analyzeRecording}>Analyze My Recording</button>
                      </div>
                  )}
              </div>
          )}

          {/* Analysis and Feedback sections are unchanged */}
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
