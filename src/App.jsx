import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ExternalLink, Download, ArrowDown, ChevronRight, Award } from 'lucide-react';

// --- Utility Components ---

const SectionHeading = ({ children, subtitle }) => (
  <div className="mb-16">
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-display font-bold mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-textMuted font-mono text-sm uppercase tracking-widest"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: '100px' }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="h-1 bg-primary mt-6 rounded-full"
    />
  </div>
);

const GlassCard = ({ children, className = "" }) => (
  <motion.div 
    whileHover={{ y: -6, scale: 1.01 }}
    className={`glass-card p-8 hover:glow-cyan ${className}`}
  >
    {children}
  </motion.div>
);

// --- Sections ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-background/80 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-display font-bold text-xl tracking-tighter"
        >
          LNT<span className="text-primary">.</span>
        </motion.div>
        
        <div className="hidden md:flex space-x-10 font-mono text-xs uppercase tracking-widest">
          {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-textMuted hover:text-primary transition-colors">
              {item}
            </a>
          ))}
        </div>

        <a href="#contact" className="btn-primary text-xs py-2 px-6">
          Hire Me
        </a>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Full Stack Developer", "AI Engineer", "Problem Solver"];
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      }, 100);
    }

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((roleIndex + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center px-6 overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Image Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 glow-cyan">
             <img src="/me.png" alt="Lakshmi Narasimha" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
          {/* Decorative frame */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary rounded-tl-3xl" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-secondary rounded-br-3xl" />
        </motion.div>

        {/* Content Column */}
        <div className="lg:col-span-7">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-primary mb-4 tracking-widest text-sm uppercase"
          >
            Available for Internships 2026
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(3rem,8vw,6rem)] font-display font-extrabold leading-[1] mb-6 tracking-tighter"
          >
            Lakshmi <br />
            <span className="gradient-text">Narasimha</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-4 mb-10 h-8"
          >
            <span className="text-2xl md:text-3xl font-display text-textPrimary">I'm a</span>
            <span className="text-2xl md:text-3xl font-display text-secondary">{displayText}</span>
            <span className="w-1 h-8 bg-primary animate-pulse" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-6"
          >
            <a href="#projects" className="btn-primary flex items-center gap-2">
              View Projects <ChevronRight size={18} />
            </a>
            <a href="/Resume.pdf" target="_blank" className="btn-secondary flex items-center gap-2">
              <Download size={18} /> Resume
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-textMuted"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="Who am I">About Me</SectionHeading>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6 text-lg text-textMuted"
          >
            <p>
              I am a passionate CS student at <span className="text-textPrimary font-bold">Mohan Babu University</span>, specializing in building high-performance web applications and AI-driven solutions. 
            </p>
            <p>
              With a strong foundation in both frontend and backend technologies, I bridge the gap between creative design and technical implementation. My goal is to create seamless digital experiences that solve real-world problems.
            </p>
            <div className="pt-6 flex flex-wrap gap-4">
              {['Creative', 'Analytical', 'Adaptive', 'Leader'].map(trait => (
                <span key={trait} className="px-4 py-1 rounded-full border border-white/10 text-xs font-mono text-textMuted bg-white/5">
                  #{trait}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            <GlassCard className="flex flex-col items-center justify-center text-center py-12">
              <span className="text-secondary text-5xl font-display font-black mb-2">8.80</span>
              <span className="text-textMuted font-mono text-xs uppercase">Current GPA</span>
            </GlassCard>
            <GlassCard className="flex flex-col items-center justify-center text-center py-12">
              <span className="text-primary text-2xl font-display font-bold mb-2">MBU</span>
              <span className="text-textMuted font-mono text-xs uppercase">University</span>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillGroups = [
    { title: "Languages", skills: ["Java", "Python", "C", "JavaScript", "HTML5", "CSS3", "SQL"] },
    { title: "Frontend", skills: ["ReactJS", "Next.js", "Tailwind CSS", "Bootstrap", "Redux"] },
    { title: "Backend", skills: ["Spring Boot", "Node.js", "Express.js", "Flask"] },
    { title: "AI & Data", skills: ["LangChain", "Gemini API", "TF-IDF", "RAG", "Scikit-Learn"] },
    { title: "DevOps & Cloud", skills: ["Git", "Docker", "AWS", "Firebase", "PostgreSQL"] },
    { title: "Testing & Tools", skills: ["JUnit", "Postman", "Selenium", "JIRA"] },
    { title: "Core CS", skills: ["Data Structures", "Algorithms", "DBMS", "OS", "System Design"] },
  ];

  return (
    <section id="skills" className="py-32 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="Technical Arsenal">My Skills</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {skillGroups.map((group, idx) => (
            <motion.div 
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-4"
            >
              <h3 className="font-mono text-sm text-secondary uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <motion.span 
                    key={skill}
                    whileHover={{ scale: 1.05, borderColor: '#00D4FF', color: '#00D4FF' }}
                    className="px-4 py-2 text-sm bg-surface border border-white/5 rounded-lg text-textMuted cursor-default transition-all"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="Professional Journey">Experience</SectionHeading>
        
        <div className="relative border-l-2 border-white/10 pl-8 ml-4 space-y-16">
          {/* Experience Item */}
          <div className="relative">
            <div className="absolute -left-[41px] top-0 w-5 h-5 bg-primary rounded-full glow-cyan border-4 border-background" />
            
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-display font-bold">Freelance Full Stack Developer</h3>
                <p className="text-primary font-mono text-sm uppercase">Sandhya Granites</p>
              </div>
              <span className="px-4 py-1 bg-secondary/10 border border-secondary/20 text-secondary rounded-full text-xs font-mono">
                Mar – May 2026
              </span>
            </div>

            <ul className="space-y-4 text-textMuted max-w-3xl mb-10">
              <li className="flex gap-4">
                <span className="text-secondary mt-1.5">•</span>
                <span>Optimized business workflows by building a custom CRM and inventory management system.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-secondary mt-1.5">•</span>
                <span>Implemented a high-performance granite calculator for accurate stone measurement and billing.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-secondary mt-1.5">•</span>
                <span>Reduced manual entry errors by 40% through automated data validation and report generation.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-secondary mt-1.5">•</span>
                <span>Collaborated directly with stakeholders to deliver a mobile-first responsive experience.</span>
              </li>
            </ul>

            {/* Lighthouse score animation */}
            <div ref={ref} className="bg-surface border border-white/10 p-6 rounded-2xl max-w-md">
              <div className="flex justify-between mb-4">
                <span className="text-xs font-mono text-textMuted">Lighthouse Performance</span>
                <span className="text-xs font-mono text-primary">65% → 85%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: '65%' }}
                  animate={isInView ? { width: '85%' } : {}}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                />
              </div>
              <p className="mt-4 text-[10px] text-textMuted font-mono">
                Performance optimization through code splitting and asset compression.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Smart Resume Analyzer",
      date: "Jan – Mar 2026",
      tech: ["ReactJS", "Spring Boot", "Gemini API", "TF-IDF"],
      metrics: "98% accuracy in <1.5 seconds",
      bullets: [
        "Automated screening of resumes using LLM-based analysis.",
        "Integrated TF-IDF algorithms for precise keyword extraction."
      ],
      github: "https://github.com/lakshminarasimha-lnt/smart-resume-analyzer",
      type: "AI/ML"
    },
    {
      title: "Smart LMS with AI Agent",
      date: "Oct 2025 – Jan 2026",
      tech: ["LangChain", "RAG", "Next.js", "Vector DB"],
      metrics: "60% improvement in content retrieval",
      bullets: [
        "Built a Retrieval-Augmented Generation (RAG) system for student queries.",
        "Interactive AI agent for personalized learning paths."
      ],
      github: "https://github.com/lakshminarasimha-lnt/ai-lms",
      type: "AI/ML"
    },
    {
      title: "Scam Shield",
      date: "Jul – Sep 2025",
      tech: ["ReactJS", "Firebase", "TF-IDF", "Express"],
      metrics: "Real-time threat detection",
      bullets: [
        "Full-stack application for identifying phishing and fraud patterns.",
        "Real-time database integration for global threat sync."
      ],
      github: "https://github.com/lakshminarasimha-lnt/scam-shield",
      type: "Frontend"
    },
    {
      title: "ZeroWaste",
      date: "Apr – Jun 2025",
      tech: ["HTML5", "CSS3", "JS", "Hardware"],
      metrics: "Hackathon winner · 200+ users",
      bullets: [
        "Led a 4-member team to develop a smart waste segregation system.",
        "Simulated user base of 200+ with real-time analytics."
      ],
      github: "https://github.com/lakshminarasimha-lnt/zerowaste",
      type: "Full Stack"
    }
  ];

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="Crafted Solutions">Projects</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <GlassCard key={project.title} className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-display font-bold mb-1">{project.title}</h3>
                  <p className="text-textMuted font-mono text-xs">{project.date}</p>
                </div>
                <motion.a 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  href={project.github} 
                  className="p-3 bg-white/5 rounded-full text-primary hover:text-white transition-colors"
                >
                  <Github size={20} />
                </motion.a>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map(t => (
                  <span key={t} className={`px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider ${
                    t === 'Gemini API' || t === 'LangChain' || t === 'RAG' ? 'bg-secondary/10 text-secondary border border-secondary/20' : 
                    t === 'ReactJS' || t === 'Next.js' ? 'bg-primary/10 text-primary border border-primary/20' : 
                    'bg-white/5 text-textMuted border border-white/10'
                  }`}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="mb-8 flex-grow">
                <ul className="space-y-3 mb-6">
                  {project.bullets.map((b, i) => (
                    <li key={i} className="text-sm text-textMuted flex gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="p-4 bg-primary/5 border-l-2 border-primary rounded-r-lg">
                  <span className="text-xs font-mono text-primary font-bold">{project.metrics}</span>
                </div>
              </div>

              <button className="w-full py-3 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-textMuted hover:text-primary border-t border-white/5 pt-6 transition-colors">
                Details <ExternalLink size={14} />
              </button>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  const certs = [
    { title: "Full Stack Development", provider: "L&T EduTech", year: "2024", id: "LT-FSD-2024" },
    { title: "DevOps Fundamentals", provider: "L&T EduTech", year: "2024", id: "LT-DO-2024" },
  ];

  return (
    <section className="py-32 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="Verified Skills">Certifications</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certs.map(cert => (
            <motion.div 
              key={cert.title}
              whileHover={{ y: -5 }}
              className="relative p-1 rounded-2xl bg-gradient-to-br from-primary/20 via-white/5 to-secondary/20"
            >
              <div className="bg-background rounded-[15px] p-8 flex items-center gap-6">
                <div className="p-4 bg-white/5 rounded-xl text-primary">
                  <Award size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold">{cert.title}</h3>
                  <p className="text-textMuted font-mono text-sm">{cert.provider} • {cert.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <footer id="contact" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto text-center">
        <SectionHeading subtitle="Let's Connect">Get In Touch</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 max-w-4xl mx-auto">
          <a href="mailto:lakshminarasimhathumarada@gmail.com" className="group">
            <div className="mb-4 flex justify-center">
              <div className="p-6 bg-surface rounded-full group-hover:glow-cyan group-hover:bg-primary/10 transition-all">
                <Mail size={24} className="text-primary" />
              </div>
            </div>
            <p className="text-sm font-mono text-textMuted group-hover:text-primary">lakshminarasimhathumarada<br/>@gmail.com</p>
          </a>

          <a href="tel:+918019408469" className="group">
            <div className="mb-4 flex justify-center">
              <div className="p-6 bg-surface rounded-full group-hover:glow-amber group-hover:bg-secondary/10 transition-all">
                <Phone size={24} className="text-secondary" />
              </div>
            </div>
            <p className="text-sm font-mono text-textMuted group-hover:text-secondary">+91 8019408469</p>
          </a>

          <div className="group">
            <div className="mb-4 flex justify-center">
              <div className="p-6 bg-surface rounded-full">
                <Award size={24} className="text-white/40" />
              </div>
            </div>
            <p className="text-sm font-mono text-textMuted">Available for 2026 roles</p>
          </div>
        </div>

        <div className="flex justify-center gap-6 mb-12">
          <motion.a whileHover={{ scale: 1.1 }} href="https://github.com/lakshminarasimha-lnt" className="p-4 border border-white/10 rounded-full hover:bg-white/5">
            <Github size={20} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.1 }} href="https://linkedin.com/in/lakshminarasimhat" className="p-4 border border-white/10 rounded-full hover:bg-white/5">
            <Linkedin size={20} />
          </motion.a>
        </div>

        <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20">
          © 2026 Lakshmi Narasimha Thumarada
        </p>
      </div>
    </footer>
  );
};

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="selection:bg-primary/30 selection:text-primary">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[100] origin-left" style={{ scaleX }} />
      
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
    </div>
  );
};

export default App;
