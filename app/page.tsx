"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Github, Mail, Phone, MapPin, Download, Moon, Sun, Code, Zap, Trophy, Users } from "lucide-react"

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false)
  const [currentTime, setCurrentTime] = useState({
    bangkok: "",
    thimphu: "",
  })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [counters, setCounters] = useState({
    projects: 0,
    hackathons: 0,
    gpa: 0,
    fundraised: 0,
  })
  const [mouseTrail, setMouseTrail] = useState<
      Array<{
        id: number
        x: number
        y: number
        timestamp: number
      }>
  >([])

  const heroRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)

  // Single mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })

      // Add mouse trail effect
      const newTrailPoint = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      }

      setMouseTrail((prev) => [...prev.slice(-10), newTrailPoint])
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Clean up trail effect
  useEffect(() => {
    const cleanupTrail = () => {
      const now = Date.now()
      setMouseTrail((prev) => prev.filter((point) => now - point.timestamp < 1000))
    }

    const trailInterval = setInterval(cleanupTrail, 100)
    return () => clearInterval(trailInterval)
  }, [])

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set([...prev, entry.target.id]))
            }
          })
        },
        { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  // Animated counters
  useEffect(() => {
    if (visibleSections.has("about")) {
      const animateCounter = (target: number, key: keyof typeof counters, duration = 2000) => {
        const start = performance.now()
        const animate = (currentTime: number) => {
          const elapsed = currentTime - start
          const progress = Math.min(elapsed / duration, 1)
          const easeOutQuart = 1 - Math.pow(1 - progress, 4)

          setCounters((prev) => ({
            ...prev,
            [key]: Math.floor(target * easeOutQuart),
          }))

          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }
        requestAnimationFrame(animate)
      }

      animateCounter(6, "projects")
      animateCounter(1, "hackathons")
      animateCounter(396, "gpa") // 3.96 * 100 for animation
      animateCounter(48979, "fundraised")
    }
  }, [visibleSections])

  // Clock update
  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }

      setCurrentTime({
        bangkok: now.toLocaleTimeString("en-US", { ...options, timeZone: "Asia/Bangkok" }),
        thimphu: now.toLocaleTimeString("en-US", { ...options, timeZone: "Asia/Thimphu" }),
      })
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  // Theme toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const projects = [
    {
      title: "TeeTime - Golf Booking App",
      description:
          "Flutter-based app for tee time booking with Firebase integration. Hackathon 2025 finalist with 70% improvement in social engagement.",
      tech: "Flutter, Dart, Firebase",
      date: "March 2025",
      highlight: "🏆 Hackathon Finalist",
      icon: Trophy,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Language Assistance App",
      description:
          "Vocabulary learning app powered by OpenAI API with quiz generation and meaning lookup functionality.",
      tech: "Flutter, OpenAI API",
      date: "April 2025",
      icon: Code,
      color: "from-blue-400 to-purple-500",
    },
    {
      title: "IELTS Practice App",
      description: "Android app for IELTS reading practice with AI-generated essays on custom topics.",
      tech: "Flutter, Android",
      date: "April 2025",
      icon: Zap,
      color: "from-green-400 to-blue-500",
    },
    {
      title: "AI Airport Pickup Chatbot",
      description: "Gemini AI-powered chatbot handling 80% of university website FAQs with automated responses.",
      tech: "Gemini AI, Python",
      date: "February 2024",
      icon: Users,
      color: "from-red-400 to-pink-500",
    },
    {
      title: "TO-DO Application",
      description: "Clean, minimal Flutter app for task management supporting 100+ tasks with optimized render time.",
      tech: "Flutter, Dart",
      date: "May 2025",
      icon: Code,
      color: "from-purple-400 to-indigo-500",
    },
    {
      title: "Telegram Utility Bots",
      description:
          "Multiple Python bots for taekwondo bookings, video downloads, PDF operations, and file conversions.",
      tech: "Python, Telegram API",
      date: "November 2024",
      icon: Zap,
      color: "from-teal-400 to-cyan-500",
    },
  ]

  const skills = {
    technical: [
      { name: "Dart (Flutter)", level: 90 },
      { name: "Java", level: 85 },
      { name: "Spring Boot", level: 80 },
      { name: "Python", level: 80 },
      { name: "UI/UX", level: 85 },
      { name: "Git", level: 75 },
      { name: "SQL", level: 70 },
      { name: "HTML/CSS", level: 80 },
      { name: "Firebase", level: 75 },
    ],
    soft: ["Team Leadership", "Effective Communication", "Cross-functional Collaboration"],
    languages: ["English (Fluent)", "Hindi (Proficient)", "Dzongkha (Native)", "Thai (Conversational)"],
  }

  // Simple Background Effects Component
  const SimpleBackgroundEffects = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Particle system inspired by your code */}
          {[...Array(30)].map((_, i) => (
              <div
                  key={`particle-${i}`}
                  className="particle"
                  style={
                    {
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      width: `${Math.random() * 6 + 3}px`,
                      height: `${Math.random() * 6 + 3}px`,
                      animationDelay: `${Math.random() * 4}s`,
                      animationDuration: `${Math.random() * 6 + 6}s`,
                      "--move-x": `${(Math.random() - 0.5) * 80}px`,
                      "--move-y": `${(Math.random() - 0.5) * 80}px`,
                      transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
                    } as React.CSSProperties
                  }
              />
          ))}

          {/* Simple geometric shapes - much slower movement */}
          {Array.from({ length: 8 }).map((_, i) => (
              <div
                  key={`shape-${i}`}
                  className="absolute border-2 border-black opacity-20 transition-transform duration-[3000ms] ease-out"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 40 + 30}px`,
                    height: `${Math.random() * 40 + 30}px`,
                    transform: `rotate(${Math.random() * 360}deg) translate(${mousePosition.x * 0.0005}px, ${mousePosition.y * 0.0005}px)`,
                  }}
              />
          ))}

          {/* Slower floating text elements */}
          {["CODE", "DESIGN", "BUILD", "DEPLOY"].map((text, i) => (
              <div
                  key={`text-${i}`}
                  className="absolute text-black font-black opacity-10 text-2xl animate-slow-float pointer-events-none select-none"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${30 + i * 15}%`,
                    animationDelay: `${i * 3}s`,
                    transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`,
                  }}
              >
                {text}
              </div>
          ))}
        </div>
    )
  }

  return (
      <div
          className={`min-h-screen transition-all duration-500 ${isDark ? "dark" : ""} ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(1deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
            75% { transform: translateY(-10px) rotate(1deg); }
          }

          @keyframes particle-drift {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(10px, -10px) rotate(90deg); }
            50% { transform: translate(-5px, -20px) rotate(180deg); }
            75% { transform: translate(-10px, -10px) rotate(270deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
          }

          @keyframes glow-pulse {
            0%, 100% {
              box-shadow: 0 0 5px rgba(250, 204, 21, 0.3);
              transform: scale(1);
            }
            50% {
              box-shadow: 0 0 20px rgba(250, 204, 21, 0.8);
              transform: scale(1.1);
            }
          }

          .particle-glow {
            animation: glow-pulse 3s ease-in-out infinite;
          }

          .particle-drift {
            animation: particle-drift 15s linear infinite;
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(255, 193, 7, 0.5); }
            50% { box-shadow: 0 0 40px rgba(255, 193, 7, 0.8); }
          }
          @keyframes slide-in-left {
            from { transform: translateX(-100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slide-in-right {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slide-in-up {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes bounce-in {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes typewriter {
            from { width: 0; }
            to { width: 100%; }
          }
          @keyframes blink {
            50% { border-color: transparent; }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }
          .animate-slide-in-left {
            animation: slide-in-left 0.8s ease-out forwards;
          }
          .animate-slide-in-right {
            animation: slide-in-right 0.8s ease-out forwards;
          }
          .animate-slide-in-up {
            animation: slide-in-up 0.6s ease-out forwards;
          }
          .animate-bounce-in {
            animation: bounce-in 0.8s ease-out forwards;
          }
          .typewriter {
            overflow: hidden;
            white-space: nowrap;
            border-right: 3px solid;
            animation: typewriter 3s steps(40) 1s forwards, blink 1s infinite;
          }
          .skill-bar {
            transition: width 2s ease-in-out;
          }
          .project-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .project-card:hover {
            transform: translateY(-10px) rotate(1deg);
          }
          .glitch {
            position: relative;
          }
          .glitch::before,
          .glitch::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .glitch::before {
            animation: glitch-1 0.5s infinite;
            color: #ff0000;
            z-index: -1;
          }
          .glitch::after {
            animation: glitch-2 0.5s infinite;
            color: #00ff00;
            z-index: -2;
          }
          @keyframes glitch-1 {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
          }
          @keyframes glitch-2 {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(2px, 2px); }
            40% { transform: translate(2px, -2px); }
            60% { transform: translate(-2px, 2px); }
            80% { transform: translate(-2px, -2px); }
          }
          @keyframes slow-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-5px) rotate(0.5deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
            75% { transform: translateY(-5px) rotate(0.5deg); }
          }

          .animate-slow-float {
            animation: slow-float 12s ease-in-out infinite;
          }
          @keyframes particle-move {
            0% { transform: translate(0, 0); opacity: 0.2; }
            50% { transform: translate(var(--move-x), var(--move-y)); opacity: 0.6; }
            100% { transform: translate(0, 0); opacity: 0.2; }
          }

          .particle {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 70%);
            animation: particle-move 8s ease-in-out infinite;
            pointer-events: none;
          }
        `}</style>

        {/* Hero Section */}
        <section
            ref={heroRef}
            id="home"
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-600 dark:to-orange-700 text-black relative overflow-hidden"
        >
          {/* Animated background elements */}
          <SimpleBackgroundEffects />

          {/* Mouse Trail Effect */}
          <div className="absolute inset-0 pointer-events-none">
            {mouseTrail.map((point, index) => (
                <div
                    key={point.id}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    style={{
                      left: point.x,
                      top: point.y,
                      opacity: ((index + 1) / mouseTrail.length) * 0.5,
                      transform: "translate(-50%, -50%)",
                      animation: "particle-drift 2s ease-out forwards",
                    }}
                />
            ))}
          </div>

          <div className="text-center z-10 px-4 max-w-4xl mx-auto">
            <div className={`mb-6 md:mb-8 ${visibleSections.has("home") ? "animate-bounce-in" : "opacity-0"}`}>
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full border-4 md:border-8 border-white shadow-2xl overflow-hidden animate-pulse-glow hover:scale-110 transition-transform duration-300 cursor-pointer">
                <img src="/images/tashi-profile.jpeg" alt="Tashi Namgyel" className="w-full h-full object-cover" />
              </div>
            </div>

            <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-4 tracking-wider glitch hover:scale-105 transition-transform duration-300 leading-tight ${visibleSections.has("home") ? "animate-slide-in-left" : "opacity-0"}`}
                data-text="TASHI NAMGYEL"
            >
              TASHI NAMGYEL
            </h1>

            <div
                className={`typewriter text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 tracking-wide px-2 ${visibleSections.has("home") ? "" : "opacity-0"}`}
            >
              FULL STACK DEVELOPER WITH BOLD VISION
            </div>

            <div
                className={`flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8 ${visibleSections.has("home") ? "animate-slide-in-up" : "opacity-0"}`}
            >
              <div className="flex items-center justify-center gap-2 bg-black text-white px-3 md:px-4 py-2 border-2 md:border-4 border-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm md:text-base">
                <MapPin size={16} className="animate-pulse md:w-5 md:h-5" />
                <span className="font-bold">Rangsit, Thailand</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-black text-white px-3 md:px-4 py-2 border-2 md:border-4 border-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm md:text-base">
                <span className="font-bold">GPA: 3.96/4</span>
              </div>
            </div>

            <a
                href="#projects"
                className={`inline-block bg-black text-white text-lg md:text-xl font-bold py-3 md:py-4 px-6 md:px-8 border-2 md:border-4 border-white shadow-lg hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 ${visibleSections.has("home") ? "animate-bounce-in" : "opacity-0"}`}
                style={{ animationDelay: "1s" }}
            >
              EXPLORE MY WORK
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white dark:bg-gray-900 text-black dark:text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
                className={`text-5xl font-black mb-12 text-center tracking-wider ${visibleSections.has("about") ? "animate-slide-in-up" : "opacity-0"}`}
            >
              WHO AM I
            </h2>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="space-y-6">
                <div
                    className={`bg-yellow-400 dark:bg-yellow-600 p-6 md:p-8 border-4 border-black shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${visibleSections.has("about") ? "animate-slide-in-left" : "opacity-0"}`}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-4">CURRENT MISSION</h3>
                  <p className="text-base md:text-lg font-medium leading-relaxed">
                    Enthusiastic ICT student seeking an internship in full stack development to apply programming skills
                    across frontend and backend technologies, contributing to building comprehensive web and mobile
                    applications.
                  </p>
                </div>

                <div
                    className={`bg-white dark:bg-gray-800 p-6 md:p-8 border-4 border-black shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${visibleSections.has("about") ? "animate-slide-in-left" : "opacity-0"}`}
                    style={{ animationDelay: "0.2s" }}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-4">EDUCATION</h3>
                  <p className="font-bold text-base md:text-lg">Rangsit University, Thailand</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                    Information and Communications Technology
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Expected Graduation: 2025</p>
                  <p className="font-bold mt-2 text-base md:text-lg">GPA: 3.96/4</p>
                </div>
              </div>

              <div className="space-y-6">
                <div
                    className={`bg-black text-white p-6 md:p-8 border-4 border-yellow-400 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${visibleSections.has("about") ? "animate-slide-in-right" : "opacity-0"}`}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-4">LEADERSHIP</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Led a team of 10 to organize earthquake relief fundraiser for Burmese communities, raising{" "}
                    {counters.fundraised.toLocaleString()} Baht and engaging over 500 community members.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div
                      className={`bg-red-500 text-white p-3 md:p-4 border-4 border-black shadow-lg text-center hover:scale-105 transition-all duration-300 ${visibleSections.has("about") ? "animate-bounce-in" : "opacity-0"}`}
                      style={{ animationDelay: "0.4s" }}
                  >
                    <div className="text-2xl md:text-3xl font-black">{counters.projects}+</div>
                    <div className="font-bold text-xs md:text-sm">PROJECTS</div>
                  </div>
                  <div
                      className={`bg-blue-500 text-white p-3 md:p-4 border-4 border-black shadow-lg text-center hover:scale-105 transition-all duration-300 ${visibleSections.has("about") ? "animate-bounce-in" : "opacity-0"}`}
                      style={{ animationDelay: "0.6s" }}
                  >
                    <div className="text-2xl md:text-3xl font-black">{counters.hackathons}</div>
                    <div className="font-bold text-xs md:text-sm">HACKATHON WIN</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={projectsRef} id="projects" className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
                className={`text-5xl font-black mb-12 text-center tracking-wider text-black dark:text-white ${visibleSections.has("projects") ? "animate-slide-in-up" : "opacity-0"}`}
            >
              PROJECTS
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project, index) => {
                const IconComponent = project.icon
                return (
                    <div
                        key={index}
                        className={`project-card bg-white dark:bg-gray-900 p-4 md:p-6 border-4 border-black shadow-lg hover:shadow-2xl group cursor-pointer ${visibleSections.has("projects") ? "animate-slide-in-up" : "opacity-0"}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                          className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${project.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="text-white" size={20} />
                      </div>

                      {project.highlight && (
                          <div className="bg-yellow-400 text-black px-2 md:px-3 py-1 text-xs md:text-sm font-bold mb-4 inline-block animate-pulse">
                            {project.highlight}
                          </div>
                      )}

                      <h3 className="text-lg md:text-xl font-bold mb-3 text-black dark:text-white group-hover:text-yellow-600 transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>

                      <p className="text-gray-700 dark:text-gray-300 mb-4 text-xs md:text-sm leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
                        {project.tech.split(", ").map((tech, techIndex) => (
                            <span
                                key={techIndex}
                                className="bg-black text-white px-2 py-1 text-xs font-bold hover:bg-gray-800 transition-colors duration-200"
                            >
                        {tech}
                      </span>
                        ))}
                      </div>

                      <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-bold">{project.date}</div>
                    </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-yellow-400 dark:bg-yellow-600 text-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
                className={`text-5xl font-black mb-12 text-center tracking-wider ${visibleSections.has("skills") ? "animate-slide-in-up" : "opacity-0"}`}
            >
              SKILLS
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div
                  className={`bg-white p-6 md:p-8 border-4 border-black shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${visibleSections.has("skills") ? "animate-slide-in-left" : "opacity-0"}`}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-6">TECHNICAL</h3>
                <div className="space-y-3 md:space-y-4">
                  {skills.technical.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-bold text-xs md:text-sm">{skill.name}</span>
                          <span className="text-xs md:text-sm">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 border-2 border-black">
                          <div
                              className={`skill-bar h-full bg-black ${visibleSections.has("skills") ? "" : "w-0"}`}
                              style={{
                                width: visibleSections.has("skills") ? `${skill.level}%` : "0%",
                                transitionDelay: `${index * 0.1}s`,
                              }}
                          />
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              <div
                  className={`bg-white p-6 md:p-8 border-4 border-black shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${visibleSections.has("skills") ? "animate-slide-in-up" : "opacity-0"}`}
                  style={{ animationDelay: "0.2s" }}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-6">SOFT SKILLS</h3>
                <div className="space-y-2">
                  {skills.soft.map((skill, index) => (
                      <div
                          key={index}
                          className="bg-gray-100 p-2 md:p-3 border-2 border-black font-bold text-xs md:text-sm hover:bg-yellow-100 hover:scale-105 transition-all duration-200 cursor-pointer"
                          style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {skill}
                      </div>
                  ))}
                </div>
              </div>

              <div
                  className={`bg-white p-6 md:p-8 border-4 border-black shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 md:col-span-2 lg:col-span-1 ${visibleSections.has("skills") ? "animate-slide-in-right" : "opacity-0"}`}
                  style={{ animationDelay: "0.4s" }}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-6">LANGUAGES</h3>
                <div className="space-y-2">
                  {skills.languages.map((lang, index) => (
                      <div
                          key={index}
                          className="bg-gray-100 p-2 md:p-3 border-2 border-black font-bold text-xs md:text-sm hover:bg-yellow-100 hover:scale-105 transition-all duration-200 cursor-pointer"
                          style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {lang}
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* World Clock Widget */}
        <section id="clock" className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
                className={`text-5xl font-black mb-12 text-center tracking-wider ${visibleSections.has("clock") ? "animate-slide-in-up" : "opacity-0"}`}
            >
              WORLD CLOCK
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div
                  className={`bg-yellow-400 text-black p-8 border-4 border-white shadow-lg text-center hover:scale-105 transition-all duration-300 ${visibleSections.has("clock") ? "animate-bounce-in" : "opacity-0"}`}
              >
                <h3 className="text-2xl font-bold mb-4">BANGKOK</h3>
                <div className="text-3xl font-black font-mono animate-pulse">{currentTime.bangkok}</div>
                <div className="text-sm font-bold mt-2">CURRENT LOCATION</div>
              </div>

              <div
                  className={`bg-white text-black p-8 border-4 border-yellow-400 shadow-lg text-center hover:scale-105 transition-all duration-300 ${visibleSections.has("clock") ? "animate-bounce-in" : "opacity-0"}`}
                  style={{ animationDelay: "0.2s" }}
              >
                <h3 className="text-2xl font-bold mb-4">THIMPHU</h3>
                <div className="text-3xl font-black font-mono animate-pulse">{currentTime.thimphu}</div>
                <div className="text-sm font-bold mt-2">HOME COUNTRY</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
                className={`text-5xl font-black mb-12 text-center tracking-wider text-black dark:text-white ${visibleSections.has("contact") ? "animate-slide-in-up" : "opacity-0"}`}
            >
              GET IN TOUCH
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div
                  className={`bg-yellow-400 dark:bg-yellow-600 p-8 border-4 border-black shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${visibleSections.has("contact") ? "animate-slide-in-left" : "opacity-0"}`}
              >
                <h3 className="text-2xl font-bold mb-6 text-black">CONTACT INFO</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
                    <Mail className="text-black animate-bounce" size={24} />
                    <a href="mailto:tashin599@gmail.com" className="text-black font-bold hover:underline">
                      tashin599@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
                    <Phone className="text-black animate-bounce" size={24} style={{ animationDelay: "0.2s" }} />
                    <a href="tel:+66819871288" className="text-black font-bold hover:underline">
                      +66819871288
                    </a>
                  </div>
                  <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
                    <Github className="text-black animate-bounce" size={24} style={{ animationDelay: "0.4s" }} />
                    <a
                        href="https://github.com/Tashinamgyel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black font-bold hover:underline"
                    >
                      github.com/Tashinamgyel
                    </a>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                      href="https://github.com/Tashinamgyel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black text-white px-4 py-2 border-2 border-white font-bold hover:bg-gray-800 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <Github size={20} />
                    GITHUB
                  </a>
                  <a
                      href="mailto:tashin599@gmail.com"
                      className="bg-red-600 text-white px-4 py-2 border-2 border-white font-bold hover:bg-red-700 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <Mail size={20} />
                    EMAIL
                  </a>
                </div>
              </div>

              <div
                  className={`bg-black text-white p-8 border-4 border-yellow-400 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${visibleSections.has("contact") ? "animate-slide-in-right" : "opacity-0"}`}
              >
                <h3 className="text-2xl font-bold mb-6">READY TO COLLABORATE?</h3>
                <p className="text-lg mb-6 leading-relaxed">
                  I'm actively seeking Flutter development internship opportunities. Let's build something amazing
                  together with clean code and bold design!
                </p>
                <div className="space-y-4">
                  <div className="bg-yellow-400 text-black p-4 border-2 border-white hover:scale-105 transition-transform duration-300">
                    <div className="font-bold">AVAILABILITY</div>
                    <div>Ready for internship opportunities</div>
                  </div>
                  <div className="bg-yellow-400 text-black p-4 border-2 border-white hover:scale-105 transition-transform duration-300">
                    <div className="font-bold">SPECIALIZATION</div>
                    <div>Flutter Mobile Development</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="font-bold">© 2025 Tashi Namgyel. Built with Flutter Passion.</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="bg-yellow-400 text-black px-4 py-2 border-2 border-white font-bold hover:bg-yellow-600 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  {isDark ? <Sun size={20} className="animate-spin" /> : <Moon size={20} className="animate-bounce" />}
                  {isDark ? "LIGHT" : "DARK"}
                </button>
                <a
                    href="#"
                    className="bg-white text-black px-4 py-2 border-2 border-yellow-400 font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Download size={20} className="animate-bounce" />
                  RESUME
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
  )
}
