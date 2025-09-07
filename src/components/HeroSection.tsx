import { useState, useEffect } from 'react';
import { ChevronDown, Download, ExternalLink } from 'lucide-react';
import DottedBackground from '../components/DottedBackground';

const HeroSection = () => {
  const [firstLineText, setFirstLineText] = useState('');
  const [secondLineText, setSecondLineText] = useState('');
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showThirdLine, setShowThirdLine] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  const firstLine = 'Disruptive ideas';
  const secondLine = 'Reckless energy.';
  const thirdLine = 'Pure hustle.';
  
  // Typewriter effect for main heading
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= firstLine.length) {
        setFirstLineText(firstLine.slice(0, currentIndex));
        currentIndex++;
      } else if (currentIndex <= firstLine.length + secondLine.length) {
        if (!showSecondLine) {
          setShowSecondLine(true);
        }
        setSecondLineText(secondLine.slice(0, currentIndex - firstLine.length));
        currentIndex++;
      } else {
        setShowThirdLine(true);
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 100); // Adjust speed here (lower = faster)

    return () => clearInterval(typingInterval);
  }, [showSecondLine]);



  return (
    <div className="relative min-h-screen py-20 bg-background flex items-center justify-center overflow-hidden">
      {/* Dotted Background */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <DottedBackground />
      </div>
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" style={{ zIndex: 2 }}></div>

      {/* Main content */}
      <div className="relative text-center max-w-6xl mx-auto px-6" style={{ zIndex: 10 }}>
        
        {/* Top section - Photo and buttons */}
        <div className="mb-16 space-y-8">
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-accent/30 bg-surface-secondary shadow-lg">
                <img 
                  src="/profile.png" 
                  alt="Kunal - Profile Photo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/20 via-accent-secondary/20 to-accent/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="absolute -top-3 -right-3 w-6 h-6 border-2 border-accent rounded-full bg-background shadow-sm"></div>
              <div className="absolute -bottom-3 -left-3 w-4 h-4 border-2 border-accent-secondary rounded-full bg-background shadow-sm"></div>
            </div>
          </div>

          {/* About text */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              Full-stack developer specializing in modern web technologies, cloud solutions, 
              and innovative digital experiences. I transform ideas into powerful, scalable applications 
              that drive business growth and user engagement.
            </p>
            
            <p className="text-base text-text-tertiary leading-relaxed">
              With expertise in Java, Python React, Node.js, SQL and cloud platforms, I craft end-to-end solutions 
              that seamlessly blend cutting-edge technology with exceptional user experience.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/resume.pdf" 
              download="Kunal_Pratap_Singh_Resume.pdf"
              className="button-primary inline-flex items-center gap-2 justify-center"
            >
              <Download size={20} />
              Download Resume
            </a>
            
            <a 
              href="/projects" 
              className="button-secondary inline-flex items-center gap-2 justify-center"
            >
              <ExternalLink size={20} />
              View Projects
            </a>
          </div>
        </div>

        {/* Bottom section - Animated text */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
            {/* First line */}
            <div className="block">
              <span className="inline-block">
                {firstLineText}
                {isTyping && !showSecondLine && <span className="animate-pulse text-accent">|</span>}
              </span>
            </div>
            
            {/* Second line */}
            {showSecondLine && (
              <div className="block mt-4">
                <span className="inline-block">
                  {secondLineText}
                  {isTyping && !showThirdLine && <span className="animate-pulse text-accent">|</span>}
                </span>
              </div>
            )}
            
            {/* Third line */}
            {showThirdLine && (
              <div className="block mt-4">
                <span className="text-accent">{thirdLine}</span>
              </div>
            )}
          </h1>
          
          {showThirdLine && (
            <div className="relative h-32 flex items-center justify-center animate-fade-in">
              <div className="text-2xl md:text-3xl lg:text-4xl text-center">
                <span className="text-accent font-semibold">Ready to build something amazing?</span>
              </div>
            </div>
          )}
        </div>
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