import { useState } from 'react';

interface SkillCardProps {
  name: string;
  icon: string;
  description: string;
  level: string;
  color: string;
}

const SkillCard = ({ name, icon, description, level, color }: SkillCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-48 cursor-pointer perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front of the card */}
        <div className="absolute w-full h-full backface-hidden bg-surface-secondary rounded-lg p-6 flex flex-col items-center justify-center border border-border">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${color}`}>
            <img 
              src={icon} 
              alt={`${name} icon`} 
              className="w-10 h-10 object-contain"
            />
          </div>
          <h3 className="text-heading-md text-center">{name}</h3>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className="bg-accent h-2.5 rounded-full transition-all duration-300" 
              style={{ width: level }}
            ></div>
          </div>
        </div>
        
        {/* Back of the card */}
        <div className="absolute w-full h-full backface-hidden bg-surface-secondary rounded-lg p-6 flex flex-col items-center justify-center rotate-y-180 border border-border">
          <p className="text-text-secondary text-center text-sm">{description}</p>
          <div className="mt-4 w-full">
            <div className="text-xs text-text-secondary mb-1">Proficiency</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="bg-accent h-2.5 rounded-full transition-all duration-300" 
                style={{ width: level }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
