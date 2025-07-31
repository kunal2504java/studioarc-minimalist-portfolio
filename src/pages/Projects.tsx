import Navigation from '@/components/Navigation';
import ProjectGrid from '@/components/ProjectGrid';

const Projects = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-surface-secondary">
        <div className="container-narrow text-center">
          <h1 className="text-display mb-6 fade-in visible">
            Our Projects
          </h1>
          <p className="text-body-lg fade-in visible stagger-delay-1">
            Discover our portfolio of innovative architectural solutions that shape environments and inspire communities.
          </p>
        </div>
      </section>

      {/* Project Grid */}
      <ProjectGrid />
    </div>
  );
};

export default Projects;