import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      
      {/* Skills Section */}
      <SkillsSection />
      
      {/* Placeholder section for future content */}
      <section className="min-h-screen bg-surface-secondary flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-heading-xl mb-4">More Coming Soon</h2>
          <p className="text-text-secondary">This section is under development</p>
        </div>
      </section>
    </div>
  );
};

export default Index;
