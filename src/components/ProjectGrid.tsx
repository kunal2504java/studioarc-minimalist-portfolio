import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  slug: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Minimalist Residential Complex',
    category: 'Residential',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=800&h=600&fit=crop',
    slug: 'minimalist-residential-complex'
  },
  {
    id: 2,
    title: 'Glass House Retreat',
    category: 'Residential',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
    slug: 'glass-house-retreat'
  },
  {
    id: 3,
    title: 'Urban Office Tower',
    category: 'Commercial',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?w=800&h=600&fit=crop',
    slug: 'urban-office-tower'
  },
  {
    id: 4,
    title: 'Community Pavilion',
    category: 'Public Spaces',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop',
    slug: 'community-pavilion'
  },
  {
    id: 5,
    title: 'Modern Art Gallery',
    category: 'Commercial',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=800&h=600&fit=crop',
    slug: 'modern-art-gallery'
  },
  {
    id: 6,
    title: 'Sustainable Housing',
    category: 'Residential',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=600&fit=crop',
    slug: 'sustainable-housing'
  }
];

const categories = ['All', 'Residential', 'Commercial', 'Public Spaces'];

const ProjectGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="section-padding">
      <div className="container-wide">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-surface-secondary text-text-secondary hover:bg-hover'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Link 
              key={project.id} 
              to={`/projects/${project.slug}`}
              className={`project-thumbnail group aspect-[4/3] fade-in visible stagger-delay-${(index % 4) + 1}`}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="image-overlay">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-caption mb-2">{project.category} • {project.year}</p>
                  <h3 className="text-heading-sm">{project.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid;