import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import DottedBackground from '../components/DottedBackground';

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  const changingTexts = [
    { word: '[CODE]', color: 'text-purple-500' },
    { word: '[INNOVATION]', color: 'text-display-accent' },
    { word: '[SOLUTIONS]', color: 'text-display-accent' },
    { word: '[EXPERIENCE]', color: 'text-display-accent' }
  ];

  const fullText = 'MORE THAN CODE';
  
  // Typewriter effect for main heading
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 100); // Adjust speed here (lower = faster)

    return () => clearInterval(typingInterval);
  }, []);

  // Start the changing text animation only after typing is complete
  useEffect(() => {
    if (!isTypingComplete) return;
    
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % changingTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isTypingComplete]);

  return (
    <div className="relative h-screen bg-background flex items-center justify-center overflow-hidden">
      {/* Dotted Background */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <DottedBackground />
      </div>
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-background/5 backdrop-blur-[0.5px]" style={{ zIndex: 2 }}></div>

      {/* Main content */}
      <div className="relative text-center max-w-6xl mx-auto px-6" style={{ zIndex: 10 }}>
        <div className="space-y-6">
          <h1 className="text-display leading-tight">
            <span className="inline-block">
              {typedText.split(' ').map((word, index) => (
                <span key={index} className="mr-4">
                  {word === 'CODE' ? (
                    <span className="text-purple-500">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              ))}
              <span className="animate-pulse text-purple-500">|</span>
            </span>
          </h1>
          
          {isTypingComplete && (
            <div className="relative h-32 flex items-center justify-center animate-fade-in">
              <span className="text-display mr-6">—IT'S </span>
              <div className="relative overflow-hidden">
                {changingTexts.map((text, index) => (
                  <div
                    key={index}
                    className={`absolute transition-all duration-500 ${
                      index === currentTextIndex 
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-0 transform translate-y-full'
                    }`}
                  >
                    <span className={text.color}>
                      {text.word}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="text-xl md:text-2xl text-text-secondary mt-12 font-inter max-w-3xl mx-auto leading-relaxed">
          Full-stack developer crafting digital experiences with cutting-edge technology
        </p>
      </div>

      {/* Animated arrow */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-accent"></div>
          <ChevronDown 
            size={32} 
            className="text-accent animate-bounce-arrow cursor-pointer hover:text-accent-secondary transition-colors"
          />
          <div className="w-px h-12 bg-gradient-to-t from-transparent to-accent"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;