import { useState } from 'react';

// Import project images
import techProject1 from '@/assets/projects/medbud.png';
import techProject2 from '@/assets/projects/zentigrity.png';
import techProject3 from '@/assets/projects/dermascope.png';
import techProject4 from '@/assets/projects/synapse.png';
import techProject5 from '@/assets/projects/progress.png';


interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'MediBud AI',
    description: 'AI-powered healthcare platform that provides personalized medical recommendations and symptom analysis using machine learning algorithms.',
    image: techProject1,
    link: 'https://med-bud.vercel.app/',
    color: 'bg-accent'
  },
  {
    id: 2,
    title: 'Zentigrity',
    description: 'Comprehensive wellness and mindfulness application featuring meditation guides, mood tracking, and personalized wellness plans.',
    image: techProject2,
    link: 'https://galgotiashackathon-65hd.vercel.app/',
    color: 'bg-accent'
  },
  {
    id: 3,
    title: 'DermaScope',
    description: 'Advanced dermatology analysis tool using computer vision to detect and analyze skin conditions with high accuracy.',
    image: techProject3,
    link: 'https://placeholder-dermascope.com',
    color: 'bg-accent'
  },
  {
    id: 4,
    title: 'Synapse',
    description: 'AI-powered retail supply chain management platform that combines real-time monitoring, predictive analytics, and intelligent automation to create a "self-healing" retail nervous system.',
    image: techProject4,
    link: 'https://placeholder-cryptotracker.com',
    color: 'bg-accent'
  },
  {
    id: 5,
    title: 'Work In Progress',
    description: 'IoT-based home automation platform that integrates multiple smart devices with voice control and machine learning optimization.',
    image: techProject5,
    link: 'https://placeholder-smarthome.com',
    color: 'bg-accent'
  },
  {
    id: 6,
    title: 'Work In Progress',
    description: 'Interactive data visualization dashboard for business intelligence with real-time reporting and predictive analytics capabilities.',
    image: techProject5,
    link: 'https://placeholder-dataviz.com',
    color: 'bg-accent'
  }
];

const categories = ['All'];

const ProjectGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = projects;

  return (
    <div className="section-padding">
      <div className="container-wide">
        {/* Filter Button - Only All */}
        <div className="flex justify-center mb-16">
          <button
            className="px-6 py-2 rounded-full bg-accent text-accent-foreground"
            disabled
          >
            All
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="relative w-full aspect-[4/3] cursor-pointer perspective-1000 fade-in visible"
              style={{ animationDelay: `${(index % 4) * 100}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div 
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  hoveredProject === project.id ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front of the card - Project Image */}
                <div className="absolute w-full h-full backface-hidden overflow-hidden rounded-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay with title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-heading-sm mb-2 text-white">{project.title}</h3>
                      <p className="text-body-sm text-gray-200 opacity-90">Hover to see details</p>
                    </div>
                  </div>
                </div>
                
                {/* Back of the card - Project Details */}
                <div className="absolute w-full h-full backface-hidden bg-surface-secondary rounded-lg p-6 flex flex-col justify-center rotate-y-180 border border-accent/20">
                  <div className="text-center">
                    <h3 className="text-heading-sm mb-4 text-accent">{project.title}</h3>
                    <p className="text-body-sm text-text-secondary mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Visit Project Button */}
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground rounded-lg font-orbitron font-bold text-sm transition-all duration-300 hover:bg-accent-secondary hover:shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit Project
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid;