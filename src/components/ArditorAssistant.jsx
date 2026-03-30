import { useState, useRef, useEffect } from "react";

const KNOWLEDGE_BASE_DEFAULT = [
  {
    id: 1,
    label: "6-week release checklist",
    content: `Week 6: Upload to distributor, assign ISRCs, finalise artwork (3000x3000px), set release date, confirm metadata and splits, register with PRS/PRO.
Week 5: Set up pre-save link (Feature.fm or Toneden), submit Spotify editorial pitch (4 weeks before release, 500 chars, specific and story-led), set up Spotify Canvas, update Apple Music and Amazon Music profiles, update EPK and bio, pin pre-save in bio.
Week 4: Lock content calendar, film 10-15 short-form clips for TikTok/Reels/Shorts, post first pre-release content, create themed Spotify playlist.
Week 3: Submit to SubmitHub, pitch 5-10 independent playlist curators directly, send personal outreach emails, write press release, plan YouTube Shorts.
Week 2: Increase posting frequency, push pre-save harder, pitch curators, send newsletter, prepare release day assets.
Week 1: Confirm track live on all DSPs, schedule release day posts, brief close contacts to SAVE not stream, prepare story content.
Release week: Post across all channels, monitor streams and saves in Spotify for Artists, engage with every comment and share, check Release Radar delivery.
Post-release: Pitch Apple Music editorial, submit to Amazon playlists, review Spotify data (saves, skip rate, listener locations), check DSP payouts, follow up with press/curators, schedule next release.`,
  },
  {
    id: 2,
    label: "Spotify editorial pitch guide",
    content: `You get 500 characters to pitch your track to Spotify editorial. Submit at least 4 weeks before release date — not after.
What works: be specific about genre and mood, name 1-2 similar artists, tell the story behind the song, describe when and where someone would listen to it. Real humans read every pitch and match songs to moments — give them that context.
What doesn't work: vague descriptions like "emotional pop track", copying your bio, being too formal.
Key metrics Spotify looks at: saves, completion rate, skip rate (especially before 30 seconds), playlist adds, Release Radar engagement.`,
  },
  {
    id: 3,
    label: "Distributor comparison",
    content: `DistroKid: flat annual fee (~$22.99/year), unlimited releases, fast delivery, splits available, no free tier. Best for prolific artists releasing frequently.
TuneCore: pay per release. Better publishing admin support. Good for artists releasing less frequently who want stronger rights management.
Amuse: free tier available but slower delivery. Good starting point, less ideal as you grow.
All three deliver to Spotify, Apple Music, Amazon, TikTok, YouTube Music and more. Key difference is in royalty collection, publishing admin, and YouTube Content ID setup — check whether your distributor handles Content ID as YouTube royalties are underused by most independent artists.`,
  },
  {
    id: 4,
    label: "Ardito methodology",
    content: `Ardito is a release management and artist development agency for early-stage independent artists (typically under 5k followers).
Core belief: the music industry doesn't gatekeep talent, it gatekeeps information. Our job is to bridge that gap.
Approach: relationship-first, honest positioning, no overclaiming. We treat every release like a 6-week campaign, not a single upload moment.
We think about identity as part of strategy — how an artist presents their gender, image and persona affects playlist placement, press coverage and fan perception. Release strategy is never one-size-fits-all.
Key services: release management, artist development, content strategy, distribution guidance, playlist pitching, Spotify editorial submission.`,
  },
  {
    id: 5,
    label: "Pre-save strategy",
    content: `A pre-save means someone authorises their Spotify account to automatically save your track the moment it drops. It doesn't stream early.
Why it matters: Spotify's algorithm watches how many people save your track in the first 24-48 hours. Pre-saves convert directly into day-one saves, which signals to the algorithm that your music is worth pushing further.
Setup: use Feature.fm or Toneden. Get your release approved by your distributor first, then generate the pre-save link. Start pushing 3-4 weeks before release.
A save carries far more algorithmic weight than a passive stream. Ask fans to save, not just listen.`,
  },
];

const SYSTEM_PROMPT = (kb) => `You are the Ardito Assistant — a private internal search tool for Ardito, a release management and artist development agency. You help Laura (the founder) with specific, practical next steps for artist releases and development.

You answer based on Ardito's knowledge base below. Be specific, direct and actionable. Never give generic advice — always tie your answer to the actual situation described. Keep responses concise but complete.

If the question is outside the knowledge base, say so clearly and suggest what information would help you answer better.

ARDITO KNOWLEDGE BASE:
${kb.map(k => `[${k.label}]\n${k.content}`).join("\n\n")}`;

export default function ArditorAssistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi Laura — describe a situation or ask a question and I'll pull the most relevant guidance from Ardito's knowledge base. Example: \"Artist has a release in 3 weeks, no pre-save set up yet.\"" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [kb, setKb] = useState(KNOWLEDGE_BASE_DEFAULT);
  const [showKb, setShowKb] = useState(false);
  const [newKbLabel, setNewKbLabel] = useState("");
  const [newKbContent, setNewKbContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT(kb),
          messages: [...messages.filter(m => m.role !== "assistant" || messages.indexOf(m) > 0), userMsg]
            .filter(m => m.role === "user" || m.role === "assistant")
            .slice(-10),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, something went wrong.";
      setMessages(m => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Connection error — check your API key is saved in Replit Secrets as ANTHROPIC_API_KEY." }]);
    }
    setLoading(false);
  }

  function addKb() {
    if (!newKbLabel.trim() || !newKbContent.trim()) return;
    setKb(k => [...k, { id: Date.now(), label: newKbLabel, content: newKbContent }]);
    setNewKbLabel(""); setNewKbContent("");
  }

  function deleteKb(id) { setKb(k => k.filter(i => i.id !== id)); }

  function updateKb(id, field, val) {
    setKb(k => k.map(i => i.id === id ? { ...i, [field]: val } : i));
  }

  return (
    <div className="assistant-wrap">
      <div className="roster-header">
        <h2 className="section-title">Ardito Assistant</h2>
        <button className="btn-add-artist" onClick={() => setShowKb(s => !s)}>
          {showKb ? "← Back to chat" : "Edit knowledge base"}
        </button>
      </div>

      {!showKb && (
        <>
          <div className="chat-window">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                <div className="chat-bubble">{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-msg assistant">
                <div className="chat-bubble chat-loading">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-row">
            <textarea
              className="chat-input"
              placeholder="Describe the situation… e.g. 'Artist releasing in 2 weeks, no pre-save, 800 followers on Spotify'"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              rows={2}
            />
            <button className="btn-send" onClick={sendMessage} disabled={loading || !input.trim()}>
              {loading ? "…" : "Send"}
            </button>
          </div>
        </>
      )}

      {showKb && (
        <div className="kb-wrap">
          <p className="kb-intro">These documents power the assistant. Add, edit or remove entries to update what it knows.</p>
          {kb.map(item => (
            <div key={item.id} className="kb-card">
              {editingId === item.id ? (
                <>
                  <input className="form-input" value={item.label} onChange={e => updateKb(item.id, "label", e.target.value)} style={{ marginBottom: 8 }} />
                  <textarea className="form-input form-textarea" style={{ minHeight: 120 }} value={item.content} onChange={e => updateKb(item.id, "content", e.target.value)} />
                  <div className="detail-actions" style={{ marginTop: 8 }}>
                    <button className="btn-edit" onClick={() => setEditingId(null)}>Done</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="kb-card-top">
                    <span className="kb-label">{item.label}</span>
                    <div className="detail-actions" style={{ margin: 0 }}>
                      <button className="btn-edit" onClick={() => setEditingId(item.id)}>Edit</button>
                      <button className="btn-delete" onClick={() => deleteKb(item.id)}>Remove</button>
                    </div>
                  </div>
                  <p className="kb-preview">{item.content.slice(0, 120)}…</p>
                </>
              )}
            </div>
          ))}

          <div className="kb-add">
            <h3 className="form-title" style={{ fontSize: 16, marginBottom: 12 }}>Add new document</h3>
            <div className="edit-field" style={{ marginBottom: 10 }}>
              <label className="edit-label">Label</label>
              <input className="form-input" value={newKbLabel} onChange={e => setNewKbLabel(e.target.value)} placeholder="e.g. Artist onboarding framework" />
            </div>
            <div className="edit-field" style={{ marginBottom: 12 }}>
              <label className="edit-label">Content</label>
              <textarea className="form-input form-textarea" style={{ minHeight: 120 }} value={newKbContent} onChange={e => setNewKbContent(e.target.value)} placeholder="Paste your document or notes here…" />
            </div>
            <button className="btn-edit" onClick={addKb}>Add to knowledge base</button>
          </div>
        </div>
      )}
    </div>
  );
}
