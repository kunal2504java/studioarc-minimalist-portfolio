import { useEffect } from 'react';
import SkillCard from './SkillCard';

// Import skill icons
import javaIcon from '@/assets/icons/java.png';
import pythonIcon from '@/assets/icons/python.png';
import sqlIcon from '@/assets/icons/sql.png';
import solidityIcon from '@/assets/icons/solidity.png';
import html5Icon from '@/assets/icons/html.png';
import css3Icon from '@/assets/icons/css.png';
import javascriptIcon from '@/assets/icons/javascript.png';
import nodejsIcon from '@/assets/icons/nodejs.png';
import typescriptIcon from '@/assets/icons/typescript.png';

// Add custom styles for the flip animation
const addFlipStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .perspective-1000 {
      perspective: 1000px;
    }
    .transform-style-preserve-3d {
      transform-style: preserve-3d;
    }
    .backface-hidden {
      backface-visibility: hidden;
    }
    .rotate-y-180 {
      transform: rotateY(180deg);
    }
    .transition-transform-500 {
      transition: transform 0.5s;
    }
  `;
  document.head.appendChild(style);
};

const skills = [
  {
    name: 'JAVA',
    icon: javaIcon,
    description: 'Object-Oriented Programming, Spring Framework, Enterprise Applications',
    level: '90%',
    color: 'bg-orange-100 text-orange-500',
  },
  {
    name: 'Python',
    icon: pythonIcon,
    description: 'Data Science, Machine Learning, Web Development, Automation',
    level: '85%',
    color: 'bg-blue-100 text-blue-500',
  },
  {
    name: 'SQL',
    icon: sqlIcon,
    description: 'Database Design, Query Optimization, Data Analysis',
    level: '80%',
    color: 'bg-indigo-100 text-indigo-500',
  },
  {
    name: 'Solidity',
    icon: solidityIcon,
    description: 'Smart Contracts, DeFi, Blockchain Development',
    level: '75%',
    color: 'bg-gray-100 text-gray-600',
  },
  {
    name: 'HTML5',
    icon: html5Icon,
    description: 'Semantic HTML5, Web Accessibility Standards, SEO Best Practices',
    level: '90%',
    color: 'bg-orange-100 text-orange-500',
  },
  {
    name: 'CSS3',
    icon: css3Icon,
    description: 'Responsive Design, Flexbox, Grid, Animations, Preprocessors (SASS/SCSS)',
    level: '85%',
    color: 'bg-blue-100 text-blue-500',
  },
  {
    name: 'Javascript',
    icon: javascriptIcon,
    description: 'ES6+, DOM Manipulation, Async/Await, Functional Programming',
    level: '85%',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    name: 'Node.js',
    icon: nodejsIcon,
    description: 'Express, RESTful APIs, Authentication, Database Integration',
    level: '80%',
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'TypeScript',
    icon: typescriptIcon,
    description: 'Type System, Interfaces, Generics, Type Inference',
    level: '80%',
    color: 'bg-blue-100 text-blue-600',
  },
];

const SkillsSection = () => {
  useEffect(() => {
    addFlipStyles();
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container-narrow text-center mb-16">
        <h2 className="text-display-sm md:text-display mb-4">My Skills</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Here are the technologies and tools I'm proficient in. Hover over each card to see more details.
        </p>
      </div>
      
      <div className="container-wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              name={skill.name}
              icon={skill.icon}
              description={skill.description}
              level={skill.level}
              color={skill.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
