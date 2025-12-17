import { useState } from "react";
import api from "../../utils/api";

const ProjectData = ({ project }) => {
  const [proposal, setProposal] = useState("");
  const [bid, setBid] = useState("");
  const [days, setDays] = useState("");

  const apply = async () => {
    await api.post("/applications", {
      projectId: project._id,
      proposal,
      bidAmount: bid,
      estimatedTime: days
    });

    alert("Application submitted");
  };

  return (
    <div className="card mt-3">
      <h3 className="font-semibold">{project.title}</h3>
      <p>{project.description}</p>

      <textarea className="input" placeholder="Proposal"
        onChange={e => setProposal(e.target.value)} />

      <input className="input" type="number" placeholder="Bid Amount"
        onChange={e => setBid(e.target.value)} />

      <input className="input" type="number"
        placeholder="Estimated days to complete"
        onChange={e => setDays(e.target.value)} />

      <button className="btn mt-2" onClick={apply}>
        Apply
      </button>
    </div>
  );
};

export default ProjectData;