// src/components/Navbar.js
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav-glass">
      <div className="nav-inner">
        <div className="brand">Primus — Intern System</div>
        <nav>
          <Link to="/interns">Interns</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/evaluations">Evaluations</Link>
        </nav>
      </div>
    </header>
  );
}
