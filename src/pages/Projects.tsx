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
            My Projects
          </h1>
          <p className="text-body-lg fade-in visible stagger-delay-1">
            Curious to see my code in action? I thrive on building scalable, data-intensive applications. Below are some of the projects where I've put my skills in AI, system design, and full-stack development to the test
          </p>
        </div>
      </section>

      {/* Project Grid */}
      <ProjectGrid />
    </div>
  );
};

export default Projects;