import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Replace with your actual Formspree endpoint URL
      const FORMPREE_ENDPOINT = 'https://formspree.io/f/mzzaygjn';
      
      const response = await fetch(FORMPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Thank you! Your message has been sent successfully.');
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-surface-secondary">
        <div className="container-narrow text-center">
          <h1 className="text-display mb-6 fade-in visible">
            Get in Touch
          </h1>
          <p className="text-body-lg fade-in visible stagger-delay-1">
            Ready to start your next project? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="fade-in visible">
              <h2 className="text-heading-xl mb-8">Let's Start a Conversation</h2>
              <p className="text-body mb-12">
                Whether you're planning a new project or you wanna talk about how we are just an t  breed of monekeys on a minor planet of a very average star.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-accent-light rounded-full">
                    <MapPin className="text-accent" size={24} />
                  </div>
                  <div>
                    <p className="text-body">
                      Knowledge Park 3<br />
                      Greater Noida <br />
                      Uttar Pradesh , India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-accent-light rounded-full">
                    <Phone className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="text-heading-sm mb-2">Call</h3>
                    <p className="text-body">+91 9005810309</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-accent-light rounded-full">
                    <Mail className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="text-heading-sm mb-2">Email</h3>
                    <p className="text-body">kunalpsingh25@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="fade-in visible stagger-delay-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-heading-sm mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-heading-sm mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-black"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-heading-sm mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-black"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-heading-sm mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-vertical text-black"
                  />
                </div>
                
                <button type="submit" className="button-primary w-full md:w-auto">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-surface-secondary">
        <div className="w-full h-full rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.3969741461693!2d-74.0085!3d40.7589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af4f5c5f5f%3A0x123456789!2sTimes%20Square%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Studio Arc Location"
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;