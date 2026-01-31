import { useEffect, useRef, useState } from 'react';
import { 
  Code2, 
  Layers, 
  Database, 
  Wrench, 
  Cpu,
  GitBranch,
  Box
} from 'lucide-react';

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Languages',
    skills: ['Java', 'Kotlin', 'Dart', 'C#', 'Python', 'SQL', 'Bash'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Frameworks',
    skills: ['Spring Boot', 'Flutter', 'Jetpack Compose', 'Android SDK', 'React', 'OpenCV', 'Vuforia'],
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: 'Architecture',
    skills: ['Microservices', 'Event-Driven', 'gRPC', 'MVVM', 'Clean Architecture', 'SOLID', 'RESTful APIs'],
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: 'Database',
    skills: ['PostgreSQL', 'Firebase', 'Firestore', 'Realtime DB', 'Hibernate/JPA'],
    color: 'from-green-500 to-green-600',
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: 'Tools & DevOps',
    skills: ['Docker', 'Git/GitHub', 'Postman', 'Swagger', 'DBeaver', 'Maven', 'Figma', 'Unity 3D'],
    color: 'from-red-500 to-red-600',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gray-50 dark:bg-[#0d0d0d] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

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
            Technical Skills
          </span>
          <h2 className="text-4xl lg:text-5xl font-semibold mt-3 tracking-tight dark:text-white">
            Technologies I Work With
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            A comprehensive toolkit built through years of hands-on experience 
            across backend, mobile, and game development.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`group relative bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-700 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-red-900/10 hover:-translate-y-2 ${
                isVisible
                  ? 'opacity-100 translate-y-0 rotate-0'
                  : 'opacity-0 translate-y-12 rotate-6'
              }`}
              style={{
                transitionTimingFunction: 'var(--ease-out-expo)',
                transitionDelay: `${200 + categoryIndex * 100}ms`,
              }}
              onMouseEnter={() => setHoveredCategory(categoryIndex)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold dark:text-white">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      hoveredCategory === categoryIndex
                        ? 'bg-red-600 text-white scale-105'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    style={{
                      transitionDelay: hoveredCategory === categoryIndex
                        ? `${skillIndex * 30}ms`
                        : '0ms',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Hover Accent */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} rounded-b-3xl transition-all duration-500 ${
                  hoveredCategory === categoryIndex
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Additional Skills Row */}
        <div
          className={`mt-12 transition-all duration-700 delay-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                <GitBranch className="w-5 h-5 text-red-600" />
                <span className="font-medium dark:text-white">Version Control</span>
              </div>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
              <div className="flex items-center gap-3">
                <Box className="w-5 h-5 text-red-600" />
                <span className="font-medium dark:text-white">Containerization</span>
              </div>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-red-600" />
                <span className="font-medium dark:text-white">API Design</span>
              </div>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-red-600" />
                <span className="font-medium dark:text-white">Clean Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
