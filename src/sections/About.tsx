import { useEffect, useRef, useState } from 'react';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';

export default function About() {
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
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white dark:bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Section Title */}
            <div
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
            >
              <span className="text-red-600 font-medium text-sm tracking-wider uppercase">
                About Me
              </span>
              <h2 className="text-4xl lg:text-5xl font-semibold mt-3 tracking-tight dark:text-white">
                Passionate About
                <br />
                <span className="text-red-600">Creating Impact</span>
              </h2>
            </div>

            {/* Body Text */}
            <div
              className={`space-y-4 transition-all duration-700 delay-200 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
            >
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                I'm a Software Engineer from Bhutan, currently based in Thailand. 
                With a GPA of <strong className="dark:text-gray-300">3.96/4.00</strong> in Information and Communication 
                Technology from Rangsit University, I specialize in building scalable 
                backend systems, mobile applications, and immersive game experiences.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                My journey in tech has been driven by a passion for creating solutions 
                that make a real impact—from developing national-level APIs at 
                <strong className="dark:text-gray-300"> GovTech Bhutan</strong> to publishing apps on the 
                <strong className="dark:text-gray-300"> Google Play Store</strong>.
              </p>
            </div>

            {/* Highlight Box */}
            <div
              className={`relative p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border-l-4 border-red-600 transition-all duration-700 delay-300 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
            >
              <p className="text-gray-700 dark:text-gray-300 italic">
                "I believe in writing clean, maintainable code and building products 
                that solve real problems for real people."
              </p>
            </div>
          </div>

          {/* Right Column - Education Card */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible
                ? 'opacity-100 translate-y-0 rotate-0'
                : 'opacity-0 translate-y-12 rotate-x-90'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 hover-lift">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold dark:text-white">Education</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Academic Background</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="pb-6 border-b border-gray-100 dark:border-gray-800">
                  <h4 className="text-lg font-semibold mb-2 dark:text-white">
                    BSc in Information and Communication Technology
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span>Rangsit University, Thailand</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4 text-red-600" />
                      <span>Jan 2023 – Dec 2025</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-red-600" />
                    <span className="font-medium dark:text-white">GPA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-red-600">3.96</span>
                    <span className="text-gray-500 dark:text-gray-400">/ 4.00</span>
                  </div>
                </div>

                {/* GPA Visual */}
                <div className="pt-4">
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-1000"
                      style={{ width: isVisible ? '99%' : '0%' }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Graduated with Honors
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { label: 'Years', value: '3+', sublabel: 'Experience' },
                { label: 'Projects', value: '10+', sublabel: 'Completed' },
                { label: 'Certifications', value: '5+', sublabel: 'Earned' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 text-center transition-all duration-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:scale-105 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionTimingFunction: 'var(--ease-out-expo)',
                    transitionDelay: `${500 + index * 100}ms`,
                  }}
                >
                  <div className="text-2xl font-bold text-red-600">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
