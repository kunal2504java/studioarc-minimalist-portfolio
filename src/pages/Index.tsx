import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import FlappyBugGame from '@/components/FlappyBugGameFixed';
import GamingGearBackground from '@/components/GamingGearBackground';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      
      {/* Skills Section */}
      <SkillsSection />
      
      {/* Flappy Bug Game Section */}
      <section className="relative min-h-screen bg-surface-secondary flex items-center justify-center py-20 overflow-hidden">
        {/* 3D Gaming Gear Background */}
        <div className="absolute inset-0 z-0">
          <GamingGearBackground />
        </div>
        
        {/* Game Content */}
        <div className="relative z-20">
          <FlappyBugGame />
        </div>
      </section>
    </div>
  );
};

export default Index;
