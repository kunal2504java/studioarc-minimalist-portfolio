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
      {/* Flowing tube background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          {/* Flowing metallic tubes */}
          <defs>
            <linearGradient id="tubeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(192,192,192,0.8)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="rgba(160,160,160,0.7)" />
            </linearGradient>
            <linearGradient id="tubeGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(180,180,180,0.6)" />
              <stop offset="50%" stopColor="rgba(220,220,220,0.8)" />
              <stop offset="100%" stopColor="rgba(140,140,140,0.5)" />
            </linearGradient>
          </defs>
          
          {/* Main flowing tubes */}
          <path 
            d="M-200,200 Q400,100 800,300 T1600,250 Q1800,200 2000,400" 
            stroke="url(#tubeGradient1)" 
            strokeWidth="40" 
            fill="none" 
            opacity="0.7"
            className="animate-pulse"
            style={{animationDuration: '4s'}}
          />
          <path 
            d="M-100,600 Q300,500 700,700 T1500,650 Q1700,600 1900,800" 
            stroke="url(#tubeGradient2)" 
            strokeWidth="35" 
            fill="none" 
            opacity="0.6"
            className="animate-pulse"
            style={{animationDuration: '6s', animationDelay: '1s'}}
          />
          <path 
            d="M200,900 Q600,800 1000,1000 T1800,950 Q2000,900 2200,1100" 
            stroke="url(#tubeGradient1)" 
            strokeWidth="30" 
            fill="none" 
            opacity="0.5"
            className="animate-pulse"
            style={{animationDuration: '5s', animationDelay: '2s'}}
          />
          
          {/* Additional curved elements */}
          <ellipse cx="300" cy="200" rx="60" ry="20" fill="url(#tubeGradient1)" opacity="0.4" className="animate-pulse" style={{animationDuration: '3s'}} />
          <ellipse cx="1200" cy="800" rx="80" ry="25" fill="url(#tubeGradient2)" opacity="0.3" className="animate-pulse" style={{animationDuration: '4s', animationDelay: '1.5s'}} />
          <ellipse cx="1600" cy="300" rx="50" ry="15" fill="url(#tubeGradient1)" opacity="0.5" className="animate-pulse" style={{animationDuration: '2.5s', animationDelay: '0.5s'}} />
        </svg>
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