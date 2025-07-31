import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-surface/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
    }`}>
      <div className="container-wide">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <Link to="/" className="text-heading-md font-orbitron tracking-wider">
            <span className="text-silver">DEV</span>
            <span className="text-accent">FOLIO</span>
          </Link>

          {/* Hover Menu */}
          <div className="relative">
            <div
              className="group"
              onMouseEnter={() => setIsMenuHovered(true)}
              onMouseLeave={() => setIsMenuHovered(false)}
            >
              {/* Menu Button */}
              <button className="flex items-center space-x-2 px-6 py-3 bg-surface border border-accent/20 rounded-lg hover:border-accent/50 transition-all duration-300 hover:bg-accent/10">
                <Menu size={20} className="text-accent" />
                <span className="text-silver font-orbitron font-bold">MENU</span>
              </button>

              {/* Dropdown Menu */}
              <div className={`absolute top-full right-0 mt-2 min-w-48 transition-all duration-300 ${
                isMenuHovered 
                  ? 'opacity-100 translate-y-0 visible' 
                  : 'opacity-0 -translate-y-2 invisible'
              }`}>
                <div className="bg-surface/95 backdrop-blur-md border border-accent/20 rounded-lg overflow-hidden shadow-xl">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`block px-6 py-4 text-silver hover:text-accent hover:bg-accent/10 transition-all duration-200 font-orbitron font-bold border-b border-border/20 last:border-b-0 ${
                        location.pathname === link.path ? 'text-accent bg-accent/5' : ''
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;