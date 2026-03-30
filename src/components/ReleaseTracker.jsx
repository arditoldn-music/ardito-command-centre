import { useState } from "react";
import { usePersistedState } from "../hooks/usePersistedState";

const STATUS = ["Outstanding", "In Progress", "Done", "N/A"];
const STATUS_COLOURS = {
  "Outstanding": "#3a2a2a",
  "In Progress": "#2a2010",
  "Done":        "#1a2e1a",
  "N/A":         "#1a1a1a",
};
const STATUS_LABEL = {
  "Outstanding": "#e05c5c",
  "In Progress": "#f0c040",
  "Done":        "#a8d5a2",
  "N/A":         "#3a3a3a",
};

const WEEKS = [
  { label: "Week 6", subtitle: "Admin setup", tasks: [
    "Confirm track is professionally mixed and mastered",
    "Upload to DistroKid (or distributor of choice)",
    "Assign ISRC codes",
    "Finalise and upload artwork (3000x3000px)",
    "Set release date — check no major competing releases that day",
    "Confirm all metadata (title, credits, genre tags, splits)",
    "Confirm royalty splits with any collaborators in writing",
    "Register song with PRS (UK) / ASCAP / BMI to collect performance royalties",
  ]},
  { label: "Week 5", subtitle: "Pre-save + Spotify pitch", tasks: [
    "Set up pre-save link (Feature.fm or Toneden)",
    "Submit Spotify editorial pitch (4 weeks before release — 500 chars, specific + story-led)",
    "Set up Spotify Canvas (8-second looping vertical video)",
    "Update Apple Music for Artists profile with release info",
    "Update Amazon Music for Artists profile",
    "Update EPK, website and bio with release info",
    "Start pushing pre-save on socials",
    "Pin pre-save link in bio across all platforms",
  ]},
  { label: "Week 4", subtitle: "Content plan locked", tasks: [
    "Lock content calendar for release week",
    "Film minimum 10–15 short-form clips to drip over coming weeks (TikTok / Reels / Shorts)",
    "Post first piece of pre-release content",
    "Create a themed Spotify playlist featuring your track + similar artists",
  ]},
  { label: "Week 3", subtitle: "Press + blog outreach", tasks: [
    "Submit to SubmitHub (blogs + playlist curators)",
    "Identify 5–10 independent playlist curators to pitch directly",
    "Send personal outreach emails / DMs to key contacts",
    "Write and distribute a music press release",
    "Plan YouTube Shorts strategy — behind-the-scenes content performs best",
  ]},
  { label: "Week 2", subtitle: "Content ramp up", tasks: [
    "Increase posting frequency across all channels",
    "Push pre-save link harder — stories, posts, DMs",
    "Pitch directly to independent playlist curators",
    "Send email newsletter / mailing list announcement (if applicable)",
    "Prepare all release day social assets (cover art posts, video clips, stories)",
  ]},
  { label: "Week 1", subtitle: "Release day prep", tasks: [
    "Confirm track is live and correctly delivered to all DSPs",
    "Schedule all release day posts in advance",
    "Brief close contacts to SAVE (not just stream) on release day",
    "Prepare story content for release day",
    "Set up any paid promotion / boost if budget allows",
  ]},
  { label: "Release week", subtitle: "Go live + monitor", tasks: [
    "Post release day content across all channels",
    "Monitor streams + saves in Spotify for Artists",
    "Engage with every comment, share and tag",
    "Check Release Radar delivery to followers",
    "Thank supporters publicly",
    "Post at least one piece of content every day this week",
  ]},
  { label: "Post-release", subtitle: "Follow through", tasks: [
    "Pitch to Apple Music editorial via Apple Music for Artists",
    "Submit to Amazon Music playlists",
    "Review Spotify for Artists data — saves, skip rate, listener locations",
    "Check all DSPs have paid out correctly",
    "Follow up with any press or curator leads that haven't responded",
    "Schedule next release to maintain momentum — consistency is key",
  ]},
];

function buildBlankRelease(title = "", date = "") {
  const tasks = {};
  WEEKS.forEach(w => {
    w.tasks.forEach(t => {
      tasks[`${w.label}::${t}`] = "Not Started";
    });
  });
  return { id: Date.now(), title, artist: "", date, compressed: false, notes: "", tasks };
}

const OMJINE_TASKS = {
  "Week 6::Confirm track is professionally mixed and mastered": "Done",
  "Week 6::Upload to DistroKid (or distributor of choice)": "Done",
  "Week 6::Assign ISRC codes": "Done",
  "Week 6::Finalise and upload artwork (3000x3000px)": "Done",
  "Week 6::Set release date — check no major competing releases that day": "Done",
  "Week 6::Confirm all metadata (title, credits, genre tags, splits)": "Done",
  "Week 6::Confirm royalty splits with any collaborators in writing": "Not Started",
  "Week 6::Register song with PRS (UK) / ASCAP / BMI to collect performance royalties": "Not Started",
  "Week 5::Set up pre-save link (Feature.fm or Toneden)": "Done",
  "Week 5::Submit Spotify editorial pitch (4 weeks before release — 500 chars, specific + story-led)": "Done",
  "Week 5::Set up Spotify Canvas (8-second looping vertical video)": "Not Started",
  "Week 5::Update Apple Music for Artists profile with release info": "Not Started",
  "Week 5::Update Amazon Music for Artists profile": "Not Started",
  "Week 5::Update EPK, website and bio with release info": "Not Started",
  "Week 5::Start pushing pre-save on socials": "In Progress",
  "Week 5::Pin pre-save link in bio across all platforms": "Not Started",
  "Week 4::Lock content calendar for release week": "In Progress",
  "Week 4::Film minimum 10–15 short-form clips to drip over coming weeks (TikTok / Reels / Shorts)": "Not Started",
  "Week 4::Post first piece of pre-release content": "Not Started",
  "Week 4::Create a themed Spotify playlist featuring your track + similar artists": "Not Started",
  "Week 3::Submit to SubmitHub (blogs + playlist curators)": "Not Started",
  "Week 3::Identify 5–10 independent playlist curators to pitch directly": "Not Started",
  "Week 3::Send personal outreach emails / DMs to key contacts": "Not Started",
  "Week 3::Write and distribute a music press release": "Not Started",
  "Week 3::Plan YouTube Shorts strategy — behind-the-scenes content performs best": "Not Started",
  "Week 2::Increase posting frequency across all channels": "Not Started",
  "Week 2::Push pre-save link harder — stories, posts, DMs": "Not Started",
  "Week 2::Pitch directly to independent playlist curators": "Not Started",
  "Week 2::Send email newsletter / mailing list announcement (if applicable)": "Not Started",
  "Week 2::Prepare all release day social assets (cover art posts, video clips, stories)": "Not Started",
  "Week 1::Confirm track is live and correctly delivered to all DSPs": "Not Started",
  "Week 1::Schedule all release day posts in advance": "Not Started",
  "Week 1::Brief close contacts to SAVE (not just stream) on release day": "Not Started",
  "Week 1::Prepare story content for release day": "Not Started",
  "Week 1::Set up any paid promotion / boost if budget allows": "Not Started",
  "Release week::Post release day content across all channels": "Not Started",
  "Release week::Monitor streams + saves in Spotify for Artists": "Not Started",
  "Release week::Engage with every comment, share and tag": "Not Started",
  "Release week::Check Release Radar delivery to followers": "Not Started",
  "Release week::Thank supporters publicly": "Not Started",
  "Release week::Post at least one piece of content every day this week": "Not Started",
  "Post-release::Pitch to Apple Music editorial via Apple Music for Artists": "Not Started",
  "Post-release::Submit to Amazon Music playlists": "Not Started",
  "Post-release::Review Spotify for Artists data — saves, skip rate, listener locations": "Not Started",
  "Post-release::Check all DSPs have paid out correctly": "Not Started",
  "Post-release::Follow up with any press or curator leads that haven't responded": "Not Started",
  "Post-release::Schedule next release to maintain momentum — consistency is key": "Not Started",
};

const SEED_RELEASES = [
  {
    id: 1,
    title: "New single",
    artist: "Omjine",
    date: "2026-04-10",
    compressed: true,
    notes: "Compressed timeline — started late. Pre-save live. Spotify pitch submitted. Focus on content ramp and release day plan.",
    tasks: OMJINE_TASKS,
  },
];

function progressOf(tasks) {
  const vals = Object.values(tasks);
  const done = vals.filter(v => v === "Done").length;
  return Math.round((done / vals.length) * 100);
}

function thisWeekTasks(release) {
  const today = new Date();
  const releaseDate = new Date(release.date);
  const daysUntil = Math.ceil((releaseDate - today) / (1000 * 60 * 60 * 24));
  if (daysUntil > 42) return [];
  if (daysUntil > 21) return WEEKS.slice(0, 2);
  if (daysUntil > 14) return WEEKS.slice(2, 4);
  if (daysUntil > 7) return WEEKS.slice(4, 5);
  if (daysUntil > 0) return WEEKS.slice(5, 6);
  if (daysUntil > -7) return WEEKS.slice(6, 7);
  return WEEKS.slice(7);
}

function ReleaseCard({ release, onUpdate, onDelete }) {
  const [open, setOpen] = useState(true);
  const progress = progressOf(release.tasks);
  const urgent = thisWeekTasks(release);

  function setStatus(key, val) {
    const updated = { ...release, tasks: { ...release.tasks, [key]: val } };
    onUpdate(updated);
  }

  return (
    <div className="release-card">
      <div className="release-card-top" onClick={() => {}}>
        <div>
          <div className="release-title">{release.title} <span className="release-artist">— {release.artist}</span></div>
          <div className="release-meta">
            {release.date && <span>Release: <strong>{release.date}</strong></span>}
            {release.compressed && <span className="compressed-tag">Compressed timeline</span>}
          </div>
        </div>
        <div className="release-card-right">
          <div className="progress-wrap">
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
            <span className="progress-pct">{progress}%</span>
          </div>
          <button className="btn-delete" onClick={() => onDelete(release.id)} style={{ marginTop: 0 }}>Remove</button>
        </div>
      </div>

      <div className="release-body">
        {release.notes && <p className="release-notes">{release.notes}</p>}

        {urgent.length > 0 && (
          <div className="this-week-box">
            <div className="this-week-label">⚡ Focus this week</div>
            {urgent.map(w => w.tasks.map(t => {
              const key = `${w.label}::${t}`;
              const st = release.tasks[key];
              if (st === "Done") return null;
              return (
                <div key={key} className="task-row urgent">
                  <span className="task-status-dot" style={{ background: STATUS_LABEL[st] }} />
                  <span className="task-text">{t}</span>
                  <div className="task-btns">
                    {STATUS.map(s => (
                      <button
                        key={s}
                        className={`task-btn${st === s ? " active" : ""}`}
                        style={st === s ? { background: STATUS_LABEL[s], color: "#0d0d0d" } : {}}
                        onClick={() => setStatus(key, s)}
                      >{s}</button>
                    ))}
                  </div>
                </div>
              );
            }))}
          </div>
        )}

        {WEEKS.map(w => (
          <div key={w.label} className="week-block">
            <div className="week-header">
              <span className="week-label">{w.label}</span>
              <span className="week-subtitle">{w.subtitle}</span>
            </div>
            {w.tasks.map(t => {
              const key = `${w.label}::${t}`;
              const st = release.tasks[key] || "Not Started";
              return (
                <div
                  key={key}
                  className="task-row"
                  style={{ background: STATUS_COLOURS[st] }}
                >
                  <span className="task-status-dot" style={{ background: STATUS_LABEL[st] }} />
                  <span className="task-text">{t}</span>
                  <div className="task-btns">
                    {STATUS.map(s => (
                      <button
                        key={s}
                        className={`task-btn${st === s ? " active" : ""}`}
                        style={st === s ? { background: STATUS_LABEL[s], color: "#0d0d0d" } : {}}
                        onClick={() => setStatus(key, s)}
                      >{s}</button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ReleaseTracker() {
  const [releases, setReleases] = usePersistedState("ardito-releases", SEED_RELEASES);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newDate, setNewDate] = useState("");

  function addRelease() {
    if (!newTitle.trim()) return;
    const r = buildBlankRelease(newTitle, newDate);
    r.artist = newArtist;
    setReleases(rs => [...rs, r]);
    setNewTitle(""); setNewArtist(""); setNewDate("");
    setShowAdd(false);
  }
  function updateRelease(updated) {
    setReleases(rs => rs.map(r => r.id === updated.id ? updated : r));
  }
  function deleteRelease(id) {
    setReleases(rs => rs.filter(r => r.id !== id));
  }

  return (
    <div className="tracker-wrap">
      <div className="roster-header">
        <h2 className="section-title">Release Tracker</h2>
        <button className="btn-add-artist" onClick={() => setShowAdd(s => !s)}>+ New release</button>
      </div>

      {showAdd && (
        <div className="artist-card add-form-card" style={{ marginBottom: 16 }}>
          <h3 className="form-title">New release</h3>
          <div className="edit-grid">
            <div className="edit-field">
              <label className="edit-label">Track / EP title</label>
              <input className="form-input" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            </div>
            <div className="edit-field">
              <label className="edit-label">Artist</label>
              <input className="form-input" value={newArtist} onChange={e => setNewArtist(e.target.value)} />
            </div>
            <div className="edit-field">
              <label className="edit-label">Release date</label>
              <input className="form-input" type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
            </div>
          </div>
          <div className="detail-actions">
            <button className="btn-edit" onClick={addRelease}>Create</button>
            <button className="btn-cancel" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      {releases.map(r => (
        <ReleaseCard key={r.id} release={r} onUpdate={updateRelease} onDelete={deleteRelease} />
      ))}
    </div>
  );
}
