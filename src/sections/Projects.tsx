import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Play, Youtube, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface Project {
  id: number;
  category: string;
  title: string;
  description: string;
  fullDescription: string;
  tech: string[];
  link: string;
  linkType: 'website' | 'github' | 'playstore' | 'youtube';
  stats: string;
  image: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    category: 'Backend & API',
    title: 'BhutanAPI - National Data Service',
    description:
      'A centralized RESTful API providing data on Bhutan\'s GNH metrics, Dzongkhags (districts), and Kings.',
    fullDescription:
      'BhutanAPI is a centralized RESTful service built with Java Spring Boot 3 and PostgreSQL to serve national data including GNH metrics, infrastructure details, district information, and historical data about the Kings of Bhutan. The API achieves 99% system uptime and includes comprehensive Swagger documentation.',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Swagger'],
    link: 'https://www.bhutanapi.com',
    linkType: 'website',
    stats: '99% Uptime',
    image: '/images/project-bhutanapi.png',
    featured: true,
  },
  {
    id: 2,
    category: 'Mobile App',
    title: 'Constitution of Bhutan',
    description:
      'The first digital app for the Bhutanese Constitution with search, bookmarking, and dark mode.',
    fullDescription:
      'The Constitution of Bhutan App is the first digital application providing access to the Bhutanese Constitution. Built with Kotlin and Jetpack Compose, it features full-text search, bookmarking, dark mode, and font size adjustment. The app was published on the Google Play Store and has garnered 100+ downloads.',
    tech: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Room'],
    link: '#',
    linkType: 'playstore',
    stats: '100+ Downloads',
    image: '/images/project-constitution-drawer.png',
    featured: true,
  },
  {
    id: 3,
    category: 'Social Platform',
    title: 'House of Bhutan - Civic Engagement',
    description:
      'A parliamentary-style social platform for public grievances and structured discussions.',
    fullDescription:
      'House of Bhutan is a civic engagement platform that simulates a parliamentary framework. Users can post "Bills" (grievances) which progress from "Assembly" to "Council" stages based on community votes. Built with Kotlin, Jetpack Compose, and Firebase, it features real-time data syncing, secure authentication, and profile management.',
    tech: ['Kotlin', 'Jetpack Compose', 'Firebase', 'MVVM'],
    link: '#',
    linkType: 'github',
    stats: 'Real-time',
    image: '/images/project-houseofbhutan.jpeg',
    featured: false,
  },
  {
    id: 4,
    category: 'AR & AI',
    title: 'AI OrbitAR - Solar System Explorer',
    description:
      'An interactive AR application visualizing the solar system with AI-powered planet descriptions.',
    fullDescription:
      'AI OrbitAR is an augmented reality application built with Unity and Vuforia that visualizes the solar system. When pointing the camera at a target graphic, users can explore planets with realistic orbital animations. The app integrates OpenAI API (GPT-3.5 Turbo) to provide dynamic, real-time descriptions of planets when tapped.',
    tech: ['Unity', 'Vuforia', 'C#', 'OpenAI API'],
    link: '#',
    linkType: 'youtube',
    stats: 'AR Experience',
    image: '/images/project-orbitar.jpg',
    featured: false,
  },
  {
    id: 5,
    category: 'Hackathon Project',
    title: 'TeeTime - Golf Booking Platform',
    description:
      'Hackathon 2025 Finalist. Golf booking with real-time scheduling and course navigation.',
    fullDescription:
      'TeeTime is a golf booking platform developed for the 2025 Hospitality & ERP Hackathon, where it reached finalist status. The app features real-time tee time scheduling, course navigation using Google Maps SDK, and digital ticket validation through barcode generation. Built with Flutter and Firebase for cross-platform compatibility.',
    tech: ['Flutter', 'Firebase', 'Google Maps SDK'],
    link: '#',
    linkType: 'github',
    stats: 'Finalist 2025',
    image: '/images/project-teetime.jpg',
    featured: true,
  },
];

const getLinkIcon = (type: Project['linkType']) => {
  switch (type) {
    case 'website':
      return <ExternalLink className="w-4 h-4" />;
    case 'github':
      return <Github className="w-4 h-4" />;
    case 'playstore':
      return <Play className="w-4 h-4" />;
    case 'youtube':
      return <Youtube className="w-4 h-4" />;
  }
};

const getLinkLabel = (type: Project['linkType']) => {
  switch (type) {
    case 'website':
      return 'Visit Website';
    case 'github':
      return 'View Code';
    case 'playstore':
      return 'Play Store';
    case 'youtube':
      return 'Watch Demo';
  }
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden"
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
            Portfolio
          </span>
          <h2 className="text-4xl lg:text-5xl font-semibold mt-3 tracking-tight dark:text-white">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            A selection of projects showcasing my expertise in backend development, 
            mobile applications, and interactive experiences.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-700 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-red-900/10 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionTimingFunction: 'var(--ease-out-expo)',
                transitionDelay: `${200 + index * 100}ms`,
              }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>

                {/* Stats Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium flex items-center gap-1">
                    {project.stats.includes('Finalist') && (
                      <Award className="w-4 h-4" />
                    )}
                    {project.stats}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-red-600 transition-colors duration-300 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium text-gray-600 dark:text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium text-gray-600 dark:text-gray-400">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="flex-1 bg-black dark:bg-white dark:text-black hover:bg-red-600 dark:hover:bg-red-500 text-white rounded-full transition-colors duration-300"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                  </Button>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                  >
                    {getLinkIcon(project.linkType)}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-700 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-red-900/10 hover:-translate-y-1 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionTimingFunction: 'var(--ease-out-expo)',
                transitionDelay: `${500 + index * 100}ms`,
              }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1 group-hover:text-red-600 transition-colors duration-300 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium text-gray-600 dark:text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-sm font-medium text-red-600 hover:underline"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog
        open={selectedProject !== null}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 dark:border-gray-800">
          {selectedProject && (
            <>
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full text-sm font-medium">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              <DialogHeader>
                <DialogTitle className="text-2xl dark:text-white">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-base dark:text-gray-400">
                  {selectedProject.fullDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    className="flex-1 bg-black dark:bg-white dark:text-black hover:bg-red-600 dark:hover:bg-red-500 text-white rounded-full"
                    onClick={() => window.open(selectedProject.link, '_blank')}
                  >
                    {getLinkIcon(selectedProject.linkType)}
                    <span className="ml-2">{getLinkLabel(selectedProject.linkType)}</span>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
