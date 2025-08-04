import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      
      {/* Placeholder sections for future content */}
      <section className="min-h-screen bg-surface-secondary flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-heading-xl mb-4">Section 2</h2>
          <p className="text-text-secondary">More content will be added here</p>
        </div>
      </section>
      
      <section className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-heading-xl mb-4">Section 3</h2>
          <p className="text-text-secondary">More content will be added here</p>
        </div>
      </section>
    </div>
  );
};

export default Index;
