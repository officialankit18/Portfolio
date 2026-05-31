import {
  Award,
  BookOpen,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Cpu,
  Database,
  FileText,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  MapPin,
  Medal,
  Network,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Trophy,
  Workflow,
  Zap
} from "lucide-react";

export const navItems = ["About", "Stack", "Projects", "Research", "Certifications", "Profiles", "Contact"];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/officialankit18", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ankityadav-304a932a9/", icon: Linkedin },
  { label: "LeetCode", href: "https://leetcode.com/u/__official_ankit_/", icon: Code2 }
];

export const heroRoles = [
  "Software Engineer",
  "Full Stack Developer",
  "Backend Enthusiast",
  "Freelance Web Developer",
  "AI Enthusiast",
  "Problem Solver"
];

export const badges = [
  "185+ LeetCode Problems",
  "5+ Real Projects",
  "Research Author",
  "SIH Participant",
  "Freelance Developer"
];

export const stats = [
  { value: "5+", label: "Real Projects" },
  { value: "3+", label: "Live Websites" },
  { value: "185+", label: "DSA Problems" },
  { value: "2027", label: "CSE Graduate" }
];

export const techGroups = [
  { title: "Languages", icon: Code2, items: ["C++", "Python", "JavaScript"] },
  { title: "Frontend", icon: Layers3, items: ["HTML5", "CSS3", "React.js", "Bootstrap"] },
  { title: "Backend", icon: Server, items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"] },
  { title: "Database", icon: Database, items: ["MongoDB", "MySQL"] },
  { title: "Tools", icon: Workflow, items: ["Git", "GitHub", "VS Code"] },
  { title: "Concepts", icon: BrainCircuit, items: ["DSA", "OOP", "DBMS", "Problem Solving"] },
  { title: "Emerging Tech", icon: Cpu, items: ["OCR", "AI Integration", "Blockchain Basics", "Azure", "AWS", "IoT"] }
];

export const projects = [
  {
    title: "Shiksharthi",
    href: "https://shiksharthi.online",
    description: "An online learning platform for Class 9-12 students with secure accounts, adaptive learning flows, and AI-backed study support.",
    features: ["JWT Authentication", "Secure Backend", "MongoDB", "AI Integration", "Student Profiles", "Personalized Learning"],
    stack: ["React", "Node.js", "Express", "MongoDB"],
    category: "Hero Project",
    priority: "Flagship",
    icon: Rocket
  },
  {
    title: "OCR Based Land Record System",
    href: "https://research-kadh.onrender.com",
    description: "OCR-powered land record management platform for document digitization, structured extraction, and secure record handling.",
    features: ["OCR Processing", "Document Upload", "Backend APIs", "Data Extraction", "Secure Storage"],
    stack: ["Node.js", "MongoDB", "OCR"],
    category: "Research Project",
    priority: "Research",
    icon: FileText
  },
  {
    title: "Vanamriti Portal",
    href: "https://vanamriti-portal.netlify.app",
    description: "Smart India Hackathon platform focused on land digitization, farmer support systems, dashboard views, and visual insight.",
    features: ["WebGIS", "Dashboard Analytics", "Responsive UI", "Data Visualization"],
    stack: ["React", "Dashboard", "WebGIS"],
    category: "Hackathon",
    priority: "Frontend Lead",
    icon: Network
  },
  {
    title: "School Website",
    href: "https://mjeckanpur.in",
    description: "Official school website developed for Mary Jesus Education Centre with admissions, media, communication, and content sections.",
    features: ["Admissions", "Gallery", "Contact System", "Dynamic Content"],
    stack: ["Web", "SEO", "Responsive"],
    category: "Freelance",
    priority: "Client Work",
    icon: BriefcaseBusiness
  },
  {
    title: "Client Portfolio Website",
    href: "https://himanshusinghparmar.info",
    description: "Professional client portfolio website with AI assistant integration, strong SEO foundations, and responsive presentation.",
    features: ["AI Assistant", "SEO Optimization", "Responsive Design"],
    stack: ["Web", "AI Assistant", "SEO"],
    category: "Freelance",
    priority: "Client Work",
    icon: Sparkles
  }
];

export const certificates = [
  { title: "IBM Prompt Engineering for Everyone", href: "/certificates/ibm-prompt-engineering.pdf", issuer: "IBM Skills Network", icon: Bot },
  { title: "Microsoft Azure Computer Vision Project", href: "/certificates/azure-computer-vision.pdf", issuer: "Microsoft Azure", icon: BrainCircuit },
  { title: "AWS S3 Basics", href: "/certificates/aws-s3-basics.pdf", issuer: "AWS / Coursera", icon: ShieldCheck },
  { title: "Full Stack Web Development Training", href: "/certificates/full-stack-web-development.pdf", issuer: "Professional Training", icon: Layers3 },
  { title: "Azure IoT Hub", href: "/certificates/azure-iot-hub.pdf", issuer: "Microsoft Azure", icon: Cpu },
  { title: "Python for Data Science", href: "/certificates/python-for-data-science.pdf", issuer: "Python Training", icon: Code2 },
  { title: "Learning IoT with Thingworx", href: "/certificates/thingworx-iot.pdf", issuer: "Thingworx", icon: Zap }
];

export const achievements = [
  { title: "185+ LeetCode Problems Solved", icon: Code2 },
  { title: "Smart India Hackathon Internal Qualification (2 Times)", icon: Trophy },
  { title: "Hyperspace Innovation Hackathon Participant", icon: Rocket },
  { title: "5+ Real World Projects", icon: Award },
  { title: "3+ Live Websites Deployed", icon: Medal },
  { title: "Research Author", icon: BookOpen },
  { title: "Freelance Developer", icon: BriefcaseBusiness }
];

export const timeline = [
  { year: "2024", title: "Started Full Stack Development Journey", text: "Built foundations in frontend, backend, DSA, and modern web development." },
  { year: "2025", title: "Built Client Projects & Earned Certifications", text: "Delivered freelance websites, completed professional certifications, and participated in hackathons." },
  { year: "2026", title: "Product, Research & Freelance Expansion", text: "Built Shiksharthi, developed the OCR system, authored research, and expanded real-world deployment work." }
];

export const contact = {
  name: "Ankit Yadav",
  email: "ay7054464@gmail.com",
  location: "Kanpur, Uttar Pradesh",
  institute: "Pranveer Singh Institute of Technology",
  education: "B.Tech Computer Science & Engineering",
  duration: "2023-2027",
  locationIcon: MapPin,
  educationIcon: GraduationCap
};
