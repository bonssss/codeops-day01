/**
 * SkillHub - Comprehensive Tech Stack Roadmaps
 * Curated 100% Free Resources, Practical Projects, and Structured Learning Paths
 */

export const ROADMAP_CATEGORIES = [
  { id: "all", label: "All Roadmaps" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "mobile", label: "Mobile Dev" },
  { id: "devops", label: "DevOps & Cloud" },
  { id: "security", label: "Cybersecurity" },
  { id: "data", label: "Data Analytics & Eng" },
  { id: "ai", label: "AI & Machine Learning" },
  { id: "qa", label: "QA & Testing" }
];

export const ROADMAPS = [
  {
    id: "frontend-development",
    title: "Frontend Developer",
    category: "frontend",
    tagline: "From HTML/CSS basics to advanced React, TypeScript, state management, and modern web performance.",
    icon: "Layout",
    badge: "100% Free",
    level: "Beginner Friendly",
    estimatedDuration: "4 - 6 Months (10-12 hrs/week)",
    careerRoles: ["Junior Frontend Developer", "React Developer", "UI Engineer", "Frontend Architect"],
    prerequisites: ["Basic computer literacy", "A modern web browser and code editor (VS Code)"],
    overview: "Frontend engineers build the visual, interactive interfaces of web applications. This roadmap takes you from foundational internet mechanics and responsive design up to production-grade React architecture, testing, and web performance optimization using entirely free materials.",
    stages: [
      {
        id: "fe-stage-1",
        stageNumber: 1,
        title: "Web Foundations: HTML5, Modern CSS3 & Responsive Design",
        description: "Master the structure of the web, semantic elements, modern CSS layouts (Flexbox/Grid), and mobile-first design.",
        estimatedHours: "40 Hours",
        topics: [
          {
            id: "fe-html5-semantic",
            title: "HTML5 Semantic Structure & Accessibility (a11y)",
            summary: "Structure web pages with meaningful HTML elements, clean document outlines, meta tags, and WCAG accessibility standards.",
            skills: ["Semantic tags (<main>, <article>, <nav>)", "Accessible forms and inputs", "ARIA roles and keyboard navigation", "SEO head metadata"],
            freeResources: [
              {
                title: "MDN: Structuring the Web with HTML",
                provider: "Mozilla MDN",
                type: "Documentation",
                url: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Responsive Web Design Certification",
                provider: "freeCodeCamp",
                type: "Interactive Course",
                url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
                duration: "30 hrs",
                isFree: true
              },
              {
                title: "web.dev: Learn Accessibility",
                provider: "Google Chrome Developers",
                type: "Official Course",
                url: "https://web.dev/learn/accessibility",
                duration: "8 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: HTML5 & Accessibility Full Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=kUMe1FH4CHE",
                duration: "4 hrs",
                isFree: true
              }
            ]
          },
          {
            id: "fe-css-layout",
            title: "Modern CSS: Flexbox, CSS Grid & Responsive Systems",
            summary: "Build flexible, pixel-perfect responsive layouts without frameworks using modern Flexbox, 2D Grid, and fluid typography.",
            skills: ["CSS Box Model & specificity", "Flexbox alignment and layouts", "CSS Grid template areas", "Media queries & container queries"],
            freeResources: [
              {
                title: "MDN: Learn CSS & Layout Guides",
                provider: "Mozilla MDN",
                type: "Documentation",
                url: "https://developer.mozilla.org/en-US/docs/Learn/CSS",
                duration: "20 hrs",
                isFree: true
              },
              {
                title: "Flexbox Froggy & Grid Garden",
                provider: "Codepip",
                type: "Interactive Sandbox",
                url: "https://flexboxfroggy.com/",
                duration: "3 hrs",
                isFree: true
              },
              {
                title: "Kevin Powell: CSS Demystified",
                provider: "YouTube (Kevin Powell)",
                type: "Video Series",
                url: "https://www.youtube.com/@KevinPowell",
                duration: "12 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "fe-stage-2",
        stageNumber: 2,
        title: "JavaScript Deep Dive & DOM Manipulation",
        description: "Develop algorithmic problem solving and master modern ES6+, asynchronous programming, closures, and the browser DOM.",
        estimatedHours: "60 Hours",
        topics: [
          {
            id: "fe-js-core",
            title: "JavaScript Core: Types, Scope, Closures & Prototypes",
            summary: "Learn JavaScript from the ground up: data structures, functions, execution context, scoping, and closures.",
            skills: ["Variables, scopes, let vs const", "Arrow functions & higher order methods", "Array methods (map, filter, reduce)", "Closures & lexical scope"],
            freeResources: [
              {
                title: "JavaScript.info: The Modern JavaScript Tutorial",
                provider: "JavaScript.info",
                type: "Interactive Tutorial",
                url: "https://javascript.info/",
                duration: "35 hrs",
                isFree: true
              },
              {
                title: "The Odin Project: JavaScript Basics to Advanced",
                provider: "The Odin Project",
                type: "Curated Course",
                url: "https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript",
                duration: "40 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: JavaScript Programming Full Beginner Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
                duration: "8 hrs",
                isFree: true
              }
            ]
          },
          {
            id: "fe-js-async-dom",
            title: "Asynchronous JavaScript, Fetch API & Browser DOM",
            summary: "Handle user events, manipulate the DOM dynamically, and interact with REST APIs using Promises, async/await, and Fetch.",
            skills: ["Event listeners and delegation", "DOM manipulation & traversal", "Promises & async/await syntax", "Fetch API & JSON handling"],
            freeResources: [
              {
                title: "MDN: Asynchronous JavaScript",
                provider: "Mozilla MDN",
                type: "Documentation",
                url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous",
                duration: "10 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: JavaScript Algorithms & Data Structures",
                provider: "freeCodeCamp",
                type: "Interactive Course",
                url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/",
                duration: "40 hrs",
                isFree: true
              },
              {
                title: "Traversy Media: Asynchronous JavaScript (Promises, Async/Await & Fetch)",
                provider: "Traversy Media (YouTube)",
                type: "Video Tutorial",
                url: "https://www.youtube.com/watch?v=PoRJizFvM7s",
                duration: "3 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "fe-stage-3",
        stageNumber: 3,
        title: "Modern React & TypeScript Ecosystem",
        description: "Build robust single-page applications with React 18, React Hooks, component lifecycle, and typed JavaScript with TypeScript.",
        estimatedHours: "70 Hours",
        topics: [
          {
            id: "fe-react-core",
            title: "React Fundamentals: JSX, Props, State & Hooks",
            summary: "Learn component-driven design, unidirectional data flow, and React Hooks (useState, useEffect, useMemo, useCallback).",
            skills: ["JSX syntax & component composition", "State & Props lifecycle", "Hooks: useState, useEffect, useRef", "Custom Hooks & context API"],
            freeResources: [
              {
                title: "Official React Documentation (Interactive)",
                provider: "React Team",
                type: "Documentation",
                url: "https://react.dev/learn",
                duration: "25 hrs",
                isFree: true
              },
              {
                title: "Scrimba: Learn React for Free",
                provider: "Scrimba (Bob Ziroll)",
                type: "Interactive Course",
                url: "https://scrimba.com/learn/learnreact",
                duration: "18 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: React 18 Full Course for Beginners",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
                duration: "12 hrs",
                isFree: true
              }
            ]
          },
          {
            id: "fe-typescript",
            title: "TypeScript for Frontend Developers",
            summary: "Prevent runtime bugs by adding strict static typing to React components, hooks, interfaces, and API responses.",
            skills: ["Primitive types, interfaces, and type aliases", "Generics and union types", "Typing React props, events, and hooks", "tsconfig configuration"],
            freeResources: [
              {
                title: "Official TypeScript Handbook",
                provider: "Microsoft",
                type: "Documentation",
                url: "https://www.typescriptlang.org/docs/handbook/intro.html",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "Total TypeScript Beginner Essentials",
                provider: "Matt Pocock",
                type: "Interactive Tutorial",
                url: "https://www.totaltypescript.com/tutorials/beginners-typescript",
                duration: "6 hrs",
                isFree: true
              },
              {
                title: "The Net Ninja: TypeScript Tutorial for Beginners",
                provider: "The Net Ninja (YouTube)",
                type: "Video Series",
                url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI",
                duration: "5 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "fe-stage-4",
        stageNumber: 4,
        title: "Tooling, State Management, Routing & Testing",
        description: "Scale your frontend codebase with Vite, client-side routing, TanStack Query, automated testing, and CI deployments.",
        estimatedHours: "45 Hours",
        topics: [
          {
            id: "fe-routing-state",
            title: "Client Routing & Server State (React Router & TanStack Query)",
            summary: "Implement multi-page navigation, URL state, optimistic updates, and server cache synchronization.",
            skills: ["React Router v6 nested routes and loaders", "TanStack React Query for caching", "Zustand or Redux Toolkit", "Form handling with React Hook Form"],
            freeResources: [
              {
                title: "React Router Official Tutorial",
                provider: "Remix Team",
                type: "Tutorial",
                url: "https://reactrouter.com/en/main/start/tutorial",
                duration: "6 hrs",
                isFree: true
              },
              {
                title: "TanStack Query Official Documentation",
                provider: "TanStack",
                type: "Documentation",
                url: "https://tanstack.com/query/latest/docs/framework/react/overview",
                duration: "8 hrs",
                isFree: true
              },
              {
                title: "Web Dev Simplified: React Router v6 & State Management Complete Guide",
                provider: "Web Dev Simplified (YouTube)",
                type: "Video Tutorial",
                url: "https://www.youtube.com/watch?v=Ul3y1LXxzdU",
                duration: "4 hrs",
                isFree: true
              }
            ]
          },
          {
            id: "fe-testing-perf",
            title: "Frontend Testing & Performance Optimization",
            summary: "Write unit and component tests with Vitest & React Testing Library, optimize Core Web Vitals, and deploy with CI/CD.",
            skills: ["Unit testing with Vitest", "React Testing Library user events", "Lighthouse audits & Core Web Vitals", "Code splitting and lazy loading"],
            freeResources: [
              {
                title: "Testing JavaScript Applications",
                provider: "The Odin Project",
                type: "Curated Guide",
                url: "https://www.theodinproject.com/lessons/node-path-javascript-testing-basics",
                duration: "8 hrs",
                isFree: true
              },
              {
                title: "web.dev: Fast Load Times & Core Web Vitals",
                provider: "Google Chrome Team",
                type: "Documentation",
                url: "https://web.dev/explore/fast",
                duration: "10 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Testing React Apps with Jest & React Testing Library",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=7d43px1ki4A",
                duration: "4 hrs",
                isFree: true
              }
            ]
          }
        ]
      }
    ],
    projects: [
      {
        id: "fe-proj-1",
        title: "Responsive Product Catalog with Live Filter & Dark Mode",
        level: "Beginner",
        description: "Build an accessible, mobile-first e-commerce or directory browser with category filtering, real-time search, price range sliders, and CSS custom property theme switcher.",
        deliverables: [
          "Zero-dependency semantic HTML & responsive CSS Grid layout",
          "Debounced search bar filtering array of at least 20 items",
          "Persistent dark/light mode saved in localStorage",
          "Score 95+ on Google Lighthouse Accessibility"
        ],
        suggestedStack: "HTML5, CSS3, Vanilla JavaScript (ES6+)",
        freeStarterOrGuide: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks"
      },
      {
        id: "fe-proj-2",
        title: "Interactive Kanban Task Management App",
        level: "Intermediate",
        description: "Create a Trello-style board with drag-and-drop task movement, column creation, priority tags, sub-tasks, and offline data sync.",
        deliverables: [
          "React 18 + TypeScript component hierarchy",
          "Drag-and-drop or column movement mechanics",
          "Modals for editing task details and due dates",
          "LocalStorage state persistence and filter by tags"
        ],
        suggestedStack: "React 18, TypeScript, Tailwind CSS or Vanilla CSS, Lucide Icons",
        freeStarterOrGuide: "https://react.dev/learn/tutorial-tic-tac-toe"
      },
      {
        id: "fe-proj-3",
        title: "Full-Featured GitHub Developer Insights Dashboard (Capstone)",
        level: "Advanced (Capstone)",
        description: "A production-grade dashboard querying the public GitHub REST/GraphQL API. Shows repository metrics, commit charts, pull request status, and starred repos.",
        deliverables: [
          "TanStack Query for caching, pagination, and error boundaries",
          "Interactive data charts using Chart.js or Recharts",
          "Comprehensive unit tests using Vitest and React Testing Library",
          "Live production deployment on Vercel or Netlify with CI check"
        ],
        suggestedStack: "React, TypeScript, TanStack Query, Recharts, Vitest",
        freeStarterOrGuide: "https://docs.github.com/en/rest"
      }
    ]
  },

  {
    id: "backend-development",
    title: "Backend Developer",
    category: "backend",
    tagline: "Build resilient server architectures, REST/GraphQL APIs, relational & NoSQL databases, authentication, and scaling.",
    icon: "Server",
    badge: "100% Free",
    level: "Beginner Friendly",
    estimatedDuration: "5 - 7 Months (10-12 hrs/week)",
    careerRoles: ["Backend Engineer", "API Developer", "Node.js Developer", "Python Backend Engineer"],
    prerequisites: ["Basic command line familiarity", "Fundamentals of programming logic"],
    overview: "Backend developers architect the engines that power digital applications: databases, authentication, payment handling, and business logic. This roadmap guides you through networking, server runtimes (Node.js/Python/Go), SQL databases, and production API design without paying for courses.",
    stages: [
      {
        id: "be-stage-1",
        stageNumber: 1,
        title: "Internet Protocols, Networking & Linux Basics",
        description: "Understand how client-server systems communicate over HTTP/HTTPS, DNS, TCP/IP, and navigate headless Linux environments.",
        estimatedHours: "35 Hours",
        topics: [
          {
            id: "be-http-network",
            title: "HTTP/1.1, HTTP/2, REST Architectural Constraints & DNS",
            summary: "Learn HTTP request/response lifecycles, headers, status codes, query params, cookies, and RESTful resource modeling.",
            skills: ["HTTP Methods (GET, POST, PUT, PATCH, DELETE)", "Status codes (2xx, 3xx, 4xx, 5xx)", "Headers, CORS, and cookies", "DNS lookup and SSL/TLS handshakes"],
            freeResources: [
              {
                title: "MDN: HTTP Overview & Guides",
                provider: "Mozilla MDN",
                type: "Documentation",
                url: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
                duration: "12 hrs",
                isFree: true
              },
              {
                title: "Hussein Nasser: Backend Engineering Fundamentals",
                provider: "YouTube (Hussein Nasser)",
                type: "Video Series",
                url: "https://www.youtube.com/@hnasr",
                duration: "15 hrs",
                isFree: true
              }
            ]
          },
          {
            id: "be-linux-cli",
            title: "Linux Command Line & Shell Fundamentals",
            summary: "Confidently manage file systems, environment variables, user permissions, process management, and SSH keys in Linux.",
            skills: ["Navigation & file manipulation (grep, awk, curl)", "Process monitoring (ps, top, systemctl)", "File permissions (chmod, chown)", "SSH key generation and authentication"],
            freeResources: [
              {
                title: "The Linux Journey (Interactive)",
                provider: "LinuxJourney.com",
                type: "Interactive Guide",
                url: "https://linuxjourney.com/",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "MIT: The Missing Semester of Your CS Education",
                provider: "MIT",
                type: "University Course",
                url: "https://missing.csail.mit.edu/",
                duration: "20 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Linux Command Line & Shell Fundamentals Full Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=wBp0Rb-ZJak",
                duration: "6 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "be-stage-2",
        stageNumber: 2,
        title: "Backend Language & Runtime (Node.js / Express or Python / FastAPI)",
        description: "Build robust web servers, handle middleware, validate incoming payloads, and structure maintainable service layers.",
        estimatedHours: "55 Hours",
        topics: [
          {
            id: "be-runtime-express",
            title: "Node.js Event Loop, Streams & Express Server Architecture",
            summary: "Understand non-blocking I/O, Node core modules (fs, path, events), Express middleware pipelines, and error handling.",
            skills: ["Event loop & asynchronous I/O", "Custom middleware creation", "Centralized error handling", "Request validation with Zod or Joi"],
            freeResources: [
              {
                title: "Official Node.js Learning Guides",
                provider: "Node.js Foundation",
                type: "Documentation",
                url: "https://nodejs.org/en/learn",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "Full Stack Open: Part 3 - Server & Node.js",
                provider: "University of Helsinki",
                type: "University Course",
                url: "https://fullstackopen.com/en/part3",
                duration: "25 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Node.js and Express.js Full Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
                duration: "8 hrs",
                isFree: true
              }
            ]
          },
          {
            id: "be-auth-security",
            title: "Authentication, Authorization & Security Best Practices",
            summary: "Implement password hashing with bcrypt, JSON Web Tokens (JWT), session cookies, rate limiting, and OWASP protections.",
            skills: ["Password salting & hashing (bcrypt/argon2)", "JWT access & refresh token patterns", "Role-based access control (RBAC)", "CSRF, XSS, and SQL Injection prevention"],
            freeResources: [
              {
                title: "OWASP Top Ten Vulnerabilities Guide",
                provider: "OWASP Foundation",
                type: "Documentation",
                url: "https://owasp.org/www-project-top-ten/",
                duration: "8 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Information Security Certification",
                provider: "freeCodeCamp",
                type: "Interactive Course",
                url: "https://www.freecodecamp.org/learn/information-security/",
                duration: "30 hrs",
                isFree: true
              },
              {
                title: "Web Dev Simplified: Complete JWT & Backend Authentication Course",
                provider: "Web Dev Simplified (YouTube)",
                type: "Video Tutorial",
                url: "https://www.youtube.com/watch?v=mbsmsi7l3r4",
                duration: "3 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "be-stage-3",
        stageNumber: 3,
        title: "Relational Databases, SQL & Data Modeling",
        description: "Design normalized schemas in PostgreSQL, write complex SQL queries, index for performance, and use modern ORMs.",
        estimatedHours: "50 Hours",
        topics: [
          {
            id: "be-postgresql-sql",
            title: "PostgreSQL: Schema Design, Joins, Transactions & Indexing",
            summary: "Master SQL DDL/DML, primary & foreign keys, ACID transaction guarantees, and query plan optimization with EXPLAIN.",
            skills: ["Normalization (1NF, 2NF, 3NF)", "Inner, left, and outer JOINs", "ACID transactions & locking", "B-tree indexes & EXPLAIN ANALYZE"],
            freeResources: [
              {
                title: "PostgreSQL Official Tutorial",
                provider: "PostgreSQL Global Development Group",
                type: "Documentation",
                url: "https://www.postgresql.org/docs/current/tutorial.html",
                duration: "20 hrs",
                isFree: true
              },
              {
                title: "SQLBolt: Interactive SQL Lessons",
                provider: "SQLBolt",
                type: "Interactive Sandbox",
                url: "https://sqlbolt.com/",
                duration: "6 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: PostgreSQL & Relational Database Full Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=qw--VYLpxG4",
                duration: "4 hrs",
                isFree: true
              }
            ]
          },
          {
            id: "be-orm-prisma",
            title: "ORMs & Database Migrations (Prisma / Drizzle)",
            summary: "Safely execute database migrations, prevent SQL injection, and generate type-safe database clients.",
            skills: ["Prisma schema definition", "Migration management in production", "One-to-many & many-to-many relations", "Seeding and transactional queries"],
            freeResources: [
              {
                title: "Prisma Official Getting Started Guide",
                provider: "Prisma",
                type: "Documentation",
                url: "https://www.prisma.io/docs/getting-started",
                duration: "10 hrs",
                isFree: true
              },
              {
                title: "Traversy Media: Prisma ORM Crash Course",
                provider: "Traversy Media (YouTube)",
                type: "Video Tutorial",
                url: "https://www.youtube.com/watch?v=CYH04BLM-5o",
                duration: "2 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "be-stage-4",
        stageNumber: 4,
        title: "Caching, Message Queues & Microservice Architecture",
        description: "Scale high-traffic backends using Redis caching, asynchronous job processing, Docker containerization, and API testing.",
        estimatedHours: "45 Hours",
        topics: [
          {
            id: "be-redis-queues",
            title: "In-Memory Caching (Redis) & Background Workers (BullMQ / RabbitMQ)",
            summary: "Implement Cache-Aside strategies, Redis key expiration, rate limiting, and decouple heavy operations with background worker queues.",
            skills: ["Redis key-value, lists, sets, and pub/sub", "Cache invalidation strategies", "Job queues for async emails and heavy tasks", "Dead-letter queues and retries"],
            freeResources: [
              {
                title: "Redis University: Free Developer Courses",
                provider: "Redis",
                type: "Interactive Course",
                url: "https://university.redis.io/",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Redis Crash Course & Caching Architecture",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=jgpVdJB2sKQ",
                duration: "3 hrs",
                isFree: true
              }
            ]
          },
          {
            id: "be-docker-api-testing",
            title: "Dockerizing APIs & Automated Integration Testing",
            summary: "Containerize server applications with multi-stage Dockerfiles, compose multi-container test environments, and test with Jest/Supertest.",
            skills: ["Dockerfile writing & image layer optimization", "Docker Compose for App + PostgreSQL + Redis", "Integration tests with Supertest", "Health checks & graceful shutdown"],
            freeResources: [
              {
                title: "Docker Get Started Official Guide",
                provider: "Docker",
                type: "Documentation",
                url: "https://docs.docker.com/get-started/",
                duration: "10 hrs",
                isFree: true
              },
              {
                title: "TechWorld with Nana: Docker Tutorial for Node.js & Microservices",
                provider: "TechWorld with Nana (YouTube)",
                type: "Video Tutorial",
                url: "https://www.youtube.com/watch?v=9zUHg7xjIqQ",
                duration: "3 hrs",
                isFree: true
              }
            ]
          }
        ]
      }
    ],
    projects: [
      {
        id: "be-proj-1",
        title: "Secure RESTful Authentication & Role-Based Access API",
        level: "Beginner",
        description: "Build an Express or FastAPI server implementing email verification, password hashing, JWT refresh rotation, and protected endpoints with admin privileges.",
        deliverables: [
          "Endpoints: /register, /login, /refresh, /logout, /me",
          "Bcrypt password salting & HTTP-only secure cookie refresh tokens",
          "RBAC middleware verifying user role (e.g. member vs admin)",
          "Rate limiter on auth routes (max 5 failed attempts per IP)"
        ],
        suggestedStack: "Node.js, Express, PostgreSQL, Prisma, Zod, JWT",
        freeStarterOrGuide: "https://expressjs.com/en/starter/installing.html"
      },
      {
        id: "be-proj-2",
        title: "E-Commerce Order Processing API with Redis Caching & Queue",
        level: "Intermediate",
        description: "An API capable of processing product listings, shopping carts, stock reservations with ACID transactions, and asynchronous order invoice generation.",
        deliverables: [
          "Database transaction ensuring stock cannot oversell under concurrency",
          "Redis Cache-Aside pattern for top-selling products catalog",
          "Background worker queue simulating payment capture & sending receipt email",
          "Docker Compose configuration bundling App, DB, and Redis"
        ],
        suggestedStack: "Node.js or Python, PostgreSQL, Redis, BullMQ / Celery, Docker",
        freeStarterOrGuide: "https://docs.docker.com/compose/"
      },
      {
        id: "be-proj-3",
        title: "High-Throughput URL Shortener with Analytics & Caching (Capstone)",
        level: "Advanced (Capstone)",
        description: "Production-ready link shortener handling millions of redirects. Features custom slugs, QR code generation, click geolocation tracking, and sub-millisecond redirection via Redis.",
        deliverables: [
          "Base62 encoding algorithm for unique short URLs",
          "Sub-10ms redirection speed using Redis cache layer",
          "Asynchronous click analytics logging (referrer, timestamp, country)",
          "Comprehensive automated test suite and OpenAPI Swagger docs"
        ],
        suggestedStack: "Go or Node.js, Redis, PostgreSQL, Swagger / OpenAPI, Docker",
        freeStarterOrGuide: "https://swagger.io/docs/specification/about/"
      }
    ]
  },

  {
    id: "fullstack-development",
    title: "Full-Stack Developer",
    category: "fullstack",
    tagline: "Unite frontend, backend, database modeling, authentication, and cloud deployment in complete end-to-end applications.",
    icon: "Layers",
    badge: "100% Free",
    level: "All Levels",
    estimatedDuration: "6 - 8 Months (12-15 hrs/week)",
    careerRoles: ["Full-Stack Engineer", "Software Engineer", "Full-Stack JavaScript Developer", "Solutions Developer"],
    prerequisites: ["Understanding of basic coding concepts and web navigation"],
    overview: "Full-Stack developers possess the versatility to create complete, customer-facing applications from database schema to interactive UI. This roadmap provides an integrated, end-to-end path through the modern web stack (React, Next.js, Node.js, SQL, Cloud deployment).",
    stages: [
      {
        id: "fs-stage-1",
        stageNumber: 1,
        title: "Frontend Foundations & Modern JavaScript",
        description: "Establish strong foundations in semantic HTML, responsive CSS, and modern JavaScript programming.",
        estimatedHours: "50 Hours",
        topics: [
          {
            id: "fs-front-core",
            title: "HTML5, Responsive CSS & DOM Manipulation",
            summary: "Master web building blocks, modern layout mechanics, and browser scripting.",
            skills: ["Semantic HTML", "Flexbox & Grid", "DOM events", "ES6+ array utilities & modules"],
            freeResources: [
              {
                title: "The Odin Project: Foundations Track",
                provider: "The Odin Project",
                type: "Curated Course",
                url: "https://www.theodinproject.com/paths/foundations/courses/foundations",
                duration: "30 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Full Stack Web Development for Beginners",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=nu_pCVPKzTk",
                duration: "7 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "fs-stage-2",
        stageNumber: 2,
        title: "Server-Side Programming & Relational Databases",
        description: "Build API servers, connect to relational databases, write CRUD queries, and handle data validation.",
        estimatedHours: "60 Hours",
        topics: [
          {
            id: "fs-backend-db",
            title: "Node.js API Development & PostgreSQL Integration",
            summary: "Develop REST endpoints, model normalized relational data, and execute secure database queries.",
            skills: ["Express API design", "PostgreSQL database schemas", "Prisma ORM queries", "JWT auth integration"],
            freeResources: [
              {
                title: "Full Stack Open: University of Helsinki",
                provider: "University of Helsinki",
                type: "University Course",
                url: "https://fullstackopen.com/en/",
                duration: "60 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Node.js & PostgreSQL Full Backend Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=7S_tz1z_5bA",
                duration: "5 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "fs-stage-3",
        stageNumber: 3,
        title: "Modern React & Server Components (Next.js)",
        description: "Learn fullstack frameworks that merge server and client: Next.js App Router, Server Actions, and SSR/SSG.",
        estimatedHours: "55 Hours",
        topics: [
          {
            id: "fs-nextjs-fullstack",
            title: "Next.js App Router, Server Actions & Data Fetching",
            summary: "Build high-performance applications with React Server Components, server actions, and streaming SSR.",
            skills: ["Server vs Client Components", "Server Actions for form mutations", "Incremental Static Regeneration (ISR)", "Middleware & route handlers"],
            freeResources: [
              {
                title: "Official Next.js Learn Course",
                provider: "Vercel",
                type: "Interactive Course",
                url: "https://nextjs.org/learn",
                duration: "20 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Next.js 14 Full Stack App Router Master Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=wm5gMKuwSYk",
                duration: "10 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "fs-stage-4",
        stageNumber: 4,
        title: "Deployment, CI/CD, Testing & Production Monitoring",
        description: "Deploy production databases, configure continuous integration pipelines, and monitor errors in real time.",
        estimatedHours: "40 Hours",
        topics: [
          {
            id: "fs-deployment-ci",
            title: "Production Deployment, GitHub Actions & Monitoring",
            summary: "Automate tests on git push, deploy client and backend services to cloud platforms, and inspect production logs.",
            skills: ["GitHub Actions CI workflows", "Vercel / Render deployment", "Supabase / Neon managed PostgreSQL", "Error logging and Sentry"],
            freeResources: [
              {
                title: "GitHub Actions Official Quickstart",
                provider: "GitHub",
                type: "Documentation",
                url: "https://docs.github.com/en/actions/quickstart",
                duration: "6 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: GitHub Actions CI/CD Full Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=R8_veQiYBjI",
                duration: "3 hrs",
                isFree: true
              }
            ]
          }
        ]
      }
    ],
    projects: [
      {
        id: "fs-proj-1",
        title: "Community Discussion Forum & Voting Platform",
        level: "Beginner",
        description: "Build a Reddit-style forum with user registration, post creation, upvoting/downvoting, threaded comments, and community tags.",
        deliverables: [
          "Authentication with hashed passwords and secure sessions",
          "Threaded comment tree database model in PostgreSQL",
          "Optimistic voting UI updating instantly on click",
          "Clean responsive UI with search and filter by tag"
        ],
        suggestedStack: "React, Node.js / Express, PostgreSQL, Prisma, Tailwind CSS",
        freeStarterOrGuide: "https://fullstackopen.com/en/"
      },
      {
        id: "fs-proj-2",
        title: "Collaborative Real-Time Workspace (Notion / Slack Clone)",
        level: "Intermediate",
        description: "A collaborative notes or messaging tool with real-time WebSockets, document auto-saving, workspace members, and file uploads.",
        deliverables: [
          "Socket.io or WebSockets for live typing and presence indicators",
          "Rich markdown editing with auto-save",
          "Multi-tenant workspace organization with invite links",
          "S3-compatible object storage for user avatars and attachments"
        ],
        suggestedStack: "Next.js, TypeScript, Socket.io, PostgreSQL, Tailwind CSS",
        freeStarterOrGuide: "https://socket.io/get-started/chat"
      },
      {
        id: "fs-proj-3",
        title: "SaaS Subscription Platform with Stripe & Multi-Tenancy (Capstone)",
        level: "Advanced (Capstone)",
        description: "A complete software-as-a-service application featuring customer billing tiers, webhook processing, organization dashboards, and audit logs.",
        deliverables: [
          "Stripe checkout integration and webhook handling (subscription lifecycle)",
          "Team role permissions (Owner, Editor, Viewer)",
          "Automated test coverage with Playwright and Vitest",
          "CI/CD pipeline with zero-downtime deployment"
        ],
        suggestedStack: "Next.js 14, TypeScript, Stripe API, PostgreSQL, Playwright",
        freeStarterOrGuide: "https://nextjs.org/learn"
      }
    ]
  },

  {
    id: "mobile-development",
    title: "Mobile App Developer",
    category: "mobile",
    tagline: "Build smooth iOS and Android applications using Flutter, React Native, and native mobile platform fundamentals.",
    icon: "Smartphone",
    badge: "100% Free",
    level: "Intermediate",
    estimatedDuration: "5 - 7 Months (10-12 hrs/week)",
    careerRoles: ["Mobile Developer", "React Native Developer", "Flutter Developer", "iOS/Android Engineer"],
    prerequisites: ["Object-oriented programming concepts", "JavaScript or Dart basics"],
    overview: "Mobile engineers craft the native and cross-platform apps used by billions on smartphones. This roadmap equips you to build responsive, fluid, offline-capable mobile apps using industry-leading free resources for Flutter and React Native.",
    stages: [
      {
        id: "mob-stage-1",
        stageNumber: 1,
        title: "Mobile UI Fundamentals & Language Foundations",
        description: "Learn Dart for Flutter or modern TypeScript for React Native, mobile viewports, and navigation patterns.",
        estimatedHours: "45 Hours",
        topics: [
          {
            id: "mob-dart-flutter",
            title: "Flutter & Dart Essentials: Widgets & State",
            summary: "Master Dart object-oriented programming, the Flutter widget tree, Stateless vs Stateful widgets, and layout composition.",
            skills: ["Dart syntax, sound null safety", "Scaffold, Rows, Columns, ListView", "Gesture detectors and animations", "Hot Reload workflow in VS Code / Android Studio"],
            freeResources: [
              {
                title: "Official Flutter Getting Started & Codelabs",
                provider: "Google Flutter Team",
                type: "Interactive Tutorial",
                url: "https://docs.flutter.dev/get-started/codelab",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Flutter & Dart 8-Hour Master Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=VPvVD8t02U8",
                duration: "8 hrs",
                isFree: true
              }
            ]
          },
          {
            id: "mob-rn-expo",
            title: "React Native & Expo Ecosystem",
            summary: "Build cross-platform apps using React principles, native mobile components, and Expo tooling.",
            skills: ["Expo CLI & EAS", "Core components (View, Text, FlatList, Pressable)", "React Native styling & Flexbox", "React Navigation (Stack, Tabs, Drawer)"],
            freeResources: [
              {
                title: "Official React Native Documentation",
                provider: "Meta",
                type: "Documentation",
                url: "https://reactnative.dev/docs/getting-started",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "Expo Official Getting Started Tutorial",
                provider: "Expo",
                type: "Tutorial",
                url: "https://docs.expo.dev/tutorial/introduction/",
                duration: "6 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: React Native Mobile Development Full Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
                duration: "7 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "mob-stage-2",
        stageNumber: 2,
        title: "State Management & Device Hardware APIs",
        description: "Handle complex app state, access camera, GPS location, push notifications, and local offline storage.",
        estimatedHours: "50 Hours",
        topics: [
          {
            id: "mob-state-device",
            title: "Mobile State (Riverpod / Zustand) & Hardware Integration",
            summary: "Implement scalable state management and tap into mobile device hardware APIs safely.",
            skills: ["Global state management (Riverpod / Bloc / Zustand)", "Camera and photo picker access", "Geolocation & maps integration", "Push notification setup (Firebase Cloud Messaging)"],
            freeResources: [
              {
                title: "Flutter Official State Management Guide",
                provider: "Flutter",
                type: "Documentation",
                url: "https://docs.flutter.dev/data-and-backend/state-mgmt/intro",
                duration: "10 hrs",
                isFree: true
              },
              {
                title: "Academind: React Native & Device Features (Camera, Maps, Location)",
                provider: "Academind (YouTube)",
                type: "Video Tutorial",
                url: "https://www.youtube.com/watch?v=kghs4sKjMVs",
                duration: "4 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "mob-stage-3",
        stageNumber: 3,
        title: "Offline Storage, App Performance & Store Deployment",
        description: "Ensure fast 60fps animations, SQLite / Hive offline sync, App Store and Google Play publishing pipelines.",
        estimatedHours: "40 Hours",
        topics: [
          {
            id: "mob-publish-perf",
            title: "Local Databases (SQLite/WatermelonDB) & App Store Release",
            summary: "Cache data locally for offline operation and configure app icons, splash screens, signing certificates, and releases.",
            skills: ["SQLite & Room / WatermelonDB", "App bundle & APK generation", "iOS TestFlight & Apple certificates", "Profiling memory leaks and frame drops"],
            freeResources: [
              {
                title: "Android Developers Official Guide",
                provider: "Google",
                type: "Documentation",
                url: "https://developer.android.com/guide",
                duration: "20 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Deploying React Native & Expo to Google Play & App Store",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Tutorial",
                url: "https://www.youtube.com/watch?v=v0n6vR3VpG8",
                duration: "3 hrs",
                isFree: true
              }
            ]
          }
        ]
      }
    ],
    projects: [
      {
        id: "mob-proj-1",
        title: "Local Weather & Air Quality Radar App",
        level: "Beginner",
        description: "A mobile application fetching current location weather, 7-day forecast, interactive hourly temperature curves, and offline cached city search.",
        deliverables: [
          "Device GPS permission handling with smooth fallback to manual search",
          "Pull-to-refresh and dynamic weather animations (rain, sun, cloud)",
          "Clean tab navigation between favorite cities",
          "Local storage caching weather responses when offline"
        ],
        suggestedStack: "Flutter or React Native (Expo), OpenWeather API",
        freeStarterOrGuide: "https://docs.expo.dev/"
      },
      {
        id: "mob-proj-2",
        title: "Habit Tracker with Push Reminders & Streak Statistics",
        level: "Intermediate",
        description: "Track daily habits, earn streak milestones, view monthly completion heatmaps, and receive local notification reminders.",
        deliverables: [
          "Local embedded SQLite or Hive database for instant offline speed",
          "Interactive calendar view with completion indicators",
          "Daily scheduled local notification alarm",
          "Export / Import habit data backup feature"
        ],
        suggestedStack: "Flutter (Hive / Riverpod) or React Native (WatermelonDB)",
        freeStarterOrGuide: "https://docs.flutter.dev/cookbook/persistence/sqlite"
      },
      {
        id: "mob-proj-3",
        title: "Fitness & Workout Companion with Audio Coach (Capstone)",
        level: "Advanced (Capstone)",
        description: "A full mobile fitness app with workout interval timers, audio sound cues, camera workout video recording, and health metric sync.",
        deliverables: [
          "Background audio playback and countdown buzzer sounds",
          "Camera integration with photo progress timeline",
          "Biometric authentication (Face ID / Fingerprint lock)",
          "Production release ready build with signed APK / TestFlight config"
        ],
        suggestedStack: "React Native Expo or Flutter, Firebase Auth, SQLite",
        freeStarterOrGuide: "https://docs.expo.dev/distribution/introduction/"
      }
    ]
  },

  {
    id: "devops-cloud",
    title: "DevOps & Cloud Engineer",
    category: "devops",
    tagline: "Automate CI/CD pipelines, containerize with Docker & Kubernetes, manage Infrastructure as Code, and deploy resilient cloud services.",
    icon: "Terminal",
    badge: "100% Free",
    level: "Intermediate",
    estimatedDuration: "5 - 7 Months (10-12 hrs/week)",
    careerRoles: ["DevOps Engineer", "Site Reliability Engineer (SRE)", "Cloud Engineer", "Infrastructure Specialist"],
    prerequisites: ["Basic Linux shell commands", "Basic understanding of networking and Git"],
    overview: "DevOps engineers automate the lifecycle of software delivery, creating reliable, scalable, and self-healing systems. Learn containerization, Kubernetes orchestration, Terraform Infrastructure as Code, CI/CD, and monitoring completely through free official documentation and university courses.",
    stages: [
      {
        id: "devops-stage-1",
        stageNumber: 1,
        title: "Linux Administration, Networking & GitOps",
        description: "Master Linux system administration, bash scripting, subnetting, DNS, firewalls, and Git branch workflows.",
        estimatedHours: "40 Hours",
        topics: [
          {
            id: "devops-linux-scripting",
            title: "Advanced Bash Scripting & Linux System Administration",
            summary: "Automate system tasks with Bash, understand systemd services, log inspection with journalctl, and process limits.",
            skills: ["Bash conditionals, loops, and regex pipes", "systemd service unit files and timer jobs", "iptables/UFW firewall rules", "Resource limits with ulimit and cgroups"],
            freeResources: [
              {
                title: "OverTheWire: Bandit (Linux Security Challenges)",
                provider: "OverTheWire",
                type: "Hands-on Wargame",
                url: "https://overthewire.org/wargames/bandit/",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "Linux Survival: Interactive Guide",
                provider: "Linux Survival",
                type: "Interactive Tutorial",
                url: "https://linuxsurvival.com/",
                duration: "6 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Bash Scripting & Linux Command Line Tutorial",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=tK9Oc6AEnR4",
                duration: "4 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "devops-stage-2",
        stageNumber: 2,
        title: "Containers & Orchestration: Docker & Kubernetes",
        description: "Package applications into lightweight OCI containers and orchestrate clusters with Kubernetes pods, services, and ingresses.",
        estimatedHours: "65 Hours",
        topics: [
          {
            id: "devops-docker",
            title: "Docker: Containers, Networks, Volumes & Multi-Stage Builds",
            summary: "Create minimal secure images, configure container networking, and persist database storage with Docker volumes.",
            skills: ["Writing slim Alpine / Distroless Dockerfiles", "Multi-stage build pipelines", "Docker network bridges and DNS resolution", "Docker Compose multi-service architecture"],
            freeResources: [
              {
                title: "Docker Official Get Started & Guides",
                provider: "Docker Docs",
                type: "Documentation",
                url: "https://docs.docker.com/get-started/",
                duration: "12 hrs",
                isFree: true
              },
              {
                title: "TechWorld with Nana: Docker Tutorial for Beginners",
                provider: "YouTube (Nana Janashia)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=3c-iBn73dDE",
                duration: "3 hrs",
                isFree: true
              }
            ]
          },
          {
            id: "devops-kubernetes",
            title: "Kubernetes (K8s): Pods, Deployments, Services & Ingress",
            summary: "Learn production container orchestration: self-healing deployments, ConfigMaps, Secrets, ClusterIP/LoadBalancer, and Helm charts.",
            skills: ["kubectl CLI master commands", "Declarative YAML deployments and replica sets", "Rolling updates and canary rollbacks", "Persistent Volume Claims (PVC) and Helm"],
            freeResources: [
              {
                title: "Kubernetes Official Tutorials (Interactive Minikube)",
                provider: "Cloud Native Computing Foundation (CNCF)",
                type: "Interactive Tutorial",
                url: "https://kubernetes.io/docs/tutorials/",
                duration: "25 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Kubernetes Course for Beginners",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=X48VuDVv0do",
                duration: "4 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "devops-stage-3",
        stageNumber: 3,
        title: "CI/CD Automation & Infrastructure as Code (Terraform)",
        description: "Build automated test/build/deploy pipelines using GitHub Actions and declare reproducible cloud infrastructure using Terraform.",
        estimatedHours: "55 Hours",
        topics: [
          {
            id: "devops-cicd-iac",
            title: "GitHub Actions CI/CD & Terraform Infrastructure as Code",
            summary: "Write continuous integration pipelines to lint, test, build containers, and provision cloud VPCs and clusters declaratively.",
            skills: ["GitHub Actions matrix builds and secret management", "Automated image push to Docker Hub / GHCR", "Terraform providers, variables, and state files", "Remote backend locking (S3/DynamoDB)"],
            freeResources: [
              {
                title: "HashiCorp Learn: Terraform Tutorials",
                provider: "HashiCorp",
                type: "Interactive Guides",
                url: "https://developer.hashicorp.com/terraform/tutorials",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "GitHub Actions Documentation & Guides",
                provider: "GitHub",
                type: "Documentation",
                url: "https://docs.github.com/en/actions",
                duration: "10 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Terraform Course - Automate AWS Cloud Infrastructure",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=SLB_c_amRCA",
                duration: "4 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "devops-stage-4",
        stageNumber: 4,
        title: "Observability, Monitoring & Reliability (Prometheus, Grafana)",
        description: "Instrument distributed systems, collect metrics and logs, configure proactive alert managers, and implement SRE best practices.",
        estimatedHours: "40 Hours",
        topics: [
          {
            id: "devops-monitoring",
            title: "Prometheus Metrics, Grafana Dashboards & Log Aggregation",
            summary: "Monitor CPU, RAM, error rates, and latency (RED / USE metrics), build live operational dashboards, and route alerts.",
            skills: ["PromQL queries and alert rules", "Grafana visualization dashboards", "Loki / ELK stack log ingestion", "SLOs, SLIs, and Error Budgets"],
            freeResources: [
              {
                title: "Google SRE Books (Free Online Edition)",
                provider: "Google Site Reliability Engineering",
                type: "Book",
                url: "https://sre.google/sre-book/table-of-contents/",
                duration: "20 hrs",
                isFree: true
              },
              {
                title: "Prometheus Official Getting Started",
                provider: "Prometheus",
                type: "Documentation",
                url: "https://prometheus.io/docs/introduction/overview/",
                duration: "8 hrs",
                isFree: true
              },
              {
                title: "TechWorld with Nana: Prometheus & Grafana Monitoring Tutorial",
                provider: "TechWorld with Nana (YouTube)",
                type: "Video Tutorial",
                url: "https://www.youtube.com/watch?v=h4Sl21AKiDg",
                duration: "3 hrs",
                isFree: true
              }
            ]
          }
        ]
      }
    ],
    projects: [
      {
        id: "devops-proj-1",
        title: "Automated Multi-Environment CI/CD Pipeline with GitHub Actions",
        level: "Beginner",
        description: "Set up a repository with automated unit tests, lint checks, Docker image build, security vulnerability scanning with Trivy, and deployment preview.",
        deliverables: [
          "Workflow runs on PR and main push with badge indicators",
          "Trivy scan blocking builds with CRITICAL vulnerabilities",
          "Automated Docker image version tagging (semver) pushed to GHCR",
          "Slack or Discord notification on deployment status"
        ],
        suggestedStack: "GitHub Actions, Docker, Trivy, Bash",
        freeStarterOrGuide: "https://docs.github.com/en/actions"
      },
      {
        id: "devops-proj-2",
        title: "Kubernetes Microservices Cluster with Ingress & Cert-Manager",
        level: "Intermediate",
        description: "Deploy a multi-service web app (Frontend, Backend, PostgreSQL) onto a local Minikube / K3s cluster with auto-scaling and health probes.",
        deliverables: [
          "Liveness and readiness probes ensuring zero-downtime restarts",
          "Horizontal Pod Autoscaler (HPA) triggering on CPU spikes",
          "Ingress controller routing /api to backend and / to frontend",
          "Kubernetes Secret encryption for database credentials"
        ],
        suggestedStack: "Kubernetes (Minikube / K3s), Nginx Ingress, Helm",
        freeStarterOrGuide: "https://kubernetes.io/docs/tutorials/"
      },
      {
        id: "devops-proj-3",
        title: "Full Infrastructure as Code & Observability Platform (Capstone)",
        level: "Advanced (Capstone)",
        description: "A production Terraform setup deploying cloud infrastructure, Prometheus scraping container metrics, and a custom Grafana dashboard with alert rules.",
        deliverables: [
          "Modular Terraform code provisioning VPC, subnets, and cluster",
          "Prometheus operator scraping application metrics",
          "Grafana dashboard monitoring p95 latency, 5xx errors, and memory",
          "Alertmanager routing firing alerts when error rate exceeds 1%"
        ],
        suggestedStack: "Terraform, Prometheus, Grafana, Docker, AWS Free Tier / LocalStack",
        freeStarterOrGuide: "https://developer.hashicorp.com/terraform/tutorials"
      }
    ]
  },

  {
    id: "cybersecurity",
    title: "Cybersecurity Specialist",
    category: "security",
    tagline: "Learn ethical hacking, penetration testing, web security (OWASP), network defense, cryptography, and digital forensics.",
    icon: "ShieldCheck",
    badge: "100% Free",
    level: "All Levels",
    estimatedDuration: "6 - 8 Months (10-14 hrs/week)",
    careerRoles: ["SOC Analyst", "Penetration Tester", "Security Engineer", "Vulnerability Researcher"],
    prerequisites: ["Computer networking basics", "Basic Linux command line knowledge"],
    overview: "Cybersecurity specialists defend organizations against digital threats and probe systems to uncover vulnerabilities before malicious hackers do. This roadmap provides a strictly ethical, legal learning path using top-tier free wargames, OWASP resources, and defense labs.",
    stages: [
      {
        id: "sec-stage-1",
        stageNumber: 1,
        title: "Networking Protocols, Packet Analysis & Linux Security",
        description: "Inspect network traffic, understand TCP/UDP handshakes, capture packets with Wireshark, and harden Linux servers.",
        estimatedHours: "45 Hours",
        topics: [
          {
            id: "sec-network-packet",
            title: "Network Fundamentals & Wireshark Packet Inspection",
            summary: "Deep dive into OSI layers, ARP spoofing, TCP flag handshakes, DNS poisoning, and analyzing PCAP captures in Wireshark.",
            skills: ["Wireshark capture & display filters", "TCP three-way handshake analysis", "Subnetting and CIDR routing", "Port scanning mechanics with Nmap"],
            freeResources: [
              {
                title: "Wireshark Official User Guide & Sample Captures",
                provider: "Wireshark Foundation",
                type: "Documentation",
                url: "https://www.wireshark.org/docs/wsug_html_chunked/",
                duration: "10 hrs",
                isFree: true
              },
              {
                title: "Professor Messer: Network+ Free Training Course",
                provider: "Professor Messer (YouTube)",
                type: "Video Series",
                url: "https://www.professormesser.com/",
                duration: "18 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "sec-stage-2",
        stageNumber: 2,
        title: "Web Application Security & OWASP Top 10",
        description: "Identify and exploit web vulnerabilities in legal sandboxes: SQL injection, Cross-Site Scripting (XSS), CSRF, SSRF, and broken auth.",
        estimatedHours: "60 Hours",
        topics: [
          {
            id: "sec-owasp-web",
            title: "OWASP Top 10 Vulnerabilities & PortSwigger Web Security Academy",
            summary: "Hands-on vulnerability labs covering authentication bypasses, blind SQLi, stored XSS, path traversal, and SSRF.",
            skills: ["Burp Suite Community proxying & repeater", "SQL Injection union & blind payloads", "Reflected and DOM-based XSS exploitation", "Insecure Direct Object References (IDOR)"],
            freeResources: [
              {
                title: "PortSwigger Web Security Academy (100% Free Labs)",
                provider: "PortSwigger",
                type: "Interactive Labs",
                url: "https://portswigger.net/web-security",
                duration: "40 hrs",
                isFree: true
              },
              {
                title: "OWASP Juice Shop Vulnerable Web App",
                provider: "OWASP Foundation",
                type: "Open Source Lab",
                url: "https://owasp.org/www-project-juice-shop/",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Web Security & OWASP Top 10 Full Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=2_lswM1S264",
                duration: "5 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "sec-stage-3",
        stageNumber: 3,
        title: "System Hardening, Cryptography & Defensive Security (Blue Team)",
        description: "Understand asymmetric encryption, TLS certificates, SIEM log monitoring, malware analysis basics, and intrusion detection.",
        estimatedHours: "50 Hours",
        topics: [
          {
            id: "sec-crypto-blue",
            title: "Applied Cryptography, SIEM Log Analysis & Threat Hunting",
            summary: "Understand AES, RSA, SHA-256, public key infrastructure (PKI), and analyze security event logs using Wazuh or Splunk free tier.",
            skills: ["Symmetric vs asymmetric encryption", "Diffie-Hellman key exchange", "Security Information and Event Management (SIEM)", "Mitre ATT&CK matrix mapping"],
            freeResources: [
              {
                title: "TryHackMe: Free Defensive Security Rooms",
                provider: "TryHackMe",
                type: "Interactive Sandbox",
                url: "https://tryhackme.com/",
                duration: "25 hrs",
                isFree: true
              },
              {
                title: "CryptoHack: Fun Interactive Cryptography Challenges",
                provider: "CryptoHack",
                type: "Hands-on Challenges",
                url: "https://cryptohack.org/",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Cryptography for Beginners - Encryption & Hashes",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=jhXCTbFnK8o",
                duration: "3 hrs",
                isFree: true
              }
            ]
          }
        ]
      }
    ],
    projects: [
      {
        id: "sec-proj-1",
        title: "Automated Network Port & Service Vulnerability Scanner",
        level: "Beginner",
        description: "Write a lightweight Python command-line utility that performs multithreaded TCP port scanning, service banner grabbing, and CVE version matching.",
        deliverables: [
          "Socket-based multithreaded port scanner (scans top 100 ports in seconds)",
          "Banner grabbing extracting HTTP, SSH, FTP versions",
          "Formatted report outputting open ports and risk score",
          "Input validation preventing unintentional scanning of unauthorized IPs"
        ],
        suggestedStack: "Python (socket, concurrent.futures, argparse)",
        freeStarterOrGuide: "https://docs.python.org/3/library/socket.html"
      },
      {
        id: "sec-proj-2",
        title: "Complete OWASP Juice Shop Penetration Testing Audit Report",
        level: "Intermediate",
        description: "Perform an end-to-end security assessment against an isolated local OWASP Juice Shop instance using Burp Suite and document vulnerabilities in professional format.",
        deliverables: [
          "Identify and exploit at least 8 distinct vulnerability types (SQLi, XSS, IDOR)",
          "Capture HTTP requests & responses proving the vulnerability in Burp Suite",
          "Executive summary explaining business risk to non-technical stakeholders",
          "Remediation guidelines with code snippets for developers"
        ],
        suggestedStack: "Burp Suite Community, OWASP Juice Shop, Markdown / PDF",
        freeStarterOrGuide: "https://portswigger.net/web-security"
      },
      {
        id: "sec-proj-3",
        title: "Home Security Lab with Wazuh SIEM & Snort IDS (Capstone)",
        level: "Advanced (Capstone)",
        description: "Build an active cyber defense lab using Docker or VirtualBox with a Wazuh SIEM manager, agent telemetry, and Snort intrusion detection rules.",
        deliverables: [
          "Wazuh server ingesting authentication logs and file integrity alerts",
          "Custom Snort or Suricata rule detecting unauthorized port scanning",
          "Dashboard visualizing brute force attempts with geolocation map",
          "Automated incident response script banning attacking IPs via firewall"
        ],
        suggestedStack: "Wazuh, Snort/Suricata, Docker, Linux (Ubuntu/Debian)",
        freeStarterOrGuide: "https://documentation.wazuh.com/current/getting-started/index.html"
      }
    ]
  },

  {
    id: "data-analytics",
    title: "Data Analyst",
    category: "data",
    tagline: "Turn raw datasets into strategic insights with SQL, Python, Excel, Power BI/Tableau, and statistical analysis.",
    icon: "BarChart3",
    badge: "100% Free",
    level: "Beginner Friendly",
    estimatedDuration: "4 - 6 Months (8-12 hrs/week)",
    careerRoles: ["Data Analyst", "Business Intelligence (BI) Analyst", "Operations Analyst", "Product Analyst"],
    prerequisites: ["Curiosity for working with numbers and spreadsheets"],
    overview: "Data analysts translate messy data into actionable strategic business recommendations. This roadmap guides you through SQL data extraction, exploratory data analysis with Python & Pandas, statistical reasoning, and interactive dashboard storytelling using free tools.",
    stages: [
      {
        id: "da-stage-1",
        stageNumber: 1,
        title: "Spreadsheet Modeling & Advanced SQL for Analytics",
        description: "Master multi-table SQL queries, window functions, aggregations, and business metrics calculations.",
        estimatedHours: "40 Hours",
        topics: [
          {
            id: "da-sql-deep",
            title: "SQL Window Functions, CTEs & Cohort Analysis",
            summary: "Write production analytical SQL using Common Table Expressions, RANK(), ROW_NUMBER(), LEAD/LAG, and aggregations.",
            skills: ["GROUP BY, HAVING, and aggregate math", "JOINs and subquery optimization", "Window functions (OVER, PARTITION BY)", "Common Table Expressions (WITH clause)"],
            freeResources: [
              {
                title: "Mode Analytics: SQL Tutorial for Data Analysis",
                provider: "Mode",
                type: "Tutorial Guide",
                url: "https://mode.com/sql-tutorial/",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "SQLZoo: Interactive SQL Tutorials",
                provider: "SQLZoo",
                type: "Interactive Sandbox",
                url: "https://sqlzoo.net/",
                duration: "10 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Advanced SQL for Data Analytics & Window Functions",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=7mz73uXD9DA",
                duration: "4 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "da-stage-2",
        stageNumber: 2,
        title: "Python for Data Analysis: Pandas, NumPy & Cleaning",
        description: "Extract, clean, transform, and analyze datasets with Python, Jupyter Notebooks, Pandas, and NumPy.",
        estimatedHours: "50 Hours",
        topics: [
          {
            id: "da-python-pandas",
            title: "Data Wrangling with Pandas & NumPy",
            summary: "Handle missing values, parse dates, merge DataFrames, filter complex subsets, and compute statistical aggregates.",
            skills: ["Pandas DataFrames and Series indexing", "Handling nulls and type casting", "Groupby operations and pivot tables", "Vectorized calculations with NumPy"],
            freeResources: [
              {
                title: "Kaggle Learn: Pandas & Data Cleaning Courses",
                provider: "Kaggle",
                type: "Interactive Micro-Course",
                url: "https://www.kaggle.com/learn/pandas",
                duration: "8 hrs",
                isFree: true
              },
              {
                title: "Python for Everybody (PY4E) by Dr. Chuck",
                provider: "PY4E",
                type: "Full Course",
                url: "https://www.py4e.com/",
                duration: "25 hrs",
                isFree: true
              },
              {
                title: "Corey Schafer: Python Pandas Full Course & Data Analysis",
                provider: "Corey Schafer (YouTube)",
                type: "Video Series",
                url: "https://www.youtube.com/playlist?list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS",
                duration: "6 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "da-stage-3",
        stageNumber: 3,
        title: "Data Visualization & Executive Business Storytelling",
        description: "Create interactive visual charts with Seaborn, Plotly, or Power BI / Tableau Public, and present clear strategic takeaways.",
        estimatedHours: "35 Hours",
        topics: [
          {
            id: "da-dataviz",
            title: "Visual Design, Exploratory Data Analysis & BI Dashboards",
            summary: "Choose the right chart type, eliminate clutter, present KPIs, and design interactive dashboards on Tableau Public.",
            skills: ["Correlation heatmaps, distribution histograms, scatter plots", "Plotly interactive charts in Python", "Tableau Public / Power BI dashboards", "Executive presentation summaries"],
            freeResources: [
              {
                title: "Kaggle Learn: Data Visualization with Seaborn",
                provider: "Kaggle",
                type: "Interactive Micro-Course",
                url: "https://www.kaggle.com/learn/data-visualization",
                duration: "6 hrs",
                isFree: true
              },
              {
                title: "Tableau Public: Free Video Tutorials & Community Datasets",
                provider: "Tableau",
                type: "Video Tutorials",
                url: "https://public.tableau.com/app/resources/learn",
                duration: "10 hrs",
                isFree: true
              }
            ]
          }
        ]
      }
    ],
    projects: [
      {
        id: "da-proj-1",
        title: "E-Commerce Customer Retention & Cohort Analysis (SQL)",
        level: "Beginner",
        description: "Analyze customer purchase data using PostgreSQL to calculate month-over-month retention cohorts, customer lifetime value (LTV), and churn rates.",
        deliverables: [
          "SQL script with CTEs grouping customers by acquisition month",
          "Calculated repeat purchase percentages for Months 1 through 12",
          "Markdown insights report recommending re-engagement campaigns",
          "Heatmap matrix visualization of retention rates"
        ],
        suggestedStack: "PostgreSQL, DBeaver or PGAdmin, SQL CTEs",
        freeStarterOrGuide: "https://mode.com/sql-tutorial/"
      },
      {
        id: "da-proj-2",
        title: "Exploratory Data Analysis on Global Tech Salaries (Python)",
        level: "Intermediate",
        description: "Clean and explore a dataset of thousands of global software engineering salaries using Pandas and Plotly to identify compensation trends.",
        deliverables: [
          "Cleaned dataset resolving missing values, currency conversions, and outliers",
          "Statistical analysis of compensation by years of experience, country, and remote status",
          "Interactive Plotly visualizations with tooltips",
          "Published Jupyter Notebook with narrative storytelling"
        ],
        suggestedStack: "Python, Pandas, Plotly, Jupyter Notebook",
        freeStarterOrGuide: "https://www.kaggle.com/learn/pandas"
      },
      {
        id: "da-proj-3",
        title: "Executive Business Performance Dashboard on Tableau Public (Capstone)",
        level: "Advanced (Capstone)",
        description: "Design an interactive multi-tab executive dashboard tracking revenue, profit margins, regional performance, and forecasted targets.",
        deliverables: [
          "Interactive filters by year, sales region, and product category",
          "KPI summary cards comparing against target benchmarks",
          "Drill-down capability from high-level summary to order-level line items",
          "Published live on Tableau Public portfolio"
        ],
        suggestedStack: "Tableau Public or Power BI Free, Cleaned Dataset",
        freeStarterOrGuide: "https://public.tableau.com/"
      }
    ]
  },

  {
    id: "data-engineering",
    title: "Data Engineer",
    category: "data",
    tagline: "Build scalable data pipelines, distributed processing with Spark, data warehousing with Snowflake/BigQuery, and orchestration with Airflow.",
    icon: "Database",
    badge: "100% Free",
    level: "Intermediate",
    estimatedDuration: "6 - 8 Months (12-15 hrs/week)",
    careerRoles: ["Data Engineer", "Analytics Engineer", "Big Data Developer", "Pipeline Architect"],
    prerequisites: ["Strong SQL foundation", "Intermediate Python programming"],
    overview: "Data engineers construct the reliable pipelines and storage engines that feed analytics dashboards and machine learning models. Learn data warehousing, Apache Spark, batch & stream orchestration, and modern data stack architectures completely free.",
    stages: [
      {
        id: "de-stage-1",
        stageNumber: 1,
        title: "Data Modeling, OLAP vs OLTP & Data Warehousing",
        description: "Understand star & snowflake schemas, dimensional modeling, column-oriented databases, and modern data warehouses.",
        estimatedHours: "40 Hours",
        topics: [
          {
            id: "de-warehousing",
            title: "Dimensional Modeling (Kimball), Star Schemas & dbt",
            summary: "Design fact and dimension tables, SCDs (Slowly Changing Dimensions), and write modular SQL data transformations using dbt.",
            skills: ["Fact tables vs Dimension tables", "SCD Type 1 and Type 2 patterns", "dbt models, tests, and documentation", "Columnar storage (Parquet format)"],
            freeResources: [
              {
                title: "dbt Learn: Free Fundamentals Course",
                provider: "dbt Labs",
                type: "Interactive Course",
                url: "https://courses.getdbt.com/",
                duration: "10 hrs",
                isFree: true
              },
              {
                title: "DataTalksClub: Free Data Engineering Zoomcamp",
                provider: "DataTalksClub",
                type: "Full Curriculum",
                url: "https://github.com/DataTalksClub/data-engineering-zoomcamp",
                duration: "50 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Data Engineering & Data Warehousing with dbt",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=8bLpkhiZ8-o",
                duration: "3 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "de-stage-2",
        stageNumber: 2,
        title: "Distributed Data Processing: Apache Spark & PySpark",
        description: "Process gigabytes or terabytes of distributed data using Apache Spark DataFrames, lazy evaluation, and Spark SQL.",
        estimatedHours: "50 Hours",
        topics: [
          {
            id: "de-spark",
            title: "Apache Spark & PySpark Big Data Processing",
            summary: "Learn Spark architecture (Driver & Executors), partitioning, broadcast joins, and transformations on massive datasets.",
            skills: ["PySpark DataFrame operations", "Partitioning strategies and avoiding shuffle bottlenecks", "Broadcast joins for dimensional lookups", "Writing partitioned Parquet files"],
            freeResources: [
              {
                title: "Apache Spark Official Getting Started & Guides",
                provider: "Apache Software Foundation",
                type: "Documentation",
                url: "https://spark.apache.org/docs/latest/api/python/",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: PySpark & Big Data Processing Master Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=_C8kWso4ne4",
                duration: "4 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "de-stage-3",
        stageNumber: 3,
        title: "Pipeline Orchestration & Streaming (Airflow & Kafka)",
        description: "Schedule DAGs with Apache Airflow and consume real-time event streams with Apache Kafka.",
        estimatedHours: "45 Hours",
        topics: [
          {
            id: "de-airflow-kafka",
            title: "Apache Airflow DAGs & Event Streaming with Kafka",
            summary: "Build scheduled, fault-tolerant workflow DAGs in Airflow and handle real-time event streams with Kafka producers and consumers.",
            skills: ["Airflow DAG definitions, Operators, Sensors", "Task dependencies and retry backoffs", "Kafka topics, partitions, and consumer groups", "Schema validation with JSON/Avro"],
            freeResources: [
              {
                title: "Astronomer: Learn Apache Airflow Guides & Tutorials",
                provider: "Astronomer",
                type: "Interactive Guides",
                url: "https://www.astronomer.io/docs/learn/",
                duration: "12 hrs",
                isFree: true
              },
              {
                title: "Confluent: Apache Kafka Fundamentals",
                provider: "Confluent Developer",
                type: "Video Course",
                url: "https://developer.confluent.io/courses/apache-kafka-for-beginners/",
                duration: "8 hrs",
                isFree: true
              }
            ]
          }
        ]
      }
    ],
    projects: [
      {
        id: "de-proj-1",
        title: "Automated Weather & Air Quality Ingestion Pipeline (ELT with dbt)",
        level: "Beginner",
        description: "Extract public API data daily into PostgreSQL, model staging and analytics mart layers using dbt, and generate automated data quality tests.",
        deliverables: [
          "Python extraction script fetching daily weather data",
          "dbt project with dimensional modeling (dim_location, fct_daily_measurements)",
          "Automated dbt schema tests (unique, not_null, accepted_values)",
          "Lineage graph and auto-generated data dictionary documentation"
        ],
        suggestedStack: "Python, PostgreSQL, dbt Core, DuckDB",
        freeStarterOrGuide: "https://courses.getdbt.com/"
      },
      {
        id: "de-proj-2",
        title: "End-to-End Orchestrated Batch Pipeline with Apache Airflow & Spark",
        level: "Intermediate",
        description: "Orchestrate an automated pipeline downloading large public transport datasets, processing them with PySpark, and loading them into a data lake.",
        deliverables: [
          "Airflow DAG with scheduled triggers, email alerts, and retries",
          "PySpark job aggregating travel times and passenger volume by station",
          "Data partitioned by year and month in Parquet format",
          "Fully reproducible Docker Compose setup with Airflow & Spark"
        ],
        suggestedStack: "Apache Airflow, PySpark, Docker, PostgreSQL",
        freeStarterOrGuide: "https://github.com/DataTalksClub/data-engineering-zoomcamp"
      },
      {
        id: "de-proj-3",
        title: "Real-Time Event Streaming & Analytics Engine with Kafka (Capstone)",
        level: "Advanced (Capstone)",
        description: "A streaming architecture that simulates e-commerce user clicks, produces events to Kafka topics, processes windowed metrics in real time, and writes to an analytics dashboard.",
        deliverables: [
          "Python event generator simulating 100+ clicks/second to Kafka topic",
          "Stream consumer calculating rolling 5-minute sales totals",
          "Dead-letter topic handling malformed JSON payloads",
          "Live metric visualization dashboard updating continuously"
        ],
        suggestedStack: "Apache Kafka, Python / PySpark Streaming, Docker Compose, Streamlit",
        freeStarterOrGuide: "https://developer.confluent.io/"
      }
    ]
  },

  {
    id: "ai-machine-learning",
    title: "AI & Machine Learning Engineer",
    category: "ai",
    tagline: "Master mathematical foundations, classical ML with Scikit-Learn, deep learning with PyTorch, NLP, and modern LLM systems.",
    icon: "BrainCircuit",
    badge: "100% Free",
    level: "All Levels",
    estimatedDuration: "6 - 9 Months (12-15 hrs/week)",
    careerRoles: ["Machine Learning Engineer", "AI Developer", "Data Scientist", "NLP / LLM Engineer"],
    prerequisites: ["Solid Python programming", "Basic linear algebra and calculus"],
    overview: "AI engineers build systems that learn from patterns in data to forecast, classify, generate, and reason. Follow this comprehensive, mathematics-grounded path through classical ML, deep learning, PyTorch, computer vision, and Generative AI using legendary open-source courses.",
    stages: [
      {
        id: "ai-stage-1",
        stageNumber: 1,
        title: "Mathematics Foundations & Python Numerical Computing",
        description: "Linear algebra, matrix multiplications, multivariable calculus, probability, and vectorized computation with NumPy.",
        estimatedHours: "45 Hours",
        topics: [
          {
            id: "ai-math-numpy",
            title: "Linear Algebra, Calculus & NumPy Matrix Operations",
            summary: "Understand vectors, matrices, dot products, eigenvalues, gradients, partial derivatives, and broadcasting in NumPy.",
            skills: ["Vectors & Matrix multiplications", "Derivatives & Chain Rule for backpropagation", "Probability distributions and Bayes' theorem", "NumPy array broadcasting and slicing"],
            freeResources: [
              {
                title: "3Blue1Brown: Essence of Linear Algebra",
                provider: "3Blue1Brown (YouTube)",
                type: "Video Series",
                url: "https://www.3blue1brown.com/topics/linear-algebra",
                duration: "10 hrs",
                isFree: true
              },
              {
                title: "3Blue1Brown: Essence of Calculus",
                provider: "3Blue1Brown (YouTube)",
                type: "Video Series",
                url: "https://www.3blue1brown.com/topics/calculus",
                duration: "8 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "ai-stage-2",
        stageNumber: 2,
        title: "Classical Machine Learning (Scikit-Learn)",
        description: "Supervised and unsupervised algorithms: Regression, Classification, Random Forests, SVMs, Clustering, and Model Evaluation.",
        estimatedHours: "55 Hours",
        topics: [
          {
            id: "ai-sklearn-core",
            title: "Supervised & Unsupervised Learning with Scikit-Learn",
            summary: "Implement linear/logistic regression, decision trees, ensemble methods (XGBoost), k-means clustering, and cross-validation.",
            skills: ["Train/test splitting & cross-validation", "Overfitting, underfitting, bias-variance tradeoff", "Metrics: Precision, Recall, F1-Score, ROC-AUC", "Hyperparameter tuning with GridSearchCV"],
            freeResources: [
              {
                title: "Scikit-Learn Official User Guide & Tutorials",
                provider: "Scikit-Learn",
                type: "Documentation",
                url: "https://scikit-learn.org/stable/user_guide.html",
                duration: "25 hrs",
                isFree: true
              },
              {
                title: "Kaggle Learn: Intro & Intermediate Machine Learning",
                provider: "Kaggle",
                type: "Interactive Micro-Courses",
                url: "https://www.kaggle.com/learn/intro-to-machine-learning",
                duration: "12 hrs",
                isFree: true
              },
              {
                title: "StatQuest with Josh Starmer: Machine Learning Fundamentals",
                provider: "StatQuest (YouTube)",
                type: "Video Series",
                url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF",
                duration: "10 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "ai-stage-3",
        stageNumber: 3,
        title: "Deep Learning & Neural Networks with PyTorch",
        description: "Build neural network architectures: Multi-Layer Perceptrons, Convolutional Networks (CNNs), Transformers, and loss optimization.",
        estimatedHours: "65 Hours",
        topics: [
          {
            id: "ai-pytorch-dl",
            title: "PyTorch: Tensors, Autograd, CNNs & Backpropagation",
            summary: "Write custom neural networks in PyTorch, implement gradient descent with autograd, and train image classifiers on GPUs.",
            skills: ["PyTorch Tensor manipulation and CUDA device handling", "nn.Module, loss functions, and optimizers (Adam, SGD)", "Convolutional layers (CNN), pooling, and transfer learning", "Learning rate scheduling and dropout regularization"],
            freeResources: [
              {
                title: "Practical Deep Learning for Coders (Course.fast.ai)",
                provider: "fast.ai (Jeremy Howard)",
                type: "Full University Course",
                url: "https://course.fast.ai/",
                duration: "40 hrs",
                isFree: true
              },
              {
                title: "Deep Learning with PyTorch: A 60 Minute Blitz",
                provider: "PyTorch Official",
                type: "Interactive Tutorial",
                url: "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html",
                duration: "5 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: PyTorch for Deep Learning Full Course - Zero to Mastery",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=V_xro1bcAuA",
                duration: "24 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "ai-stage-4",
        stageNumber: 4,
        title: "Modern NLP, LLMs, LangChain & RAG Applications",
        description: "Harness Large Language Models, tokenization, embeddings, vector databases, and Retrieval-Augmented Generation (RAG).",
        estimatedHours: "50 Hours",
        topics: [
          {
            id: "ai-llm-rag",
            title: "Transformers, Hugging Face, Vector Databases & RAG Pipelines",
            summary: "Understand Transformer attention mechanisms, use Hugging Face pipelines, chunk documents, store in Chroma/FAISS, and build Q&A agents.",
            skills: ["Self-Attention & Transformer architecture", "Text embeddings and cosine similarity", "Vector databases (ChromaDB / FAISS)", "RAG (Retrieval-Augmented Generation) implementation"],
            freeResources: [
              {
                title: "Hugging Face NLP Course (Free & Interactive)",
                provider: "Hugging Face",
                type: "Interactive Course",
                url: "https://huggingface.co/learn/nlp-course/chapter1/1",
                duration: "25 hrs",
                isFree: true
              },
              {
                title: "Andrej Karpathy: Neural Networks - Zero to Hero",
                provider: "YouTube (Andrej Karpathy)",
                type: "Video Series",
                url: "https://www.youtube.com/@AndrejKarpathy",
                duration: "20 hrs",
                isFree: true
              }
            ]
          }
        ]
      }
    ],
    projects: [
      {
        id: "ai-proj-1",
        title: "End-to-End Customer Churn Prediction API (Scikit-Learn)",
        level: "Beginner",
        description: "Train a machine learning classification model predicting customer cancellations, evaluate with ROC-AUC, serialize with joblib, and expose via FastAPI.",
        deliverables: [
          "Exploratory feature engineering and handling imbalanced data (SMOTE)",
          "Model comparison: Logistic Regression vs Random Forest vs XGBoost",
          "FastAPI prediction endpoint returning churn probability",
          "Docker container wrapping the API for one-command execution"
        ],
        suggestedStack: "Python, Scikit-Learn, Pandas, FastAPI, Docker",
        freeStarterOrGuide: "https://scikit-learn.org/stable/"
      },
      {
        id: "ai-proj-2",
        title: "Medical Image X-Ray Classifier using PyTorch & Transfer Learning",
        level: "Intermediate",
        description: "Train a deep Convolutional Neural Network using ResNet transfer learning to classify chest X-rays with high accuracy and explainability.",
        deliverables: [
          "Data augmentation pipeline (flips, rotations, normalization)",
          "Fine-tuning a pretrained ResNet-50 architecture",
          "Confusion matrix visualization and F1-score evaluation",
          "Grad-CAM heatmaps showing which image areas influenced prediction"
        ],
        suggestedStack: "PyTorch, Torchvision, Matplotlib, Google Colab (Free GPU)",
        freeStarterOrGuide: "https://course.fast.ai/"
      },
      {
        id: "ai-proj-3",
        title: "Production RAG AI Assistant for Technical Documentation (Capstone)",
        level: "Advanced (Capstone)",
        description: "Build an AI chatbot that ingests any documentation library (PDFs/Markdown), splits into vector chunks, and generates accurate cited answers with zero hallucinations.",
        deliverables: [
          "Recursive text chunker preserving code blocks and headings",
          "ChromaDB or FAISS local vector store with open-source sentence embeddings",
          "Context injection prompt with source citation links",
          "Web UI (Streamlit or React) with conversation history memory"
        ],
        suggestedStack: "Python, LangChain / LlamaIndex, ChromaDB, Hugging Face / Ollama",
        freeStarterOrGuide: "https://huggingface.co/learn/nlp-course/"
      }
    ]
  },

  {
    id: "qa-test-automation",
    title: "QA & Test Automation Engineer",
    category: "qa",
    tagline: "Master modern software testing: unit testing, integration tests, E2E browser automation with Playwright & Cypress, and API testing.",
    icon: "CheckCircle",
    badge: "100% Free",
    level: "Beginner Friendly",
    estimatedDuration: "4 - 5 Months (8-10 hrs/week)",
    careerRoles: ["QA Automation Engineer", "Software Development Engineer in Test (SDET)", "QA Analyst", "Test Lead"],
    prerequisites: ["Basic web literacy", "Beginner JavaScript or Python basics"],
    overview: "QA Automation engineers guarantee software quality, stability, and reliability through automated test suites that prevent regressions before software reaches users. Learn testing pyramids, API automation, and cross-browser End-to-End frameworks completely free.",
    stages: [
      {
        id: "qa-stage-1",
        stageNumber: 1,
        title: "Testing Fundamentals & Test Strategy",
        description: "Understand the test pyramid, manual vs automated testing, bug lifecycle, and writing clear test cases.",
        estimatedHours: "25 Hours",
        topics: [
          {
            id: "qa-fundamentals",
            title: "Test Pyramid, Test Case Design & Bug Reporting",
            summary: "Learn unit, integration, and end-to-end tiers, boundary value analysis, equivalence partitioning, and severity triage.",
            skills: ["Test Pyramid economics", "Boundary value analysis and negative test cases", "Bug report formulation with reproduction steps", "Regression test management"],
            freeResources: [
              {
                title: "Software Testing Fundamentals Guide",
                provider: "SoftwareTestingFundamentals.com",
                type: "Documentation",
                url: "https://softwaretestingfundamentals.com/",
                duration: "10 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Software Testing & QA Fundamentals Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=goA_5bQxviQ",
                duration: "4 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "qa-stage-2",
        stageNumber: 2,
        title: "API Testing & Automation (Postman & REST Assured / Supertest)",
        description: "Test REST APIs systematically: status codes, payload validations, schema assertions, and automated collection runs.",
        estimatedHours: "35 Hours",
        topics: [
          {
            id: "qa-api-testing",
            title: "REST API Automated Testing & Schema Validation",
            summary: "Write automated assertions verifying JSON response keys, types, response times, auth headers, and contract schemas.",
            skills: ["Postman test scripts and environment variables", "Newman CLI runner in CI pipelines", "JSON schema validation", "Mock servers and edge cases"],
            freeResources: [
              {
                title: "Postman Learning Center & Free Certification",
                provider: "Postman",
                type: "Interactive Course",
                url: "https://learning.postman.com/",
                duration: "12 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Postman API Testing for Beginners Full Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=VywxIQ2ZXw4",
                duration: "3 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "qa-stage-3",
        stageNumber: 3,
        title: "E2E UI Test Automation: Playwright & Cypress",
        description: "Automate modern browsers with Playwright and Cypress using Page Object Model (POM), parallel workers, and visual regression.",
        estimatedHours: "45 Hours",
        topics: [
          {
            id: "qa-playwright-cypress",
            title: "Playwright Automation Framework & Page Object Model",
            summary: "Write lightning-fast, auto-waiting browser tests across Chromium, Firefox, and WebKit with network mocking and video traces.",
            skills: ["Playwright locators and auto-waiting assertions", "Page Object Model (POM) architecture", "Network request interception and mocking", "Trace viewer and CI parallel test execution"],
            freeResources: [
              {
                title: "Playwright Official Getting Started & Guides",
                provider: "Microsoft Playwright Team",
                type: "Documentation",
                url: "https://playwright.dev/docs/intro",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "Cypress Official Real World Testing Course",
                provider: "Cypress.io",
                type: "Interactive Course",
                url: "https://learn.cypress.io/",
                duration: "12 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Playwright End-to-End Testing Full Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=Xz6lhEzgI5I",
                duration: "4 hrs",
                isFree: true
              }
            ]
          }
        ]
      }
    ],
    projects: [
      {
        id: "qa-proj-1",
        title: "Automated REST API Test Suite with Postman & Newman CLI",
        level: "Beginner",
        description: "Create an automated test collection covering a public REST API (e.g., reqres.in or JSONPlaceholder) with 30+ assertion checks and Newman CLI reports.",
        deliverables: [
          "Postman collection testing CRUD operations with dynamic variables",
          "Assertions verifying status codes, response time under 500ms, and JSON structure",
          "Automated execution script using Newman CLI generating HTML report",
          "GitHub Actions workflow running tests on schedule"
        ],
        suggestedStack: "Postman, Newman, Node.js, GitHub Actions",
        freeStarterOrGuide: "https://learning.postman.com/"
      },
      {
        id: "qa-proj-2",
        title: "Production E-Commerce E2E Test Suite with Playwright (POM)",
        level: "Intermediate",
        description: "Build an industrial-grade Playwright test suite for an e-commerce site covering user login, catalog filtering, cart additions, and checkout form.",
        deliverables: [
          "Clean Page Object Model (POM) separating selectors from test logic",
          "Cross-browser testing across Chromium, Firefox, and Mobile Safari viewport",
          "Mocked network payment response handling both success and card error",
          "Trace viewer reports uploaded as GitHub Actions artifacts on failure"
        ],
        suggestedStack: "TypeScript, Playwright, GitHub Actions",
        freeStarterOrGuide: "https://playwright.dev/docs/intro"
      },
      {
        id: "qa-proj-3",
        title: "Full Continuous Quality Pipeline: Unit, API & Visual Regression (Capstone)",
        level: "Advanced (Capstone)",
        description: "Architect a complete automated QA pipeline for a full-stack application that halts merging if unit coverage drops, API breaks, or visual layout shifts.",
        deliverables: [
          "Vitest unit tests achieving 85%+ statement coverage",
          "Playwright visual comparison tests detecting unexpected pixel shifts",
          "Automated lighthouse performance budget audit in CI",
          "Slack webhook publishing pass/fail quality gate summary"
        ],
        suggestedStack: "Playwright, Vitest, GitHub Actions, Docker",
        freeStarterOrGuide: "https://playwright.dev/docs/test-snapshots"
      }
    ]
  },

  {
    id: "cloud-architecture",
    title: "Cloud Solutions Architect",
    category: "devops",
    tagline: "Design highly available, cost-effective, multi-region cloud infrastructures across AWS, Azure, and GCP.",
    icon: "Cloud",
    badge: "100% Free",
    level: "Intermediate",
    estimatedDuration: "5 - 7 Months (10-12 hrs/week)",
    careerRoles: ["Cloud Architect", "Cloud Solutions Engineer", "Enterprise Architect", "Cloud Consultant"],
    prerequisites: ["Networking fundamentals", "Familiarity with cloud compute and storage"],
    overview: "Cloud architects design the blueprints for large-scale, fault-tolerant corporate cloud systems. Master AWS Well-Architected Framework pillars, serverless architectures, IAM security policies, and high availability without expensive certification fees.",
    stages: [
      {
        id: "ca-stage-1",
        stageNumber: 1,
        title: "Cloud Computing Foundations & Well-Architected Framework",
        description: "Understand IaaS, PaaS, SaaS, virtualization, VPC network isolation, and the 6 pillars of AWS Well-Architected Framework.",
        estimatedHours: "35 Hours",
        topics: [
          {
            id: "ca-core-pillars",
            title: "AWS Well-Architected Framework & Core Compute/Storage",
            summary: "Learn operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability.",
            skills: ["VPC design, public/private subnets, NAT Gateways", "Compute: EC2, Auto Scaling Groups, Elastic Load Balancers", "Storage: S3 buckets, lifecycle policies, EBS, EFS", "IAM roles, least privilege policies, and MFA"],
            freeResources: [
              {
                title: "AWS Well-Architected Framework Whitepapers",
                provider: "Amazon Web Services",
                type: "Whitepaper / Guide",
                url: "https://aws.amazon.com/architecture/well-architected/",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: AWS Certified Cloud Practitioner Full Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=SOTamWNgDKc",
                duration: "14 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "ca-stage-2",
        stageNumber: 2,
        title: "Serverless Architecture & Event-Driven Systems",
        description: "Build scalable event-driven systems using AWS Lambda, API Gateway, DynamoDB, EventBridge, and SQS/SNS.",
        estimatedHours: "45 Hours",
        topics: [
          {
            id: "ca-serverless",
            title: "Serverless Systems: Lambda, SQS, SNS & DynamoDB",
            summary: "Architect cost-effective architectures that scale to zero when idle and instantly handle traffic spikes with decoupling.",
            skills: ["AWS Lambda cold starts and concurrency limits", "DynamoDB single-table design & partition keys", "Asynchronous messaging with SQS queues and SNS topics", "API Gateway HTTP vs REST APIs with CORS"],
            freeResources: [
              {
                title: "AWS Serverless Land: Patterns & Architectures",
                provider: "AWS Serverless Team",
                type: "Architecture Repository",
                url: "https://serverlessland.com/",
                duration: "12 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: AWS Serverless & Lambda Full Course",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=w_b6Kj2T5vU",
                duration: "4 hrs",
                isFree: true
              }
            ]
          }
        ]
      }
    ],
    projects: [
      {
        id: "ca-proj-1",
        title: "Multi-Tier High Availability VPC Architecture Blueprint",
        level: "Beginner",
        description: "Design and implement a multi-AZ VPC architecture across 2 availability zones with public subnets, private application subnets, and isolated database subnets.",
        deliverables: [
          "Architecture diagram following standard cloud diagramming conventions",
          "Terraform or CloudFormation template provisioning the VPC",
          "NAT Gateways allowing private subnets outbound internet access without inbound exposure",
          "Security Group matrix restricting database port access exclusively to backend servers"
        ],
        suggestedStack: "Terraform, AWS Free Tier / LocalStack, Draw.io",
        freeStarterOrGuide: "https://aws.amazon.com/architecture/"
      },
      {
        id: "ca-proj-2",
        title: "Serverless Event-Driven Image Processing Pipeline (Capstone)",
        level: "Advanced (Capstone)",
        description: "A serverless pipeline where user image uploads to an S3 bucket automatically trigger Lambda functions to generate thumbnails and store metadata in DynamoDB.",
        deliverables: [
          "S3 Event Notification triggering asynchronous AWS Lambda execution",
          "Image resizing with Sharp / Pillow handling multiple dimensions",
          "DynamoDB record updated with processing status and image dimensions",
          "Dead-letter SQS queue capturing any corrupted image upload errors"
        ],
        suggestedStack: "AWS Lambda, S3, DynamoDB, SQS, Terraform / Serverless Framework",
        freeStarterOrGuide: "https://serverlessland.com/"
      }
    ]
  },

  {
    id: "systems-low-level",
    title: "Systems & Low-Level Programmer",
    category: "backend",
    tagline: "Understand memory management, CPU architecture, pointer arithmetic, network sockets, and systems programming in C, C++, and Rust.",
    icon: "Cpu",
    badge: "100% Free",
    level: "Advanced",
    estimatedDuration: "6 - 9 Months (12-16 hrs/week)",
    careerRoles: ["Systems Software Engineer", "Embedded Developer", "Rust Developer", "Game Engine Developer"],
    prerequisites: ["Strong command of programming logic and algorithms"],
    overview: "Systems programmers build operating systems, game engines, databases, and embedded firmware where every byte and CPU clock cycle counts. This roadmap guides you from manual memory management in C to modern memory safety in Rust.",
    stages: [
      {
        id: "sys-stage-1",
        stageNumber: 1,
        title: "C Programming, Pointers & Manual Memory Management",
        description: "Understand pointers, stack vs heap allocation, structs, bitwise manipulation, and memory leaks with Valgrind.",
        estimatedHours: "50 Hours",
        topics: [
          {
            id: "sys-c-memory",
            title: "C Language: Pointers, Malloc/Free & Valgrind Debugging",
            summary: "Master pointer arithmetic, memory allocation on heap, double-free prevention, segmentation faults, and building linked lists in C.",
            skills: ["Pointer arithmetic and dereferencing", "malloc, calloc, realloc, and free mechanics", "Struct alignment and byte padding", "Debugging memory errors with Valgrind / GDB"],
            freeResources: [
              {
                title: "Harvard CS50: Introduction to Computer Science (Weeks 1-5)",
                provider: "Harvard University (David J. Malan)",
                type: "University Course",
                url: "https://cs50.harvard.edu/x/",
                duration: "30 hrs",
                isFree: true
              },
              {
                title: "Beej's Guide to C Programming",
                provider: "Beej Jorgensen",
                type: "Free Book / Guide",
                url: "https://beej.us/guide/bgc/",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: C Programming Tutorial for Beginners",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=KJgsSFOSQv0",
                duration: "4 hrs",
                isFree: true
              }
            ]
          }
        ]
      },
      {
        id: "sys-stage-2",
        stageNumber: 2,
        title: "Modern Memory-Safe Systems with Rust",
        description: "Learn Rust's ownership model, borrowing rules, lifetimes, zero-cost abstractions, pattern matching, and fearless concurrency.",
        estimatedHours: "60 Hours",
        topics: [
          {
            id: "sys-rust-core",
            title: "Rust: Ownership, Borrowing, Lifetimes & Concurrency",
            summary: "Eliminate null pointers, data races, and use-after-free bugs without garbage collection using Rust's borrow checker.",
            skills: ["Ownership rules and move semantics", "Mutable vs immutable references (& vs &mut)", "Lifetimes annotation basics", "Traits, pattern matching, and Cargo package manager"],
            freeResources: [
              {
                title: "The Rust Programming Language (The Book)",
                provider: "Rust Official Core Team",
                type: "Official Book",
                url: "https://doc.rust-lang.org/book/",
                duration: "30 hrs",
                isFree: true
              },
              {
                title: "Rustlings: Small Interactive Exercises",
                provider: "Rustlings GitHub",
                type: "Hands-on Exercises",
                url: "https://github.com/rust-lang/rustlings",
                duration: "15 hrs",
                isFree: true
              },
              {
                title: "freeCodeCamp: Rust Programming Course for Beginners",
                provider: "freeCodeCamp (YouTube)",
                type: "Video Course",
                url: "https://www.youtube.com/watch?v=MsocPEZBd-M",
                duration: "5 hrs",
                isFree: true
              }
            ]
          }
        ]
      }
    ],
    projects: [
      {
        id: "sys-proj-1",
        title: "Custom Memory Allocator in C (malloc/free simulation)",
        level: "Intermediate",
        description: "Implement your own dynamic memory allocator in C from scratch using sbrk/mmap with memory block headers, free lists, and coalescing.",
        deliverables: [
          "Custom my_malloc and my_free functions handling arbitrary byte sizes",
          "Free block coalescing to prevent heap fragmentation",
          "Zero memory leaks or segmentation faults verified by Valgrind test suite",
          "Performance benchmark comparing against standard glibc malloc"
        ],
        suggestedStack: "C, GCC, GDB, Valgrind, Linux",
        freeStarterOrGuide: "https://beej.us/guide/bgc/"
      },
      {
        id: "sys-proj-2",
        title: "High-Performance Multithreaded Web Server in Rust (Capstone)",
        level: "Advanced (Capstone)",
        description: "Build an asynchronous HTTP web server in Rust from scratch using standard network sockets, thread pooling, and zero-copy parsing.",
        deliverables: [
          "Custom ThreadPool handling concurrent worker threads without data races",
          "HTTP request parser handling GET, POST, and header parsing",
          "Static file serving with proper MIME type headers and 404 fallback",
          "Benchmark serving 20,000+ requests/sec using wrk or hey tool"
        ],
        suggestedStack: "Rust, Cargo, Standard Library Sockets, Linux",
        freeStarterOrGuide: "https://doc.rust-lang.org/book/ch20-00-final-project-a-web-server.html"
      }
    ]
  }
];

export const getRoadmapById = (id) => {
  return ROADMAPS.find((r) => r.id === id);
};

export const getAllRoadmaps = () => {
  return ROADMAPS;
};
