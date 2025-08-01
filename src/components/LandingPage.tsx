import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Play, User, Sparkles, Rocket, Crown, UserCog } from "lucide-react";
import { useTranslation } from "@/lib/translations";

interface LandingPageProps {
  onStartJourney: (name: string, character?: string) => void;
}

export const LandingPage = ({ onStartJourney }: LandingPageProps) => {
  const [playerName, setPlayerName] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [focusedCharacterIndex, setFocusedCharacterIndex] = useState(0);
  const { t } = useTranslation();
  const characterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If input is focused, handle name input separately
      if (document.activeElement === nameInputRef.current) {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (selectedCharacter) {
            handleStart();
          } else if (characterRefs.current[focusedCharacterIndex]) {
            characterRefs.current[focusedCharacterIndex]?.focus();
          }
        }
        return;
      }

      // If start button is focused
      if (document.activeElement === startButtonRef.current) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (selectedCharacter) {
            handleStart();
          }
        }
        return;
      }

      // Character selection navigation
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setFocusedCharacterIndex(prev => {
            const newIndex = prev > 0 ? prev - 1 : characters.length - 1;
            characterRefs.current[newIndex]?.focus();
            return newIndex;
          });
          break;
        
        case 'ArrowRight':
          e.preventDefault();
          setFocusedCharacterIndex(prev => {
            const newIndex = prev < characters.length - 1 ? prev + 1 : 0;
            characterRefs.current[newIndex]?.focus();
            return newIndex;
          });
          break;
        
        case 'ArrowUp':
          e.preventDefault();
          setFocusedCharacterIndex(prev => {
            const newIndex = prev - 2 >= 0 ? prev - 2 : prev;
            characterRefs.current[newIndex]?.focus();
            return newIndex;
          });
          break;
        
        case 'ArrowDown':
          e.preventDefault();
          setFocusedCharacterIndex(prev => {
            const newIndex = prev + 2 < characters.length ? prev + 2 : prev;
            characterRefs.current[newIndex]?.focus();
            return newIndex;
          });
          break;
        
        case 'Enter':
        case ' ':
          e.preventDefault();
          const character = characters[focusedCharacterIndex];
          if (character) {
            handleCharacterSelect(character.id);
          }
          break;
        
        case 'Tab':
          if (!e.shiftKey) {
            // Tab forward: characters -> name input -> start button
            if (document.activeElement && characterRefs.current.includes(document.activeElement as HTMLDivElement)) {
              e.preventDefault();
              nameInputRef.current?.focus();
            }
          } else {
            // Shift+Tab backward: start button -> name input -> characters
            if (document.activeElement === nameInputRef.current) {
              e.preventDefault();
              characterRefs.current[focusedCharacterIndex]?.focus();
            }
          }
          break;
        
        case '1':
        case '2':
        case '3':
        case '4':
          e.preventDefault();
          const index = parseInt(e.key) - 1;
          if (index < characters.length) {
            setFocusedCharacterIndex(index);
            handleCharacterSelect(characters[index].id);
            characterRefs.current[index]?.focus();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedCharacterIndex, selectedCharacter]);

  // Auto-focus first character on mount
  useEffect(() => {
    characterRefs.current[0]?.focus();
  }, []);

  const characters = [
    { 
      id: 'wizard', 
      emoji: '🧙‍♀️', 
      name: t.wordWizard,
      bgGradient: 'from-blue-600 to-indigo-700',
      borderColor: 'border-blue-400',
      hoverBorderColor: 'hover:border-blue-300',
      selectedBorderColor: 'border-blue-400',
      selectedBgGradient: 'from-blue-100 to-indigo-100',
      selectedShadow: 'shadow-blue-400/50',
      textColor: 'text-blue-700',
      selectedTextColor: 'text-blue-800'
    },
    { 
      id: 'astronaut', 
      emoji: '🚀', 
      name: t.spaceReader,
      bgGradient: 'from-slate-600 to-violet-700',
      borderColor: 'border-slate-400',
      hoverBorderColor: 'hover:border-violet-400',
      selectedBorderColor: 'border-violet-400',
      selectedBgGradient: 'from-slate-100 to-violet-100',
      selectedShadow: 'shadow-violet-400/50',
      textColor: 'text-slate-700',
      selectedTextColor: 'text-violet-800'
    },
    { 
      id: 'hero', 
      emoji: '🦸‍♂️', 
      name: t.bookHero,
      bgGradient: 'from-orange-500 to-red-600',
      borderColor: 'border-orange-400',
      hoverBorderColor: 'hover:border-red-400',
      selectedBorderColor: 'border-red-400',
      selectedBgGradient: 'from-orange-100 to-red-100',
      selectedShadow: 'shadow-red-400/50',
      textColor: 'text-orange-700',
      selectedTextColor: 'text-red-800'
    },
    { 
      id: 'princess', 
      emoji: '👸', 
      name: t.storyPrincess,
      bgGradient: 'from-green-500 to-emerald-600',
      borderColor: 'border-green-400',
      hoverBorderColor: 'hover:border-emerald-400',
      selectedBorderColor: 'border-emerald-400',
      selectedBgGradient: 'from-green-100 to-emerald-100',
      selectedShadow: 'shadow-emerald-400/50',
      textColor: 'text-green-700',
      selectedTextColor: 'text-emerald-800'
    }
  ];

  const handleStart = () => {
    const finalName = playerName.trim() || "Hero";
    if (selectedCharacter) {
      onStartJourney(finalName, selectedCharacter);
    }
  };

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacter(characterId);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 p-4 relative overflow-hidden">
      {/* Fun floating emojis background */}
      <div className="absolute inset-0 pointer-events-none">
        {['🌟', '✨', '📚', '🎯', '🏆', '🎉', '💫', '🌈'].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-3xl opacity-20 animate-float"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Custom CSS animations */}
      <style>{`
        @keyframes animate-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: animate-float 4s ease-in-out infinite;
        }
        @keyframes slow-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-slow-bounce {
          animation: slow-bounce 2s ease-in-out infinite;
        }
        @keyframes slow-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-slow-pulse {
          animation: slow-pulse 2.5s ease-in-out infinite;
        }
        @keyframes rainbow-flow {
          0% { border-color: #ff0000; }
          16.66% { border-color: #ff8000; }
          33.33% { border-color: #ffff00; }
          50% { border-color: #00ff00; }
          66.66% { border-color: #0080ff; }
          83.33% { border-color: #8000ff; }
          100% { border-color: #ff0000; }
        }
        .rainbow-border {
          animation: rainbow-flow 2s linear infinite;
        }
        @keyframes enhanced-shadow {
          0%, 100% { 
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
          }
          50% { 
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.3);
          }
        }
        .shadow-effect {
          animation: enhanced-shadow 2s ease-in-out infinite;
        }
      `}</style>

      <Card className="w-full max-w-2xl p-6 md:p-10 shadow-2xl bg-white/95 backdrop-blur-sm border-4 border-yellow-300 rounded-3xl transform hover:scale-105 transition-all duration-300">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">{t.wordQuest}</h1>
          <p className="text-lg text-purple-700 mt-2 font-semibold">{t.chooseHero}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {characters.map((character, index) => (
            <Card
              key={character.id}
              ref={el => characterRefs.current[index] = el}
              onClick={() => handleCharacterSelect(character.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCharacterSelect(character.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Select ${character.name} character (Press 1-4 or use arrow keys)`}
              aria-pressed={selectedCharacter === character.id}
              className={`p-4 cursor-pointer transition-all duration-300 border-4 rounded-2xl transform hover:scale-110 hover:rotate-3 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-75 ${
                selectedCharacter === character.id
                  ? `${character.selectedBorderColor} bg-gradient-to-br ${character.bgGradient} shadow-effect animate-slow-pulse`
                  : `${character.borderColor} ${character.hoverBorderColor} bg-gradient-to-br ${character.bgGradient} hover:shadow-lg hover:shadow-lg`
              }`}
              style={{
                filter: selectedCharacter === character.id ? 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))' : 'none'
              }}
            >
              <div className={`text-6xl text-center transition-transform duration-300 ${
                selectedCharacter === character.id ? 'animate-slow-bounce' : 'hover:animate-spin'
              }`}>{character.emoji}</div>
              <p className={`text-center font-bold mt-2 transition-colors duration-300 ${
                selectedCharacter === character.id 
                  ? 'text-white animate-slow-pulse' 
                  : 'text-white'
              }`}>{character.name}</p>
              <div className={`text-center text-white/80 text-sm mt-1 h-5 flex items-center justify-center ${
                index === 2 ? 'pt-8' : ''
              }`}>
                Press {index + 1}
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="w-full max-w-sm relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 animate-pulse" />
            <Input
              ref={nameInputRef}
              type="text"
              placeholder={t.enterHeroName}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (selectedCharacter) {
                    handleStart();
                  }
                }
              }}
              className="w-full text-lg pl-10 pr-4 py-6 border-4 border-purple-300 rounded-2xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200 bg-gradient-to-r from-purple-50 to-pink-50 font-semibold text-purple-700 placeholder-purple-400 transition-all duration-300 transform focus:scale-105"
              aria-label="Enter your name (optional)"
            />
          </div>

          <Button
            ref={startButtonRef}
            onClick={handleStart}
            disabled={!selectedCharacter}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && selectedCharacter) {
                e.preventDefault();
                handleStart();
              }
            }}
            className={`w-full max-w-sm text-2xl py-8 rounded-2xl font-bold flex items-center justify-center transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-75 ${
              !selectedCharacter 
                ? "bg-gray-400 text-gray-600 cursor-not-allowed" 
                : "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 hover:from-green-500 hover:via-emerald-600 hover:to-teal-600 text-white hover:scale-110 hover:rotate-1 shadow-lg hover:shadow-xl shadow-emerald-400/50 border-4 border-yellow-300"
            }`}
            aria-label={selectedCharacter ? "Start your adventure" : "Please select a character first"}
          >
            <Play className="w-8 h-8 mr-3" />
            {t.start}
          </Button>
          
          {/* Keyboard instructions */}
          <div className="text-center text-purple-600 text-sm bg-white/80 rounded-lg p-3 border border-purple-200">
            <p className="font-semibold mb-1">⌨️ Keyboard Controls:</p>
            <p>Arrow keys: Navigate characters | 1-4: Quick select | Tab: Next field | Enter: Confirm</p>
          </div>
        </div>
      </Card>
    </div>
  );
};