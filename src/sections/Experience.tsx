import { useEffect, useRef, useState } from 'react';
import { Building2, MapPin, Calendar, CheckCircle2, ExternalLink } from 'lucide-react';

interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    company: 'Government Technology Agency (GovTech)',
    location: 'Thimphu, Bhutan',
    role: 'Software Engineer Intern',
    period: 'Aug 2025 – Dec 2025',
    description:
      'Architected BhutanAPI, a centralized RESTful service using Java Spring Boot 3 and PostgreSQL to serve national data (GNH metrics, infrastructure), achieving 99% system uptime.',
    achievements: [
      'Implemented Controller-Service-Repository patterns with strict DTO mapping',
      'Designed normalized database schemas and built custom ETL pipelines',
      'Developed and published the Constitution of Bhutan app on Google Play Store',
      'Assisted in debugging the Veterinary Information System (VIS)',
    ],
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Kotlin', 'Jetpack Compose'],
  },
  {
    company: 'Bhutan Taek Won Do Federation',
    location: 'Thimphu, Bhutan',
    role: 'Freelance Software Developer',
    period: 'Nov 2025 – Dec 2025',
    description:
      'Designed a cross-platform attendance solution using Flutter and Geofencing API to enforce location-based check-ins.',
    achievements: [
      'Developed admin dashboard with live tracking and historical views',
      'Implemented leave request workflows and automated payroll processing',
      'CSV/Excel export functionality for attendance reports',
    ],
    technologies: ['Flutter', 'Firebase', 'Geofencing API'],
  },
];

export default function Experience() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white dark:bg-[#0a0a0a] overflow-hidden"
    >
      {/* Timeline Line Background */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 hidden lg:block" />
      <div
        className={`absolute left-1/2 top-0 w-px bg-red-600 hidden lg:block transition-all duration-1000 ${
          isVisible ? 'h-full' : 'h-0'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
      />

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
            Work Experience
          </span>
          <h2 className="text-4xl lg:text-5xl font-semibold mt-3 tracking-tight dark:text-white">
            Professional Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Building real-world solutions through internships and freelance projects 
            that make a difference.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-12 lg:space-y-0">
          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${
                index > 0 ? 'lg:mt-16' : ''
              }`}
            >
              {/* Timeline Dot */}
              <div
                className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10 transition-all duration-500 ${
                  isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
                style={{
                  transitionTimingFunction: 'var(--ease-elastic)',
                  transitionDelay: `${300 + index * 200}ms`,
                  top: '2rem',
                }}
              />

              {/* Content - Alternating sides on desktop */}
              <div
                className={`${
                  index % 2 === 1 ? 'lg:col-start-2' : ''
                } transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-x-0'
                    : index % 2 === 0
                    ? 'opacity-0 -translate-x-24'
                    : 'opacity-0 translate-x-24'
                }`}
                style={{
                  transitionTimingFunction: 'var(--ease-out-expo)',
                  transitionDelay: `${300 + index * 200}ms`,
                }}
              >
                <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 hover-lift group border border-transparent dark:border-gray-800">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-red-600 mb-2">
                        <Building2 className="w-4 h-4" />
                        <span className="text-sm font-medium">{exp.company}</span>
                      </div>
                      <h3 className="text-2xl font-semibold dark:text-white">{exp.role}</h3>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-3 transition-all duration-500 ${
                            isVisible
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 -translate-x-4'
                          }`}
                          style={{
                            transitionTimingFunction: 'var(--ease-out-expo)',
                            transitionDelay: `${500 + index * 200 + i * 80}ms`,
                          }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-400 text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 group-hover:border-red-200 dark:group-hover:border-red-800 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Empty space for alternating layout */}
              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''} />
            </div>
          ))}
        </div>

        {/* View Full Resume CTA */}
        <div
          className={`text-center mt-16 transition-all duration-700 delay-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
        >
          <a
            href="/full-portfolio.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white dark:text-black text-white rounded-full hover:bg-red-600 dark:hover:bg-red-500 transition-colors duration-300 group"
          >
            <span className="font-medium">View Full Resume</span>
            <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
