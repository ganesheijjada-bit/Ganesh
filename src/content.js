export const profile = {
  name: "Ganesh Eijjada",
  role: "Senior Java Full Stack Developer",
  email: "eijjadaganeshvenkata@gmail.com",
  phone: "+1 573-519-8777",
  linkedin: "https://www.linkedin.com/in/eijjada-ganesh-8a050724h",
  bio: "I bring reliable Java services, thoughtful React interfaces, and grounded AI together to make complex business workflows feel simple.",
  experience: "8+",
};

export const projects = [
  {
    id: "telecom",
    number: "01",
    category: "Telecommunications",
    title: "A more connected customer journey.",
    name: "AT&T Business Ready",
    company: "AT&T",
    period: "May 2026 — Present",
    description:
      "Connecting product discovery, service eligibility, and bundle pricing with context-aware AI assistance.",
    tags: ["Java", "React", "RAG", "LangGraph"],
    challenge:
      "Bring inventory, catalog, pricing, and order information into a coherent internet and wireless bundle experience, including incomplete API responses.",
    approach: [
      "Connected React product screens to Java services for inventory, eligibility, and bundle indicators.",
      "Mapped product identifiers and pricing data across dependent services and order contracts.",
      "Used retrieval, embeddings, vector search, and LangGraph flows to ground AI answers in product documentation.",
    ],
    outcomes: [
      "Reusable product components with fallback handling for missing response fields.",
      "AI-assisted product information with checks against available service and pricing context.",
      "Validated API mappings and downstream integration scenarios.",
    ],
  },
  {
    id: "fintech",
    number: "02",
    category: "Financial technology",
    title: "Clarity for complex financial workflows.",
    name: "Intuit Financial Services",
    company: "Intuit",
    period: "Jan 2024 — Apr 2026",
    description:
      "Responsive financial interfaces, resilient backend services, and AI-assisted access to useful financial knowledge.",
    tags: ["Spring Boot", "Redux", "Kafka", "OpenAI"],
    challenge:
      "Connect financial application interfaces, distributed services, and help content while keeping data flows and error handling consistent.",
    approach: [
      "Built React and Redux interfaces backed by Spring Boot APIs and Oracle data access.",
      "Integrated Kafka and Avro messaging between distributed financial-services components.",
      "Added document retrieval and vector search to provide context for LLM-assisted financial help.",
    ],
    outcomes: [
      "Reusable forms, navigation, and data views with validation and API error handling.",
      "Contextual AI responses supported by response checks and fallback handling.",
      "Service coverage with JUnit and Mockito, plus support for container deployment workflows.",
    ],
  },
];

export const experience = [
  {
    company: "AT&T",
    role: "Senior Full Stack Developer",
    dates: "May 2026 — Present",
    location: "USA",
    summary:
      "Building connected telecom product journeys and grounded AI assistance across Java services and React interfaces.",
    tags: ["Java", "React", "GenAI"],
    current: true,
  },
  {
    company: "Intuit",
    role: "Full Stack Developer",
    dates: "Jan 2024 — Apr 2026",
    location: "USA",
    summary:
      "Developed financial interfaces, Spring Boot services, event integrations, and contextual AI help.",
    tags: ["Spring Boot", "Redux", "Kafka"],
  },
  {
    company: "Groovy Web",
    role: "Java Full Stack Developer",
    dates: "Apr 2020 — Aug 2022",
    location: "Hyderabad, India",
    summary:
      "Created enterprise interfaces and resilient payment, subscription, and event-streaming workflows.",
    tags: ["React", "Temporal", "AWS"],
  },
  {
    company: "Capgemini",
    role: "Full Stack Developer",
    dates: "Nov 2015 — Mar 2020",
    location: "Hyderabad, India",
    summary:
      "Built responsive web applications, Spring Cloud microservices, and serverless customer-service integrations.",
    tags: ["Java", "Spring Cloud", "Lambda"],
  },
];

export const capabilities = [
  {
    id: "backend",
    number: "01",
    title: "Reliable foundations",
    label: "Backend & systems",
    description:
      "Services designed to connect, scale, and keep business moving.",
    technologies: [
      "Java 8 / 17",
      "Spring Boot",
      "REST APIs",
      "Microservices",
      "Kafka",
      "SQL / NoSQL",
    ],
  },
  {
    id: "frontend",
    number: "02",
    title: "Thoughtful interfaces",
    label: "Frontend engineering",
    description:
      "Responsive experiences that bring clarity to complex workflows.",
    technologies: [
      "React",
      "Redux Toolkit",
      "JavaScript",
      "React Router",
      "HTML & CSS",
    ],
  },
  {
    id: "ai",
    number: "03",
    title: "Intelligence in context",
    label: "Generative AI",
    description:
      "AI features grounded in the information people actually need.",
    technologies: [
      "OpenAI API",
      "RAG",
      "Embeddings",
      "Vector search",
      "LangGraph",
    ],
  },
  {
    id: "cloud",
    number: "04",
    title: "Built for delivery",
    label: "Cloud & quality",
    description:
      "A practical path from a tested service to a running application.",
    technologies: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD",
      "JUnit & Mockito",
    ],
  },
];

export const education = [
  {
    degree: "M.S. Computer & Information Sciences",
    institution: "Southeast Missouri State University",
    date: "May 2024",
    detail: "GPA 3.9",
  },
  {
    degree: "B.Tech. Computer Science & Engineering",
    institution: "V.R. Siddhartha Engineering College",
    date: "Jul 2015",
    detail: "CGPA 7.8",
  },
];
