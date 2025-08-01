import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Heart, ArrowLeft, Settings, Coins, ShoppingBag } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/lib/translations";

interface GameDashboardProps {
  playerData: {
    name: string;
    stars: number;
    hearts: number;
    level: number;
    character: string;
    gold?: number; // Optional for backward compatibility
  };
  onStartLesson: () => void;
  onResetProgress: () => void;
  onOpenSettings: () => void;
  onOpenShop?: () => void; // Optional shop function
}

export const GameDashboard = ({ playerData, onStartLesson, onResetProgress, onOpenSettings, onOpenShop }: GameDashboardProps) => {
  const [settings, setSettings] = useState({ hapticFeedback: false });
  const [focusedButton, setFocusedButton] = useState(0); // 0: start lesson, 1: shop, 2: settings, 3: reset
  const [keyboardEnabled, setKeyboardEnabled] = useState(false); // Add keyboard delay
  const { t } = useTranslation();
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const shopButtonRef = useRef<HTMLButtonElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const resetButtonRef = useRef<HTMLButtonElement>(null);

  const buttonRefs = [startButtonRef, shopButtonRef, settingsButtonRef, resetButtonRef];

  // Gold system - default to 0 if not provided
  const playerGold = playerData.gold || 0;

  // Keyboard navigation with delay to prevent immediate triggering
  useEffect(() => {
    // Enable keyboard events after a short delay to prevent immediate triggering
    const enableKeyboardTimeout = setTimeout(() => {
      setKeyboardEnabled(true);
    }, 500); // 500ms delay

    return () => clearTimeout(enableKeyboardTimeout);
  }, []);

  useEffect(() => {
    if (!keyboardEnabled) return; // Don't handle keyboard events until delay is over

    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("GameDashboard keyboard event:", e.key);
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          setFocusedButton(prev => {
            const availableButtons = onOpenShop ? 4 : 3; // Include shop button if available
            const newIndex = prev > 0 ? prev - 1 : availableButtons - 1;
            buttonRefs[newIndex]?.current?.focus();
            return newIndex;
          });
          break;
        
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          setFocusedButton(prev => {
            const availableButtons = onOpenShop ? 4 : 3; // Include shop button if available
            const newIndex = prev < availableButtons - 1 ? prev + 1 : 0;
            buttonRefs[newIndex]?.current?.focus();
            return newIndex;
          });
          break;
        
        case 'Enter':
        case ' ':
          e.preventDefault();
          switch (focusedButton) {
            case 0:
              handleStartLesson();
              break;
            case 1:
              if (onOpenShop) onOpenShop();
              break;
            case 2:
              onOpenSettings();
              break;
            case 3:
              onResetProgress();
              break;
          }
          break;
        
        case '1':
          e.preventDefault();
          handleStartLesson();
          break;
        case '2':
          e.preventDefault();
          if (onOpenShop) onOpenShop();
          break;
        case '3':
          e.preventDefault();
          onOpenSettings();
          break;
        case '4':
          e.preventDefault();
          onResetProgress();
          break;
        case 'Escape':
          e.preventDefault();
          onResetProgress();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedButton, onOpenShop, keyboardEnabled]); // Add keyboardEnabled to dependencies

  // Auto-focus start button on mount with delay
  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      startButtonRef.current?.focus();
    }, 600); // Focus after keyboard is enabled

    return () => clearTimeout(focusTimeout);
  }, []);

  // Load settings for haptic feedback
  useEffect(() => {
    const saved = localStorage.getItem('kidz-literacy-settings');
    if (saved) {
      const savedSettings = JSON.parse(saved);
      setSettings(prev => ({ ...prev, hapticFeedback: savedSettings.hapticFeedback || false }));
    }
  }, []);

  // Haptic feedback function
  const triggerHapticFeedback = (pattern: number | number[] = 100) => {
    if (settings.hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const handleStartLesson = () => {
    console.log("GameDashboard handleStartLesson triggered");
    triggerHapticFeedback(150); // Medium vibration for starting lesson
    onStartLesson();
  };

  // Character-specific configurations
  const getCharacterConfig = () => {
    switch (playerData.character) {
      case 'wizard':
        return {
          emoji: '🧙‍♀️',
          title: t.wordWizard,
          greeting: `Greetings, ${t.wordWizard} ${playerData.name}!`,
          subtitle: t.magicReadingPowers,
          bgGradient: 'from-blue-900 via-blue-800 to-indigo-900',
          cardGradient: 'from-blue-800 to-blue-900',
          buttonGradient: 'from-blue-700 to-blue-800',
          particleEmojis: ['⭐', '✨', '🔮', '🪄', '💫', '🪙']
        };
      case 'astronaut':
        return {
          emoji: '🚀',
          title: t.spaceReader,
          greeting: `Hello, ${t.spaceReader} ${playerData.name}!`,
          subtitle: t.cosmicKnowledge,
          bgGradient: 'from-slate-800 via-violet-900 to-black',
          cardGradient: 'from-slate-700 to-violet-800',
          buttonGradient: 'from-slate-700 to-violet-800',
          particleEmojis: ['🚀', '🌟', '⭐', '🌌', '💫', '🪙']
        };
      case 'hero':
        return {
          emoji: '🦸‍♂️',
          title: t.bookHero,
          greeting: `Welcome, ${t.bookHero} ${playerData.name}!`,
          subtitle: t.superLearning,
          bgGradient: 'from-orange-600 via-red-600 to-red-700',
          cardGradient: 'from-orange-500 to-red-600',
          buttonGradient: 'from-orange-500 to-red-600',
          particleEmojis: ['⚡', '💥', '🔥', '⭐', '🏆', '🪙']
        };
      case 'princess':
        return {
          emoji: '👸',
          title: t.storyPrincess,
          greeting: `Good day, ${t.storyPrincess} ${playerData.name}!`,
          subtitle: t.fairyTaleMagic,
          bgGradient: 'from-green-600 via-emerald-600 to-teal-600',
          cardGradient: 'from-green-500 to-emerald-600',
          buttonGradient: 'from-green-500 to-emerald-600',
          particleEmojis: ['✨', '🌟', '🌸', '🌿', '👑', '🪙']
        };
      default:
        return {
          emoji: '📚',
          title: 'Reader',
          greeting: `Kumusta, ${playerData.name}!`,
          subtitle: 'Handa ka na bang matuto?',
          bgGradient: 'from-slate-600 via-gray-600 to-blue-600',
          cardGradient: 'from-purple-500 to-indigo-600',
          buttonGradient: 'from-blue-500 to-purple-600',
          particleEmojis: ['📚', '📖', '✨', '⭐', '🌟']
        };
    }
  };

  const config = getCharacterConfig();

  return (
    <div className={`fit-screen bg-gradient-to-br ${config.bgGradient} font-sans relative`}>
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({length: 8}, (_, i) => (
          <div
            key={i}
            className="absolute text-responsive-lg opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            {config.particleEmojis[Math.floor(Math.random() * config.particleEmojis.length)]}
          </div>
        ))}
      </div>
      {/* App Header */}
      <header className="flex justify-between items-center p-3 relative z-10 flex-shrink-0">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 shadow-xl">
          <h1 className="text-responsive-xl font-bold text-white drop-shadow-lg">{config.greeting}</h1>
          <p className="text-white/90 text-responsive-base drop-shadow-md">{config.subtitle}</p>
        </div>
        
        {/* Gold Display & Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Gold Display */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl p-2 border-2 border-yellow-300 shadow-lg">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-900" />
              <span className="font-bold text-yellow-900 text-responsive-base">{playerGold}</span>
            </div>
          </div>
          
          {/* Shop Button */}
          {onOpenShop && (
            <Button 
              ref={shopButtonRef}
              variant="ghost" 
              size="icon"
              onClick={onOpenShop}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenShop();
                }
              }}
              className="h-10 w-10 rounded-full bg-purple-500/80 backdrop-blur-lg border border-purple-400/50 shadow-lg text-white hover:bg-purple-600/80 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-75"
              aria-label="Open Shop (Press 2)"
            >
              <ShoppingBag className="h-5 w-5" />
            </Button>
          )}
          
          {/* Settings Button */}
          <Button 
            ref={settingsButtonRef}
            variant="ghost" 
            size="icon"
            onClick={onOpenSettings}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenSettings();
              }
            }}
            className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg text-white hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-75"
            aria-label="Open Settings (Press 3)"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-2 flex flex-col justify-center relative z-10 min-h-0">
        
        {/* Character Avatar */}
        <div className="text-center mb-4">
          <div className="text-responsive-huge mb-2 animate-bounce drop-shadow-2xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
            {config.emoji}
          </div>
          <h2 className="text-responsive-3xl font-black text-white drop-shadow-xl">{config.title}</h2>
        </div>
        
        {/* Level & Stats Card */}
        <Card className={`w-full max-w-xs mx-auto bg-gradient-to-br ${config.cardGradient} text-white p-4 rounded-2xl shadow-2xl text-center transform hover:scale-105 transition-transform duration-300 border-4 border-white/20 backdrop-blur-xl flex-shrink-0`}>
          <div className="text-responsive-lg font-light mb-1 tracking-widest drop-shadow-lg">LEVEL</div>
          <div className="text-responsive-huge font-bold tracking-tighter drop-shadow-2xl">{playerData.level}</div>
          
          {/* Level description */}
          <div className="text-responsive-sm text-white/90 mb-3 font-medium">
            {playerData.level === 1 ? '🐕 Learning Animals' : '🏠 Learning Objects'}
          </div>
          
          <div className="mt-3">
            <div className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full shadow-lg border-2 border-yellow-300">
              <Star className="h-4 w-4" />
              <span className="font-bold text-responsive-base">{playerData.stars} Stars</span>
            </div>
          </div>
          
          {/* Hearts display */}
          <div className="mt-2">
            <div className="inline-flex items-center justify-center gap-2 bg-red-400 text-red-900 px-3 py-1 rounded-full shadow-lg border-2 border-red-300">
              <Heart className="h-4 w-4" />
              <span className="font-bold text-responsive-sm">{playerData.hearts} Hearts</span>
            </div>
          </div>
        </Card>

      </main>

      {/* Footer Actions */}
      <footer className="p-3 space-y-2 relative z-10 flex-shrink-0 mt-6">
        <Button 
          ref={startButtonRef}
          className={`w-full max-w-xs mx-auto py-3 text-responsive-xl rounded-full shadow-xl flex items-center justify-center gap-3 bg-gradient-to-r ${config.buttonGradient} hover:scale-105 transition-all duration-300 text-white font-bold border-4 border-white/20 backdrop-blur-xl focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-75`}
          onClick={handleStartLesson}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleStartLesson();
            }
          }}
          aria-label="Start lesson (Press 1 or Enter)"
        >
          <div className="text-responsive-2xl drop-shadow-lg">{config.emoji}</div>
          <span className="drop-shadow-lg">Simulan ang Aralin!</span>
        </Button>
        
        <Button 
          ref={resetButtonRef}
          variant="link" 
          className="w-full !text-white hover:!text-white text-responsive-base font-semibold drop-shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-75 rounded"
          style={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(255,255,255,0.3)',
            color: 'white !important'
          }}
          onClick={onResetProgress}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onResetProgress();
            }
          }}
          aria-label="Reset progress (Press 4 or Escape)"
        >
          I-reset ang progreso
        </Button>
        
        {/* Keyboard instructions */}
        <div className="text-center text-white/80 text-sm bg-black/20 rounded-lg p-2 border border-white/20 mt-3">
          <p className="font-semibold mb-1">⌨️ Controls:</p>
          <p>1: Start | 2: Shop | <span className="pt-1 inline-block">3: Settings</span> | 4: Reset | Arrows: Navigate | Enter: Select</p>
        </div>
      </footer>
    </div>
  );
};