import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LandingPage } from "./components/LandingPage";
import { GameDashboard } from "./components/GameDashboard";
import { ReadingLesson } from "./components/ReadingLesson";

const queryClient = new QueryClient();

const App = () => {
  const [player, setPlayer] = useState<{ name: string; character: string } | null>(null);
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'lesson' | 'shop' | 'celebration'>('dashboard');
  const [playerStats, setPlayerStats] = useState({
    stars: 0,
    hearts: 5,
    level: 1,
    gold: 50 // Starting gold
  });
  const [showLevelUp, setShowLevelUp] = useState(false);

  const handleStartJourney = (name: string, character: string) => {
    console.log("Starting journey with:", name, character);
    setPlayer({ name, character });
    setCurrentScreen('dashboard');
    console.log("Set currentScreen to dashboard");
  };

  const handleStartLesson = () => {
    console.log("handleStartLesson called, switching to lesson screen");
    setCurrentScreen('lesson');
  };

  const handleResetProgress = () => {
    setPlayer(null);
    setPlayerStats({
      stars: 0,
      hearts: 5,
      level: 1,
      gold: 50
    });
    setCurrentScreen('dashboard');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const handleExitLesson = () => {
    console.log("Exiting lesson, going back to dashboard");
    setCurrentScreen('dashboard');
  };

  const handleOpenShop = () => {
    setCurrentScreen('shop');
  };

  const handleLevelComplete = (score: number, goldEarned: number = 25) => {
    console.log("Level completed with score:", score);
    const newStats = {
      ...playerStats,
      gold: playerStats.gold + goldEarned,
      stars: playerStats.stars + score
    };

    // Check if player should level up (need 3+ correct answers)
    if (score >= 3 && playerStats.level === 1) {
      newStats.level = 2;
      setShowLevelUp(true);
    }

    setPlayerStats(newStats);
    setCurrentScreen('celebration');
  };

  const handleCelebrationComplete = () => {
    setCurrentScreen('dashboard');
    if (showLevelUp) {
      setShowLevelUp(false);
    }
  };

  // Add keyboard navigation for celebration and shop screens
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentScreen === 'celebration') {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
          e.preventDefault();
          handleCelebrationComplete();
        }
      } else if (currentScreen === 'shop') {
        if (e.key === 'Escape' || e.key === 'Backspace') {
          e.preventDefault();
          handleBackToDashboard();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen]);

  console.log("Current screen:", currentScreen, "Player:", player);

  const handleOpenSettings = () => {
    // TODO: Open settings modal
    console.log("Opening settings...");
  };

  if (!player) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LandingPage onStartJourney={handleStartJourney} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  if (currentScreen === 'lesson') {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ReadingLesson 
            onComplete={(score) => {
              handleLevelComplete(score, 25); // Award 25 gold for completing lesson
            }}
            onExit={handleExitLesson}
            playerLevel={playerStats.level}
          />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  if (currentScreen === 'celebration') {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Floating celebration particles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({length: 20}, (_, i) => (
                <div
                  key={i}
                  className="absolute text-6xl opacity-70 animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                >
                  {['🎉', '⭐', '🏆', '🎊', '✨', '🌟', '🎈', '🪙'][Math.floor(Math.random() * 8)]}
                </div>
              ))}
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl max-w-2xl w-full text-center relative z-10">
              <div className="text-8xl mb-6 animate-bounce">🎉</div>
              <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {showLevelUp ? 'LEVEL UP!' : 'LESSON COMPLETE!'}
              </h1>
              <div className="text-3xl text-white/90 mb-6">
                {showLevelUp ? '🎊 Welcome to Level 2! 🎊' : '⭐ Great Job! ⭐'}
              </div>
              
              {/* Celebration stats */}
              <div className="flex justify-center gap-6 mb-8">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl p-4 border-2 border-yellow-300">
                  <div className="text-3xl mb-2">🪙</div>
                  <div className="font-bold text-yellow-900">+25 Gold</div>
                </div>
                <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl p-4 border-2 border-purple-300">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="font-bold text-white">Stars Earned</div>
                </div>
                {showLevelUp && (
                  <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-xl p-4 border-2 border-green-300">
                    <div className="text-3xl mb-2">🚀</div>
                    <div className="font-bold text-white">Level 2!</div>
                  </div>
                )}
              </div>
              
              {showLevelUp && (
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 mb-6 border border-blue-400">
                  <div className="text-white text-xl font-bold mb-2">🏠 New Content Unlocked! 🏠</div>
                  <div className="text-white/90">Learn about everyday objects and household items!</div>
                </div>
              )}
              
              <button 
                onClick={handleCelebrationComplete}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCelebrationComplete();
                  }
                }}
                autoFocus
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-2xl transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-75"
                aria-label="Continue to dashboard (Press Enter, Space, or Escape)"
              >
                Continue Adventure! 🚀
              </button>
              
              {/* Keyboard instructions */}
              <div className="text-center text-white/80 text-sm bg-black/20 rounded-lg p-2 border border-white/20 mt-4">
                <p>⌨️ Press Enter, Space, or Escape to continue</p>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  if (currentScreen === 'shop') {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl max-w-2xl w-full">
              <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-white mb-2">🛍️ MAGIC SHOP 🛍️</h1>
                <p className="text-white/80">Upgrade your learning experience with gold!</p>
                <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl p-3 border-2 border-yellow-300">
                  <span className="text-2xl">🪙</span>
                  <span className="font-bold text-yellow-900 text-xl">{playerStats.gold} Gold</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white">
                  <h3 className="font-bold text-lg mb-2">🎨 UI Themes</h3>
                  <p className="text-sm mb-3">Customize your dashboard colors and effects</p>
                  <button className="bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors">
                    100 🪙 - Coming Soon!
                  </button>
                </div>
                
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white">
                  <h3 className="font-bold text-lg mb-2">✨ Animations</h3>
                  <p className="text-sm mb-3">Unlock special character animations</p>
                  <button className="bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors">
                    150 🪙 - Coming Soon!
                  </button>
                </div>
                
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-4 text-white">
                  <h3 className="font-bold text-lg mb-2">🎵 Sound Packs</h3>
                  <p className="text-sm mb-3">New sound effects and music</p>
                  <button className="bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors">
                    75 🪙 - Coming Soon!
                  </button>
                </div>
                
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-4 text-white">
                  <h3 className="font-bold text-lg mb-2">🏆 Badges</h3>
                  <p className="text-sm mb-3">Collect special achievement badges</p>
                  <button className="bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors">
                    50 🪙 - Coming Soon!
                  </button>
                </div>
              </div>
              
              <button 
                onClick={handleBackToDashboard}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleBackToDashboard();
                  }
                }}
                autoFocus
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-75"
                aria-label="Back to dashboard (Press Enter, Escape, or Backspace)"
              >
                ← Back to Dashboard
              </button>
              
              {/* Keyboard instructions */}
              <div className="text-center text-white/80 text-sm bg-black/20 rounded-lg p-2 border border-white/20 mt-4">
                <p>⌨️ Press Enter, Escape, or Backspace to go back</p>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Explicitly handle dashboard screen
  if (currentScreen === 'dashboard') {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <GameDashboard 
            playerData={{
              name: player.name,
              character: player.character,
              stars: playerStats.stars,
              hearts: playerStats.hearts,
              level: playerStats.level,
              gold: playerStats.gold
            }}
            onStartLesson={handleStartLesson}
            onResetProgress={handleResetProgress}
            onOpenSettings={handleOpenSettings}
            onOpenShop={handleOpenShop}
          />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Fallback (should not reach here)
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-red-500 flex items-center justify-center text-white text-2xl">
          Unknown screen state: {currentScreen}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
