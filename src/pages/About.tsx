import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Github, Linkedin, Twitter, Instagram, MapPin, GraduationCap, Briefcase, Calendar, Code, Brain, Gamepad2, Mountain, BookOpen, Download, ExternalLink, Zap, Target, Users } from 'lucide-react';

const About = () => {
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    experience: 0,
    technologies: 0,
    hackathons: 0
  });

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/kunal2504java',
      icon: Github,
      color: 'hover:text-gray-400',
      bgColor: 'hover:bg-gray-900/20'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/kunal-pratap-singh-a37461249/',
      icon: Linkedin,
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-900/20'
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/yourusername',
      icon: Twitter,
      color: 'hover:text-blue-300',
      bgColor: 'hover:bg-blue-800/20'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/yourusername',
      icon: Instagram,
      color: 'hover:text-pink-400',
      bgColor: 'hover:bg-pink-900/20'
    }
  ];

  const timelineData = [
    {
      year: '2022',
      title: 'The Beginning',
      description: 'Started my journey into software development with my first "Hello World" program.',
      icon: Code
    },
    {
      year: '2023',
      title: 'First Projects',
      description: 'Built my first web applications and discovered my passion for full-stack development.',
      icon: Brain
    },
    {
      year: '2024',
      title: 'AI & ML Focus',
      description: 'Dove deep into AI and machine learning, building intelligent systems and applications.',
      icon: Brain
    },
    {
      year: '2025',
      title: 'Hackathon Success',
      description: 'Started competing in hackathons, consistently placing in top positions with innovative solutions.',
      icon: Gamepad2
    },
    {
      year: '2025',
      title: 'Current Focus',
      description: 'Building self-healing systems and no-code platforms that turn prompts into games.',
      icon: Code
    }
  ];

  const personalDetails = [
    {
      icon: MapPin,
      label: 'Location',
      value: 'Greater Noida, UP',
      color: 'text-blue-400'
    },
    {
      icon: GraduationCap,
      label: 'Education',
      value: 'Computer Science',
      color: 'text-green-400'
    },
    {
      icon: Briefcase,
      label: 'Experience',
      value: '1+ Years',
      color: 'text-purple-400'
    },
    {
      icon: Calendar,
      label: 'Available',
      value: 'Open to Work',
      color: 'text-orange-400'
    }
  ];

  const interests = [
    { icon: Gamepad2, label: 'Gaming', color: 'text-green-400' },
    { icon: Mountain, label: 'Hiking', color: 'text-blue-400' },
    { icon: BookOpen, label: 'Sci-Fi', color: 'text-purple-400' }
  ];

  // Animate stats on mount
  useEffect(() => {
    const animateStats = () => {
      const targets = { projects: 6, experience: 1, technologies: 9, hackathons: 6 };
      const duration = 500;
      const steps = 15;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedStats({
          projects: Math.floor(targets.projects * progress),
          experience: Math.floor(targets.experience * progress),
          technologies: Math.floor(targets.technologies * progress),
          hackathons: Math.floor(targets.hackathons * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    };

    animateStats();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container-narrow relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-6 fade-in visible">
              <Brain size={16} />
              AI & Software Engineer
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in visible">
              Building the Future,
              <span className="block text-accent">One Algorithm at a Time</span>
            </h1>
            <blockquote className="text-lg md:text-xl font-medium text-accent mb-6 fade-in visible">
              "Code is poetry written in logic"
            </blockquote>
            <p className="text-base md:text-lg max-w-3xl mx-auto fade-in visible">
              Hi, I'm Kunal. I build brains for software. By day, I'm an AI and Software Engineer, 
              architecting everything from 'self-healing' digital nervous systems to no-code platforms 
              that turn simple prompts into entire games.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { label: 'Projects', value: animatedStats.projects, suffix: '+', icon: Target },
              { label: 'Years Experience', value: animatedStats.experience, suffix: '+', icon: Briefcase },
              { label: 'Technologies', value: animatedStats.technologies, suffix: '+', icon: Code },
              { label: 'Hackathons', value: animatedStats.hackathons, suffix: '', icon: Zap }
            ].map((stat, index) => (
              <div key={stat.label} className={`text-center p-6 bg-surface/50 rounded-xl backdrop-blur-sm border border-border/50 fade-in visible stagger-delay-${index + 3}`}>
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <stat.icon size={20} className="text-accent" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-accent mb-2">{stat.value}{stat.suffix}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Story */}
            <div className="lg:col-span-2 space-y-8">
              <div className="fade-in visible">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-3">
                  <Brain className="text-accent" size={24} />
                  My Story
                </h2>
                <div className="space-y-4 text-sm md:text-base">
                  <p className="leading-relaxed">
                    While I love coaxing intelligence from complex algorithms, I'm a full-stack engineer at heart. 
                    I believe the most brilliant AI is useless without a robust, scalable, and user-friendly application to house it.
                  </p>
                  <p className="leading-relaxed">
                    Whether it's a backend serving thousands of requests or a 3D front-end that makes data intuitive, 
                    I thrive on building the complete picture. This approach has served me well, especially in competitive 
                    hackathons where my teams have consistently placed at the top.
                  </p>
                  <p className="leading-relaxed">
                    When I'm not trying to prevent an LLM from hallucinating, I'm usually exploring the latest in gaming, 
                    trekking a new trail to reset my own cache, or diving into a good sci-fi novel.
                  </p>
                </div>
              </div>

              {/* Interactive Timeline */}
              <div className="fade-in visible">
                <h3 className="text-xl md:text-2xl font-semibold mb-6">Journey Timeline</h3>
                <div className="space-y-4">
                  {timelineData.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-150 cursor-pointer ${
                        activeTimelineItem === index 
                          ? 'bg-accent/10 border border-accent/30' 
                          : 'bg-surface/30 hover:bg-surface/50'
                      }`}
                      onClick={() => setActiveTimelineItem(index)}
                    >
                      <div className={`p-2 rounded-lg ${activeTimelineItem === index ? 'bg-accent/20' : 'bg-surface'}`}>
                        <item.icon size={20} className={activeTimelineItem === index ? 'text-accent' : 'text-muted-foreground'} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-accent">{item.year}</span>
                          <span className="text-heading-sm">{item.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Personal Details & Interests */}
            <div className="space-y-8">
              {/* Personal Details */}
              <div className="fade-in visible">
                <h3 className="text-xl md:text-2xl font-semibold mb-6">Personal Details</h3>
                <div className="space-y-4">
                  {personalDetails.map((detail, index) => (
                    <div key={detail.label} className="flex items-center gap-3 p-4 bg-surface/30 rounded-lg hover:bg-surface/50 transition-colors duration-150">
                      <div className="p-2 bg-surface rounded-lg">
                        <detail.icon size={18} className={detail.color} />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{detail.label}</div>
                        <div className="font-medium">{detail.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="fade-in visible">
                <h3 className="text-xl md:text-2xl font-semibold mb-6">When I'm Not Coding</h3>
                <div className="space-y-3">
                  {interests.map((interest, index) => (
                    <div key={interest.label} className="flex items-center gap-3 p-3 bg-surface/30 rounded-lg hover:bg-surface/50 transition-colors duration-150">
                      <interest.icon size={20} className={interest.color} />
                      <span className="font-medium">{interest.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="fade-in visible space-y-3">
                <a 
                  href="/resume.pdf" 
                  download="Kunal_Pratap_Singh_Resume.pdf"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-150"
                >
                  <Download size={18} />
                  Download Resume
                </a>
                <a 
                  href="/projects" 
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface border border-border rounded-lg hover:bg-surface/80 transition-colors duration-150"
                >
                  <ExternalLink size={18} />
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="section-padding bg-surface-secondary/30">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 fade-in visible">Let's Connect</h2>
            <p className="text-sm md:text-base fade-in visible">
              Ready to collaborate on something amazing?
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-6 bg-surface/50 backdrop-blur-sm rounded-xl text-center transition-all duration-150 hover:scale-105 hover:shadow-lg border border-border/50 ${link.bgColor} fade-in visible`}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-surface rounded-lg group-hover:scale-110 transition-transform">
                    <link.icon size={24} className={`${link.color} transition-colors`} />
                  </div>
                </div>
                <h3 className="text-heading-sm mb-2">{link.name}</h3>
                <p className="text-body-sm text-muted-foreground">Follow me on {link.name}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <div className="relative bg-gradient-to-r from-accent/10 via-accent-secondary/10 to-accent/10 rounded-2xl p-12 border border-accent/20">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent-secondary/5 to-accent/5 rounded-2xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 fade-in visible">Let's Build Something Amazing</h2>
              <p className="text-sm md:text-base mb-8 fade-in visible">
                Have an idea that needs some AI magic? Let's turn it into reality.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all duration-150 hover:scale-105 shadow-lg fade-in visible"
              >
                <Brain size={20} />
                Start a Project
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;