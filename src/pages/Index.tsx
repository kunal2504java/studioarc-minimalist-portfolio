import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      
      {/* About Section */}
      <section className="section-padding bg-surface-secondary">
        <div className="container-narrow text-center">
          <h2 className="text-heading-xl mb-8 fade-in visible">
            Crafting Digital Excellence
          </h2>
          <p className="text-body-lg max-w-3xl mx-auto fade-in visible stagger-delay-1 text-text-secondary">
            Full-stack developer specializing in modern web technologies, cloud solutions, 
            and innovative digital experiences. I transform ideas into powerful, scalable applications 
            that drive business growth and user engagement.
          </p>
        </div>
      </section>

      {/* Featured Projects Teaser */}
      <section className="section-padding">
        <div className="container-wide text-center">
          <h2 className="text-heading-xl mb-4 fade-in visible">
            Featured Projects
          </h2>
          <p className="text-body mb-16 fade-in visible stagger-delay-1 text-text-secondary">
            Explore my latest development achievements
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((index) => (
              <div key={index} className={`aspect-[4/3] bg-surface-secondary rounded border border-accent/20 overflow-hidden fade-in visible stagger-delay-${index} hover:border-accent/50 transition-all duration-300`}>
                <img 
                  src={`https://images.unsplash.com/photo-${index === 1 ? '1551288049-2f47ba94d71d' : index === 2 ? '1518932945647-7a1c969f8be2' : '1461749280684-dccba630e2f6'}?w=600&h=450&fit=crop`}
                  alt={`Featured project ${index}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          
          <a href="/projects" className="button-primary inline-block">
            View All Projects
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;
