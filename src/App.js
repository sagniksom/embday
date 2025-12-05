
import React, { useState, useEffect, useRef } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Volume2, VolumeX } from 'lucide-react';

const PokemonBirthdayChallenge = () => {
  const [stage, setStage] = useState('welcome');
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [riddles, setRiddles] = useState([]);
  const [score, setScore] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // start muted for autoplay
  const [showHint, setShowHint] = useState(false);
  const [hintCount, setHintCount] = useState(0);
  const audioRef = useRef(null);

  const pokemonDatabase = [
    {
      name: 'pikachu',
      riddles: [
        'SPECIES: Electric rodent',
        'TRAIT: Vocal identification protocol',
        'STATUS: Global recognition'
      ],
      hint: 'The mascot of the entire Pokémon series.',
      difficulty: 1
    },
    {
      name: 'charmander',
      riddles: [
        'SIGNATURE: Flame appendage detected',
        'EVOLUTION: Draconic potential',
        'ELEMENT: Pyrokinetic'
      ],
      hint: 'A small orange lizard with a burning tail.',
      difficulty: 1
    },
    {
      name: 'squirtle',
      riddles: [
        'EQUIPMENT: Tactical eyewear unit',
        'ABILITY: Hydro warfare',
        'DEFENSE: Dorsal armor plating'
      ],
      hint: 'A tiny blue turtle that shoots water.',
      difficulty: 1
    },
    {
      name: 'bulbasaur',
      riddles: [
        'ANOMALY: Botanical symbiosis',
        'DESIGNATION: Subject 001',
        'CLASSIFICATION: Flora/Toxin hybrid'
      ],
      hint: 'A dinosaur-like creature with a plant on its back.',
      difficulty: 1
    },
    {
      name: 'jigglypuff',
      riddles: [
        'WEAPON: Soporific frequency',
        'REACTION: Hostile when ineffective',
        'TOOL: Marking instrument'
      ],
      hint: 'A round pink singer that puts people to sleep.',
      difficulty: 1
    },
    {
      name: 'meowth',
      riddles: [
        'OBSESSION: Currency acquisition',
        'AFFILIATION: Criminal syndicate',
        'CATCHPHRASE: Affirmative declaration'
      ],
      hint: 'A coin-loving cat from Team Rocket.',
      difficulty: 2
    },
    {
      name: 'psyduck',
      riddles: [
        'CONDITION: Cranial pressure unlocks power',
        'STATE: Permanent disorientation',
        'PARADOX: Aquatic psychic confusion'
      ],
      hint: 'A yellow duck constantly holding its head in confusion.',
      difficulty: 2
    },
    {
      name: 'snorlax',
      riddles: [
        'ACTIVATION: Musical instrument required',
        'THREAT: Mobile obstruction',
        'FILE NUMBER: 143'
      ],
      hint: 'A giant sleeper that blocks roads.',
      difficulty: 2
    },
    {
      name: 'eevee',
      riddles: [
        'CAPABILITY: Polymorphic genetics',
        'TRIGGER: Elemental catalysts',
        'POTENTIAL: Eight documented variants'
      ],
      hint: 'A small fox Pokémon with many possible evolutions.',
      difficulty: 2
    },
    {
      name: 'ditto',
      riddles: [
        'IDENTITY: Variable',
        'TECHNIQUE: Morphological duplication',
        'APPEARANCE: Amorphous pink mass'
      ],
      hint: 'A pink blob that copies any Pokémon it sees.',
      difficulty: 2
    },
    {
      name: 'magikarp',
      riddles: [
        'REPUTATION: Underestimated threat',
        'LIMITATION: Ineffective kinetic output',
        'TRANSFORMATION: Serpentine ascension'
      ],
      hint: 'A useless flopping fish that becomes powerful when it evolves.',
      difficulty: 2
    },
    {
      name: 'gengar',
      riddles: [
        'LOCATION: Umbral attachment',
        'TYPE: Spectral/Toxic combination',
        'EXPRESSION: Malevolent amusement'
      ],
      hint: 'A mischievous ghost Pokémon with a creepy smile.',
      difficulty: 2
    },
    {
      name: 'alakazam',
      riddles: [
        'INTELLIGENCE: 5000+ cognitive units',
        'EQUIPMENT: Dual reality benders',
        'STATUS: Final cerebral evolution'
      ],
      hint: 'A psychic Pokémon that always holds spoons.',
      difficulty: 3
    },
    {
      name: 'dragonite',
      riddles: [
        'VELOCITY: Circumnavigation 16hr protocol',
        'DEVELOPMENT: Minimal to apex predator',
        'HANDLER: Elite Four operative'
      ],
      hint: 'A large friendly orange dragon.',
      difficulty: 3
    },
    {
      name: 'mewtwo',
      riddles: [
        'ORIGIN: Laboratory genesis',
        'POWER LEVEL: Unmatched specimen',
        'METHOD: Synthesized, never captured'
      ],
      hint: 'A powerful clone created from Mew.',
      difficulty: 3
    },
    {
      name: 'gyarados',
      riddles: [
        'CATALYST: Fury-induced metamorphosis',
        'LOCATION: Rage reservoir',
        'IDENTIFIER: Twenty crimson plates'
      ],
      hint: 'A huge sea serpent formed from a weak little fish.',
      difficulty: 3
    },
    {
      name: 'articuno',
      riddles: [
        'DOMAIN: Arctic atmospheric control',
        'CLASSIFICATION: Legendary avian - ice',
        'TRINITY: Sacred triumvirate member'
      ],
      hint: 'A legendary blue bird that controls ice.',
      difficulty: 3
    },
    {
      name: 'zapdos',
      riddles: [
        'PHENOMENON: Electrical storm manifestation',
        'TERRITORY: Energy facility',
        'TYPE: Legendary voltage'
      ],
      hint: 'A legendary yellow bird surrounded by lightning.',
      difficulty: 3
    },
    {
      name: 'moltres',
      riddles: [
        'SIGNATURE: Perpetual combustion',
        'COORDINATES: Championship route',
        'SPECIES: Mythical inferno bird'
      ],
      hint: 'A fiery legendary bird with blazing wings.',
      difficulty: 3
    },
    {
      name: 'lapras',
      riddles: [
        'COMMUNICATION: Oceanic vocalizations',
        'SCHEDULE: Weekly Friday appearance',
        'COMBINATION: Carapace and melody'
      ],
      hint: 'A gentle sea creature that ferries people across water.',
      difficulty: 3
    },
    {
      name: 'aerodactyl',
      riddles: [
        'RECOVERY: Fossilized amber extraction',
        'ERA: Prehistoric terror unit',
        'HYBRID: Mineral and aerial'
      ],
      hint: 'A resurrected prehistoric flying reptile.',
      difficulty: 3
    },
    {
      name: 'machamp',
      riddles: [
        'AUGMENTATION: Quadruple limbs',
        'OUTPUT: 1000 strikes per second',
        'FORM: Maximum combat evolution'
      ],
      hint: 'A four-armed martial arts Pokémon.',
      difficulty: 3
    },
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

  // Try autoplay muted
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const fadeInAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => {});
    audio.muted = false;
    audio.volume = 0;
    setIsMuted(false);
    let vol = 0;
    const interval = setInterval(() => {
      vol += 0.05;
      if (vol >= 1) {
        vol = 1;
        clearInterval(interval);
      }
      audio.volume = vol;
    }, 100);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const newMuted = !audio.muted;
    audio.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted && audio.paused) {
      audio.play().catch(() => {});
    }
  };

  const handleHint = () => {
    if (!showHint) {
      setShowHint(true);
      setHintCount(hintCount + 1);
    }
  };

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
          setShowHint(false);
        } else {
          setStage('finale');
        }
      }, 1500);
    } else {
      setMessage('INCORRECT. RETRY.');
    }
  };

  const WelcomePage = () => (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top, rgba(255,0,128,0.25), transparent 60%), radial-gradient(circle at bottom, rgba(140,0,255,0.45), #050014 70%)",
        backgroundImage:
          "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.8))",
      }}
    >
      {/* Neon city skyline silhouette */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to top, #050010 0%, #050010 40%, transparent 100%), repeating-linear-gradient(to right, rgba(255,105,180,0.7), rgba(255,105,180,0.7) 3px, transparent 3px, transparent 8px)",
          mixBlendMode: "screen",
        }}
      />
      {/* Neon fog / light glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,0,200,0.22), transparent 55%), radial-gradient(circle at 80% 80%, rgba(0,200,255,0.2), transparent 55%)",
        }}
      />
      {/* Light neon rain */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.12) 2px, transparent 2px)",
          backgroundSize: "2px 18px",
          opacity: 0.12,
          mixBlendMode: "screen",
          animation: "neonRain 12s linear infinite",
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
          onClick={() => {
            setStage('game');
            fadeInAudio();
          }}
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

    const threatLevel =
      currentPokemon.difficulty === 1 ? 'LOW' :
      currentPokemon.difficulty === 2 ? 'MEDIUM' : 'HIGH';

    const threatColor =
      currentPokemon.difficulty === 1 ? 'text-green-500' :
      currentPokemon.difficulty === 2 ? 'text-yellow-500' : 'text-red-500';

    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{
          backgroundColor: "#050014",
          backgroundImage:
            "radial-gradient(circle at top, rgba(255,0,150,0.25), transparent 55%), radial-gradient(circle at bottom, rgba(90,0,255,0.5), #02000a 70%)",
        }}
      >
        {/* Animated neon grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(0deg, rgba(255,0,200,0.16) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,200,0.16) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            opacity: 0.35,
            animation: "gridShift 10s linear infinite",
          }}
        />
        {/* Heavier neon rain */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(255,255,255,0.14) 2px, transparent 2px)",
            backgroundSize: "2px 16px",
            opacity: 0.18,
            mixBlendMode: "screen",
            animation: "neonRain 8s linear infinite",
          }}
        />

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
              <h2 className="text-xl font-bold text-green-500">
                CLASSIFIED INTEL - TARGET #{currentRiddle + 1}
              </h2>
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

          {/* Hint system - just above input */}
          <div className="mb-4">
            <button
              onClick={handleHint}
              className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded font-mono border border-purple-400 transition"
            >
              [ REQUEST ADDITIONAL INTEL ]
            </button>
            {showHint && (
              <div className="text-yellow-300 font-mono text-sm mt-2 p-3 border border-yellow-500 rounded bg-black/40">
                <span className="text-yellow-500">▸ HINT:</span> {currentPokemon.hint}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
                placeholder="ENTER SPECIMEN NAME..."
                className="w-full px-4 py-3 bg-black border-2 border-green-500 text-green-500 rounded font-mono focus:outline-none focus:border-green-300 placeholder-green-700"
              />
            </div>

            {message && (
              <div
                className={`flex items-center justify-center gap-2 font-mono font-bold ${
                  message.includes('GRANTED') ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {message.includes('GRANTED') ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
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
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top, rgba(255,0,180,0.35), transparent 60%), radial-gradient(circle at bottom, rgba(150,0,255,0.9), #060015 70%)",
      }}
    >
      {/* Neon city glow layer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(255,0,200,0.25), transparent 55%), radial-gradient(circle at 85% 80%, rgba(0,200,255,0.23), transparent 55%)",
        }}
      />
      {/* Neon rain */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.18) 2px, transparent 2px)",
          backgroundSize: "2px 14px",
          opacity: 0.25,
          mixBlendMode: "screen",
          animation: "neonRain 7s linear infinite",
        }}
      />

      {/* Shinx GIFs around */}
      <div className="absolute inset-0 opacity-45">
        {[
          { className: "absolute top-10 left-10" },
          { className: "absolute top-10 right-10" },
          { className: "absolute bottom-10 left-10" },
          { className: "absolute bottom-10 right-10" },
          { className: "absolute top-1/2 left-6 -translate-y-1/2" },
          { className: "absolute top-1/2 right-6 -translate-y-1/2" },
        ].map((pos, idx) => (
          <img
            key={idx}
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/403.gif"
            className={pos.className + " w-32 h-32"}
            alt=""
            style={{ filter: "drop-shadow(0 0 18px rgba(255,0,200,0.9))" }}
          />
        ))}
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
          <p className="text-purple-300 text-sm mt-3">
            HINTS CONSULTED: {hintCount}
          </p>
        </div>

        <p className="text-green-500 font-mono text-lg mb-6">
          AGENT EMILY - ELITE STATUS ACHIEVED
        </p>

        <div className="flex justify-center gap-4 mt-8">
          {[0, 1, 2, 3, 4].map(idx => (
            <img
              key={idx}
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/403.gif"
              alt=""
              className="w-20 h-20"
              style={{ filter: "drop-shadow(0 0 16px rgba(255,0,200,0.9))" }}
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
      {/* Background music with autoplay muted */}
      <audio ref={audioRef} autoPlay loop muted playsInline>
        <source src="/background.mp3" type="audio/mpeg" />
      </audio>

      {/* Mute / Unmute button */}
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
