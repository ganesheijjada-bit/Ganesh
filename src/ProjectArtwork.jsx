import React from "react";
import "./illustrations.css";

function DiagramIcon({ type }) {
  const paths = {
    discover: (
      <>
        <rect x="4" y="4" width="16" height="12" rx="2" />
        <path d="M8 21h8m-4-5v5m-8-9h16" />
      </>
    ),
    connect: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    deliver: (
      <>
        <path d="m5 12 4 4L19 6" />
        <circle cx="12" cy="12" r="10" />
      </>
    ),
    ai: (
      <>
        <path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width="23"
      height="23"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[type]}
    </svg>
  );
}

export default function ProjectArtwork({ type }) {
  if (type === "telecom")
    return (
      <div className="project-art navy-telecom-art" aria-hidden="true">
        <div className="navy-art-topline">
          <span>AT&T / BUSINESS READY</span>
          <span className="navy-art-symbol">↗</span>
        </div>
        <div className="navy-flow">
          <div className="navy-flow-track">
            <span />
          </div>
          {[
            ["discover", "Discover"],
            ["connect", "Connect"],
            ["deliver", "Deliver"],
          ].map(([icon, label], index) => (
            <div
              key={icon}
              className={`navy-flow-step navy-flow-step-${index}`}
            >
              <div>
                <DiagramIcon type={icon} />
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="navy-context-pill">
          <DiagramIcon type="ai" />
          <span>Product knowledge, connected.</span>
        </div>
        <div className="navy-art-bottomline">
          <span>INVENTORY</span>
          <i />
          <span>ELIGIBILITY</span>
          <i />
          <span>INTELLIGENCE</span>
        </div>
      </div>
    );

  return (
    <div className="project-art navy-fintech-art" aria-hidden="true">
      <div className="navy-art-topline">
        <span>INTUIT / FINANCIAL SERVICES</span>
        <span className="navy-art-symbol">↗</span>
      </div>
      <div className="navy-knowledge-panel">
        <div className="navy-knowledge-intro">
          <span className="navy-knowledge-icon">
            <DiagramIcon type="ai" />
          </span>
          <div>
            <span>LESS SEARCHING.</span>
            <strong>More understanding.</strong>
          </div>
        </div>
        <div className="navy-knowledge-bars">
          <i />
          <i />
          <i />
        </div>
        <div className="navy-knowledge-foot">
          <span className="navy-knowledge-dot" />
          <span>Answers grounded in context</span>
          <svg
            viewBox="0 0 16 16"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          >
            <path d="m3 8 3 3 7-7" />
          </svg>
        </div>
      </div>
      <div className="navy-art-bottomline">
        <span>RETRIEVE</span>
        <i />
        <span>GROUND</span>
        <i />
        <span>RESPOND</span>
      </div>
    </div>
  );
}
