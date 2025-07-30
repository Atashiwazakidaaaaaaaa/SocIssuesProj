import { useState, useEffect } from "react";
import { GameDashboard } from "./GameDashboard";
import { ReadingLesson } from "./ReadingLesson";
import { LandingPage } from "./LandingPage";
import { Settings } from "./Settings";

type AppState = 'landing' | 'dashboard' | 'lesson' | 'settings';

export const LiteracyApp = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [playerData, setPlayerData] = useState({
    name: "Bata",
    level: 1,
    stars: 0,
    hearts: 3,
    character: "default"
  });

  // Auto-save player data to localStorage
  const savePlayerData = (newData: typeof playerData) => {
    setPlayerData(newData);
    localStorage.setItem('kidz-literacy-player', JSON.stringify(newData));
  };

  // Load player data on app start
  useEffect(() => {
    const saved = localStorage.getItem('kidz-literacy-player');
    if (saved) {
      const parsedData = JSON.parse(saved);
      setPlayerData(parsedData);
      // If user has a name, skip landing and go directly to dashboard
      if (parsedData.name && parsedData.name !== "Bata") {
        setCurrentState('dashboard');
      }
    }
  }, []);

  const handleStartLesson = () => {
    setCurrentState('lesson');
  };

  const handleLessonComplete = (score: number) => {
    // Update player data based on lesson performance
    const newData = {
      ...playerData,
      stars: playerData.stars + score,
      level: playerData.level + (score >= 2 ? 1 : 0)
    };
    savePlayerData(newData);
    setCurrentState('dashboard');
  };

  const handleStartJourney = (name: string, character?: string) => {
    const newData = { 
      ...playerData, 
      name,
      character: character || "default"
    };
    savePlayerData(newData);
    setCurrentState('dashboard');
  };

  const handleBackToDashboard = () => {
    setCurrentState('dashboard');
  };

  const handleOpenSettings = () => {
    setCurrentState('settings');
  };

  // Reset progress function
  const handleResetProgress = () => {
    const resetData = {
      name: "Bata",
      level: 1,
      stars: 0,
      hearts: 3,
      character: "default"
    };
    savePlayerData(resetData);
    localStorage.removeItem('kidz-literacy-player');
    setCurrentState('landing');
  };

  switch (currentState) {
    case 'landing':
      return (
        <div className="fit-screen">
          <LandingPage onStartJourney={handleStartJourney} />
        </div>
      );
    
    case 'dashboard':
      return (
        <div className="fit-screen">
          <GameDashboard
            playerData={playerData}
            onStartLesson={handleStartLesson}
            onResetProgress={handleResetProgress}
            onOpenSettings={handleOpenSettings}
          />
        </div>
      );
    
    case 'settings':
      return (
        <div className="fit-screen">
          <Settings onBack={handleBackToDashboard} />
        </div>
      );
    
    case 'lesson':
      return (
        <div className="fit-screen">
          <ReadingLesson
            onComplete={handleLessonComplete}
            onExit={handleBackToDashboard}
            playerLevel={playerData.level}
          />
        </div>
      );
    
    default:
      return (
        <div className="fit-screen">
          <LandingPage onStartJourney={handleStartJourney} />
        </div>
      );
  }
};