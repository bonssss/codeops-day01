/**
 * SkillHub - Learning Resources Data Source
 * Curated high-quality tech learning resources
 */

export const CATEGORIES = [
  {
    id: "web-development",
    name: "Web Development",
    slug: "Web Development",
    icon: "Layout",
    color: "from-blue-500 to-indigo-600",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
    accentColor: "#3b82f6",
    description: "Modern frontend frameworks, responsive UI, CSS architectures, HTML5, and fullstack web tooling.",
    featuredTech: ["React", "Next.js", "Vue", "Tailwind CSS", "TypeScript", "HTML/CSS"]
  },
  {
    id: "backend-development",
    name: "Backend Development",
    slug: "Backend Development",
    icon: "Server",
    color: "from-emerald-500 to-teal-600",
    gradient: "linear-gradient(135deg, #10b981 0%, #0d9488 100%)",
    accentColor: "#10b981",
    description: "Server architecture, REST & GraphQL APIs, microservices, databases, authentication, and performance scaling.",
    featuredTech: ["Node.js", "Python", "Go", "PostgreSQL", "Docker", "Express"]
  },
  {
    id: "data-science",
    name: "Data Science",
    slug: "Data Science",
    icon: "BarChart3",
    color: "from-amber-500 to-orange-600",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
    accentColor: "#f59e0b",
    description: "Statistical analysis, data wrangling, visualization, machine learning models, and big data pipelines.",
    featuredTech: ["Python", "Pandas", "NumPy", "SQL", "Tableau", "R"]
  },
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    slug: "Artificial Intelligence",
    icon: "BrainCircuit",
    color: "from-purple-500 to-pink-600",
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    accentColor: "#a855f7",
    description: "Deep learning, LLMs, neural networks, computer vision, natural language processing, and prompt engineering.",
    featuredTech: ["PyTorch", "TensorFlow", "OpenAI API", "LangChain", "Hugging Face", "Keras"]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    slug: "Cybersecurity",
    icon: "ShieldCheck",
    color: "from-rose-500 to-red-600",
    gradient: "linear-gradient(135deg, #f43f5e 0%, #dc2626 100%)",
    accentColor: "#f43f5e",
    description: "Ethical hacking, penetration testing, network defense, cryptography, application security, and SIEM tools.",
    featuredTech: ["Wireshark", "Metasploit", "Burp Suite", "Kali Linux", "Cryptography", "OWASP"]
  },
  {
    id: "devops",
    name: "DevOps",
    slug: "DevOps",
    icon: "Terminal",
    color: "from-cyan-500 to-blue-600",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
    accentColor: "#06b6d4",
    description: "CI/CD automation, cloud infrastructure, container orchestration, monitoring, and Infrastructure as Code.",
    featuredTech: ["Docker", "Kubernetes", "AWS", "Terraform", "GitHub Actions", "Linux"]
  },
  {
    id: "mobile-development",
    name: "Mobile Development",
    slug: "Mobile Development",
    icon: "Smartphone",
    color: "from-violet-500 to-indigo-600",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #4f46e5 100%)",
    accentColor: "#8b5cf6",
    description: "Cross-platform and native mobile apps, state management, offline storage, animations, and app publishing.",
    featuredTech: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "Dart"]
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    slug: "UI/UX Design",
    icon: "Palette",
    color: "from-fuchsia-500 to-rose-500",
    gradient: "linear-gradient(135deg, #d946ef 0%, #f43f5e 100%)",
    accentColor: "#d946ef",
    description: "User research, design systems, wireframing, interactive prototyping, accessibility, and visual aesthetics.",
    featuredTech: ["Figma", "Design Systems", "Prototyping", "UX Research", "Wireframing", "Tailwind UI"]
  }
];

export const RESOURCES = [
  {
    id: "res-001",
    title: "The Ultimate React 18 & Next.js Masterclass",
    description: "Master modern React 18 from scratch with Hooks, State Management, Server Components, TypeScript, and fullstack Next.js projects.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    category: "Web Development",
    technology: "React",
    level: "Intermediate",
    rating: 4.9,
    reviewsCount: 14200,
    duration: "42 hours",
    instructor: "Maximilian Schwarzmüller",
    price: "$18.99",
    isFree: false,
    platform: "Udemy",
    type: "Course",
    url: "https://react.dev/learn",
    featured: true,
    popularity: 98,
    tags: ["React", "Next.js", "Hooks", "Redux", "TypeScript"],
    whatYouWillLearn: [
      "Build powerful, responsive, and reactive web applications",
      "Understand React 18 concurrent features, Suspense, and Server Components",
      "Fullstack development using Next.js 14 App Router and Server Actions",
      "Complex state management with Redux Toolkit and React Query"
    ],
    prerequisites: ["Solid understanding of modern JavaScript (ES6+)", "Basic HTML & CSS knowledge"]
  },
  {
    id: "res-002",
    title: "Full Stack Open: Deep Dive into Modern Web Development",
    description: "World-class university course covering React, Redux, Node.js, Express, MongoDB, GraphQL, TypeScript, and containerization. 100% free.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    category: "Web Development",
    technology: "JavaScript",
    level: "Intermediate",
    rating: 4.95,
    reviewsCount: 8900,
    duration: "60 hours",
    instructor: "University of Helsinki",
    price: "Free",
    isFree: true,
    platform: "University of Helsinki",
    type: "Course",
    url: "https://fullstackopen.com/en/",
    featured: true,
    popularity: 96,
    tags: ["Node.js", "React", "MongoDB", "GraphQL", "TypeScript"],
    whatYouWillLearn: [
      "Single Page Applications with React and modern Hooks",
      "RESTful API servers with Node.js and Express",
      "Database design with MongoDB and Relational databases",
      "GraphQL APIs, CI/CD pipelines, and automated testing"
    ],
    prerequisites: ["Good programming basics in JavaScript", "Familiarity with Git and terminal"]
  },
  {
    id: "res-003",
    title: "Official React Documentation & Interactive Tutorials",
    description: "The official interactive React documentation featuring live code sandboxes, visual mental models, and best practices directly from the core team.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
    category: "Web Development",
    technology: "React",
    level: "Beginner",
    rating: 4.9,
    reviewsCount: 35000,
    duration: "15 hours",
    instructor: "React Core Team",
    price: "Free",
    isFree: true,
    platform: "Official Docs",
    type: "Documentation",
    url: "https://react.dev",
    featured: false,
    popularity: 94,
    tags: ["React", "Docs", "JavaScript", "Frontend"],
    whatYouWillLearn: [
      "Thinking in React mental models and state flow",
      "Hooks lifecycle: useState, useEffect, useRef, useMemo",
      "Pure components and avoiding common reactivity pitfalls",
      "Interactive code exercises with instant in-browser feedback"
    ],
    prerequisites: ["HTML, CSS, and basic JavaScript syntax"]
  },
  {
    id: "res-004",
    title: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
    description: "Master backend web development by building a massive, production-ready RESTful API with authentication, payments, email, and security.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80",
    category: "Backend Development",
    technology: "Node.js",
    level: "Intermediate",
    rating: 4.8,
    reviewsCount: 19800,
    duration: "42 hours",
    instructor: "Jonas Schmedtmann",
    price: "$19.99",
    isFree: false,
    platform: "Udemy",
    type: "Course",
    url: "https://nodejs.org/en/docs",
    featured: true,
    popularity: 95,
    tags: ["Node.js", "Express", "MongoDB", "Backend", "JWT"],
    whatYouWillLearn: [
      "Build fast, secure, scalable RESTful APIs with Node.js & Express",
      "Advanced MongoDB: aggregation pipelines, geospatial queries, indexes",
      "Authentication, authorization, JWT, encryption & security headers",
      "Stripe payment gateway integration and automated email sending"
    ],
    prerequisites: ["Solid JavaScript (promises, async/await, closures)"]
  },
  {
    id: "res-005",
    title: "Designing Data-Intensive Applications",
    description: "The definitive guide to the principles, algorithms, and practical trade-offs behind modern distributed data systems, databases, and stream processing.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    category: "Backend Development",
    technology: "PostgreSQL",
    level: "Advanced",
    rating: 4.96,
    reviewsCount: 7600,
    duration: "30 hours reading",
    instructor: "Martin Kleppmann",
    price: "$39.99",
    isFree: false,
    platform: "O'Reilly",
    type: "Book",
    url: "https://dataintensive.net",
    featured: false,
    popularity: 92,
    tags: ["Distributed Systems", "Databases", "System Design", "Scalability"],
    whatYouWillLearn: [
      "Deep dive into storage engines, B-trees, and LSM-trees",
      "Replication models, leader-follower consensus, and partitioning",
      "Transactions, ACID guarantees, serializability, and 2PC",
      "Stream processing, event sourcing, and batch architectures"
    ],
    prerequisites: ["Experience building database-backed backend services"]
  },
  {
    id: "res-006",
    title: "Machine Learning Specialization by Andrew Ng",
    description: "The world's most renowned foundational AI & ML course by Stanford & DeepLearning.AI. Covers regression, classification, neural networks, and recommender systems.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    category: "Artificial Intelligence",
    technology: "Python",
    level: "Beginner",
    rating: 4.94,
    reviewsCount: 28500,
    duration: "40 hours",
    instructor: "Andrew Ng",
    price: "Free",
    isFree: true,
    platform: "Coursera",
    type: "Course",
    url: "https://www.deeplearning.ai/courses/machine-learning-specialization/",
    featured: true,
    popularity: 99,
    tags: ["Machine Learning", "Python", "Neural Networks", "NumPy", "AI"],
    whatYouWillLearn: [
      "Supervised learning: Linear regression, Logistic regression, Decision trees",
      "Unsupervised learning: Clustering, Anomaly detection, PCA",
      "Deep learning basics with TensorFlow and vectorization",
      "Practical ML deployment and performance diagnostics"
    ],
    prerequisites: ["Basic Python knowledge and high-school math"]
  },
  {
    id: "res-007",
    title: "Docker & Kubernetes: The Practical Guide",
    description: "Learn Docker, Docker Compose, Kubernetes, and Helm from ground zero with hands-on containerization and production cluster deployments.",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
    category: "DevOps",
    technology: "Docker",
    level: "Intermediate",
    rating: 4.9,
    reviewsCount: 16500,
    duration: "23 hours",
    instructor: "Maximilian Schwarzmüller",
    price: "$19.99",
    isFree: false,
    platform: "Udemy",
    type: "Course",
    url: "https://docs.docker.com",
    featured: true,
    popularity: 97,
    tags: ["Docker", "Kubernetes", "DevOps", "Containers", "CI/CD"],
    whatYouWillLearn: [
      "Docker images, containers, multi-stage builds, volumes, and networks",
      "Compose multi-service architectures with caching and databases",
      "Kubernetes pods, services, deployments, ingress, and configmaps",
      "Deploying K8s clusters on cloud providers"
    ],
    prerequisites: ["Basic familiarity with web development and terminal"]
  },
  {
    id: "res-008",
    title: "Practical Ethical Hacking - The Complete Course",
    description: "Learn ethical hacking from scratch: networking fundamentals, Linux, Python scripting, passive/active reconnaissance, vulnerability scanning, and Active Directory attacks.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    category: "Cybersecurity",
    technology: "Kali Linux",
    level: "Beginner",
    rating: 4.92,
    reviewsCount: 13400,
    duration: "25 hours",
    instructor: "Heath Adams (The Cyber Mentor)",
    price: "$29.99",
    isFree: false,
    platform: "TCM Security",
    type: "Course",
    url: "https://tcm-sec.com",
    featured: true,
    popularity: 95,
    tags: ["Ethical Hacking", "Penetration Testing", "Security", "Linux"],
    whatYouWillLearn: [
      "Network scanning and enumeration with Nmap and Wireshark",
      "Web application vulnerabilities: SQLi, XSS, CSRF, and Burp Suite",
      "Active Directory exploitation and lateral movement",
      "Writing professional penetration testing assessment reports"
    ],
    prerequisites: ["Basic computer and networking curiosity"]
  },
  {
    id: "res-009",
    title: "React Native - The Practical Guide",
    description: "Use React Native and Expo to build native cross-platform mobile apps for iOS and Android with animations, navigation, camera access, and push notifications.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    category: "Mobile Development",
    technology: "React Native",
    level: "Intermediate",
    rating: 4.83,
    reviewsCount: 15100,
    duration: "28 hours",
    instructor: "Maximilian Schwarzmüller",
    price: "$18.99",
    isFree: false,
    platform: "Udemy",
    type: "Course",
    url: "https://reactnative.dev/docs/getting-started",
    featured: true,
    popularity: 94,
    tags: ["React Native", "Expo", "iOS", "Android", "Mobile"],
    whatYouWillLearn: [
      "Build native iOS and Android apps using React and JavaScript",
      "React Navigation: Stacks, Tabs, Drawers, and Modal routes",
      "Access device features: Camera, Location, Maps, and SQLite storage",
      "Publish apps to Apple App Store and Google Play Store"
    ],
    prerequisites: ["Solid React fundamentals (Components, Props, State, Hooks)"]
  },
  {
    id: "res-010",
    title: "Figma UI/UX Design Essentials: From Zero to Pro",
    description: "Learn UI/UX design in Figma from scratch: wireframing, component auto-layouts, responsive design tokens, interactive prototyping, and design systems.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
    category: "UI/UX Design",
    technology: "Figma",
    level: "Beginner",
    rating: 4.91,
    reviewsCount: 18400,
    duration: "12 hours",
    instructor: "Daniel Walter Scott",
    price: "$16.99",
    isFree: false,
    platform: "Udemy",
    type: "Course",
    url: "https://help.figma.com",
    featured: true,
    popularity: 96,
    tags: ["Figma", "UI Design", "UX", "Prototyping", "Wireframes"],
    whatYouWillLearn: [
      "Master Figma Auto-Layout 5.0, variables, and responsive constraints",
      "Build cohesive design systems with reusable components and variants",
      "Create high-fidelity interactive prototypes with smart animations",
      "Conduct UX usability testing and design handoff to developers"
    ],
    prerequisites: ["No design experience required"]
  },
  {
    id: "res-011",
    title: "Python for Data Science and Machine Learning Bootcamp",
    description: "Learn how to use NumPy, Pandas, Seaborn, Matplotlib, Plotly, Scikit-Learn, Machine Learning, and Big Data with Python from scratch.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    category: "Data Science",
    technology: "Python",
    level: "Beginner",
    rating: 4.75,
    reviewsCount: 32000,
    duration: "25 hours",
    instructor: "Jose Portilla",
    price: "$17.99",
    isFree: false,
    platform: "Udemy",
    type: "Course",
    url: "https://pandas.pydata.org/docs/",
    featured: false,
    popularity: 92,
    tags: ["Pandas", "NumPy", "Data Analysis", "Matplotlib", "Python"],
    whatYouWillLearn: [
      "Data wrangling, cleaning, and transformation with Pandas",
      "Statistical visualizations with Seaborn and Plotly",
      "Scikit-Learn algorithms: KNN, Random Forests, SVMs, PCA",
      "Natural Language Processing basics and spam filters"
    ],
    prerequisites: ["Basic Python syntax knowledge"]
  },
  {
    id: "res-012",
    title: "Harvard CS50: Introduction to Computer Science",
    description: "An entry-level introduction to computer science and programming: C, Python, SQL, HTML, CSS, algorithms, and data structures.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    category: "Web Development",
    technology: "Python",
    level: "Beginner",
    rating: 4.98,
    reviewsCount: 65000,
    duration: "50 hours",
    instructor: "David J. Malan",
    price: "Free",
    isFree: true,
    platform: "edX / Harvard",
    type: "Course",
    url: "https://cs50.harvard.edu/x/",
    featured: true,
    popularity: 100,
    tags: ["CS50", "Computer Science", "Algorithms", "C", "Python"],
    whatYouWillLearn: [
      "Algorithmic thinking and efficient problem solving",
      "Memory management, pointers, and data structures in C",
      "Web applications with Python, Flask, and SQLite",
      "Security, cryptography, and real-world software design"
    ],
    prerequisites: ["None - designed for complete beginners"]
  }
];

export const DIFFICULTY_LEVELS = [
  { label: "All Levels", value: "all" },
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" }
];

export const PRICE_TYPES = [
  { label: "All Prices", value: "all" },
  { label: "Free Resources", value: "free" },
  { label: "Paid Resources", value: "paid" }
];

export const CONTENT_TYPES = [
  { label: "All Formats", value: "all" },
  { label: "Course", value: "Course" },
  { label: "Tutorial", value: "Tutorial" },
  { label: "Documentation", value: "Documentation" },
  { label: "Book", value: "Book" },
  { label: "Interactive", value: "Interactive" }
];

export const SORT_OPTIONS = [
  { label: "Most Popular", value: "popularity" },
  { label: "Highest Rated", value: "rating" },
  { label: "Shortest Duration", value: "duration_asc" },
  { label: "Alphabetical (A-Z)", value: "title_asc" }
];
