import { useEffect, useRef, useState } from 'react';
import { Award, ExternalLink, Calendar } from 'lucide-react';

interface Certification {
  title: string;
  provider: string;
  date: string;
  credential?: string;
}

const certifications: Certification[] = [
  {
    title: 'Master Microservices with Spring Boot and Spring Cloud',
    provider: 'Udemy',
    date: 'Oct 2025',
  },
  {
    title: 'The Complete Android 14 & Kotlin Development Masterclass',
    provider: 'Udemy',
    date: 'Oct 2025',
  },
  {
    title: 'Complete Android Jetpack Masterclass',
    provider: 'Udemy',
    date: 'Nov 2025',
  },
  {
    title: 'Learn Rust by Building Real Applications',
    provider: 'Udemy',
    date: 'Oct 2025',
  },
  {
    title: 'The Complete Flutter Development Bootcamp with Dart',
    provider: 'Udemy',
    date: '2025',
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white dark:bg-[#0a0a0a] overflow-hidden"
    >
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
            Certifications
          </span>
          <h2 className="text-4xl lg:text-5xl font-semibold mt-3 tracking-tight dark:text-white">
            Continuous Learning
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Professional certifications that demonstrate my commitment to 
            staying current with industry best practices.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.title}
              className={`group relative bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 transition-all duration-700 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-red-900/10 hover:-translate-y-2 ${
                isVisible
                  ? 'opacity-100 translate-y-0 rotate-0'
                  : 'opacity-0 translate-y-20 rotate-x-90'
              }`}
              style={{
                transitionTimingFunction: 'var(--ease-out-expo)',
                transitionDelay: `${100 + index * 100}ms`,
              }}
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Award className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-red-600 transition-colors duration-300 dark:text-white">
                {cert.title}
              </h3>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <ExternalLink className="w-4 h-4" />
                  <span>{cert.provider}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{cert.date}</span>
                </div>
              </div>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-600 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
        >
          {[
            { value: '5+', label: 'Certifications' },
            { value: '100+', label: 'Hours Learned' },
            { value: '2025', label: 'Latest Cert' },
            { value: 'Udemy', label: 'Primary Platform' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300"
              style={{ animationDelay: `${700 + index * 100}ms` }}
            >
              <div className="text-3xl font-bold text-red-600 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
