import { useState } from "react";
import { usePersistedState } from "../hooks/usePersistedState";

const PIPELINE = ["Spotted", "First Contact", "In Conversation", "Onboarded", "Active", "Paused"];

const PRIORITY_COLOURS = {
  "This week": { bg: "#2a1a00", label: "#f0c040" },
  "Watching":  { bg: "#0d1b2a", label: "#7aabcf" },
  "On hold":   { bg: "#1a1a1a", label: "#6b7c6b" },
  "Onboarded": { bg: "#1a2e1a", label: "#a8d5a2" },
};

const SEED_ARTISTS = [
  {
    id: 1,
    name: "Omjine",
    location: "Seoul",
    genre: "Singer-songwriter",
    ig: "@omjine",
    tiktok: "",
    igFollowers: "",
    ttFollowers: "",
    spotify: "",
    howFound: "Personal connection — university",
    rating: 5,
    releaseReady: true,
    status: "Active",
    priority: "This week",
    lastContact: "2026-03-29",
    nextStep: "Release April 10 — monitor pre-save, confirm all DSPs live",
    email: "",
    lastRelease: "",
    source: "",
    notes: "Active client. Compressed release timeline. Pre-save live. Spotify pitch submitted. Second collaborative track in pipeline.",
  },
  {
    id: 2,
    name: "Mirella",
    location: "Hamburg",
    genre: "",
    ig: "",
    tiktok: "",
    igFollowers: "",
    ttFollowers: "",
    spotify: "",
    howFound: "Personal connection — friends",
    rating: 4,
    releaseReady: false,
    status: "First Contact",
    priority: "Watching",
    lastContact: "2026-03-29",
    nextStep: "In-person London meetup — relationship first, no pitch yet",
    email: "",
    lastRelease: "",
    source: "",
    notes: "Active message exchange in German. Warm lead. Approach: relationship-first.",
  },
  {
    id: 3,
    name: "Sophiz",
    location: "London",
    genre: "",
    ig: "",
    tiktok: "",
    igFollowers: "",
    ttFollowers: "",
    spotify: "",
    howFound: "",
    rating: 0,
    releaseReady: false,
    status: "In Conversation",
    priority: "This week",
    lastContact: "2026-03-29",
    nextStep: "Lock in coffee catch-up — match her energy, don't pitch Ardito yet",
    email: "",
    lastRelease: "",
    source: "",
    notes: "Two labels interested, contract under review. Strategy: meet first, let relationship do the work.",
  },
  {
    id: 4,
    name: "Imo",
    location: "London",
    genre: "Singer-songwriter",
    ig: "",
    tiktok: "",
    igFollowers: "",
    ttFollowers: "",
    spotify: "",
    howFound: "",
    rating: 0,
    releaseReady: false,
    status: "Spotted",
    priority: "Watching",
    lastContact: "",
    nextStep: "Consider as on-camera face for Ardito content",
    email: "",
    lastRelease: "",
    source: "",
    notes: "Potential on-camera talent for Ardito. Warm lead.",
  },
];

const BLANK = {
  name: "", location: "", genre: "", ig: "", tiktok: "",
  igFollowers: "", ttFollowers: "", spotify: "", howFound: "",
  rating: 0, releaseReady: false, status: "Spotted", priority: "Watching",
  lastContact: "", nextStep: "", email: "", lastRelease: "", source: "", notes: "",
};

function Stars({ value, onChange }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(n => (
        <span
          key={n}
          className={`star${n <= value ? " on" : ""}`}
          onClick={() => onChange && onChange(n)}
        >★</span>
      ))}
    </div>
  );
}

function ArtistCard({ artist, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(artist);
  const pc = PRIORITY_COLOURS[artist.priority] || PRIORITY_COLOURS["Watching"];

  function save() {
    onUpdate(form);
    setEditing(false);
  }
  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  return (
    <div className="artist-card">
      <div className="artist-card-top" onClick={() => !editing && setOpen(o => !o)}>
        <div className="artist-card-left">
          <div className="artist-avatar">{artist.name[0]}</div>
          <div>
            <div className="artist-name">{artist.name}</div>
            <div className="artist-meta">{artist.location}{artist.genre ? ` · ${artist.genre}` : ""}</div>
          </div>
        </div>
        <div className="artist-card-right">
          <span className="priority-tag" style={{ background: pc.bg, color: pc.label }}>{artist.priority}</span>
          <span className="status-tag">{artist.status}</span>
          <span className="chevron">{open ? "▲" : "▼"}</span>
        </div>
      </div>

      {open && !editing && (
        <div className="artist-detail">
          <div className="detail-row"><span className="detail-label">Next step</span><span>{artist.nextStep || "—"}</span></div>
          <div className="detail-row"><span className="detail-label">Last contact</span><span>{artist.lastContact || "—"}</span></div>
          <div className="detail-row"><span className="detail-label">Email</span><span>{artist.email || "—"}</span></div>
          <div className="detail-row"><span className="detail-label">Instagram</span><span>{artist.ig || "—"}{artist.igFollowers ? ` (${artist.igFollowers})` : ""}</span></div>
          <div className="detail-row"><span className="detail-label">TikTok</span><span>{artist.tiktok || "—"}{artist.ttFollowers ? ` (${artist.ttFollowers})` : ""}</span></div>
          <div className="detail-row"><span className="detail-label">Spotify</span><span>{artist.spotify || "—"}</span></div>
          <div className="detail-row"><span className="detail-label">How found</span><span>{artist.howFound || "—"}</span></div>
          <div className="detail-row"><span className="detail-label">Rating</span><Stars value={artist.rating} /></div>
          <div className="detail-row"><span className="detail-label">Release ready</span><span>{artist.releaseReady ? "Yes" : "No"}</span></div>
          <div className="detail-row"><span className="detail-label">Last release</span><span>{artist.lastRelease || "—"}</span></div>
          {artist.notes && <div className="artist-notes">{artist.notes}</div>}
          <div className="detail-actions">
            <button className="btn-edit" onClick={() => { setForm(artist); setEditing(true); }}>Edit</button>
            <button className="btn-delete" onClick={() => onDelete(artist.id)}>Remove</button>
          </div>
        </div>
      )}

      {open && editing && (
        <div className="artist-detail edit-form">
          <div className="edit-grid">
            {[["Name","name"],["Location","location"],["Genre / vibe","genre"],["Instagram","ig"],["IG followers","igFollowers"],["TikTok","tiktok"],["TT followers","ttFollowers"],["Spotify link","spotify"],["How found","howFound"],["Email","email"],["Last release","lastRelease"],["Source link","source"],["Last contact","lastContact","date"],["Next step","nextStep"]].map(([label, key, type]) => (
              <div key={key} className="edit-field">
                <label className="edit-label">{label}</label>
                <input
                  className="form-input"
                  type={type || "text"}
                  value={form[key] || ""}
                  onChange={e => set(key, e.target.value)}
                />
              </div>
            ))}
            <div className="edit-field">
              <label className="edit-label">Status</label>
              <select className="form-select" value={form.status} onChange={e => set("status", e.target.value)}>
                {PIPELINE.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="edit-field">
              <label className="edit-label">Priority</label>
              <select className="form-select" value={form.priority} onChange={e => set("priority", e.target.value)}>
                {Object.keys(PRIORITY_COLOURS).map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="edit-field">
              <label className="edit-label">Rating</label>
              <Stars value={form.rating} onChange={v => set("rating", v)} />
            </div>
            <div className="edit-field">
              <label className="edit-label">Release ready</label>
              <select className="form-select" value={form.releaseReady ? "Yes" : "No"} onChange={e => set("releaseReady", e.target.value === "Yes")}>
                <option>No</option><option>Yes</option>
              </select>
            </div>
          </div>
          <div className="edit-field full-width">
            <label className="edit-label">Notes</label>
            <textarea className="form-input form-textarea" value={form.notes || ""} onChange={e => set("notes", e.target.value)} />
          </div>
          <div className="detail-actions">
            <button className="btn-edit" onClick={save}>Save</button>
            <button className="btn-cancel" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ArtistRoster() {
  const [artists, setArtists] = usePersistedState("ardito-artists", SEED_ARTISTS);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newArtist, setNewArtist] = useState(BLANK);

  function updateArtist(updated) {
    setArtists(as => as.map(a => a.id === updated.id ? updated : a));
  }
  function deleteArtist(id) {
    setArtists(as => as.filter(a => a.id !== id));
  }
  function addArtist() {
    if (!newArtist.name.trim()) return;
    setArtists(as => [...as, { ...newArtist, id: Date.now() }]);
    setNewArtist(BLANK);
    setShowAdd(false);
  }

  const filtered = artists.filter(a => {
    const matchStatus = filter === "All" || a.status === filter || a.priority === filter;
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.genre?.toLowerCase().includes(search.toLowerCase()) || a.location?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="roster-wrap">
      <div className="roster-header">
        <h2 className="section-title">Artist Roster</h2>
        <button className="btn-add-artist" onClick={() => setShowAdd(s => !s)}>+ Add artist</button>
      </div>

      <div className="roster-filters">
        <input className="search-input" placeholder="Search artists…" value={search} onChange={e => setSearch(e.target.value)} />
        <div className="filter-tabs">
          {["All", ...PIPELINE, ...Object.keys(PRIORITY_COLOURS)].map(f => (
            <button key={f} className={`filter-btn${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      {showAdd && (
        <div className="artist-card add-form-card">
          <h3 className="form-title">New artist</h3>
          <div className="edit-grid">
            {[["Name","name"],["Location","location"],["Genre / vibe","genre"],["Instagram","ig"],["TikTok","tiktok"],["Email","email"],["How found","howFound"],["Next step","nextStep"]].map(([label, key]) => (
              <div key={key} className="edit-field">
                <label className="edit-label">{label}</label>
                <input className="form-input" value={newArtist[key] || ""} onChange={e => setNewArtist(f => ({ ...f, [key]: e.target.value }))} />
              </div>
            ))}
            <div className="edit-field">
              <label className="edit-label">Status</label>
              <select className="form-select" value={newArtist.status} onChange={e => setNewArtist(f => ({ ...f, status: e.target.value }))}>
                {PIPELINE.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="edit-field">
              <label className="edit-label">Priority</label>
              <select className="form-select" value={newArtist.priority} onChange={e => setNewArtist(f => ({ ...f, priority: e.target.value }))}>
                {Object.keys(PRIORITY_COLOURS).map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div className="detail-actions">
            <button className="btn-edit" onClick={addArtist}>Save</button>
            <button className="btn-cancel" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="pipeline-legend">
        {PIPELINE.map((s, i) => (
          <span key={s} className="pipeline-step">
            {s}{i < PIPELINE.length - 1 ? " →" : ""}
          </span>
        ))}
      </div>

      {filtered.length === 0 && <p className="empty-state">No artists match this filter.</p>}
      {filtered.map(a => (
        <ArtistCard key={a.id} artist={a} onUpdate={updateArtist} onDelete={deleteArtist} />
      ))}
    </div>
  );
}
