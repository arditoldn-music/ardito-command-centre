import { useState } from "react";

const SEED_IDEAS = [
  { id: 1, title: "How to write a Spotify bio that actually converts", source: "manual", status: "maybe", notes: "" },
  { id: 2, title: "What is a PRO and do you need one?", source: "manual", status: "pending", notes: "" },
  { id: 3, title: "The difference between a master and a publishing royalty", source: "manual", status: "pending", notes: "" },
  { id: 4, title: "How to build a press kit from scratch", source: "manual", status: "pending", notes: "" },
  { id: 5, title: "Why your release schedule matters as much as your release", source: "manual", status: "pending", notes: "" },
  { id: 6, title: "What Spotify's Discovery Mode actually does", source: "manual", status: "pending", notes: "" },
  { id: 7, title: "Should you release an EP or keep dropping singles?", source: "manual", status: "pending", notes: "" },
  { id: 8, title: "How to pitch to sync licensing opportunities as an indie artist", source: "manual", status: "pending", notes: "" },
];

const STATUS_CONFIG = {
  pending: { label: "?",     bg: "#1a1a1a",  color: "#6b7c6b" },
  yes:     { label: "YES",   bg: "#1a2e1a",  color: "#a8d5a2" },
  no:      { label: "NO",    bg: "#2a0a0a",  color: "#e05c5c" },
  maybe:   { label: "MAYBE", bg: "#2a2010",  color: "#f0c040" },
};

export default function PostIdeas() {
  const [ideas, setIdeas] = useState(SEED_IDEAS);
  const [newTitle, setNewTitle] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState("all");

  function setStatus(id, status) {
    setIdeas(is => is.map(i => i.id === id ? { ...i, status } : i));
  }

  function addIdea() {
    if (!newTitle.trim()) return;
    setIdeas(is => [...is, { id: Date.now(), title: newTitle, source: "manual", status: "pending", notes: newNotes }]);
    setNewTitle(""); setNewNotes(""); setShowAdd(false);
  }

  function deleteIdea(id) {
    setIdeas(is => is.filter(i => i.id !== id));
  }

  const filtered = ideas.filter(i => {
    if (filter === "all") return i.status !== "no";
    if (filter === "archived") return i.status === "no";
    return i.status === filter;
  });

  const counts = {
    pending: ideas.filter(i => i.status === "pending").length,
    yes: ideas.filter(i => i.status === "yes").length,
    maybe: ideas.filter(i => i.status === "maybe").length,
    no: ideas.filter(i => i.status === "no").length,
  };

  return (
    <div className="ideas-wrap">
      <div className="roster-header">
        <h2 className="section-title">Post Ideas</h2>
        <button className="btn-add-artist" onClick={() => setShowAdd(s => !s)}>+ Add idea</button>
      </div>

      <div className="ideas-stats">
        {Object.entries(counts).map(([k, v]) => (
          <div key={k} className="ideas-stat">
            <span className="ideas-stat-num" style={{ color: STATUS_CONFIG[k].color }}>{v}</span>
            <span className="ideas-stat-label">{k}</span>
          </div>
        ))}
      </div>

      <div className="filter-tabs" style={{ marginBottom: 20 }}>
        {["all", "pending", "yes", "maybe", "archived"].map(f => (
          <button key={f} className={`filter-btn${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {showAdd && (
        <div className="artist-card add-form-card" style={{ marginBottom: 16 }}>
          <h3 className="form-title">New idea</h3>
          <div className="edit-field" style={{ marginBottom: 10 }}>
            <label className="edit-label">Post title / concept</label>
            <input className="form-input" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. How to get on editorial playlists" />
          </div>
          <div className="edit-field" style={{ marginBottom: 14 }}>
            <label className="edit-label">Notes (optional)</label>
            <textarea className="form-input form-textarea" value={newNotes} onChange={e => setNewNotes(e.target.value)} placeholder="Any angle, data point or hook you have in mind" />
          </div>
          <div className="detail-actions">
            <button className="btn-edit" onClick={addIdea}>Save</button>
            <button className="btn-cancel" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      {filtered.length === 0 && <p className="empty-state">No ideas in this category yet.</p>}

      <div className="ideas-list">
        {filtered.map(idea => {
          const cfg = STATUS_CONFIG[idea.status];
          return (
            <div key={idea.id} className="idea-card" style={{ borderLeft: `3px solid ${cfg.color}` }}>
              <div className="idea-card-body">
                <div className="idea-source-tag">
                  {idea.source === "news" ? "📰 From news feed" : "💡 Manual"}
                </div>
                <p className="idea-title">{idea.title}</p>
                {idea.notes && <p className="idea-notes">{idea.notes}</p>}
              </div>
              <div className="idea-actions">
                {["yes", "maybe", "no"].map(s => (
                  <button
                    key={s}
                    className={`idea-btn${idea.status === s ? " active" : ""}`}
                    style={idea.status === s ? { background: STATUS_CONFIG[s].color, color: "#0d0d0d" } : {}}
                    onClick={() => setStatus(idea.id, s)}
                  >
                    {STATUS_CONFIG[s].label}
                  </button>
                ))}
                <button className="idea-btn idea-delete" onClick={() => deleteIdea(idea.id)}>×</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
