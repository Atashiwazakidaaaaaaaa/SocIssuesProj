import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Star, Heart, Sparkles, Gamepad2, Rocket, Zap, Crown, Globe } from "lucide-react";
import heroImage from "@/assets/literacy-hero.jpg";
import { useTranslation } from "@/lib/translations";

interface LandingPageProps {
  onStartJourney: (name: string, character?: string) => void;
}

export const LandingPage = ({ onStartJourney }: LandingPageProps) => {
  const [playerName, setPlayerName] = useState("");
  const [isStarting, setIsStarting] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'character' | 'name'>('intro');
  const { t } = useTranslation();

  const characters = [
    { id: 'explorer', emoji: '🧙‍♀️', name: t.wordWizard, power: t.magicReadingPowers },
    { id: 'astronaut', emoji: '🚀', name: t.spaceReader, power: t.cosmicKnowledge },
    { id: 'hero', emoji: '🦸‍♂️', name: t.bookHero, power: t.superLearning },
    { id: 'princess', emoji: '👸', name: t.storyPrincess, power: t.fairyTaleMagic }
  ];

  const handleStart = (name?: string) => {
    const finalName = name || playerName.trim();
    if (finalName && selectedCharacter) {
      setIsStarting(true);
      setTimeout(() => {
        onStartJourney(finalName, selectedCharacter);
      }, 1500);
    }
  };

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacter(characterId);
    setCurrentPhase('name');
  };

  const handleMainStart = () => handleStart();
  const handleGuestStart = () => {
    setSelectedCharacter('explorer');
    handleStart("Hero");
  };

  // Animated background particles - SPARKLY EDITION! ✨
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, emoji: string}>>([]);
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);

  useEffect(() => {
    const gameEmojis = ['⭐', '✨', '�', '�', '�💎', '🔮', '⚡', '�', '�', '✨', '�', '💖', '🦄', '🪄', '�', '�'];
    const newParticles = Array.from({length: 30}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      emoji: gameEmojis[Math.floor(Math.random() * gameEmojis.length)]
    }));
    setParticles(newParticles);

    // Create magical sparkles
    const newSparkles = Array.from({length: 50}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 3
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="fit-screen relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* ✨ MAGICAL SPARKLE LAYER ✨ */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map(sparkle => (
          <div
            key={`sparkle-${sparkle.id}`}
            className="absolute rounded-full bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 animate-sparkle opacity-80"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              filter: 'blur(1px)',
              boxShadow: '0 0 20px currentColor'
            }}
          />
        ))}
      </div>

      {/* Animated Particle Field - ENHANCED! */}
      <div className="absolute inset-0">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute text-3xl animate-float opacity-80 drop-shadow-2xl"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.id * 0.15}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              filter: 'drop-shadow(0 0 10px currentColor)'
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>

      {/* Magical Orbs - SUPER SPARKLY! */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-90 animate-blob shadow-2xl shadow-cyan-400/50"></div>
        <div className="absolute top-40 right-32 w-32 h-32 bg-gradient-to-r from-pink-400 via-purple-500 to-red-500 rounded-full mix-blend-screen filter blur-xl opacity-90 animate-blob animation-delay-2000 shadow-2xl shadow-pink-400/50"></div>
        <div className="absolute bottom-32 left-1/3 w-48 h-48 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-full mix-blend-screen filter blur-xl opacity-90 animate-blob animation-delay-4000 shadow-2xl shadow-yellow-400/50"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-500 rounded-full mix-blend-screen filter blur-xl opacity-90 animate-blob animation-delay-1000 shadow-2xl shadow-green-400/50"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 rounded-full mix-blend-screen filter blur-xl opacity-90 animate-blob animation-delay-3000 shadow-2xl shadow-purple-400/50"></div>
      </div>

      {/* Main Game Interface */}
      <div className={`relative z-10 h-full flex flex-col transition-all duration-1000 ${isStarting ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
        
        {/* INTRO PHASE */}
        {currentPhase === 'intro' && (
          <div className="h-full flex flex-col justify-center py-3">
            <div className="text-center max-w-4xl mx-auto animate-fade-in-down px-4">
              <div className="relative mb-2">
                <div className="text-responsive-3xl mb-2 animate-bounce drop-shadow-2xl filter drop-shadow-[0_0_20px_#fbbf24]">🌟</div>
                <h1 className="text-responsive-3xl font-black mb-3 bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent animate-pulse drop-shadow-2xl relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent blur-sm opacity-50 animate-pulse"></span>
                  {t.wordQuest}
                </h1>
                <div className="bg-black/60 backdrop-blur-xl rounded-xl py-3 px-6 mb-3 border-3 border-yellow-400/80 shadow-xl shadow-yellow-400/50 relative overflow-hidden">
                  {/* Sparkle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                  <h2 className="text-responsive-xl font-black text-white mb-2 drop-shadow-2xl relative z-10">
                    {t.magicalWorld}
                  </h2>
                  <div className="text-responsive-base text-cyan-200 font-bold drop-shadow-xl relative z-10">
                    {t.joinAdventure}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card className="p-6 bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-xl border-3 border-yellow-400/80 shadow-xl hover:scale-105 transition-all duration-500 group hover:shadow-purple-500/70 relative overflow-hidden">
                  {/* Sparkle effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="text-5xl mb-3 group-hover:animate-spin drop-shadow-2xl filter drop-shadow-[0_0_15px_#fbbf24] relative z-10">🏰</div>
                  <h3 className="text-responsive-base font-black text-white mb-2 drop-shadow-xl bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent relative z-10">{t.magicalWorlds}</h3>
                  <p className="text-white font-bold text-sm drop-shadow-lg relative z-10">{t.exploreKingdoms}</p>
                  <div className="absolute -top-1 -right-1 text-lg animate-spin opacity-70">✨</div>
                  <div className="absolute -bottom-1 -left-1 text-sm animate-bounce opacity-70">🌟</div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-blue-600/90 to-cyan-600/90 backdrop-blur-xl border-3 border-yellow-400/80 shadow-xl hover:scale-105 transition-all duration-500 group hover:shadow-blue-500/70 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="text-5xl mb-3 group-hover:animate-bounce drop-shadow-2xl filter drop-shadow-[0_0_15px_#06b6d4] relative z-10">⚔️</div>
                  <h3 className="text-responsive-base font-black text-white mb-2 drop-shadow-xl bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent relative z-10">{t.epicBattles}</h3>
                  <p className="text-white font-bold text-sm drop-shadow-lg relative z-10">{t.fightWithWords}</p>
                  <div className="absolute -top-1 -right-1 text-lg animate-pulse opacity-70">💫</div>
                  <div className="absolute -bottom-1 -left-1 text-sm animate-spin opacity-70">⚡</div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-emerald-600/90 to-green-600/90 backdrop-blur-xl border-3 border-yellow-400/80 shadow-xl hover:scale-105 transition-all duration-500 group hover:shadow-green-500/70 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="text-5xl mb-3 group-hover:animate-pulse drop-shadow-2xl filter drop-shadow-[0_0_15px_#10b981] relative z-10">👑</div>
                  <h3 className="text-responsive-base font-black text-white mb-2 drop-shadow-xl bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent relative z-10">{t.becomeLegend}</h3>
                  <p className="text-white font-bold text-sm drop-shadow-lg relative z-10">{t.ruleKingdom}</p>
                  <div className="absolute -top-1 -right-1 text-lg animate-bounce opacity-70">💎</div>
                  <div className="absolute -bottom-1 -left-1 text-sm animate-pulse opacity-70">🌟</div>
                </Card>
              </div>

              <Button
                onClick={() => setCurrentPhase('character')}
                className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white text-xl py-4 px-12 rounded-2xl font-black shadow-xl border-3 border-yellow-400 hover:scale-105 transition-all duration-300 group shadow-orange-500/70 hover:shadow-orange-600/90 relative overflow-hidden"
              >
                {/* Sparkle effect on button */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500"></div>
                <Rocket className="h-7 w-7 mr-3 group-hover:animate-bounce drop-shadow-xl filter drop-shadow-[0_0_10px_#ffffff] relative z-10" />
                <span className="drop-shadow-xl relative z-10">{t.startAdventure}</span>
                <div className="absolute -top-1 -right-1 text-lg animate-spin opacity-80">✨</div>
                <div className="absolute -bottom-1 -left-1 text-sm animate-bounce opacity-80">🌟</div>
              </Button>
            </div>
          </div>
        )}

        {/* CHARACTER SELECT PHASE */}
        {currentPhase === 'character' && (
          <div className="h-full flex flex-col justify-center">
            <div className="text-center max-w-6xl mx-auto animate-fade-in-up px-4">
              <h1 className="text-responsive-huge font-black mb-3 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl relative">
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent blur-sm opacity-50"></span>
                {t.chooseHero}
              </h1>
              <p className="text-responsive-lg text-white mb-6 drop-shadow-2xl font-bold bg-black/40 rounded-2xl py-3 px-6 backdrop-blur-lg border-2 border-cyan-400/50 shadow-lg shadow-cyan-400/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                <span className="relative z-10">{t.chooseChampion}</span>
                <div className="absolute -top-1 -right-1 text-lg animate-spin opacity-80">✨</div>
                <div className="absolute -bottom-1 -left-1 text-sm animate-bounce opacity-80">🌟</div>
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {characters.map((character, index) => {
                  // Define character-specific colors
                  const getCharacterColors = (id: string, isSelected: boolean) => {
                    const colorSchemes = {
                      explorer: { // Wizard - Darker Blue
                        base: 'bg-gradient-to-br from-blue-800/90 to-blue-900/90',
                        selected: 'bg-gradient-to-br from-blue-700 to-blue-800 border-4 border-blue-400 shadow-2xl animate-pulse shadow-blue-400/70',
                        hover: 'hover:border-blue-400 shadow-2xl hover:shadow-blue-400/50'
                      },
                      astronaut: { // Space Reader - Space colors (dark blue, violet, black)
                        base: 'bg-gradient-to-br from-slate-800/90 via-violet-900/90 to-black/90',
                        selected: 'bg-gradient-to-br from-slate-700 via-violet-800 to-black border-4 border-violet-400 shadow-2xl animate-pulse shadow-violet-400/70',
                        hover: 'hover:border-violet-400 shadow-2xl hover:shadow-violet-400/50'
                      },
                      hero: { // Book Hero - Pleasing warm colors
                        base: 'bg-gradient-to-br from-orange-500/90 to-red-600/90',
                        selected: 'bg-gradient-to-br from-orange-400 to-red-500 border-4 border-orange-300 shadow-2xl animate-pulse shadow-orange-400/70',
                        hover: 'hover:border-orange-400 shadow-2xl hover:shadow-orange-400/50'
                      },
                      princess: { // Story Princess - Green
                        base: 'bg-gradient-to-br from-green-500/90 to-emerald-600/90',
                        selected: 'bg-gradient-to-br from-green-400 to-emerald-500 border-4 border-green-300 shadow-2xl animate-pulse shadow-green-400/70',
                        hover: 'hover:border-green-400 shadow-2xl hover:shadow-green-400/50'
                      }
                    };
                    
                    const scheme = colorSchemes[id as keyof typeof colorSchemes];
                    if (isSelected) {
                      return scheme.selected;
                    }
                    return `${scheme.base} backdrop-blur-lg border-4 border-white/70 ${scheme.hover}`;
                  };

                  return (
                    <Card 
                      key={character.id}
                      onClick={() => handleCharacterSelect(character.id)}
                      className={`p-8 cursor-pointer transition-all duration-500 hover:scale-110 relative overflow-hidden ${getCharacterColors(character.id, selectedCharacter === character.id)}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                    {/* Sparkle effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="text-8xl mb-4 animate-bounce drop-shadow-2xl filter drop-shadow-[0_0_20px_currentColor] relative z-10" style={{ animationDelay: `${index * 0.2}s` }}>
                      {character.emoji}
                    </div>
                    <h3 className="text-xl font-black mb-2 drop-shadow-lg relative z-10 text-white">
                      {character.name}
                    </h3>
                    <p className="text-sm font-bold drop-shadow-lg relative z-10 text-white/90">
                      {character.power}
                    </p>
                    {selectedCharacter === character.id && (
                      <div className="mt-4 text-2xl animate-bounce text-white drop-shadow-xl font-black relative z-10">✨ SELECTED! ✨</div>
                    )}
                    {/* Corner sparkles */}
                    <div className="absolute -top-2 -right-2 text-2xl animate-spin opacity-70">✨</div>
                    <div className="absolute -bottom-2 -left-2 text-xl animate-pulse opacity-70">🌟</div>
                    <div className="absolute -top-2 -left-2 text-lg animate-bounce opacity-60">💫</div>
                    <div className="absolute -bottom-2 -right-2 text-lg animate-spin opacity-60">⭐</div>
                  </Card>
                  );
                })}
              </div>

              {selectedCharacter && (
                <Button
                  onClick={() => setCurrentPhase('name')}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl py-6 px-12 rounded-2xl font-bold shadow-2xl border-4 border-green-300 hover:scale-110 transition-all duration-300 animate-fade-in-up"
                >
                  <Crown className="h-8 w-8 mr-4" />
                  CONTINUE QUEST! 🚀
                </Button>
              )}
            </div>
          </div>
        )}

        {/* NAME INPUT PHASE */}
        {currentPhase === 'name' && (
          <div className="h-full flex flex-col justify-center p-4">
            <Card className="p-6 bg-gradient-to-br from-white/95 to-gray-100/95 backdrop-blur-xl border-4 border-cyan-400 shadow-2xl rounded-2xl max-w-lg mx-auto animate-fade-in-up shadow-cyan-400/70 relative overflow-hidden">
              {/* Sparkle overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 text-lg animate-sparkle opacity-60">✨</div>
                <div className="absolute top-8 right-8 text-sm animate-pulse opacity-70">🌟</div>
                <div className="absolute bottom-6 left-6 text-sm animate-bounce opacity-60">💫</div>
                <div className="absolute bottom-4 right-4 text-lg animate-spin opacity-70">⭐</div>
                <div className="absolute top-1/2 left-2 text-xs animate-sparkle opacity-50" style={{animationDelay: '1s'}}>✨</div>
                <div className="absolute top-1/3 right-2 text-xs animate-pulse opacity-50" style={{animationDelay: '0.5s'}}>🌟</div>
              </div>
              
              <div className="text-center relative z-10">
                <div className="text-8xl mb-6 animate-bounce drop-shadow-2xl filter drop-shadow-[0_0_20px_currentColor]">
                  {characters.find(c => c.id === selectedCharacter)?.emoji}
                </div>
                
                <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent blur-sm opacity-50"></span>
                  {t.heroRegistration}
                </h1>
                
                <p className="text-2xl text-gray-800 mb-8 drop-shadow-lg font-bold">
                  {t.heroNameQuestion} {characters.find(c => c.id === selectedCharacter)?.name} mo?
                </p>

                <div className="space-y-8">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder={t.enterHeroName}
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="text-center text-3xl py-8 bg-gradient-to-r from-purple-50 to-blue-50 border-4 border-purple-400 text-gray-800 placeholder:text-purple-500 backdrop-blur-sm rounded-2xl hover:border-yellow-400 focus:border-yellow-400 transition-all duration-300 font-bold shadow-xl focus:shadow-yellow-400/50"
                      onKeyPress={(e) => e.key === 'Enter' && handleMainStart()}
                      autoFocus
                      disabled={isStarting}
                    />
                    <div className="absolute -top-6 -right-6 text-4xl animate-spin drop-shadow-2xl filter drop-shadow-[0_0_15px_#fbbf24]">⭐</div>
                    <div className="absolute -bottom-6 -left-6 text-3xl animate-bounce drop-shadow-2xl filter drop-shadow-[0_0_15px_#06b6d4]">🎯</div>
                    <div className="absolute -top-6 -left-6 text-2xl animate-sparkle drop-shadow-xl opacity-80">✨</div>
                    <div className="absolute -bottom-6 -right-6 text-2xl animate-pulse drop-shadow-xl opacity-80">💫</div>
                  </div>
                  
                  <Button
                    onClick={handleMainStart}
                    disabled={!playerName.trim() || isStarting}
                    className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 text-white text-3xl py-8 rounded-2xl font-black shadow-2xl border-4 border-pink-300 hover:scale-105 transition-all duration-300 group shadow-pink-500/70 relative overflow-hidden"
                  >
                    {/* Button sparkle effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500"></div>
                    
                    {isStarting ? (
                      <>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-white mr-4 relative z-10"></div>
                        <span className="text-2xl drop-shadow-xl relative z-10">{t.launchingAdventure}</span>
                      </>
                    ) : (
                      <>
                        <Globe className="h-10 w-10 mr-4 group-hover:animate-spin drop-shadow-xl filter drop-shadow-[0_0_10px_#ffffff] relative z-10" />
                        <span className="drop-shadow-xl relative z-10">{t.beginQuest}</span>
                      </>
                    )}
                    
                    {/* Corner sparkles */}
                    <div className="absolute -top-2 -right-2 text-xl animate-sparkle opacity-80">✨</div>
                    <div className="absolute -bottom-2 -left-2 text-lg animate-bounce opacity-80">🌟</div>
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-gray-700 text-lg mb-4 font-bold drop-shadow-lg">{t.notSureName}</p>
                    <Button
                      onClick={handleGuestStart}
                      disabled={isStarting}
                      className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white text-xl py-4 px-8 rounded-xl font-bold shadow-xl border-2 border-gray-600 hover:scale-105 transition-all duration-300 drop-shadow-xl"
                    >
                      {t.quickStartAnonymous}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* EPIC LOADING SCREEN - SPARKLE EDITION! ✨ */}
      {isStarting && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-black z-50 flex items-center justify-center overflow-hidden">
          {/* Extra sparkles for loading */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({length: 30}, (_, i) => (
              <div
                key={`loading-sparkle-${i}`}
                className="absolute text-2xl animate-sparkle opacity-70"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${1.5 + Math.random() * 2}s`
                }}
              >
                {['✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 4)]}
              </div>
            ))}
          </div>
          
          <div className="text-center text-white relative z-10">
            <div className="text-9xl mb-8 animate-bounce drop-shadow-2xl filter drop-shadow-[0_0_30px_#fbbf24]">🚀</div>
            <h2 className="text-7xl font-black mb-8 bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent animate-pulse drop-shadow-2xl relative">
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent blur-lg opacity-50"></span>
              {t.portalOpening}
            </h2>
            <div className="text-3xl mb-12 text-cyan-200 font-bold drop-shadow-xl bg-black/60 rounded-2xl py-6 px-10 backdrop-blur-lg border-2 border-cyan-400/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              <span className="relative z-10">{t.preparingJourney}</span>
            </div>
            <div className="flex justify-center gap-8 mb-12">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce shadow-2xl shadow-yellow-400/70 filter drop-shadow-[0_0_15px_#fbbf24]"></div>
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-bounce delay-100 shadow-2xl shadow-pink-400/70 filter drop-shadow-[0_0_15px_#ec4899]"></div>
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce delay-200 shadow-2xl shadow-cyan-400/70 filter drop-shadow-[0_0_15px_#06b6d4]"></div>
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-bounce delay-300 shadow-2xl shadow-green-400/70 filter drop-shadow-[0_0_15px_#10b981]"></div>
            </div>
            <div className="mt-8 text-2xl text-purple-300 font-bold drop-shadow-xl bg-black/50 rounded-2xl py-6 px-10 backdrop-blur-lg border-2 border-purple-400/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              <span className="relative z-10">
                {characters.find(c => c.id === selectedCharacter)?.emoji} {playerName} ang {characters.find(c => c.id === selectedCharacter)?.name} {t.heroReady}
              </span>
              <div className="absolute -top-2 -right-2 text-xl animate-spin opacity-80">✨</div>
              <div className="absolute -bottom-2 -left-2 text-lg animate-bounce opacity-80">🌟</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};