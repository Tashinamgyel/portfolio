import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Message Sent!',
      description: 'Thank you for reaching out. I\'ll get back to you soon.',
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'tashin599@gmail.com',
      href: 'mailto:tashin599@gmail.com',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '+66 81 987 1288',
      href: 'tel:+66819871288',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: 'Rangsit, Thailand / Thimphu, Bhutan',
      href: '#',
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      href: 'https://github.com/Tashinamgyel',
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/tashinamgyel',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gray-50 dark:bg-[#0d0d0d] overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white dark:from-gray-900 to-transparent opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
        >
          <span className="text-red-600 font-medium text-sm tracking-wider uppercase">
            Get In Touch
          </span>
          <h2 className="text-4xl lg:text-5xl font-semibold mt-3 tracking-tight dark:text-white">
            Let's Work Together
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Have a project in mind? Let's create something amazing. 
            I'm always open to discussing new opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <div
            className={`space-y-8 transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
          >
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`group flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-red-900/10 hover:border-red-100 dark:hover:border-red-900/30 transition-all duration-300 ${
                    isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-8'
                  }`}
                  style={{
                    transitionTimingFunction: 'var(--ease-out-expo)',
                    transitionDelay: `${300 + index * 100}ms`,
                  }}
                >
                  <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
                    <div className="font-medium group-hover:text-red-600 dark:text-white transition-colors duration-300">
                      {item.value}
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-red-600 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div
              className={`transition-all duration-700 delay-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
            >
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-5 py-3 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 ${
                      isVisible
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-0'
                    }`}
                    style={{
                      transitionTimingFunction: 'var(--ease-elastic)',
                      transitionDelay: `${600 + index * 100}ms`,
                    }}
                  >
                    {social.icon}
                    <span className="font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div
              className={`inline-flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-700 delay-600 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <div>
                <div className="font-medium dark:text-white">Available for freelance</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Open to new projects and opportunities
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-800"
            >
              <h3 className="text-xl font-semibold mb-6 dark:text-white">Send a Message</h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-red-600 focus:ring-red-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-red-600 focus:ring-red-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-red-600 focus:ring-red-600 transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black dark:bg-white dark:text-black hover:bg-red-600 dark:hover:bg-red-500 text-white rounded-xl py-6 transition-all duration-300 group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
