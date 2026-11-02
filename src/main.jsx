import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-mono/latin-400.css";
import {
  profile,
  projects,
  experience,
  capabilities,
  education,
} from "./content";
import "./styles.css";
import SystemIllustration from "./SystemIllustration";
import ProjectArtwork from "./ProjectArtwork";

const resumePath = "/Ganesh-Eijjada-Resume.docx";

function Icon({ name = "arrow", size = 20, ...props }) {
  const paths = {
    arrow: (
      <>
        <path d="M5 19 19 5M5 5h14v14" />
      </>
    ),
    right: (
      <>
        <path d="M4 12h16m-6-6 6 6-6 6" />
      </>
    ),
    down: (
      <>
        <path d="M12 4v16m-6-6 6 6 6-6" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="12" height="13" rx="2" />
        <path d="M15 8V3H3v13h5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    code: (
      <>
        <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16" />
      </>
    ),
    screen: (
      <>
        <rect x="3" y="3" width="18" height="14" rx="2" />
        <path d="M8 21h8m-4-4v4M3 7h18" />
      </>
    ),
    sparkle: (
      <>
        <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
        <path d="M20 2v4m-2-2h4" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5" />
      </>
    ),
    menu: <path d="M4 7h16M4 17h16" />,
    pause: (
      <>
        <path d="M8 5v14M16 5v14" />
      </>
    ),
    play: <path d="m8 4 12 8-12 8V4Z" />,
    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 10v7m0-10v.1M11 17v-7m0 3a3 3 0 0 1 6 0v4" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

function SectionLabel({ number, children, light = false }) {
  return (
    <div className={`section-label ${light ? "light" : ""}`}>
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}

function useReveals() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="site-header">
      <a
        href="#home"
        className="brand"
        aria-label="Ganesh Eijjada, back to home"
        onClick={() => setOpen(false)}
      >
        <span className="monogram">
          GE<span>.</span>
        </span>
        <span>
          GANESH <span className="brand-last">EIJJADA</span>
        </span>
      </a>
      <button
        className="mobile-menu"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen(!open)}
      >
        <Icon name={open ? "close" : "menu"} />
      </button>
      <nav
        id="primary-nav"
        className={open ? "nav-open" : ""}
        aria-label="Main navigation"
      >
        {[
          ["work", "Work"],
          ["about", "About"],
          ["experience", "Experience"],
          ["contact", "Contact"],
        ].map(([id, label], index) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            <span className="nav-number" aria-hidden="true">
              0{index + 1}.
            </span>{" "}
            {label}
          </a>
        ))}
        <a
          className="nav-contact"
          href={resumePath}
          download
          onClick={() => setOpen(false)}
        >
          Resume <Icon name="download" size={15} />
        </a>
      </nav>
    </header>
  );
}

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      if (dialog.open) dialog.close();
      previous?.focus();
    };
  }, []);
  function trapFocus(event) {
    if (event.key !== "Tab") return;
    const focusable = ref.current.querySelectorAll(
      'button:not([disabled]), a[href], [tabindex="0"]',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onKeyDown={trapFocus}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <button
          type="button"
          className="dialog-close icon-button"
          aria-label="Close project details"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
        <p className="eyebrow">
          SELECTED WORK / {project.number} · {project.category}
        </p>
        <h2 id="project-dialog-title">{project.name}</h2>
        <p className="dialog-deck">{project.description}</p>
        <div className="dialog-meta">
          <span>{project.company}</span>
          <span>{project.period}</span>
        </div>
        <div className="dialog-section">
          <span className="eyebrow">THE CHALLENGE</span>
          <p>{project.challenge}</p>
        </div>
        <div className="dialog-section">
          <span className="eyebrow">MY APPROACH</span>
          <ul>
            {project.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="dialog-section">
          <span className="eyebrow">KEY CONTRIBUTIONS</span>
          <ul>
            {project.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <p className="project-note">
          A summary of professional contributions. Illustrations are conceptual;
          company source code and product screens are not reproduced.
        </p>
        <button type="button" className="text-link" onClick={onClose}>
          Back to selected work <Icon name="right" size={17} />
        </button>
      </div>
    </dialog>
  );
}

function Work() {
  const [project, setProject] = useState(null);
  return (
    <section id="work" className="work-section section-shell">
      <SectionLabel number="01">SELECTED WORK</SectionLabel>
      <div className="section-heading" data-reveal>
        <h2>
          A few things I’ve built<span className="heading-dot">.</span>
        </h2>
        <p>
          Selected contributions across telecom, financial services, and applied
          AI.
        </p>
      </div>
      <div className="projects-grid">
        {projects.map((item) => (
          <article className="project-card" key={item.id} data-reveal>
            <button
              className="project-art-button"
              type="button"
              onClick={() => setProject(item)}
              aria-label={`Read about ${item.name}`}
            >
              <ProjectArtwork type={item.id} />
              <span className="art-open">
                <Icon name="arrow" size={21} />
              </span>
            </button>
            <div className="project-info">
              <div className="project-category">
                <span>{item.company}</span>
                <span>{item.category}</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="project-card-bottom">
                <div className="tags">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <button
                  type="button"
                  className="project-details-button"
                  onClick={() => setProject(item)}
                  aria-label={`View ${item.name} project details`}
                >
                  <span>View project</span>
                  <Icon name="arrow" size={18} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {project && (
        <ProjectDialog project={project} onClose={() => setProject(null)} />
      )}
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-shell">
        <SectionLabel number="02" light>
          ABOUT ME
        </SectionLabel>
        <div className="about-grid" data-reveal>
          <div>
            <h2>
              Full stack.
              <br />
              <em>Full perspective.</em>
            </h2>
            <div className="about-signature">
              Ganesh Eijjada <Icon name="arrow" size={20} />
            </div>
          </div>
          <div className="about-copy">
            <p className="about-lead">
              Good software connects more than systems.
              <br />
              It connects people to what they need.
            </p>
            <p>
              I’m Ganesh, a senior full stack developer with 8+ years of
              experience turning complex business requirements into useful,
              dependable software.
            </p>
            <p>
              My work moves between Java services, React interfaces, and applied
              AI. From telecom journeys to financial platforms, I care about the
              details that make the whole experience work.
            </p>
            <a href={resumePath} download className="text-link light-link">
              The full story, on paper <Icon name="download" size={17} />
            </a>
          </div>
        </div>
        <div className="capabilities-grid">
          {capabilities.map((item, index) => (
            <div className="capability" key={item.id} data-reveal>
              <div className="capability-top">
                <Icon
                  name={["code", "screen", "sparkle", "layers"][index]}
                  size={25}
                />
                <span>{item.number}</span>
              </div>
              <p className="eyebrow">{item.label}</p>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="capability-tech">
                {item.technologies.slice(0, 4).join(" · ")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [expanded, setExpanded] = useState(0);
  return (
    <section id="experience" className="experience-section section-shell">
      <SectionLabel number="03">EXPERIENCE</SectionLabel>
      <div className="experience-layout">
        <div className="experience-intro" data-reveal>
          <h2>
            Where I’ve
            <br />
            <em>made an impact.</em>
          </h2>
          <p>
            Different teams. New challenges.
            <br />
            The same curiosity to build better.
          </p>
          <a className="text-link" href={resumePath} download>
            Download résumé <Icon name="download" size={17} />
          </a>
        </div>
        <div className="experience-list" data-reveal>
          {experience.map((item, index) => (
            <article
              key={item.company}
              className={`experience-item ${expanded === index ? "expanded" : ""}`}
            >
              <button
                type="button"
                className="experience-toggle"
                aria-expanded={expanded === index}
                aria-controls={`experience-panel-${index}`}
                onClick={() => setExpanded(expanded === index ? null : index)}
              >
                <span className="experience-date">
                  {item.dates}
                  {item.current && (
                    <span className="current-label">
                      <span />
                      CURRENT
                    </span>
                  )}
                </span>
                <span className="experience-company">
                  <strong>{item.company}</strong>
                  <span>{item.role}</span>
                </span>
                <span className="experience-plus">
                  <Icon name="plus" size={20} />
                </span>
              </button>
              <div
                className="experience-panel"
                id={`experience-panel-${index}`}
                hidden={expanded !== index}
              >
                <p>{item.summary}</p>
                <div className="tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="education-row" data-reveal>
        <span className="eyebrow">ALWAYS LEARNING</span>
        {education.map((item) => (
          <div key={item.degree}>
            <h3>{item.degree}</h3>
            <p>
              {item.institution} <span>· {item.date.slice(-4)}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [copyState, setCopyState] = useState("idle");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copyEmail() {
    clearTimeout(timer.current);
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    timer.current = setTimeout(() => setCopyState("idle"), 5000);
  }
  return (
    <section id="contact" className="contact-section section-shell">
      <SectionLabel number="04">GET IN TOUCH</SectionLabel>
      <div className="contact-content" data-reveal>
        <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
        <h2>
          Let’s build
          <em> something great.</em>
        </h2>
        <p>
          A thoughtful product. A tricky problem. A new possibility.
          <br />
          I’d love to hear what you’re working on.
        </p>
        <a href={`mailto:${profile.email}`} className="button button-primary">
          Start a conversation <Icon name="arrow" size={19} />
        </a>
        <div className="email-row">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <button
            type="button"
            className="icon-button"
            onClick={copyEmail}
            aria-label={
              copyState === "copied" ? "Email copied" : "Copy email address"
            }
          >
            <Icon name={copyState === "copied" ? "check" : "copy"} size={16} />
          </button>
        </div>
        <p className="copy-status" role="status">
          {copyState === "copied"
            ? "Email address copied."
            : copyState === "failed"
              ? "Please select and copy the email address above."
              : "\u00a0"}
        </p>
      </div>
      <footer>
        <a href="#home" className="footer-brand">
          GE<span className="footer-brand-dot">.</span>
          <span>© {new Date().getFullYear()} Ganesh Eijjada</span>
        </a>
        <span className="footer-note">BUILT WITH INTENTION. ALWAYS.</span>
        <div>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <Icon name="arrow" size={14} />
          </a>
          <a href="#home" aria-label="Back to top">
            Back to top <Icon name="down" className="up-arrow" size={14} />
          </a>
        </div>
      </footer>
    </section>
  );
}

function App() {
  useReveals();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section id="home" className="hero section-shell">
          <div className="hero-content">
            <p className="hero-eyebrow">Hi, my name is</p>
            <h1>
              Ganesh Eijjada<span>.</span>
            </h1>
            <p className="hero-tagline">
              I build connected
              <br />
              digital experiences.
            </p>
            <p className="hero-description">
              Senior Java Full Stack Developer connecting reliable backends,
              thoughtful React interfaces, and AI grounded in real context.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore my work <Icon name="arrow" size={18} />
              </a>
              <a className="hero-secondary" href={resumePath} download>
                Résumé <Icon name="download" size={17} />
              </a>
            </div>
            <p className="hero-stack">
              <span />
              JAVA <b>/</b> REACT <b>/</b> GENERATIVE AI
            </p>
          </div>
          <SystemIllustration />
          <div className="hero-bottom">
            <div className="hero-stat">
              <strong>
                8<span>+</span>
              </strong>
              <span>
                YEARS OF
                <br />
                ENGINEERING EXPERIENCE
              </span>
            </div>
            <div className="trusted-by">
              <span>EXPERIENCE WITH</span>
              <div>
                <span>AT&T</span>
                <span>Intuit</span>
                <span>Groovy Web</span>
                <span>Capgemini</span>
              </div>
            </div>
            <a
              className="scroll-cue"
              href="#work"
              aria-label="Scroll to selected work"
            >
              <span>SCROLL TO EXPLORE</span>
              <Icon name="down" size={17} />
            </a>
          </div>
        </section>
        <Work />
        <About />
        <Experience />
        <Contact />
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
