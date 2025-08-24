import { useState } from 'react';

// Import project images
import techProject1 from '@/assets/projects/medbud.png';
import techProject2 from '@/assets/projects/zentigrity.png';
import techProject3 from '@/assets/projects/dermascope.png';
import techProject4 from '@/assets/projects/synapse.png';

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
    link: 'https://medbud-seven.vercel.app/',
    color: 'bg-accent'
  },
  {
    id: 2,
    title: 'Zentigrity',
    description: 'Comprehensive wellness and mindfulness application featuring meditation guides, mood tracking, and personalized wellness plans.',
    image: techProject2,
    link: 'https://placeholder-zentigrity.com',
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
    title: 'SmartHome Hub',
    description: 'IoT-based home automation platform that integrates multiple smart devices with voice control and machine learning optimization.',
    image: techProject1,
    link: 'https://placeholder-smarthome.com',
    color: 'bg-accent'
  },
  {
    id: 6,
    title: 'DataViz Analytics',
    description: 'Interactive data visualization dashboard for business intelligence with real-time reporting and predictive analytics capabilities.',
    image: techProject2,
    link: 'https://placeholder-dataviz.com',
    color: 'bg-accent'
  }
];

const categories = ['All'];

const ProjectGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

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
            <a 
              key={project.id} 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-thumbnail group aspect-[4/3] fade-in visible stagger-delay-${(index % 4) + 1}`}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="image-overlay">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-black">
                  <h3 className="text-heading-sm mb-3">{project.title}</h3>
                  <p className="text-body-sm">{project.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid;