import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5012";

export default function EvaluationFilter() {
  const [minScore, setMinScore] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [evaluator, setEvaluator] = useState("");
  const [evaluators, setEvaluators] = useState([]);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load evaluator list for dropdown
  useEffect(() => {
    async function loadEvaluators() {
      try {
        const res = await axios.get(`${API_BASE}/api/evaluations/evaluators`);
        setEvaluators(res.data || []);
      } catch (err) {
        console.error("Could not load evaluators:", err);
      }
    }
    loadEvaluators();
  }, []);

  async function searchByScore(e) {
    e?.preventDefault();
    setMessage("");
    setResults([]);
    setLoading(true);

    try {
      const params = {};
      if (minScore !== "") params.min = minScore;
      if (maxScore !== "") params.max = maxScore;

      const res = await axios.get(`${API_BASE}/api/evaluations/filterByScore`, { params });
      const data = res.data || [];

      if (data.length === 0) {
        setMessage("No matching projects or interns found.");
      } else {
        setMessage("");
      }

      setResults(data);
    } catch (err) {
      console.error(err);
      setMessage("Server error or no matches.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  async function searchByEvaluator(e) {
    e?.preventDefault();
    if (!evaluator) {
      setMessage("Please select an evaluator.");
      return;
    }

    setMessage("");
    setResults([]);
    setLoading(true);

    try {
      const res = await axios.get(`${API_BASE}/api/evaluations/filterByEvaluator`, {
        params: { name: evaluator }
      });

      const data = res.data || [];
      if (data.length === 0) {
        setMessage("No matching projects or interns found.");
      } else {
        setMessage("");
      }

      setResults(data);
    } catch (err) {
      console.error(err);
      setMessage("Server error or no matches.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="eval-page">
      <h1>Evaluation Filters</h1>

      <div className="filter-row">
        <div className="card">
          <h3>Filter by Score Range</h3>
          <div className="inputs">
            <input
              type="number"
              placeholder="Min score"
              value={minScore}
              onChange={(e) => setMinScore(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max score"
              value={maxScore}
              onChange={(e) => setMaxScore(e.target.value)}
            />
            <button onClick={searchByScore} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        <div className="card">
          <h3>Filter by Evaluator</h3>
          <div className="inputs">
            <select value={evaluator} onChange={(e) => setEvaluator(e.target.value)}>
              <option value="">-- Select evaluator --</option>
              {evaluators.map((name, idx) => (
                <option key={idx} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <button onClick={searchByEvaluator} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>

      <div className="results">
        <h2>Results</h2>

        {message && <p className="msg">{message}</p>}

        {results.length === 0 && !message && (
          <p className="hint">No results yet — run a search to populate results.</p>
        )}

        {results.map((r, i) => (
          <div className="result-card" key={`${r.project?.project_Id ?? i}-${i}`}>
            <div className="section">
              <h4>Project</h4>
              <p><strong>Title:</strong> {r.project?.title ?? "—"}</p>
              <p><strong>Project Id:</strong> {r.project?.project_Id ?? "—"}</p>
              <p><strong>Tech Stack:</strong> {r.project?.tech_Stack ?? "—"}</p>
              <p className="desc"><strong>Description:</strong> {r.project?.description ?? "—"}</p>
            </div>

            <div className="section">
              <h4>Intern</h4>
              <p><strong>Name:</strong> {(r.intern?.first_Name ?? "") + " " + (r.intern?.last_Name ?? "")}</p>
              <p><strong>Email:</strong> {r.intern?.email ?? "—"}</p>
              <p><strong>Degree:</strong> {r.intern?.degree ?? "—"}</p>
              <p><strong>University:</strong> {r.intern?.university ?? "—"}</p>
            </div>

            <div className="section">
              <h4>Evaluation</h4>
              <p><strong>Score:</strong> {r.score ?? "—"}</p>
              <p><strong>Evaluator:</strong> {r.evaluator ?? "—"}</p>
              <p><strong>Feedback:</strong> {r.feedback ?? "—"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
