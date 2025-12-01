import React, { useState } from "react";
import axios from "axios";
import GlassCard from "../components/GlassCard";

function InternDetails() {
    const [internId, setInternId] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!internId) return;

        try {
            const response = await axios.get(
                `http://localhost:5012/api/interns/${internId}`
            );

            // Check correct key
            if (!response.data.intern) {
                setError("Intern not found.");
                setData(null);
                return;
            }

            setData(response.data);
            setError("");

        } catch (err) {
            console.log(err);
            setError("Intern not found or server error.");
            setData(null);
        }
    };

    return (
        <div className="container">
            <h1>Intern Details</h1>

            <div className="input-section">
                <input
                    type="number"
                    placeholder="Enter Intern ID"
                    value={internId}
                    onChange={(e) => setInternId(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {error && <p className="error">{error}</p>}

            {data && (
                <>
                    <GlassCard title="Intern Information">
                        <p><strong>Name:</strong> {data.intern.first_Name} {data.intern.last_Name}</p>
                        <p><strong>Email:</strong> {data.intern.email}</p>
                        <p><strong>Phone:</strong> {data.intern.phone}</p>
                        <p><strong>University:</strong> {data.intern.university}</p>
                        <p><strong>Degree:</strong> {data.intern.degree}</p>
                    </GlassCard>

                    <GlassCard title="Projects">
                        {data.projects.length === 0 ? (
                            <p>No projects found.</p>
                        ) : (
                            data.projects.map((project) => (
                                <div key={project.project_Id}>
                                    {project.title}
                                </div>
                            ))
                        )}
                    </GlassCard>

                    <GlassCard title="Evaluations">
                        {data.evaluations.length === 0 ? (
                            <p>No evaluations found.</p>
                        ) : (
                            data.evaluations.map((ev) => (
                                <div key={ev.evaluation_Id}>
                                    Score: {ev.score}
                                </div>
                            ))
                        )}
                    </GlassCard>
                </>
            )}
        </div>
    );
}

export default InternDetails;
