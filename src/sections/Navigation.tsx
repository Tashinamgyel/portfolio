import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
        style={{
          transitionTimingFunction: 'var(--ease-out-expo)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="text-xl font-semibold tracking-tight hover:text-red-600 transition-colors duration-300 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="relative">
                Tashi Namgyel
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200 underline-animation"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Button & Theme Toggle */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Button
                variant="outline"
                className="rounded-full border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 group"
                onClick={() => window.open('/full-portfolio.pdf', '_blank')}
              >
                <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-y-0.5" />
                Download CV
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
      >
        <div
          className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-20 left-4 right-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 transition-all duration-500 ${
            isMobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-8 opacity-0'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-left text-lg font-medium py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {item.label}
              </button>
            ))}
            <hr className="my-2 dark:border-gray-700" />
            <Button
              className="w-full rounded-xl bg-black dark:bg-white dark:text-black hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white transition-colors duration-300"
              onClick={() => window.open('/full-portfolio.pdf', '_blank')}
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
