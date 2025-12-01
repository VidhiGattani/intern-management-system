import React, { useState } from "react";
import axios from "axios";
import GlassCard from "../components/GlassCard";

const ProjectDetails = () => {
    const [projectId, setProjectId] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!projectId) {
            setError("Please enter a valid Project ID.");
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:5012/api/projects/${projectId}`
            );

            setData(response.data);
            setError("");
        } catch (err) {
            setError("Project not found or server error.");
            setData(null);
        }
    };

    return (
        <div style={{ padding: "40px" }}>
            <h1 style={{ color: "white" }}>Project Details</h1>

            <input
                type="number"
                value={projectId}
                placeholder="Enter Project ID"
                onChange={(e) => setProjectId(e.target.value)}
                style={{ padding: "8px", marginRight: "10px" }}
            />

            <button onClick={handleSearch}>Search</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {data && (
                <GlassCard>
                    <h2>Project Information</h2>

                    <p><strong>Title:</strong> {data.project?.title}</p>
                    <p><strong>Description:</strong> {data.project?.description}</p>
                    <p><strong>Tech Stack:</strong> {data.project?.tech_Stack}</p>
                    <p><strong>Start Date:</strong> {data.project?.start_Date}</p>
                    <p><strong>End Date:</strong> {data.project?.end_Date}</p>

                    <hr />

                    <h2>Intern</h2>
                    {data.intern ? (
                        <>
                            <p><strong>Name:</strong> {data.intern.first_Name} {data.intern.last_Name}</p>
                            <p><strong>Email:</strong> {data.intern.email}</p>
                        </>
                    ) : (
                        <p>No intern found.</p>
                    )}

                    <hr />

                    <h2>Evaluations</h2>
                    {data.evaluations?.length > 0 ? (
                        data.evaluations.map((e) => (
                            <p key={e.evaluation_Id}>
                                ⭐ Score: {e.score} — {e.feedback}
                            </p>
                        ))
                    ) : (
                        <p>No evaluations found.</p>
                    )}
                </GlassCard>
            )}
        </div>
    );
};

export default ProjectDetails;
