import React, { useState, useEffect, useRef } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Volume2, VolumeX } from 'lucide-react';

const PokemonBirthdayChallenge = () => {
  const [stage, setStage] = useState('welcome');
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [riddles, setRiddles] = useState([]);
  const [score, setScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);   // <-- ADDED
  const audioRef = useRef(null);

  const toggleMute = () => {                      // <-- ADDED
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const pokemonDatabase = [
    { name: 'pikachu', riddles: ['SPECIES: Electric rodent', 'TRAIT: Vocal identification protocol', 'STATUS: Global recognition'], difficulty: 1 },
    { name: 'charmander', riddles: ['SIGNATURE: Flame appendage detected', 'EVOLUTION: Draconic potential', 'ELEMENT: Pyrokinetic'], difficulty: 1 },
    { name: 'squirtle', riddles: ['EQUIPMENT: Tactical eyewear unit', 'ABILITY: Hydro warfare', 'DEFENSE: Dorsal armor plating'], difficulty: 1 },
    { name: 'bulbasaur', riddles: ['ANOMALY: Botanical symbiosis', 'DESIGNATION: Subject 001', 'CLASSIFICATION: Flora/Toxin hybrid'], difficulty: 1 },
    { name: 'jigglypuff', riddles: ['WEAPON: Soporific frequency', 'REACTION: Hostile when ineffective', 'TOOL: Marking instrument'], difficulty: 1 },
    { name: 'meowth', riddles: ['OBSESSION: Currency acquisition', 'AFFILIATION: Criminal syndicate', 'CATCHPHRASE: Affirmative declaration'], difficulty: 2 },
    { name: 'psyduck', riddles: ['CONDITION: Cranial pressure unlocks power', 'STATE: Permanent disorientation', 'PARADOX: Aquatic psychic confusion'], difficulty: 2 },
    { name: 'snorlax', riddles: ['ACTIVATION: Musical instrument required', 'THREAT: Mobile obstruction', 'FILE NUMBER: 143'], difficulty: 2 },
    { name: 'eevee', riddles: ['CAPABILITY: Polymorphic genetics', 'TRIGGER: Elemental catalysts', 'POTENTIAL: Eight documented variants'], difficulty: 2 },
    { name: 'ditto', riddles: ['IDENTITY: Variable', 'TECHNIQUE: Morphological duplication', 'APPEARANCE: Amorphous pink mass'], difficulty: 2 },
    { name: 'magikarp', riddles: ['REPUTATION: Underestimated threat', 'LIMITATION: Ineffective kinetic output', 'TRANSFORMATION: Serpentine ascension'], difficulty: 2 },
    { name: 'gengar', riddles: ['LOCATION: Umbral attachment', 'TYPE: Spectral/Toxic combination', 'EXPRESSION: Malevolent amusement'], difficulty: 2 },
    { name: 'alakazam', riddles: ['INTELLIGENCE: 5000+ cognitive units', 'EQUIPMENT: Dual reality benders', 'STATUS: Final cerebral evolution'], difficulty: 3 },
    { name: 'dragonite', riddles: ['VELOCITY: Circumnavigation 16hr protocol', 'DEVELOPMENT: Minimal to apex predator', 'HANDLER: Elite Four operative'], difficulty: 3 },
    { name: 'mewtwo', riddles: ['ORIGIN: Laboratory genesis', 'POWER LEVEL: Unmatched specimen', 'METHOD: Synthesized, never captured'], difficulty: 3 },
    { name: 'gyarados', riddles: ['CATALYST: Fury-induced metamorphosis', 'LOCATION: Rage reservoir', 'IDENTIFIER: Twenty crimson plates'], difficulty: 3 },
    { name: 'articuno', riddles: ['DOMAIN: Arctic atmospheric control', 'CLASSIFICATION: Legendary avian - ice', 'TRINITY: Sacred triumvirate member'], difficulty: 3 },
    { name: 'zapdos', riddles: ['PHENOMENON: Electrical storm manifestation', 'TERRITORY: Energy facility', 'TYPE: Legendary voltage'], difficulty: 3 },
    { name: 'moltres', riddles: ['SIGNATURE: Perpetual combustion', 'COORDINATES: Championship route', 'SPECIES: Mythical inferno bird'], difficulty: 3 },
    { name: 'lapras', riddles: ['COMMUNICATION: Oceanic vocalizations', 'SCHEDULE: Weekly Friday appearance', 'COMBINATION: Carapace and melody'], difficulty: 3 },
    { name: 'aerodactyl', riddles: ['RECOVERY: Fossilized amber extraction', 'ERA: Prehistoric terror unit', 'HYBRID: Mineral and aerial'], difficulty: 3 },
    { name: 'machamp', riddles: ['AUGMENTATION: Quadruple limbs', 'OUTPUT: 1000 strikes per second', 'FORM: Maximum combat evolution'], difficulty: 3 },
  ];

  useEffect(() => {
    const easy = pokemonDatabase.filter(p => p.difficulty === 1);
    const medium = pokemonDatabase.filter(p => p.difficulty === 2);
    const hard = pokemonDatabase.filter(p => p.difficulty === 3);

    const selected = [
      easy[Math.floor(Math.random() * easy.length)],
      easy[Math.floor(Math.random() * easy.length)],
      medium[Math.floor(Math.random() * medium.length)],
      medium[Math.floor(Math.random() * medium.length)],
      hard[Math.floor(Math.random() * hard.length)],
    ];

    setRiddles(selected);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio autoplay prevented'));
    }
  }, []);

  const handleGuess = () => {
    const correct = riddles[currentRiddle].name.toLowerCase();
    const guess = userGuess.toLowerCase().trim();

    if (guess === correct) {
      setScore(score + 1);
      setMessage('ACCESS GRANTED');
      setTimeout(() => {
        if (currentRiddle < 4) {
          setCurrentRiddle(currentRiddle + 1);
          setUserGuess('');
          setMessage('');
        } else {
          setStage('finale');
        }
      }, 1500);
    } else {
      setMessage('INCORRECT. RETRY.');
    }
  };

  const WelcomePage = () => (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 gap-4 p-4">
          {[...Array(40)].map((_, i) => (
            <img 
              key={i}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(i % 151) + 1}.png`}
              alt=""
              className="w-16 h-16 grayscale"
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)'
        }} 
      />
      
      <div className="bg-gray-900/95 border-2 border-red-500 backdrop-blur-sm rounded-lg p-12 max-w-2xl text-center shadow-2xl relative z-10">
        <div className="mb-6">
          <Shield className="w-20 h-20 mx-auto text-red-500 animate-pulse" />
        </div>
        
        <div className="text-red-500 font-mono text-sm mb-4">
          [CLASSIFIED - LEVEL 5 CLEARANCE]
        </div>
        
        <h1 className="text-5xl font-bold text-red-500 mb-6 font-mono tracking-wider">
          MISSION BRIEFING
        </h1>
        
        <div className="text-left text-green-400 font-mono space-y-3 mb-8 text-sm">
          <p>AGENT: EMILY</p>
          <p>CLEARANCE: AUTHORIZED</p>
          <p>OBJECTIVE: IDENTIFY 5 CLASSIFIED SPECIMENS</p>
          <p className="text-yellow-400">WARNING: DIFFICULTY INCREASES PER LEVEL</p>
          <p>TIME LIMIT: NONE</p>
          <p>CONSEQUENCES: NONE - THIS IS A BIRTHDAY PROTOCOL</p>
        </div>

        <p className="text-gray-400 font-mono text-sm mb-8">
          This mission, should you choose to accept it, involves the identification
          of five mysterious creatures using classified intelligence reports.
        </p>
        
        <button
          onClick={() => setStage('game')}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded font-mono text-lg font-bold border-2 border-red-400 hover:scale-105 transform transition"
        >
          [ ACCEPT MISSION ]
        </button>
      </div>
    </div>
  );

  const GamePage = () => {
    const currentPokemon = riddles[currentRiddle];
    const inputRef = useRef(null);
    
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [currentRiddle]);
    
    if (!currentPokemon) return null;

    const threatLevel = currentPokemon.difficulty === 1 ? 'LOW' : currentPokemon.difficulty === 2 ? 'MEDIUM' : 'HIGH';
    const threatColor = currentPokemon.difficulty === 1 ? 'text-green-500' : currentPokemon.difficulty === 2 ? 'text-yellow-500' : 'text-red-500';

    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 pointer-events-none" 
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)'
          }} />

        <div className="bg-gray-900/95 border-2 border-green-500 backdrop-blur-sm rounded-lg p-8 max-w-xl w-full shadow-2xl relative">
          <div className="border-b-2 border-green-500 pb-4 mb-6">
            <div className="flex justify-between items-center text-green-500 font-mono text-sm mb-2">
              <span>MISSION PROGRESS: {currentRiddle + 1}/5</span>
              <span className={threatColor}>THREAT: {threatLevel}</span>
            </div>
            <div className="w-full bg-gray-800 rounded h-2">
              <div 
                className="bg-green-500 h-2 rounded transition-all"
                style={{ width: `${((currentRiddle + 1) / 5) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-black border border-green-500 rounded p-6 mb-6 font-mono">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-bold text-green-500">CLASSIFIED INTEL - TARGET #{currentRiddle + 1}</h2>
            </div>
            <div className="text-green-400 space-y-2 text-sm">
              {currentPokemon.riddles.map((riddle, idx) => (
                <p key={idx} className="flex items-start gap-2">
                  <span className="text-green-500">▸</span>
                  <span>{riddle}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                placeholder="ENTER SPECIMEN NAME..."
                className="w-full px-4 py-3 bg-black border-2 border-green-500 text-green-500 rounded font-mono focus:outline-none focus:border-green-300 placeholder-green-700"
              />
            </div>
            
            {message && (
              <div className={`flex items-center justify-center gap-2 font-mono font-bold ${message.includes('GRANTED') ? 'text-green-500' : 'text-red-500'}`}>
                {message.includes('GRANTED') ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                {message}
              </div>
            )}

            <button
              onClick={handleGuess}
              className="w-full bg-green-600 hover:bg-green-700 text-black px-6 py-3 rounded font-mono font-bold border-2 border-green-400 hover:scale-105 transform transition"
            >
              [ SUBMIT IDENTIFICATION ]
            </button>
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-green-500 text-green-500 font-mono text-sm">
            <span>SUCCESSFUL IDs: {score}</span>
            <span>AGENT: EMILY</span>
          </div>
        </div>
      </div>
    );
  };

  const FinalePage = () => (
    <div className="min-h-screen bg:black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events:none"
        style={{
          backgroundImage:'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)'
        }}
      />

      <div className="absolute inset-0 opacity-30">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif" 
             className="absolute top-10 left-10 w-32 h-32" alt="" style={{filter: 'hue-rotate(90deg)'}} />
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif" 
             className="absolute top-10 right-10 w-32 h-32" alt="" style={{filter: 'hue-rotate(90deg)'}} />
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/9.gif" 
             className="absolute bottom-10 left-10 w-32 h-32" alt="" style={{filter: 'hue-rotate(90deg)'}} />
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif" 
             className="absolute bottom-10 right-10 w-32 h-32" alt="" style={{filter: 'hue-rotate(90deg)'}} />
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/150.gif" 
             className="absolute top-1/2 left-10 w-32 h-32" alt="" style={{filter: 'hue-rotate(90deg)'}} />
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/143.gif" 
             className="absolute top-1/2 right-10 w-32 h-32" alt="" style={{filter: 'hue-rotate(90deg)'}} />
      </div>

      <div className="bg-gray-900/95 border-4 border-green-500 backdrop-blur-sm rounded-lg p-12 max-w-3xl text-center shadow-2xl relative z-10">
        <div className="mb-6">
          <CheckCircle className="w-24 h-24 mx-auto text-green-500 animate-pulse" />
        </div>
        
        <div className="text-green-500 font-mono text-sm mb-4">
          [MISSION STATUS: COMPLETE]
        </div>
        
        <h1 className="text-6xl font-bold text-green-500 mb-6 font-mono tracking-wider animate-pulse">
          HAPPY BIRTHDAY<br/>EMILY!!!!
        </h1>
        
        <div className="bg-black border border-green-500 rounded p-6 mb-6 font-mono">
          <p className="text-green-400 text-xl mb-2">
            🎉 MISSION ACCOMPLISHED 🎉
          </p>
          <p className="text-green-500 text-sm mb-4">
            ALL TARGETS SUCCESSFULLY IDENTIFIED
          </p>
          <p className="text-yellow-400 text-2xl font-bold">
            FINAL SCORE: {score}/5
          </p>
        </div>

        <p className="text-green-500 font-mono text-lg mb-6">
          AGENT EMILY - ELITE STATUS ACHIEVED
        </p>

        <div className="flex justify-center gap-4 mt-8">
          {[25, 94, 133, 39, 35].map(num => (
            <img 
              key={num}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${num}.gif`}
              alt=""
              className="w-20 h-20"
              style={{filter: 'hue-rotate(90deg)'}}
            />
          ))}
        </div>

        <p className="text-gray-500 font-mono text-xs mt-8">
          [THIS MESSAGE WILL SELF-DESTRUCT... JUST KIDDING]
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* MUSIC PLAYER */}
      <audio ref={audioRef} loop>
        <source src="/background.mp3" type="audio/mpeg" />
      </audio>

      {/* 🔈 MUTE BUTTON */}
      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 bg-gray-900 border border-green-500 text-green-500 p-3 rounded-full hover:bg-green-700 hover:text-black transition"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {stage === 'welcome' && <WelcomePage />}
      {stage === 'game' && <GamePage />}
      {stage === 'finale' && <FinalePage />}
    </>
  );
};

export default PokemonBirthdayChallenge;
