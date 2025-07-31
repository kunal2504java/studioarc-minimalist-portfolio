import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { ArrowLeft, MapPin, Calendar, Users } from 'lucide-react';

const ProjectDetail = () => {
  const { slug } = useParams();

  // Mock project data - in a real app, this would come from an API or database
  const project = {
    title: 'Minimalist Residential Complex',
    category: 'Residential',
    year: '2024',
    location: 'Brooklyn, NY',
    client: 'Urban Living Corp',
    size: '25,000 sq ft',
    status: 'Completed',
    description: `This residential complex represents a new approach to urban living, where minimalist design meets functional elegance. The project consists of 48 units arranged in three interconnected buildings, each designed to maximize natural light and cross-ventilation while maintaining privacy and comfort.

The design philosophy centers on the concept of "essential living" - providing residents with everything they need while eliminating unnecessary complexity. Clean lines, neutral palettes, and carefully curated materials create spaces that feel both sophisticated and welcoming.

Key features include floor-to-ceiling windows, private balconies, communal rooftop gardens, and a shared workspace that fosters community interaction. The project has received LEED Gold certification for its sustainable design features, including rainwater harvesting, solar panels, and high-performance insulation systems.`,
    images: [
      'https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1200&h=800&fit=crop'
    ]
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Back Button */}
      <div className="pt-32 pb-8">
        <div className="container-wide">
          <Link 
            to="/projects" 
            className="inline-flex items-center space-x-2 text-text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <section className="mb-16">
        <div className="container-wide">
          <div className="aspect-[16/9] rounded-lg overflow-hidden">
            <img 
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-display mb-6 fade-in visible">
                {project.title}
              </h1>
              
              <div className="prose prose-lg max-w-none text-body fade-in visible stagger-delay-1">
                {project.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="fade-in visible stagger-delay-2">
              <div className="bg-surface-secondary p-8 rounded-lg">
                <h3 className="text-heading-md mb-6">Project Details</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <Calendar className="text-accent mt-1" size={20} />
                    <div>
                      <p className="text-heading-sm">Year</p>
                      <p className="text-body-sm">{project.year}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-accent mt-1" size={20} />
                    <div>
                      <p className="text-heading-sm">Location</p>
                      <p className="text-body-sm">{project.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Users className="text-accent mt-1" size={20} />
                    <div>
                      <p className="text-heading-sm">Client</p>
                      <p className="text-body-sm">{project.client}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-heading-sm mb-1">Size</p>
                    <p className="text-body-sm">{project.size}</p>
                  </div>
                  
                  <div>
                    <p className="text-heading-sm mb-1">Status</p>
                    <p className="text-body-sm">{project.status}</p>
                  </div>
                  
                  <div>
                    <p className="text-heading-sm mb-1">Category</p>
                    <p className="text-body-sm">{project.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="section-padding bg-surface-secondary">
        <div className="container-wide">
          <h2 className="text-heading-xl mb-12 text-center fade-in visible">
            Project Gallery
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.images.slice(1).map((image, index) => (
              <div 
                key={index} 
                className={`aspect-[4/3] rounded-lg overflow-hidden fade-in visible stagger-delay-${index + 1}`}
              >
                <img 
                  src={image}
                  alt={`${project.title} - Image ${index + 2}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="section-padding">
        <div className="container-wide text-center">
          <h3 className="text-heading-lg mb-8 fade-in visible">
            Explore More Projects
          </h3>
          <Link to="/projects" className="button-primary fade-in visible stagger-delay-1">
            View All Projects
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;