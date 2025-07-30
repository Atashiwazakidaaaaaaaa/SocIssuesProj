import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Heart, ArrowLeft, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/translations";

interface GameDashboardProps {
  playerData: {
    name: string;
    stars: number;
    hearts: number;
    level: number;
    character: string;
  };
  onStartLesson: () => void;
  onResetProgress: () => void;
  onOpenSettings: () => void;
}

export const GameDashboard = ({ playerData, onStartLesson, onResetProgress, onOpenSettings }: GameDashboardProps) => {
  const [settings, setSettings] = useState({ hapticFeedback: false });
  const { t } = useTranslation();

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
          particleEmojis: ['⭐', '✨', '🔮', '🪄', '💫'],
          motivational: 'Channel your magical reading powers!'
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
          particleEmojis: ['🚀', '🌟', '⭐', '🌌', '💫'],
          motivational: 'Navigate through words among the stars!'
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
          particleEmojis: ['⚡', '💥', '🔥', '⭐', '🏆'],
          motivational: 'Use your super learning powers!'
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
          particleEmojis: ['✨', '🌟', '�', '🌿', '👑'],
          motivational: 'Create magical stories with your reading!'
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
          particleEmojis: ['📚', '📖', '✨', '⭐', '🌟'],
          motivational: 'Let\'s start your reading journey!'
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
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onOpenSettings}
          className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg text-white hover:bg-white/30 transition-all duration-300"
          aria-label="Buksan ang Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
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

        {/* Motivational Message */}
        <div className="text-center mt-4">
          <p className="text-responsive-lg text-white/90 font-bold drop-shadow-lg bg-black/20 rounded-xl py-2 px-4 backdrop-blur-lg border border-white/20">
            {config.motivational}
          </p>
        </div>

      </main>

      {/* Footer Actions */}
      <footer className="p-3 space-y-2 relative z-10 flex-shrink-0">
        <Button 
          className={`w-full max-w-xs mx-auto py-3 text-responsive-xl rounded-full shadow-xl flex items-center justify-center gap-3 bg-gradient-to-r ${config.buttonGradient} hover:scale-105 transition-all duration-300 text-white font-bold border-4 border-white/20 backdrop-blur-xl`}
          onClick={handleStartLesson}
        >
          <div className="text-responsive-2xl drop-shadow-lg">{config.emoji}</div>
          <span className="drop-shadow-lg">Simulan ang Aralin!</span>
        </Button>
        
        <Button 
          variant="link" 
          className="w-full !text-white hover:!text-white text-responsive-base font-semibold drop-shadow-lg"
          style={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(255,255,255,0.3)',
            color: 'white !important'
          }}
          onClick={onResetProgress}
        >
          I-reset ang progreso
        </Button>
      </footer>
    </div>
  );
};