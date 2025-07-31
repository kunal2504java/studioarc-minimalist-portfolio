import Navigation from '@/components/Navigation';
import HeroSlideshow from '@/components/HeroSlideshow';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSlideshow />
      
      {/* About Section */}
      <section className="section-padding bg-surface-secondary">
        <div className="container-narrow text-center">
          <h2 className="text-heading-xl mb-8 fade-in visible">
            Designing the Future
          </h2>
          <p className="text-body-lg max-w-3xl mx-auto fade-in visible stagger-delay-1">
            Studio Arc is an award-winning architecture firm dedicated to creating innovative, 
            sustainable, and inspiring spaces. Our team combines creative vision with technical 
            expertise to deliver exceptional architectural solutions that enhance the way people live, work, and connect.
          </p>
        </div>
      </section>

      {/* Featured Projects Teaser */}
      <section className="section-padding">
        <div className="container-wide text-center">
          <h2 className="text-heading-xl mb-4 fade-in visible">
            Featured Projects
          </h2>
          <p className="text-body mb-16 fade-in visible stagger-delay-1">
            Explore our latest architectural achievements
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((index) => (
              <div key={index} className={`aspect-[4/3] bg-surface-secondary rounded fade-in visible stagger-delay-${index}`}>
                <img 
                  src={`https://images.unsplash.com/photo-${index === 1 ? '1433832597046-4f10e10ac764' : index === 2 ? '1487958449943-2429e8be8625' : '1497604401993-f2e922e5cb0a'}?w=600&h=450&fit=crop`}
                  alt={`Featured project ${index}`}
                  className="w-full h-full object-cover rounded"
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
