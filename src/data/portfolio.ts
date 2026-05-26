export const skills = {
  Frontend: ["React.js", "Next.js", "TypeScript", "JavaScript ES6+", "Tailwind CSS", "HTML5 / CSS3", "Responsive Design", "Reusable Components"],
  Backend: ["Node.js", "Express.js", "REST APIs", "CRUD Workflows", "API Integration"],
  "Languages & DB": ["JavaScript", "TypeScript", "Python", "MongoDB", "MySQL", "PostgreSQL"],
  "Cloud & Tools": ["AWS", "Git / GitHub", "Docker", "Postman", "VS Code", "Vercel / Render"],
};

export const skillColors: Record<string, string> = {
  Frontend: "#00D2FF",
  Backend: "#A855F7",
  "Languages & DB": "#10B981",
  "Cloud & Tools": "#F97316",
};

export const projects = [
  {
    title: "Dashboard Application",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    desc: "Modern dashboard with modular components, responsive layouts, clean routing, and scalable frontend architecture. Data-driven views with reusable UI patterns.",
    tag: "Full Stack",
    color: "#00D2FF",
    icon: "📊",
    liveUrl: "",
    githubUrl: "",
  },
  {
    title: "Portfolio Website",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    desc: "Full-stack portfolio showcasing projects, skills, and contact details. Integrated frontend, backend, and data flow end-to-end in a recruiter-friendly interface.",
    tag: "MERN Stack",
    color: "#A855F7",
    icon: "🌐",
    liveUrl: "",
    githubUrl: "",
  },
  {
    title: "Dockerized Node.js App",
    tech: ["Node.js", "Docker", "Docker Compose"],
    desc: "Containerized Node.js application standardizing local development and simplifying execution across environments. Deployment-ready with packaged dependencies.",
    tag: "DevOps",
    color: "#10B981",
    icon: "🐳",
    liveUrl: "",
    githubUrl: "",
  },
];

export const experience = [
  {
    role: "Coding & Robotics Teacher",
    company: "AmazeHeads · Vani Vidyalay School",
    period: "2026 – Present",
    current: true,
    color: "#00D2FF",
    icon: "🤖",
    expLetterFile: "",
    points: [
      "Teaching Coding, STEM and Robotics to students at Vani Vidyalay School through AmazeHeads — bridging technology and hands-on learning",
      "Designing curriculum for robotics workshops, coding sessions, and STEM activities, making complex concepts accessible and engaging for school students",
      "Teaching computer science fundamentals including programming basics, digital literacy, and practical tech skills with structured lesson plans and assessments",
      "Mentoring students through project-based learning using robotics kits and interactive coding exercises to build real-world problem-solving skills",
    ],
  },
  {
    role: "Trainer Intern (Coding Teacher)",
    company: "ENpower",
    period: "Nov 2025 – Apr 2026",
    current: false,
    color: "#10B981",
    icon: "💡",
    expLetterFile: "exp-letters/ENpower- Atharv Pradip Pawar (Trainer Intern).pdf",
    points: [
      "Delivered hands-on coding sessions on web development and programming fundamentals — logic building, JavaScript basics, structured exercises and mini-projects",
      "Created lesson materials, debugged student projects, and provided one-on-one guidance that improved code quality, confidence, and student engagement",
      "Translated technical concepts into simple, actionable learning steps — demonstrating strong communication and debugging discipline",
    ],
  },
  {
    role: "Web Development Intern",
    company: "KartBuddy Logistics",
    period: "May 2025 – Aug 2025",
    current: false,
    color: "#F97316",
    icon: "🚚",
    expLetterFile: "exp-letters/CertificateOfKartBuddyInternShip.pdf",
    points: [
      "Developed responsive web modules for logistics-related workflows, turning business requirements into usable interfaces with backend-supported features",
      "Worked with Node.js, Express.js, and databases to support CRUD functionality, data handling, internal tooling, and day-to-day product improvements",
      "Collaborated on debugging, testing, and deployment-related tasks while following structured development processes",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "EasyGoLife",
    period: "Oct 2024 – Dec 2024",
    current: false,
    color: "#6366F1",
    icon: "✈️",
    expLetterFile: "exp-letters/My Easygolife intern experience certificate.pdf",
    points: [
      "Built reusable UI components and responsive pages for web applications, improving consistency, usability, and cross-device behavior",
      "Assisted with API integration, bug fixing, and feature support to deliver stable web application updates within project timelines",
      "Contributed to frontend maintenance and release-readiness by resolving interface issues and supporting deployment activities",
    ],
  },
];

export const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    color: "#F97316",
    stars: 5,
    downloadFile: "certs/AWS-Cloud-Practitioner-Certificate.pdf",
  },
  {
    name: "Master in Full Stack Web Development with AWS",
    issuer: "Udemy",
    color: "#00D2FF",
    stars: 5,
    downloadFile: "certs/Master in Full Stack Web Development With AWS.pdf",
  },
  {
    name: "SQL Professional Certificate",
    issuer: "Certification Program",
    color: "#10B981",
    stars: 5,
    downloadFile: "certs/SQL-Professional-Certificate.pdf",
  },
  {
    name: "SQL Professional — Bonus Lessons",
    issuer: "Certification Program",
    color: "#059669",
    stars: 4,
    downloadFile: "certs/SQL-Professional-BonusLessons-Certificate.pdf",
  },
  {
    name: "SQL Foundation",
    issuer: "Certification Program",
    color: "#34D399",
    stars: 4,
    downloadFile: "certs/SQL-Foundation.pdf",
  },
  {
    name: "SQL Essentials",
    issuer: "Certification Program",
    color: "#6EE7B7",
    stars: 3,
    downloadFile: "certs/SQL-Essential-Certificate.pdf",
  },
  {
    name: "Python Programming Essentials",
    issuer: "IBM",
    color: "#A855F7",
    stars: 4,
    downloadFile: "certs/Python_IBM_Certificate.pdf",
  },
  {
    name: "Java Essentials",
    issuer: "Certification Program",
    color: "#6366F1",
    stars: 3,
    downloadFile: "certs/Java-Essential-Certificate.pdf",
  },
  {
    name: "Angular",
    issuer: "Certification Program",
    color: "#E11D48",
    stars: 3,
    downloadFile: "certs/Angular-Certificate.pdf",
  },
  {
    name: "Advanced Web Designing",
    issuer: "Certification Program",
    color: "#F59E0B",
    stars: 3,
    downloadFile: "certs/Advanced-Web-Designing-Certificate.pdf",
  },
  {
    name: "Web Designing",
    issuer: "Certification Program",
    color: "#64748B",
    stars: 2,
    downloadFile: "certs/Web-Designing-Certificate.pdf",
  },
];

export const resumes = [
  {
    title: "Elite Resume",
    filename: "Atharv_Pawar_Elite_Resume.pdf",
    description: "Premium combined resume — full career profile for all roles",
    color: "#F59E0B",
    icon: "⭐",
  },
  {
    title: "Software Developer Resume",
    filename: "Atharv_Pawar_Resume_A_Software_Developer_2026.pdf",
    description: "Focused on full-stack development, MERN stack, and cloud technologies",
    color: "#00D2FF",
    icon: "💻",
  },
  {
    title: "STEM & Robotics Instructor Resume",
    filename: "Atharv_Pawar_Resume_B_STEM_Robotics_Instructor_2026.pdf",
    description: "Highlighting teaching experience, STEM education, and robotics expertise",
    color: "#10B981",
    icon: "🤖",
  },
];

export const contactInfo = [
  { icon: "📧", label: "atharvapawar34s@gmail.com", href: "mailto:atharvapawar34s@gmail.com" },
  { icon: "📞", label: "+91-9119468987", href: "tel:+919119468987" },
  { icon: "💼", label: "linkedin.com/in/atharvapawar34s", href: "https://www.linkedin.com/in/atharvapawar34s" },
  { icon: "🐙", label: "github.com/atharvapawar", href: "https://github.com/atharvapawar" },
  { icon: "📍", label: "Mumbai, Bhandup · Remote OK", href: null },
];
