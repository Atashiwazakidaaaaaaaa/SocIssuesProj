import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Volume2, CheckCircle, XCircle, Heart, Star } from "lucide-react";
import { useTranslation, getWordTranslation, getQuestionTranslation } from "@/lib/translations";

interface ReadingLessonProps {
  onComplete: (score: number) => void;
  onExit: () => void;
  playerLevel: number;
}

// Level 1: Basic Animals
const level1_animals = [
  { word: "aso", meaning: "dog", image: "🐕" },
  { word: "pusa", meaning: "cat", image: "🐱" },
  { word: "manok", meaning: "chicken", image: "🐔" },
  { word: "baboy", meaning: "pig", image: "🐷" }
];

// Level 2: Everyday Objects (Nouns)
const level2_objects = [
  { word: "mesa", meaning: "table", image: "🪑" },
  { word: "libro", meaning: "book", image: "📚" },
  { word: "bola", meaning: "ball", image: "⚽" },
  { word: "bulaklak", meaning: "flower", image: "🌸" },
  { word: "bahay", meaning: "house", image: "🏠" },
  { word: "kotse", meaning: "car", image: "🚗" }
];

const level1_questions = [
  {
    question: "Sino ang tumutunog ng 'meow'?",
    options: ["aso", "pusa", "manok"],
    correct: 1,
    image: "🐱"
  },
  {
    question: "Anong tawag sa 'dog' sa Pilipino?",
    options: ["baboy", "aso", "pusa"],
    correct: 1,
    image: "🐕"
  }
];

const level2_questions = [
  {
    question: "Saan tayo kumakain?",
    options: ["libro", "mesa", "bola"],
    correct: 1,
    image: "🪑"
  },
  {
    question: "Anong ginagamit natin sa pagbabasa?",
    options: ["libro", "kotse", "bahay"],
    correct: 0,
    image: "📚"
  },
  {
    question: "Saan tayo nakatira?",
    options: ["bola", "bulaklak", "bahay"],
    correct: 2,
    image: "🏠"
  },
  {
    question: "Anong lalaruan mo sa labas?",
    options: ["mesa", "bola", "libro"],
    correct: 1,
    image: "⚽"
  }
];

const phoneticMap: { [key: string]: string } = {
    aso: "ah-so",
    pusa: "poo-sa",
    manok: "ma-nok",
    baboy: "ba-boy",
    mesa: "me-sa",
    libro: "lib-ro",
    bola: "bo-la",
    bulaklak: "bu-lak-lak",
    bahay: "ba-hay",
    kotse: "kot-se",
  };


export const ReadingLesson = ({ onComplete, onExit, playerLevel }: ReadingLessonProps) => {
  const { t, language } = useTranslation();
  const [phase, setPhase] = useState<'learn' | 'practice'>('learn');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hearts, setHearts] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [settings, setSettings] = useState({
    speechRate: 0.8,
    speechVolume: 0.9,
    fontSize: 'medium',
    showPhonetics: true, // Set to true to display phonetics
    visualCues: true,
    hapticFeedback: false,
    reducedMotion: false
  });

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('kidz-literacy-settings');
    if (saved) {
      const savedSettings = JSON.parse(saved);
      setSettings(prev => ({ ...prev, ...savedSettings }));
    }
  }, []);

  // Haptic feedback function
  const triggerHapticFeedback = (pattern: number | number[] = 100) => {
    if (settings.hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  // Get content based on player level and language
  const getLocalizedWords = () => {
    const baseWords = playerLevel >= 2 ? level2_objects : level1_animals;
    return baseWords.map(word => ({
      ...word,
      word: getWordTranslation(word.word, language),
      meaning: language === 'english' ? word.meaning : word.word // Show English meaning when in Filipino mode, Filipino word when in English mode
    }));
  };

  const getLocalizedQuestions = () => {
    const baseQuestions = playerLevel >= 2 ? level2_questions : level1_questions;
    const questionKeys = playerLevel >= 2 
      ? ['whereEat', 'whatForReading', 'whereLive', 'whatToPlay']
      : ['whoMeows', 'whatIsDogInFilipino'];
    
    return baseQuestions.map((question, index) => ({
      ...question,
      question: getQuestionTranslation(questionKeys[index], language),
      options: question.options.map(option => getWordTranslation(option, language))
    }));
  };

  const currentWords = getLocalizedWords();
  const currentQuestions = getLocalizedQuestions();
  const lessonTitle = playerLevel >= 2 ? t.objects : t.animals;
  const lessonIcon = playerLevel >= 2 ? "🏠" : "🐕";

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'BUTTON') {
        return;
      }
      
      if (phase === 'learn') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleWordComplete();
        }
      } else if (phase === 'practice' && !showResult) {
        if (e.key >= '1' && e.key <= '3') {
          const answerIndex = parseInt(e.key) - 1;
          if (answerIndex < currentQuestions[currentIndex].options.length) {
            e.preventDefault();
            handleAnswerSelect(answerIndex);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [phase, showResult, currentIndex]);

  // Update progress whenever we move forward
  useEffect(() => {
    if (phase === 'learn') {
      setProgress((currentIndex / currentWords.length) * 50); // First 50% for learning
    } else {
      setProgress(50 + (currentIndex / currentQuestions.length) * 50); // Next 50% for practice
    }
  }, [phase, currentIndex, currentWords.length, currentQuestions.length]);

  const handleWordComplete = () => {
    triggerHapticFeedback(200); // Success vibration
    if (currentIndex < currentWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setPhase('practice');
      setCurrentIndex(0);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === currentQuestions[currentIndex].correct;
    
    // Haptic feedback based on correctness
    if (isCorrect) {
      triggerHapticFeedback([100, 50, 100]); // Success pattern: short-pause-short
    } else {
      triggerHapticFeedback([200, 100, 200]); // Error pattern: long-pause-long
    }
    
    setTimeout(() => {
      if (isCorrect) {
        setScore(score + 1);
      } else {
        setHearts(hearts - 1);
      }
      
      if (currentIndex < currentQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setTimeout(() => onComplete(score + (isCorrect ? 1 : 0)), 1000);
      }
    }, 1500);
  };


  const playWordAudio = (word: string) => {
    if (isPlaying) return;
    triggerHapticFeedback(50); // Light tap for audio button
    setIsPlaying(true);
    
    // Try MP3 first, fallback to TTS
    const audio = new Audio(`/audio/${word.toLowerCase()}.mp3`);
    
    audio.play().catch(() => {
      // Fallback to Text-to-Speech with appropriate language
      console.log(`Audio file not found, using TTS for: ${word}`);
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = settings.speechRate;
      utterance.volume = settings.speechVolume;
      
      // Set language-specific voice and language code
      if (language === 'english') {
        utterance.lang = 'en-US';
        utterance.voice = speechSynthesis.getVoices().find(voice => 
          voice.lang.startsWith('en') && voice.name.includes('Female')
        ) || null;
      } else {
        utterance.lang = 'tl-PH'; // Filipino language code
        utterance.voice = speechSynthesis.getVoices().find(voice => 
          voice.lang.startsWith('tl') || voice.lang.startsWith('fil')
        ) || null;
      }
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
      return;
    });
    
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      console.error(`Error playing audio for ${word}`);
      setIsPlaying(false);
    };
  };

  if (phase === 'learn') {
    const currentWord = currentWords[currentIndex];
    
    return (
      <div className={`fit-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-2 ${settings.reducedMotion ? 'reduced-motion' : ''}`}>
        <div className="max-w-xl mx-auto h-full flex flex-col">
          {/* Enhanced Header with Progress */}
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <Button variant="outline" onClick={onExit} size="sm" className="hover:scale-110 transition-transform bg-white/90 border-white text-purple-700 hover:bg-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.back}
            </Button>
            <div className="flex items-center gap-2">
              <div className="text-responsive-sm font-medium text-white bg-orange-500 px-2 py-1 rounded-full border-2 border-orange-300 shadow-lg">
                {lessonIcon} {lessonTitle}
              </div>
              <div className="text-sm font-medium text-purple-800 bg-yellow-300 px-2 py-1 rounded-full shadow-lg">
                {phase === 'learn' ? t.learning : t.testing} ({Math.round(progress)}%)
              </div>
              {[...Array(hearts)].map((_, i) => (
                <Heart key={i} className="h-8 w-8 text-red-400 fill-red-400 animate-pulse drop-shadow-lg" />
              ))}
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-white/30 rounded-full h-4 border-2 border-white/50 shadow-lg">
              <div 
                className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden shadow-inner"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-40 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-white/90 font-bold drop-shadow">
              <span>{t.simula}</span>
              <span className="text-yellow-300">{t.level} {playerLevel}</span>
              <span>{t.taposNa}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pb-4">
            <Card className="p-4 text-center bg-white/95 backdrop-blur-lg shadow-2xl border-4 border-yellow-400 hover:border-orange-500 transition-all rounded-3xl">
              <div className="text-7xl mb-4 animate-bounce-gentle filter drop-shadow-lg">{currentWord.image}</div>
              
              <h2 className="text-content-5xl font-bold text-purple-700 mb-4 animate-pulse drop-shadow-lg">{currentWord.word}</h2>

              {settings.showPhonetics && (
                <p className="text-content-xl text-blue-700 mb-2 font-mono bg-blue-100 px-3 py-1 rounded-xl border-2 border-blue-300 shadow-lg">
                  [{phoneticMap[currentWord.word.toLowerCase()] || currentWord.word}]
                </p>
              )}
              
              <p className="text-content-2xl text-gray-700 mb-6 bg-gradient-to-r from-yellow-200 to-orange-200 px-4 py-2 rounded-full border-2 border-orange-300 shadow-lg">
                ({currentWord.meaning})
              </p>

              <div className="space-y-4">
                <Button
                  variant="magic"
                  size="xl"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    playWordAudio(currentWord.word);
                  }}
                  disabled={isPlaying}
                  className={`w-full py-4 text-content-xl transition-all hover:scale-105 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white border-4 border-green-300 shadow-2xl rounded-2xl ${isPlaying ? 'animate-pulse from-blue-500 to-cyan-600' : ''}`}
                >
                  <Volume2 className={`h-8 w-8 mr-3 ${isPlaying ? 'animate-bounce' : ''}`} />
                  <span className="text-content-xl">{isPlaying ? t.playing : t.listen}</span>
                </Button>

                <Button
                  variant="success"
                  size="xl"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleWordComplete();
                  }}
                  className="w-full py-4 text-content-xl hover:scale-105 transition-all bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-4 border-orange-300 shadow-2xl rounded-2xl"
                >
                  <CheckCircle className="h-8 w-8 mr-3" />
                  <span className="text-content-xl">{t.gotIt}</span>
                </Button>
                
                {/* Progress indicator for learning phase */}
                <div className="flex justify-center items-center gap-2 mt-4">
                  {currentWords.map((_, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-full transition-all shadow-lg ${
                        index === currentIndex
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-150 animate-pulse border-2 border-white'
                          : index < currentIndex
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-2 border-green-300'
                          : 'bg-gradient-to-r from-gray-300 to-gray-400 border-2 border-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Practice Phase
  const currentQuestion = currentQuestions[currentIndex];
  
  return (
    <div className="fit-screen bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 p-2">
      <div className="max-w-2xl mx-auto h-full flex flex-col">
        {/* Enhanced Header with Progress */}
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <Button variant="outline" onClick={onExit} size="sm" className="hover:scale-110 transition-transform bg-white/90 border-white text-blue-700 hover:bg-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.back}
          </Button>
          <div className="flex items-center gap-2">
            <div className="text-responsive-sm font-medium text-white bg-purple-600 px-2 py-1 rounded-full border-2 border-purple-400 shadow-lg">
              {lessonIcon} {lessonTitle}
            </div>
            <div className="text-sm font-medium text-blue-800 bg-yellow-300 px-2 py-1 rounded-full shadow-lg">
              {t.quizMode} ({Math.round(progress)}%)
            </div>
            <div className="flex items-center gap-2 bg-orange-500/90 px-4 py-2 rounded-full shadow-lg border-2 border-orange-300">
              <Star className="h-6 w-6 text-yellow-200 fill-yellow-200" />
              <span className="font-bold text-white text-xl drop-shadow">{score}</span>
            </div>
            {[...Array(hearts)].map((_, i) => (
              <Heart key={i} className="h-8 w-8 text-red-400 fill-red-400 animate-pulse drop-shadow-lg" />
            ))}
          </div>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="mb-6 flex-shrink-0">
          <div className="w-full bg-white/30 rounded-full h-4 border-2 border-white/50 shadow-lg">
            <div 
              className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden shadow-inner"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-40 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-white/90 font-bold drop-shadow">
            <span>{t.start}</span>
            <span className="text-yellow-300">{t.level} {playerLevel} {t.quiz}</span>
            <span>{t.finished}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-4">
          <Card className="p-6 text-center bg-white/95 backdrop-blur-lg shadow-2xl border-4 border-cyan-400 hover:border-blue-500 transition-all rounded-3xl">
            <div className="text-8xl mb-6 animate-bounce-gentle filter drop-shadow-lg">{currentQuestion.image}</div>
            
            <h2 className="text-content-2xl font-bold text-blue-800 mb-8 drop-shadow-lg">{currentQuestion.question}</h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                let baseClasses = "w-full text-content-xl py-5 rounded-2xl border-4 shadow-2xl transition-all duration-300 hover:scale-105 font-bold";
                let colorClasses = "";
                let disabled = false;
                
                if (showResult) {
                  disabled = true;
                  if (index === currentQuestion.correct) {
                    colorClasses = "bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-300 hover:from-green-500 hover:to-emerald-600";
                  } else if (index === selectedAnswer && index !== currentQuestion.correct) {
                    colorClasses = "bg-gradient-to-r from-red-400 to-pink-500 text-white border-red-300 hover:from-red-500 hover:to-pink-600";
                  } else {
                    colorClasses = "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 border-gray-200";
                  }
                } else {
                  colorClasses = "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white border-purple-300";
                }
                
                return (
                  <Button
                    key={index}
                    size="xl"
                    className={`${baseClasses} ${colorClasses}`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={disabled || showResult}
                  >
                    {option}
                    {showResult && index === currentQuestion.correct && (
                      <CheckCircle className="h-7 w-7 ml-2 text-white drop-shadow-lg" />
                    )}
                    {showResult && index === selectedAnswer && index !== currentQuestion.correct && (
                      <XCircle className="h-7 w-7 ml-2 text-white drop-shadow-lg" />
                    )}
                  </Button>
                );
              })}
            </div>
            </Card>
        </div>
      </div>
    </div>
  );
};