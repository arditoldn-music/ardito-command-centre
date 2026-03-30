import { useState } from "react";
import { usePersistedState } from "../hooks/usePersistedState";

const TYPE_COLOURS = {
  // Post types
  "Ardito Explains": { bg: "#1a2e1a", label: "#a8d5a2" },
  "Hot Take":        { bg: "#0d0d0d", label: "#e05c5c" },
  "Video":           { bg: "#2a2010", label: "#d4b483" },
  "Recent Updates":  { bg: "#0d1b2a", label: "#7aabcf" },
  // Event types
  "Meeting":         { bg: "#1e1a00", label: "#f0c040" },
  "Release Date":    { bg: "#1a1a1a", label: "#f0ece4" },
  "Deadline":        { bg: "#2a0a0a", label: "#e05c5c" },
  "Other":           { bg: "#1a1a2e", label: "#a0a8d5" },
};

const SEED_EVENTS = [
  { id: "e1", title: "Omjine release day 🎉", type: "Release Date", date: "2026-04-10", notes: "Track goes live. Monitor streams, engage everywhere.", isEvent: true },
  { id: "e2", title: "Spotify pitch deadline — Omjine", type: "Deadline", date: "2026-03-13", notes: "Must be submitted 4 weeks before release.", isEvent: true },
];

const SEED_POSTS = [
  { id: 1, title: "Symphonic just acquired Distro Nation. Here's what it means for independent artists.", type: "Recent Updates", date: "2026-03-27", caption: "This week Symphonic — one of the bigger independent distributors out there — acquired Distro Nation, a platform that's been focused on YouTube monetisation and music distribution.\n\nWhy does this matter to you?\n\nBecause consolidation in the distribution space is happening fast. Distro Nation's whole thing was helping artists make money from YouTube Content ID — tracking when your music gets used in other people's videos and collecting those royalties. Symphonic buying them means that offering is now folded into a much bigger distribution network.\n\nA few things worth knowing: YouTube royalties are genuinely underused by most independent artists. If your distributor isn't set up with Content ID, you're leaving money on the table every single time someone uses your music in a video. That's passive income that stacks whether you're actively releasing or not.\n\nThe bigger picture: the distribution landscape is consolidating. DistroKid, TuneCore, Symphonic, Amuse — these platforms are getting bigger and more powerful. Which makes it more important than ever to actually understand what yours does and doesn't do for you, and whether it's the right fit for where you are.\n\nDoes your distributor have YouTube Content ID set up on your catalogue?\n#musicnews #musicdistribution #indieartist #youtuberoyalties #releasemanagement #londonmusic", format: "Single image" },
  { id: 2, title: "The music industry doesn't gatekeep talent. It gatekeeps information.", type: "Hot Take", date: "2026-03-29", caption: "The music industry doesn't gatekeep talent.\n\nIt gatekeeps information.\n\nGetting signed, getting playlisted, releasing properly, understanding your rights — none of it is actually that complicated once someone explains it to you. But that explanation has historically only been available to artists who could afford a manager, a lawyer, or a label deal.\n\nEveryone else just figures it out the hard way. Or doesn't figure it out at all.\n\nThat's what Ardito is here to change.\n#musicindustry #indieartist #releasemanagement #londonmusic #artistdevelopment", format: "Single image" },
  { id: 3, title: "London is one of the hardest cities in the world to break as an independent artist.", type: "Hot Take", date: "2026-04-01", caption: "London is one of the hardest cities in the world to break as an independent artist.\n\nAnd I don't think people talk about that enough.\n\nThe scene is incredible. The talent is everywhere. But the cost of living means most artists are working full time just to survive, let alone release music properly. Venues are closing. The algorithm doesn't care where you're from. And most of the advice online is written for Americans.\n\nIt's a lot.\n\nBut it also means that the artists who do figure it out here — who release properly, build a real strategy, and stay consistent — stand out. Because most people give up before they get there.\n\nThat's who Ardito is for. The ones who aren't giving up.\n#londonmusic #londonartist #indieartist #emergingartist #releasemanagement", format: "Carousel 3 slides" },
  { id: 4, title: "Stop releasing your music on a Friday", type: "Video", date: "2026-04-03", caption: "Everyone releases on a Friday — and I get it, that's what you're supposed to do.\n\nBut what that also means is you're competing with every major label, every hyped indie, and every artist who Googled \"best day to drop.\"\n\nFriday gets the most streams but it also gets the most noise. For artists at an early stage, mid-week can actually give your music more room to breathe — you're not drowning in the Friday pile.\n\nAnd look, if you're pitching to Spotify editorial properly, you're submitting four weeks before release anyway. The day you drop matters a lot less than the plan behind it.\n\nWhat does your release plan actually look like? DM us.\n#musicrelease #indieartist #spotifystrategy #releasemanagement #londonmusic", format: "Reel" },
  { id: 5, title: "What release management actually is (and why you probably need it)", type: "Ardito Explains", date: "2026-04-05", caption: "Most artists think releasing music means uploading it to a distributor and posting on the day.\n\nThat's the smallest part of it.\n\nRelease management is everything that happens before, during, and after your music goes live. The strategy, the timing, the pitching, the content, the follow-through. Done properly it's a 6-week campaign, not a single moment.\n\nThe artists who grow treat every release like a project. The ones who stay stuck treat it like an upload.\n\nThat's what we do at Ardito — we run the project so you can focus on the music.\n\nDM us about your next release.\n#releasemanagement #indieartist #musicrelease #londonmusic #artistdevelopment", format: "Carousel 4 slides" },
  { id: 6, title: "You get 500 characters to get on a Spotify playlist. Here's what to write.", type: "Video", date: "2026-04-08", caption: "When you submit to Spotify editorial, you get 500 characters to make your case.\n\nAnd most artists write something like \"it's a chill R&B track with emotional lyrics\" — and that's it.\n\nWhat actually works is being specific. Genre, mood, one or two similar artists, and crucially — the story behind the song. What does it feel like to listen to? When would someone put this on?\n\nReal humans read every single one of these pitches, and they're trying to match songs to moments. Give them that context.\n\nAnd submit at least four weeks before your release date. Not the week before.\n\nScreenshot this for your next release.\n#spotifyeditorial #musicrelease #indieartist #spotifystrategy #releasemanagement", format: "Reel" },
  { id: 7, title: "DistroKid vs TuneCore vs Amuse — the honest breakdown", type: "Ardito Explains", date: "2026-04-10", caption: "One of the most common questions we get: which distributor should I use?\n\nHonest answer — it depends on how you release.\n\nDistroKid: flat annual fee, unlimited releases. Best if you're putting out music regularly and want simplicity.\n\nTuneCore: pay per release. Better if you release less frequently and want stronger publishing admin support.\n\nAmuse: has a free tier. Good starting point, less ideal as you grow and need faster distribution speeds.\n\nAll three get your music on Spotify, Apple Music, and the rest. The difference is in the detail — and the detail matters more than most people think.\n\nAny questions about which is right for you? DM us.\n#musicdistribution #distrokid #indieartist #releasemanagement #londonmusic", format: "Carousel 5 slides" },
  { id: 8, title: "Your city does not owe you a career", type: "Video", date: "2026-04-13", caption: "I know this might be an unpopular thing to say, but building a local fanbase as your main strategy in 2026 genuinely isn't enough.\n\nThe artists building real careers right now have listeners in cities they've never been to. Because the algorithm doesn't care where you're from. Playlists don't care.\n\nThe way Spotify's recommendation engine works, it's matching your sound to listeners based on what they already love — and that can happen anywhere in the world.\n\nYour sound can travel. Your postcode can't.\n\nSo instead of trying to be the biggest artist in your city, think about who globally actually wants to hear what you're making — because that audience exists.\n\nCheck your Spotify for Artists — where are your listeners actually coming from?\n#spotifystrategy #indieartist #londonmusic #musicmarketing #releasemanagement", format: "Reel" },
  { id: 9, title: "Your cover art is losing you streams before anyone presses play.", type: "Hot Take", date: "2026-04-15", caption: "Your cover art is losing you streams before anyone presses play.\n\nI know that's not what you want to hear. But I've seen it too many times.\n\nAn artist with genuinely good music — mixed well, released properly — and the streams flatline. Then you look at the cover and it's a blurry photo from their camera roll with a font that came free with Canva.\n\nHere's the thing: your visual identity is your first impression. On Spotify, on Instagram, in a playlist — people decide in under a second whether to tap or scroll past.\n\nThe artists who treat branding like part of the release — because it is — are the ones where everything clicks. The music lands differently when it looks the part.\n\nWhat does your cover art say about you before someone even hits play?\n#artistbranding #indieartist #musicrelease #londonmusic #releasemanagement", format: "Single image" },
  { id: 10, title: "What is SubmitHub and should you use it?", type: "Video", date: "2026-04-17", caption: "SubmitHub is a platform where you can pitch your music directly to independent playlist curators, blogs, and influencers.\n\nYou buy credits, you submit your track, and curators have 48 hours to respond — and they have to give you feedback if they pass.\n\nNow, acceptance rates are low. You will get a lot of nos. But the feedback is actually useful, especially when you're early on and still figuring out how your music is landing.\n\nAnd even one playlist add from a curator with a decent following can make a real difference to your numbers.\n\nKey things: submit two to three weeks before your release date, write a proper pitch rather than just copying your bio, and be specific about who your music is for.\n\nHave you used SubmitHub before? Drop your experience below.\n#submithub #playlistpitching #indieartist #musicrelease #spotifystrategy", format: "Reel" },
  { id: 11, title: "Your Spotify for Artists profile matters more than you think.", type: "Ardito Explains", date: "2026-04-20", caption: "Your Spotify for Artists profile is the first thing a playlist curator, A&R, or new listener sees when they find you.\n\nAnd most artists leave it half empty.\n\nNo photo. No bio. No Artist Pick. Canvas not set up. Concerts section blank even when they're gigging every weekend.\n\nIt signals an unserious artist before anyone has heard a note.\n\nClaiming and filling in your profile takes about 20 minutes. It's one of the easiest wins in music and most people never do it.\n\nGo do it today.\n#spotifyforartists #indieartist #releasemanagement #musicmarketing #londonmusic", format: "Carousel 4 slides" },
  { id: 12, title: "Waiting until it's perfect is a release strategy. Just not a good one.", type: "Video", date: "2026-04-22", caption: "Waiting until your music is perfect before releasing it is a choice — and I completely understand the instinct. But it's costing you.\n\nEvery week you sit on a track, someone else in your genre is putting something out. Consistency is one of the things that actually helps with algorithmic visibility — the more you release, the more data Spotify has to work with when recommending your music.\n\nYour first release isn't going to be perfect. Your fifth probably won't be either. But every single one builds your catalogue, grows your audience, and gives the algorithm more to work with.\n\nThe track sitting in your drafts right now is doing nothing for anyone.\n\nRelease the thing.\n\nWhat's sitting in your drafts right now?\n#musicrelease #indieartist #spotifystrategy #artistdevelopment #londonmusic", format: "Reel" },
  { id: 13, title: "A label deal doesn't mean someone believes in you.", type: "Hot Take", date: "2026-04-24", caption: "Most artists think a label deal means someone believes in them.\n\nSometimes it does. A lot of the time it means someone sees an opportunity to own your music for the next 15 years.\n\nA 360 deal means the label takes a cut of your live income, merch, and sync — not just your music. Recoupable advances aren't free money — you pay them back from your own royalties before you see a penny. And owning your masters matters more than it sounds.\n\nI'm not anti-label. Some deals make complete sense at the right stage. But most artists sign without understanding what they're actually agreeing to.\n\nYou don't need a label to build a real career in 2026. But if you want one — know what you're walking into.\n#musicindustry #labeldeals #indieartist #artistdevelopment #londonmusic", format: "Carousel 4 slides" },
  { id: 14, title: "The first 48 hours after release matter more than you think", type: "Video", date: "2026-04-27", caption: "The moment your song goes live, Spotify starts watching.\n\nYour track automatically goes into your followers' Release Radar — and the algorithm is paying attention to what happens next. If people are saving it, adding it to playlists, listening all the way through — that's the signal Spotify needs to push it further.\n\nSo release week is not the time to go quiet on socials. That's when you need to be most active. Post, share, text people, ask your close ones to save it not just stream it.\n\nA save carries way more algorithmic weight than ten passive plays.\n\nAsk your fans to SAVE your track, not just stream it.\n#spotifystrategy #musicrelease #indieartist #releasemanagement #londonmusic", format: "Reel" },
  { id: 15, title: "The gender gap in streaming data nobody talks about.", type: "Hot Take", date: "2026-04-29", caption: "The gender gap in streaming isn't just about who gets signed.\n\nIt's baked into the algorithm.\n\nStudies consistently show that female and non-binary artists receive fewer algorithmic recommendations than male artists — even at equivalent streaming numbers. The algorithm is trained on historical data. Historical data skews heavily male. The result is a system that quietly disadvantages artists before they've even released anything.\n\nI wrote my BA dissertation on gender and identity in pop music. This stuff has been on my radar for years. And it's one of the reasons the way we approach release strategy at Ardito isn't one-size-fits-all.\n\nKnowing this doesn't fix it. But it changes how you strategise.\n#womeninmusic #musicindustry #indieartist #genderequality #releasemanagement", format: "Carousel 4 slides" },
  { id: 16, title: "Why your skip rate is quietly killing your music", type: "Video", date: "2026-05-01", caption: "Most artists obsess over stream counts.\n\nBut the metric that's actually deciding whether Spotify pushes your music further is your skip rate — specifically, how many people are skipping before the 30-second mark.\n\nBecause Spotify only counts a stream after 30 seconds. And if people are skipping early, the algorithm reads that as a signal that your song isn't connecting — and it stops recommending it.\n\nSo your first 30 seconds are the most important 30 seconds of your whole track. The hook has to work. The intro cannot be too slow. This is why so many artists are starting with the chorus now.\n\nCheck your skip rate in Spotify for Artists. What does yours say?\n#spotifystrategy #musicrelease #indieartist #spotifyforartists #releasemanagement", format: "Reel" },
  { id: 17, title: "I wrote my dissertation on masculinity in pop music. Here's what stuck with me.", type: "Hot Take", date: "2026-05-04", caption: "I wrote my BA dissertation on masculinity in pop music.\n\nIt started as an academic exercise. It ended up completely changing how I think about the music industry.\n\nThe way an artist presents their identity — their gender, their image, their persona — affects everything. Playlist placement. Press coverage. Fan perception. Brand deals. It's not separate from the music. It's woven into every part of how a release lands.\n\nMost release strategies treat this as an afterthought, if they think about it at all.\n\nI don't think that's good enough. And it's part of why Ardito approaches release management the way we do — because who you are as an artist is as important as what you're releasing.\n#musicindustry #artistidentity #indieartist #womeninmusic #releasemanagement", format: "Carousel 3 slides" },
  { id: 18, title: "What a pre-save actually does (and what it doesn't)", type: "Ardito Explains", date: "2026-05-06", caption: "A pre-save doesn't stream your music early. It doesn't guarantee playlist placement. It doesn't go viral on its own.\n\nSo why does it matter?\n\nBecause on release day, Spotify's algorithm looks at how many people saved your track in the first 24–48 hours. A pre-save campaign converts directly into day-one saves — which tells the algorithm your music is worth pushing.\n\nIt's not magic. But it's one of the only tools an independent artist has to influence what happens on release day before the release actually happens.\n\nThe artists who skip it are leaving the most important window completely empty.\n\nWant the full release checklist? DM us \"checklist\" and we'll send it over.\n#presave #musicrelease #spotifystrategy #indieartist #releasemanagement", format: "Carousel 5 slides" },
  { id: 19, title: "Nobody is coming to save your music career", type: "Video", date: "2026-05-08", caption: "A lot of artists are waiting.\n\nWaiting for a label to find them, for a playlist to pick them up out of nowhere, for someone to notice. And look, those things can happen — but they happen to artists who are already doing the work, not instead of it.\n\nThe independent music landscape right now gives artists more tools than ever to build something real without a label. But that also means the work is yours. Nobody is going to do your pitching, build your release strategy, or grow your audience for you — unless you actively put that in place.\n\nThe artists who make it aren't luckier. They just started earlier.\n\nWhat's the one thing you've been putting off? Tell us below.\n#musicindustry #indieartist #artistdevelopment #releasemanagement #londonmusic", format: "Reel" },
  { id: 20, title: "London venues worth playing before 1k followers.", type: "Hot Take", date: "2026-05-11", caption: "You don't need 1k followers to play a good room in London.\n\nYou need a good EPK and the nerve to send the email.\n\nWindmill Brixton. The Sebright Arms. George Tavern. Oslo Hackney. These are the rooms where London's music community actually shows up — not just fans, but industry too. Playing them early builds your live presence, your reputation, and your confidence in a way that no amount of streaming will.\n\nMost small venues accept direct bookings. No agent needed. A decent one-pager, some links, and a genuine message is enough to get a support slot.\n\nBuild your live presence before you need it. The artists who blow up online almost always have roots in a real scene.\n#londonmusic #livemusic #indieartist #londongigs #emergingartist", format: "Carousel 4 slides" },
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  // 0=Mon, 1=Tue... 6=Sun
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}
function suggestTime(dayOfWeek) {
  return dayOfWeek === 0 || dayOfWeek === 6 ? "11:00" : "18:00";
}

const EVENT_TYPES = ["Meeting", "Release Date", "Deadline", "Other"];
const POST_TYPES = ["Ardito Explains", "Hot Take", "Video", "Recent Updates"];
const ALL_TYPES = [...POST_TYPES, ...EVENT_TYPES];

const BLANK_FORM = { title: "", type: "Meeting", date: "", notes: "", isEvent: true };

export default function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [posts, setPosts] = useState(SEED_POSTS);
  const [events, setEvents] = usePersistedState("ardito-events", SEED_EVENTS);
  const [expanded, setExpanded] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(BLANK_FORM);
  const [formDay, setFormDay] = useState(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthStr = `${year}-${String(month + 1).padStart(2, "0")}`;
  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  }

  function getItemsForDay(day) {
    const d = `${monthStr}-${String(day).padStart(2, "0")}`;
    return [
      ...events.filter(e => e.date === d),
      ...posts.filter(p => p.date === d),
    ];
  }

  function handleDragStart(id) { setDragging(id); }
  function handleDragOver(e, day) { e.preventDefault(); setDragOver(day); }
  function handleDrop(day) {
    if (!dragging) return;
    const newDate = `${monthStr}-${String(day).padStart(2, "0")}`;
    const dow = new Date(year, month, day).getDay();
    const time = suggestTime(dow);
    setSuggestion({ postId: dragging, newDate, time });
    setDragging(null);
    setDragOver(null);
  }
  function confirmSuggestion() {
    setPosts(ps => ps.map(p => p.id === suggestion.postId ? { ...p, date: suggestion.newDate } : p));
    setEvents(es => es.map(e => e.id === suggestion.postId ? { ...e, date: suggestion.newDate } : e));
    setSuggestion(null);
  }

  function openAddForm(day) {
    const d = `${monthStr}-${String(day).padStart(2, "0")}`;
    setForm({ ...BLANK_FORM, date: d });
    setFormDay(day);
    setShowForm(true);
  }

  function handleFormSave() {
    if (!form.title.trim()) return;
    const isPost = POST_TYPES.includes(form.type);
    const newItem = { ...form, id: `custom-${Date.now()}`, isEvent: !isPost };
    if (isPost) setPosts(ps => [...ps, newItem]);
    else setEvents(es => [...es, newItem]);
    setShowForm(false);
    setForm(BLANK_FORM);
  }

  const cols = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  return (
    <div className="cal-wrap">
      <div className="cal-header">
        <button className="cal-nav" onClick={prevMonth}>←</button>
        <h2 className="cal-title">{MONTH_NAMES[month]} {year}</h2>
        <button className="cal-nav" onClick={nextMonth}>→</button>
      </div>

      <div className="cal-legend">
        {ALL_TYPES.map(t => {
          const col = TYPE_COLOURS[t];
          return (
            <span key={t} className="legend-item">
              <span className="legend-dot" style={{ background: col.label }} />
              {t}
            </span>
          );
        })}
      </div>

      <div className="cal-grid">
        {cols.map(c => <div key={c} className="cal-dow">{c}</div>)}
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} className="cal-cell empty" />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const items = getItemsForDay(day);
          const isOver = dragOver === day;
          return (
            <div
              key={day}
              className={`cal-cell${isOver ? " drag-over" : ""}`}
              onDragOver={e => handleDragOver(e, day)}
              onDrop={() => handleDrop(day)}
            >
              <div className="cal-day-row">
                <span className="cal-day-num">{day}</span>
                <button className="add-event-btn" onClick={() => openAddForm(day)} title="Add event or post">+</button>
              </div>
              {items.map(item => {
                const col = TYPE_COLOURS[item.type] || TYPE_COLOURS["Other"];
                const isExp = expanded === item.id;
                return (
                  <div
                    key={item.id}
                    className={`post-card${isExp ? " expanded" : ""}${item.isEvent ? " event-card" : ""}`}
                    style={{ background: col.bg, borderLeft: `3px solid ${col.label}` }}
                    draggable
                    onDragStart={() => handleDragStart(item.id)}
                    onClick={() => setExpanded(isExp ? null : item.id)}
                  >
                    <span className="post-type" style={{ color: col.label }}>{item.type}</span>
                    <p className="post-title">{item.title}</p>
                    {isExp && (
                      <div className="post-detail">
                        {item.isEvent
                          ? <p className="post-caption">{item.notes || "No notes."}</p>
                          : <>
                              <p className="post-format">{item.format}</p>
                              <p className="post-caption">{item.caption?.slice(0, 200)}…</p>
                            </>
                        }
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {suggestion && (
        <div className="suggestion-overlay">
          <div className="suggestion-box">
            <p>Move to <strong>{suggestion.newDate}</strong>?</p>
            <p className="suggestion-time">Suggested time: <strong>{suggestion.time}</strong></p>
            <div className="suggestion-btns">
              <button className="btn-confirm" onClick={confirmSuggestion}>Confirm</button>
              <button className="btn-cancel" onClick={() => setSuggestion(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="suggestion-overlay">
          <div className="suggestion-box form-box">
            <h3 className="form-title">Add to calendar</h3>
            <select
              className="form-select"
              value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value, isEvent: !POST_TYPES.includes(e.target.value) }))}
            >
              <optgroup label="Events">
                {EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
              </optgroup>
              <optgroup label="Posts">
                {POST_TYPES.map(t => <option key={t}>{t}</option>)}
              </optgroup>
            </select>
            <input
              className="form-input"
              placeholder="Title"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            />
            <input
              className="form-input"
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            />
            <textarea
              className="form-input form-textarea"
              placeholder="Notes (optional)"
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            />
            <div className="suggestion-btns">
              <button className="btn-confirm" onClick={handleFormSave}>Save</button>
              <button className="btn-cancel" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
