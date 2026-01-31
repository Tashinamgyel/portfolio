import { useEffect, useRef } from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      
      if (scrollY < heroHeight) {
        const progress = scrollY / heroHeight;
        
        // Parallax for headline
        const headline = heroRef.current.querySelector('.hero-headline');
        if (headline) {
          (headline as HTMLElement).style.transform = `translateY(${-scrollY * 0.3}px)`;
        }
        
        // Parallax for image
        if (imageRef.current) {
          imageRef.current.style.transform = `translateY(${-scrollY * 0.2}px) rotateY(${-progress * 10}deg)`;
        }
        
        // Fade out content
        const content = heroRef.current.querySelector('.hero-content');
        if (content) {
          (content as HTMLElement).style.opacity = String(1 - progress * 1.2);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-[#0a0a0a]"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full opacity-30 dark:opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,0,0,0.08) 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,0,0,0.06) 0%, transparent 70%)',
            animation: 'float 15s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-black dark:bg-white" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black dark:bg-white" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-black dark:bg-white" />
      </div>

      <div className="hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full animate-fade-in-down"
              style={{ animationDelay: '300ms' }}
            >
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Junior Software Engineer
              </span>
            </div>

            {/* Headline */}
            <div className="hero-headline space-y-2">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight animate-fade-in-up"
                style={{ animationDelay: '500ms' }}
              >
                Building Digital
              </h1>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight animate-fade-in-up"
                style={{ animationDelay: '600ms' }}
              >
                Experiences
              </h1>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-red-600 animate-fade-in-up"
                style={{ animationDelay: '700ms' }}
              >
                That Matter
              </h1>
            </div>

            {/* Subheadline */}
            <p
              className="text-lg text-gray-600 dark:text-gray-400 font-medium animate-fade-in-up"
              style={{ animationDelay: '900ms' }}
            >
              Full-Stack Developer | Mobile (Flutter/Native) 
            </p>

            {/* Description */}
            <p
              className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg animate-fade-in-up"
              style={{ animationDelay: '1000ms' }}
            >
              Results-oriented Software Engineer with a BSc in ICT (GPA 3.96) and 
              production experience in building scalable backend, mobile, and game 
              applications.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4 animate-scale-in"
              style={{ animationDelay: '1200ms' }}
            >
              <Button
                size="lg"
                className="bg-black dark:bg-white dark:text-black hover:bg-red-600 dark:hover:bg-red-500 text-white rounded-full px-8 group transition-all duration-300"
                onClick={scrollToProjects}
              >
                View My Projects
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
                onClick={scrollToContact}
              >
                Get In Touch
              </Button>
            </div>

            {/* Stats */}
            <div
              className="flex flex-wrap gap-8 pt-4 animate-fade-in-up"
              style={{ animationDelay: '1400ms' }}
            >
              <div>
                <div className="text-3xl font-bold dark:text-white">10+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold dark:text-white">99%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold dark:text-white">3.96</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">GPA</div>
              </div>
            </div>

            {/* Social Links */}
            <div
              className="flex gap-4 pt-2 animate-fade-in-up"
              style={{ animationDelay: '1500ms' }}
            >
              <a
                href="https://github.com/Tashinamgyel"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/tashinamgyel"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:tashin599@gmail.com"
                className="p-3 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div
            ref={imageRef}
            className="relative lg:pl-8 animate-fade-in-up"
            style={{
              animationDelay: '800ms',
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 border-2 border-red-600/20 rounded-full animate-float" />
              <div
                className="absolute -bottom-12 -right-8 w-24 h-24 bg-red-600/10 rounded-full animate-float"
                style={{ animationDelay: '2s' }}
              />
              
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <img
                    src="/images/profile.jpg"
                    alt="Tashi Namgyel"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
