import { Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black text-white py-12 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-2xl font-semibold tracking-tight hover:text-red-500 transition-colors duration-300"
            >
              Tashi Namgyel
            </a>
            <p className="text-gray-400 text-sm mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-8">
            <a
              href="#about"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            >
              Contact
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-red-600 transition-colors duration-300"
          >
            <span className="text-sm">Back to top</span>
            <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Made With Love */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            Made with
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            in Thailand & Bhutan
          </p>
        </div>
      </div>
    </footer>
  );
}
