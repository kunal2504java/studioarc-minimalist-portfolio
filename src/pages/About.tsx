import Navigation from '@/components/Navigation';
import team1 from '@/assets/team-1.jpg';
import team2 from '@/assets/team-2.jpg';
import team3 from '@/assets/team-3.jpg';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Chen',
      title: 'Principal Architect',
      image: team1,
      bio: 'With over 15 years of experience, Sarah leads our design vision with a focus on sustainable architecture.'
    },
    {
      name: 'Michael Torres',
      title: 'Design Director',
      image: team2,
      bio: 'Michael brings expertise in urban planning and large-scale commercial projects to the team.'
    },
    {
      name: 'Emma Rodriguez',
      title: 'Senior Architect',
      image: team3,
      bio: 'Emma specializes in residential design and innovative use of natural materials.'
    }
  ];

  const services = [
    'Architectural Design',
    'Interior Design',
    'Urban Planning',
    'Sustainable Design Consulting',
    'Construction Administration',
    'Feasibility Studies'
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-surface-secondary">
        <div className="container-narrow text-center">
          <h1 className="text-display mb-6 fade-in visible">
            About Studio Arc
          </h1>
          <p className="text-body-lg fade-in visible stagger-delay-1">
            Shaping the future through thoughtful design and innovative architecture.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in visible">
              <h2 className="text-heading-xl mb-6">Our Philosophy</h2>
              <p className="text-body mb-6">
                At Studio Arc, we believe that great architecture goes beyond aesthetics—it creates experiences, 
                fosters connections, and responds to the needs of both people and the environment.
              </p>
              <p className="text-body">
                Our approach combines innovative design thinking with sustainable practices, ensuring that every 
                project not only looks exceptional but also contributes positively to its community and ecosystem.
              </p>
            </div>
            <div className="aspect-[4/3] bg-surface-secondary rounded fade-in visible stagger-delay-1">
              <img 
                src="https://images.unsplash.com/photo-1486718448742-163732cd1544?w=600&h=450&fit=crop"
                alt="Our design process"
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-surface-secondary">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-heading-xl mb-4 fade-in visible">Meet Our Team</h2>
            <p className="text-body fade-in visible stagger-delay-1">
              Talented professionals dedicated to architectural excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div key={member.name} className={`text-center fade-in visible stagger-delay-${index + 1}`}>
                <div className="aspect-square rounded-full overflow-hidden mb-6 mx-auto max-w-64">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-heading-sm mb-2">{member.name}</h3>
                <p className="text-caption mb-4">{member.title}</p>
                <p className="text-body-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h2 className="text-heading-xl mb-4 fade-in visible">Our Services</h2>
            <p className="text-body fade-in visible stagger-delay-1">
              Comprehensive architectural solutions for every scale of project
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={service} 
                className={`p-6 bg-surface-secondary rounded text-center fade-in visible stagger-delay-${(index % 3) + 1}`}
              >
                <h3 className="text-heading-sm">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;