import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Project = {
  title: string;
  description: string;
  stack: string[];
  status: string;
  type: string;
};

const projects: Project[] = [
  { title: "EngineerOS", description: "The portfolio and engineering operating system itself.", stack: ["React", "TypeScript", "Vite"], status: "Building", type: "Platform" },
  { title: "Inventory System", description: "A production-oriented inventory platform with PostgreSQL-backed workflows.", stack: ["Python", "FastAPI", "PostgreSQL"], status: "Planned", type: "Backend" },
  { title: "Route Optimization", description: "Graph algorithms applied to delivery routing and path selection.", stack: ["Python", "Algorithms", "Graphs"], status: "Planned", type: "Algorithms" },
  { title: "School Management", description: "A full-stack management system covering students, classes and records.", stack: ["React", "FastAPI", "PostgreSQL"], status: "Planned", type: "Full Stack" }
];

const skills = [
  ["Python", 55], ["JavaScript", 62], ["TypeScript", 48], ["React", 58],
  ["SQL / PostgreSQL", 52], ["Git", 60], ["Docker", 30], ["System Design", 22]
] as const;

function App() {
  const [page, setPage] = useState<"home"|"projects"|"dashboard"|"journal">("home");

  const nav = (p: typeof page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <header className="nav">
        <button className="brand" onClick={() => nav("home")}>
          <span className="brand-mark">E</span>
          <span>EngineerOS</span>
        </button>
        <nav>
          <button onClick={() => nav("projects")}>Projects</button>
          <button onClick={() => nav("dashboard")}>Dashboard</button>
          <button onClick={() => nav("journal")}>Journal</button>
        </nav>
        <a className="github" href="https://github.com/" target="_blank" rel="noreferrer">GitHub ↗</a>
      </header>

      <main>
        {page === "home" && <Home nav={nav} />}
        {page === "projects" && <Projects />}
        {page === "dashboard" && <Dashboard />}
        {page === "journal" && <Journal />}
      </main>

      <footer>
        <span>EngineerOS · Victor Huncho</span>
        <span>Built to show evidence, not adjectives.</span>
      </footer>
    </div>
  );
}

function Home({ nav }: { nav: (p: "home"|"projects"|"dashboard"|"journal") => void }) {
  return (
    <>
      <section className="hero shell">
        <div className="eyebrow">SOFTWARE ENGINEERING PORTFOLIO · 2026</div>
        <h1>I build software.<br /><span>I document the evidence.</span></h1>
        <p className="hero-copy">
          EngineerOS is my public engineering record: systems shipped, technical decisions,
          learning progress, failures, experiments and production thinking.
        </p>
        <div className="actions">
          <button className="primary" onClick={() => nav("projects")}>Explore projects</button>
          <button className="secondary" onClick={() => nav("dashboard")}>Open recruiter view</button>
        </div>
        <div className="hero-metrics">
          <Metric value="01" label="Live MVP" />
          <Metric value="15" label="Engineering phases" />
          <Metric value="25" label="Target systems" />
          <Metric value="∞" label="Things to break and fix" />
        </div>
      </section>

      <section className="shell section">
        <div className="section-head"><div><span className="eyebrow">CURRENT MISSION</span><h2>From learner to engineer.</h2></div></div>
        <div className="mission-grid">
          <Card number="01" title="Learn" text="Computer science fundamentals, professional programming and engineering practices." />
          <Card number="02" title="Build" text="Complete systems instead of collecting another graveyard of tutorial certificates." />
          <Card number="03" title="Ship" text="Deploy, test, monitor, document and explain the software in public." />
        </div>
      </section>

      <section className="shell section">
        <div className="section-head">
          <div><span className="eyebrow">FEATURED WORK</span><h2>Systems in the pipeline.</h2></div>
          <button className="text-btn" onClick={() => nav("projects")}>View all →</button>
        </div>
        <div className="project-grid">{projects.slice(0,3).map(p => <ProjectCard key={p.title} project={p} />)}</div>
      </section>
    </>
  );
}

function Dashboard() {
  return (
    <section className="shell page">
      <div className="page-title"><span className="eyebrow">RECRUITER VIEW</span><h1>Engineering Dashboard</h1><p>A transparent snapshot of what is being learned, built and shipped.</p></div>
      <div className="dashboard-top">
        <div className="big-card">
          <span className="eyebrow">CURRENT PHASE</span>
          <h2>Computer Science Fundamentals</h2>
          <div className="progress"><span style={{width:"18%"}} /></div>
          <div className="progress-label"><span>Phase 1 of 15</span><strong>18%</strong></div>
          <p>Data structures · algorithms · complexity · systems fundamentals</p>
        </div>
        <div className="stat-card"><small>PROJECTS</small><strong>1</strong><span>active build</span></div>
        <div className="stat-card"><small>DEPLOYMENTS</small><strong>0</strong><span>target: every major system</span></div>
      </div>
      <div className="dashboard-grid">
        <section className="panel"><div className="panel-head"><h3>Skills matrix</h3><span>demonstrated progress</span></div>{skills.map(([name,val]) => <div className="skill" key={name}><div><span>{name}</span><b>{val}%</b></div><div className="progress"><span style={{width:`${val}%`}} /></div></div>)}</section>
        <section className="panel"><div className="panel-head"><h3>Engineering evidence</h3><span>portfolio signals</span></div><Evidence label="Projects documented" value="4" /><Evidence label="System designs" value="0" /><Evidence label="Journal entries" value="0" /><Evidence label="Production incidents" value="0" /><Evidence label="Mock interviews" value="0" /></section>
      </div>
    </section>
  );
}

function Projects() {
  return <section className="shell page"><div className="page-title"><span className="eyebrow">PROJECT VAULT</span><h1>Things being built.</h1><p>Every project will eventually expose requirements, architecture, tests, deployment, metrics and lessons learned.</p></div><div className="project-grid">{projects.map(p => <ProjectCard key={p.title} project={p} />)}</div></section>;
}

function Journal() {
  return <section className="shell page"><div className="page-title"><span className="eyebrow">ENGINEERING JOURNAL</span><h1>Build in public.</h1><p>Decisions, bugs, failures and lessons. The boring stuff that turns syntax knowledge into engineering experience.</p></div><div className="empty-journal"><span className="journal-icon">∿</span><h2>First entry pending.</h2><p>The journal becomes useful when something breaks. Fortunately, software has never struggled to provide opportunities.</p></div></section>;
}

function Metric({value,label}:{value:string;label:string}) { return <div><strong>{value}</strong><span>{label}</span></div>; }
function Card({number,title,text}:{number:string;title:string;text:string}) { return <article className="info-card"><span>{number}</span><h3>{title}</h3><p>{text}</p></article>; }
function Evidence({label,value}:{label:string;value:string}) { return <div className="evidence"><span>{label}</span><strong>{value}</strong></div>; }
function ProjectCard({project}:{project:Project}) { return <article className="project-card"><div className="project-top"><span className="tag">{project.type}</span><span className="status">{project.status}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="stack">{project.stack.map(s=><span key={s}>{s}</span>)}</div><button className="text-btn">Technical record →</button></article>; }

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
