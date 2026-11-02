import React, { useEffect, useState } from "react";
import "./illustrations.css";

const layers = [
  {
    id: "frontend",
    label: "React",
    focus: "Experience",
    stack: '["React", "Redux"]',
    title: "Thoughtful interfaces",
    description:
      "Bringing clarity to complex workflows, one interaction at a time.",
  },
  {
    id: "backend",
    label: "Java",
    focus: "Foundation",
    stack: '["Java", "Spring"]',
    title: "Reliable by design",
    description:
      "Connecting services, data, and the business logic behind the experience.",
  },
  {
    id: "ai",
    label: "Applied AI",
    focus: "Intelligence",
    stack: '["RAG", "LangGraph"]',
    title: "Intelligence in context",
    description:
      "Grounding AI answers in relevant knowledge and real product information.",
  },
];

function MotionIcon({ paused }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="15"
      height="15"
      fill="none"
      aria-hidden="true"
    >
      {paused ? (
        <path
          d="m7 4 9 6-9 6V4Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M7 4v12m6-12v12"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export default function SystemIllustration() {
  const [selected, setSelected] = useState("frontend");
  const [paused, setPaused] = useState(false);
  const layer = layers.find((item) => item.id === selected);

  useEffect(() => {
    document.documentElement.dataset.motionPaused = String(paused);
    return () => delete document.documentElement.dataset.motionPaused;
  }, [paused]);

  return (
    <div className="system-illustration">
      <div className="developer-window">
        <div className="developer-window-bar">
          <div className="developer-window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span>developer.js</span>
          <button
            className="developer-motion-toggle"
            type="button"
            aria-label={paused ? "Resume animations" : "Pause animations"}
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            <MotionIcon paused={paused} />
          </button>
        </div>
        <div className="developer-code" aria-label="Developer profile">
          <div>
            <span className="code-line-number" aria-hidden="true">
              01
            </span>
            <code>
              <span className="code-purple">const</span> developer ={" "}
              <span className="code-muted">&#123;</span>
            </code>
          </div>
          <div>
            <span className="code-line-number" aria-hidden="true">
              02
            </span>
            <code className="code-indent">
              name: <span className="code-mint">"Ganesh Eijjada"</span>,
            </code>
          </div>
          <div>
            <span className="code-line-number" aria-hidden="true">
              03
            </span>
            <code className="code-indent">
              role: <span className="code-mint">"Full Stack"</span>,
            </code>
          </div>
          <div>
            <span className="code-line-number" aria-hidden="true">
              04
            </span>
            <code className="code-indent">
              layer: <span className="code-mint">"{layer.focus}"</span>,
            </code>
          </div>
          <div className="code-active-line">
            <span className="code-line-number" aria-hidden="true">
              05
            </span>
            <code className="code-indent">
              stack: <span className="code-blue">{layer.stack}</span>,
            </code>
          </div>
          <div>
            <span className="code-line-number" aria-hidden="true">
              06
            </span>
            <code className="code-indent">
              mindset: <span className="code-mint">"Keep building"</span>
            </code>
          </div>
          <div>
            <span className="code-line-number" aria-hidden="true">
              07
            </span>
            <code>
              <span className="code-muted">&#125;;</span>
              <span className="code-cursor" aria-hidden="true" />
            </code>
          </div>
        </div>
        <div
          className="developer-layer-switch"
          role="group"
          aria-label="Explore my stack"
        >
          {layers.map((item) => (
            <button
              key={item.id}
              className={selected === item.id ? "selected" : ""}
              aria-pressed={selected === item.id}
              type="button"
              onClick={() => setSelected(item.id)}
            >
              <span className="developer-layer-dot" aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="developer-context" aria-live="polite" aria-atomic="true">
        <span className="developer-context-bracket" aria-hidden="true">
          ↳
        </span>
        <div>
          <strong>{layer.title}</strong>
          <p>{layer.description}</p>
        </div>
      </div>
      <div className="developer-floating-label" aria-hidden="true">
        <span /> Built to connect.
      </div>
    </div>
  );
}
