// Translation system for the literacy app
export type LanguageCode = 'filipino' | 'english';

export interface Translation {
  // Common UI
  back: string;
  settings: string;
  level: string;
  stars: string;
  hearts: string;
  start: string;
  continue: string;
  complete: string;
  
  // Landing page
  wordQuest: string;
  magicalWorld: string;
  joinAdventure: string;
  magicalWorlds: string;
  exploreKingdoms: string;
  epicBattles: string;
  fightWithWords: string;
  becomeLegend: string;
  ruleKingdom: string;
  startAdventure: string;
  chooseHero: string;
  chooseChampion: string;
  heroRegistration: string;
  heroNameQuestion: string;
  enterHeroName: string;
  beginQuest: string;
  notSureName: string;
  quickStartAnonymous: string;
  launchingAdventure: string;
  portalOpening: string;
  preparingJourney: string;
  heroReady: string;
  
  // Characters
  wordWizard: string;
  spaceReader: string;
  bookHero: string;
  storyPrincess: string;
  magicReadingPowers: string;
  cosmicKnowledge: string;
  superLearning: string;
  fairyTaleMagic: string;
  
  // Reading Lesson
  learning: string;
  testing: string;
  quizMode: string;
  listen: string;
  playing: string;
  gotIt: string;
  simula: string;
  taposNa: string;
  animals: string;
  objects: string;
  progress: string;
  points: string;
  questions: string;
  quiz: string;
  finished: string;
  
  // Questions - Level 1 (Animals)
  whoMeows: string;
  whatIsDogInFilipino: string;
  
  // Questions - Level 2 (Objects)
  whereEat: string;
  whatForReading: string;
  whereLive: string;
  whatToPlay: string;
  
  // Words - Level 1 (Animals)
  dog: string;
  cat: string;
  chicken: string;
  pig: string;
  
  // Words - Level 2 (Objects)
  table: string;
  book: string;
  ball: string;
  flower: string;
  house: string;
  car: string;
  
  // Settings
  accessibility: string;
  speechSpeed: string;
  speechVolume: string;
  fontSize: string;
  textSize: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
  highContrast: string;
  reduceMotion: string;
  autoplaySound: string;
  language: string;
  primaryLanguage: string;
  learningSupport: string;
  showPhonetics: string;
  learnPronunciation: string;
  slowMode: string;
  slowerLearning: string;
  visualCues: string;
  colorsAnimations: string;
  hapticFeedback: string;
  vibrationMobile: string;
  testSettings: string;
  testSound: string;
  testVibration: string;
  testSpeech: string;
  vibrationNotAvailable: string;
  enableHapticFirst: string;
  
  // Dashboard
  startLesson: string;
  motivationalMessage: string;
  
  // Game specific
  selected: string;
  continueQuest: string;
  slow: string;
  fast: string;
  adjustFor: string;
}

export const translations: Record<LanguageCode, Translation> = {
  filipino: {
    // Common UI
    back: "Bumalik",
    settings: "Mga Setting",
    level: "Level",
    stars: "Stars",
    hearts: "Hearts",
    start: "Start",
    continue: "Tuloy",
    complete: "Tapos",
    
    // Landing page
    wordQuest: "WORD QUEST ✨",
    magicalWorld: "Ang Mahiwagang Mundo ng Pagbabasa! ✨",
    joinAdventure: "Sumali sa pinakamasayang adventure sa buong mundo! 🌍✨",
    magicalWorlds: "MAGICAL WORLDS ✨",
    exploreKingdoms: "Explore enchanted kingdoms!",
    epicBattles: "EPIC BATTLES ⚡",
    fightWithWords: "Fight with the power of words!",
    becomeLegend: "BECOME LEGEND 💎",
    ruleKingdom: "Rule the reading kingdom!",
    startAdventure: "START ADVENTURE! 🌟✨",
    chooseHero: "CHOOSE YOUR HERO! ⚡✨",
    chooseChampion: "Piliin ang reading champion mo! ^^",
    heroRegistration: "HERO REGISTRATION! 📜✨",
    heroNameQuestion: "Anong pangalan ng",
    enterHeroName: "Enter your hero name...",
    beginQuest: "BEGIN EPIC QUEST! 🌟✨",
    notSureName: "Hindi sure sa pangalan?",
    quickStartAnonymous: "Quick Start as Anonymous Hero 👤",
    launchingAdventure: "LAUNCHING ADVENTURE...",
    portalOpening: "PORTAL OPENING... ✨",
    preparingJourney: "Preparing your magical journey! ✨🌟",
    heroReady: "is ready! ✨",
    
    // Characters
    wordWizard: "Word Wizard",
    spaceReader: "Space Reader", 
    bookHero: "Book Hero",
    storyPrincess: "Story Princess",
    magicReadingPowers: "Magic Reading Powers",
    cosmicKnowledge: "Cosmic Knowledge",
    superLearning: "Super Learning",
    fairyTaleMagic: "Fairy Tale Magic",
    
    // Reading Lesson
    learning: "Nag-aaral",
    testing: "Nag-eexam",
    quizMode: "Quiz Mode",
    listen: "Pakinggan",
    playing: "Pinapatugtog...",
    gotIt: "Nakuha ko na! ✅",
    simula: "Simula",
    taposNa: "Tapos na!",
    animals: "Mga Hayop (Animals)",
    objects: "Mga Bagay (Objects)",
    progress: "Progress",
    points: "Points",
    questions: "Mga Tanong",
    quiz: "Quiz",
    finished: "Tapos na!",
    
    // Questions - Level 1
    whoMeows: "Sino ang tumutunog ng 'meow'?",
    whatIsDogInFilipino: "Anong tawag sa 'dog' sa Pilipino?",
    
    // Questions - Level 2  
    whereEat: "Saan tayo kumakain?",
    whatForReading: "Anong ginagamit natin sa pagbabasa?",
    whereLive: "Saan tayo nakatira?",
    whatToPlay: "Anong lalaruan mo sa labas?",
    
    // Words - Level 1
    dog: "aso",
    cat: "pusa", 
    chicken: "manok",
    pig: "baboy",
    
    // Words - Level 2
    table: "mesa",
    book: "libro",
    ball: "bola",
    flower: "bulaklak",
    house: "bahay",
    car: "kotse",
    
    // Settings
    accessibility: "Accessibility",
    speechSpeed: "Bilis ng Salita",
    speechVolume: "Lakas ng Tunog",
    fontSize: "Laki ng Titik", 
    textSize: "Laki ng Titik",
    small: "Maliit",
    medium: "Tamang laki",
    large: "Malaki", 
    extraLarge: "Napaka laki",
    highContrast: "High Contrast",
    reduceMotion: "Reduce Motion",
    autoplaySound: "Auto-play na Tunog",
    language: "Wika",
    primaryLanguage: "Pangunahing Wika",
    learningSupport: "Tulong sa Pag-aaral",
    showPhonetics: "Ipakita ang Phonetics",
    learnPronunciation: "Magtuturo kung paano bigkasin",
    slowMode: "Slow Mode",
    slowerLearning: "Mas mabagal para sa mas madaling pag-aaral",
    visualCues: "Visual Cues",
    colorsAnimations: "Mga kulay at animation para sa gabay",
    hapticFeedback: "Haptic Feedback",
    vibrationMobile: "Vibration sa mobile devices",
    testSettings: "🧪 Test the Settings",
    testSound: "🔊 Test Audio",
    testVibration: "📳 Test ng Vibration",
    testSpeech: "Kumusta! Ang ganda ng settings mo!",
    vibrationNotAvailable: "Haptic feedback hindi available sa browser mo",
    enableHapticFirst: "I-enable muna ang haptic feedback sa settings",
    
    // Dashboard
    startLesson: "Simulan ang Aralin!",
    motivationalMessage: "Channel your magical reading powers!",
    
    // Game specific
    selected: "✨ SELECTED! ✨",
    continueQuest: "CONTINUE QUEST! 🚀",
    slow: "Mabagal",
    fast: "Mabilis",
    adjustFor: "Ayusin para sa'yo",
  },
  
  english: {
    // Common UI
    back: "Back",
    settings: "Settings", 
    level: "Level",
    stars: "Stars",
    hearts: "Hearts",
    start: "Start",
    continue: "Continue",
    complete: "Complete",
    
    // Landing page
    wordQuest: "WORD QUEST ✨",
    magicalWorld: "The Magical World of Reading! ✨",
    joinAdventure: "Join the most exciting adventure in the world! 🌍✨",
    magicalWorlds: "MAGICAL WORLDS ✨",
    exploreKingdoms: "Explore enchanted kingdoms!",
    epicBattles: "EPIC BATTLES ⚡",
    fightWithWords: "Fight with the power of words!",
    becomeLegend: "BECOME LEGEND 💎",
    ruleKingdom: "Rule the reading kingdom!",
    startAdventure: "START ADVENTURE! 🌟✨",
    chooseHero: "CHOOSE YOUR HERO! ⚡✨",
    chooseChampion: "Choose your reading champion! ^^",
    heroRegistration: "HERO REGISTRATION! 📜✨",
    heroNameQuestion: "What's your",
    enterHeroName: "Enter your hero name...",
    beginQuest: "BEGIN EPIC QUEST! 🌟✨",
    notSureName: "Not sure about the name?",
    quickStartAnonymous: "Quick Start as Anonymous Hero 👤",
    launchingAdventure: "LAUNCHING ADVENTURE...",
    portalOpening: "PORTAL OPENING... ✨",
    preparingJourney: "Preparing your magical journey! ✨🌟",
    heroReady: "is ready! ✨",
    
    // Characters
    wordWizard: "Word Wizard",
    spaceReader: "Space Reader",
    bookHero: "Book Hero", 
    storyPrincess: "Story Princess",
    magicReadingPowers: "Magic Reading Powers",
    cosmicKnowledge: "Cosmic Knowledge",
    superLearning: "Super Learning",
    fairyTaleMagic: "Fairy Tale Magic",
    
    // Reading Lesson
    learning: "Learning",
    testing: "Testing",
    quizMode: "Quiz Mode",
    listen: "Listen",
    playing: "Playing...",
    gotIt: "Got it! ✅",
    simula: "Start",
    taposNa: "Finished!",
    animals: "Animals",
    objects: "Objects",
    progress: "Progress",
    points: "Points",
    questions: "Questions",
    quiz: "Quiz",
    finished: "Finished!",
    
    // Questions - Level 1
    whoMeows: "Who makes the 'meow' sound?",
    whatIsDogInFilipino: "What do you call 'dog' in Filipino?",
    
    // Questions - Level 2
    whereEat: "Where do we eat?",
    whatForReading: "What do we use for reading?",
    whereLive: "Where do we live?",
    whatToPlay: "What will you play with outside?",
    
    // Words - Level 1
    dog: "dog",
    cat: "cat",
    chicken: "chicken", 
    pig: "pig",
    
    // Words - Level 2
    table: "table",
    book: "book",
    ball: "ball",
    flower: "flower",
    house: "house",
    car: "car",
    
    // Settings
    accessibility: "Accessibility",
    speechSpeed: "Speech Speed",
    speechVolume: "Speech Volume",
    fontSize: "Font Size",
    textSize: "Text Size",
    small: "Small",
    medium: "Medium",
    large: "Large",
    extraLarge: "Extra Large",
    highContrast: "High Contrast",
    reduceMotion: "Reduce Motion",
    autoplaySound: "Auto-play Sound",
    language: "Language",
    primaryLanguage: "Primary Language",
    learningSupport: "Learning Support",
    showPhonetics: "Show Phonetics",
    learnPronunciation: "Learn how to pronounce",
    slowMode: "Slow Mode",
    slowerLearning: "Slower for easier learning",
    visualCues: "Visual Cues",
    colorsAnimations: "Colors and animations for guidance",
    hapticFeedback: "Haptic Feedback",
    vibrationMobile: "Vibration on mobile devices",
    testSettings: "🧪 Test your Settings",
    testSound: "🔊 Test Sound",
    testVibration: "📳 Test Vibration",
    testSpeech: "Hello! Your settings look great!",
    vibrationNotAvailable: "Haptic feedback not available in your browser",
    enableHapticFirst: "Please enable haptic feedback in settings first",
    
    // Dashboard
    startLesson: "Start Lesson!",
    motivationalMessage: "Channel your magical reading powers!",
    
    // Game specific
    selected: "✨ SELECTED! ✨",
    continueQuest: "CONTINUE QUEST! 🚀",
    slow: "Slow",
    fast: "Fast",
    adjustFor: "Customize for you",
  }
};

// Hook to get current language and translations
export const useTranslation = () => {
  const getLanguage = (): LanguageCode => {
    if (typeof window === 'undefined') return 'filipino';
    const saved = localStorage.getItem('kidz-literacy-settings');
    if (saved) {
      const settings = JSON.parse(saved);
      return settings.language || 'filipino';
    }
    return 'filipino';
  };

  const language = getLanguage();
  const t = translations[language];
  
  return { t, language };
};

// Get word translations based on current language
export const getWordTranslation = (word: string, language: LanguageCode) => {
  const wordMap: Record<string, { filipino: string; english: string }> = {
    aso: { filipino: "aso", english: "dog" },
    pusa: { filipino: "pusa", english: "cat" },
    manok: { filipino: "manok", english: "chicken" },
    baboy: { filipino: "baboy", english: "pig" },
    mesa: { filipino: "mesa", english: "table" },
    libro: { filipino: "libro", english: "book" },
    bola: { filipino: "bola", english: "ball" },
    bulaklak: { filipino: "bulaklak", english: "flower" },
    bahay: { filipino: "bahay", english: "house" },
    kotse: { filipino: "kotse", english: "car" },
  };
  
  return wordMap[word]?.[language] || word;
};

// Get question translations
export const getQuestionTranslation = (questionKey: string, language: LanguageCode) => {
  const t = translations[language];
  switch (questionKey) {
    case 'whoMeows': return t.whoMeows;
    case 'whatIsDogInFilipino': return t.whatIsDogInFilipino;
    case 'whereEat': return t.whereEat;
    case 'whatForReading': return t.whatForReading;
    case 'whereLive': return t.whereLive;
    case 'whatToPlay': return t.whatToPlay;
    default: return questionKey;
  }
};
