// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import InternDetails from "./pages/InternDetails";
import ProjectDetails from "./pages/ProjectDetails";
import EvaluationFilter from "./pages/EvaluationFilter";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="app-body">
        <Routes>
          <Route path="/" element={<Navigate to="/interns" replace />} />
          <Route path="/interns" element={<InternDetails />} />
          <Route path="/projects" element={<ProjectDetails />} />
          <Route path="/evaluations" element={<EvaluationFilter />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
