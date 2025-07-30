import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Volume2, Palette, Type, Globe, Moon, Sun, Zap } from "lucide-react";

interface SettingsProps {
  onBack: () => void;
}

interface SettingsData {
  // Accessibility
  speechRate: number;
  speechVolume: number;
  fontSize: 'small' | 'medium' | 'large' | 'xl';
  highContrast: boolean;
  reducedMotion: boolean;
  
  // Inclusivity
  language: 'filipino' | 'english';
  
  // Learning Support
  showPhonetics: boolean;
  visualCues: boolean;
  hapticFeedback: boolean;
}

const defaultSettings: SettingsData = {
  speechRate: 0.8,
  speechVolume: 0.9,
  fontSize: 'medium',
  highContrast: false,
  reducedMotion: false,
  language: 'filipino',
  showPhonetics: false,
  visualCues: true,
  hapticFeedback: false
};

export const Settings = ({ onBack }: SettingsProps) => {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('kidz-literacy-settings');
    if (saved) {
      setSettings({ ...defaultSettings, ...JSON.parse(saved) });
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = (newSettings: SettingsData) => {
    setSettings(newSettings);
    localStorage.setItem('kidz-literacy-settings', JSON.stringify(newSettings));
    
    // Apply settings to document for immediate effect
    applySettings(newSettings);
  };

  // Apply settings to the document
  const applySettings = (settings: SettingsData) => {
    const root = document.documentElement;
    
    // Font size - Use CSS custom properties for better scaling
    const fontScales = { 
      small: '0.875', 
      medium: '1', 
      large: '1.25', 
      xl: '1.5' 
    };
    root.style.setProperty('--text-scale', fontScales[settings.fontSize]);
    
    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  };

  const updateSetting = <K extends keyof SettingsData>(key: K, value: SettingsData[K]) => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);
  };

  return (
    <div className="fit-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-2">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        {/* Header */}
        <Card className="p-4 mb-3 shadow-card-hover flex-shrink-0">
          <div className="flex items-center gap-4 mb-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="h-10 w-10"
              aria-label="Bumalik sa dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-responsive-2xl font-bold text-primary">⚙️ Mga Setting</h1>
              <p className="text-responsive-sm text-muted-foreground">Ayusin para sa'yo</p>
            </div>
          </div>
        </Card>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Accessibility Settings */}
              <Card className="p-4 shadow-card-hover">
                <h2 className="text-responsive-lg font-bold text-primary mb-3 flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Accessibility
                </h2>
              
              {/* Speech Rate */}
              <div className="mb-4">
                <label className="block text-responsive-sm font-medium mb-2">
                  Bilis ng Salita: {settings.speechRate.toFixed(1)}x
                </label>
                <Slider
                  value={[settings.speechRate]}
                  onValueChange={([value]) => updateSetting('speechRate', value)}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  className="w-full"
                  aria-label="Ayusin ang bilis ng salita"
                />
                <div className="flex justify-between text-responsive-sm text-muted-foreground mt-1">
                  <span>Mabagal</span>
                  <span>Mabilis</span>
                </div>
              </div>

              {/* Speech Volume */}
              <div className="mb-4">
                <label className="block text-responsive-sm font-medium mb-2">
                  Lakas ng Tunog: {Math.round(settings.speechVolume * 100)}%
                </label>
                <Slider
                  value={[settings.speechVolume]}
                  onValueChange={([value]) => updateSetting('speechVolume', value)}
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  className="w-full"
                aria-label="Ayusin ang lakas ng tunog"
              />
            </div>

            {/* Font Size */}
            <div className="mb-4">
              <label className="block text-responsive-sm font-medium mb-2">
                Laki ng Titik
              </label>
              <Select 
                value={settings.fontSize} 
                onValueChange={(value: SettingsData['fontSize']) => updateSetting('fontSize', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Maliit</SelectItem>
                  <SelectItem value="medium">Tamang laki</SelectItem>
                  <SelectItem value="large">Malaki</SelectItem>
                  <SelectItem value="xl">Napaka laki</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Switches */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-responsive-sm font-medium">High Contrast</label>
                  <p className="text-xs text-muted-foreground">Para sa mas malinaw na pagbasa</p>
                </div>
                <Switch
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                  aria-label="I-on ang high contrast"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-responsive-sm font-medium">Reduce Motion</label>
                  <p className="text-xs text-muted-foreground">Bawasan ang mga galaw at animation</p>
                </div>
                <Switch
                  checked={settings.reducedMotion}
                  onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                  aria-label="Bawasan ang mga galaw"
                />
              </div>
            </div>
          </Card>

              {/* Language Settings */}
              <Card className="p-4 shadow-card-hover">
                <h2 className="text-responsive-lg font-bold text-primary mb-3 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Wika
                </h2>

                {/* Language Selection */}
                <div className="mb-4">
                  <label className="block text-responsive-sm font-medium mb-2">
                    Pangunahing Wika
                  </label>
                  <Select 
                    value={settings.language} 
                    onValueChange={(value: SettingsData['language']) => updateSetting('language', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="filipino">🇵🇭 Filipino/Tagalog</SelectItem>
                      <SelectItem value="english">🇺🇸 English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>
            </div>

            {/* Learning Support Settings */}
            <Card className="p-4 shadow-card-hover">
              <h2 className="text-responsive-lg font-bold text-primary mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Tulong sa Pag-aaral
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-responsive-sm font-medium">Ipakita ang Phonetics</label>
                    <p className="text-xs text-muted-foreground">Magtuturo kung paano bigkasin</p>
                  </div>
                  <Switch
                    checked={settings.showPhonetics}
                    onCheckedChange={(checked) => updateSetting('showPhonetics', checked)}
                    aria-label="Ipakita ang phonetics"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-responsive-sm font-medium">Visual Cues</label>
                    <p className="text-xs text-muted-foreground">Mga kulay at animation para sa gabay</p>
                  </div>
                  <Switch
                    checked={settings.visualCues}
                    onCheckedChange={(checked) => updateSetting('visualCues', checked)}
                    aria-label="I-on ang visual cues"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-responsive-sm font-medium">Haptic Feedback</label>
                    <p className="text-xs text-muted-foreground">Vibration sa mobile devices</p>
                  </div>
                  <Switch
                    checked={settings.hapticFeedback}
                    onCheckedChange={(checked) => updateSetting('hapticFeedback', checked)}
                    aria-label="I-on ang haptic feedback"
                  />
                </div>
              </div>
            </Card>

            {/* Test Area */}
            <Card className="p-4 shadow-card-hover text-center lg:col-span-2">
              <h3 className="text-responsive-lg font-bold mb-3">🧪 Test mo ang Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-3 text-responsive-sm">Pakinggan kung tama na ang tunog:</p>
                  <Button 
                    variant="magic" 
                    onClick={() => {
                      // Try to play the soundtest.mp3 file first
                      const audio = new Audio('/soundtest.mp3');
                      audio.volume = settings.speechVolume;
                      audio.playbackRate = settings.speechRate;
                      
                      audio.play().catch(() => {
                        // Fallback to TTS if soundtest.mp3 is not available
                        console.log('soundtest.mp3 not found, using TTS fallback');
                        const utterance = new SpeechSynthesisUtterance("Kumusta! Ang ganda ng settings mo!");
                        utterance.rate = settings.speechRate;
                        utterance.volume = settings.speechVolume;
                        utterance.lang = 'tl';
                        speechSynthesis.speak(utterance);
                      });
                    }}
                    className="px-6 py-3"
                  >
                    🔊 Test Audio
                  </Button>
                </div>
                <div>
                  <p className="mb-3 text-responsive-sm">I-testing ang vibration:</p>
                  <Button 
                    variant="magic" 
                    onClick={() => {
                      if (settings.hapticFeedback && 'vibrate' in navigator) {
                        navigator.vibrate([100, 50, 100, 50, 200]);
                      } else if (!('vibrate' in navigator)) {
                        alert('Haptic feedback hindi available sa browser mo');
                      } else {
                        alert('I-enable muna ang haptic feedback sa settings');
                      }
                    }}
                    className="px-6 py-3"
                    disabled={!settings.hapticFeedback && !('vibrate' in navigator)}
                  >
                    📳 Test ng Vibration
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
