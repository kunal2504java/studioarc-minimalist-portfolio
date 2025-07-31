import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const changingTexts = [
    { word: '[CODE]', color: 'text-display-accent' },
    { word: '[INNOVATION]', color: 'text-display-accent' },
    { word: '[SOLUTIONS]', color: 'text-display-accent' },
    { word: '[EXPERIENCE]', color: 'text-display-accent' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % changingTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen bg-background flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-accent animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full border border-accent-secondary animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-silver opacity-20 animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <div className="space-y-6">
          <h1 className="text-display leading-tight">
            MORE THAN CODE
          </h1>
          
          <div className="relative h-32 flex items-center justify-center">
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