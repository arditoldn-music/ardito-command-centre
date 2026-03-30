import { useState } from "react";

const TYPE_COLOURS = {
  "Ardito Explains": { bg: "#1a2e1a", label: "#a8d5a2" },
  "Hot Take":        { bg: "#0d0d0d", label: "#e05c5c" },
  "Video":           { bg: "#2a2010", label: "#d4b483" },
  "Recent Updates":  { bg: "#0d1b2a", label: "#7aabcf" },
};

const ALL_POSTS = [
  {
    id: 1, title: "Symphonic just acquired Distro Nation. Here's what it means for independent artists.",
    type: "Recent Updates", date: "2026-03-27", format: "Single image", series: "Recent Updates in Music", topic: "Distribution",
    caption: "This week Symphonic — one of the bigger independent distributors out there — acquired Distro Nation, a platform that's been focused on YouTube monetisation and music distribution.\n\nWhy does this matter to you?\n\nBecause consolidation in the distribution space is happening fast. Distro Nation's whole thing was helping artists make money from YouTube Content ID — tracking when your music gets used in other people's videos and collecting those royalties. Symphonic buying them means that offering is now folded into a much bigger distribution network.\n\nA few things worth knowing: YouTube royalties are genuinely underused by most independent artists. If your distributor isn't set up with Content ID, you're leaving money on the table every single time someone uses your music in a video. That's passive income that stacks whether you're actively releasing or not.\n\nThe bigger picture: the distribution landscape is consolidating. DistroKid, TuneCore, Symphonic, Amuse — these platforms are getting bigger and more powerful. Which makes it more important than ever to actually understand what yours does and doesn't do for you, and whether it's the right fit for where you are.\n\nDoes your distributor have YouTube Content ID set up on your catalogue?",
    hashtags: "#musicnews #musicdistribution #indieartist #youtuberoyalties #releasemanagement #londonmusic",
  },
  {
    id: 2, title: "The music industry doesn't gatekeep talent. It gatekeeps information.",
    type: "Hot Take", date: "2026-03-29", format: "Single image", series: "Hot Takes", topic: "Industry",
    caption: "The music industry doesn't gatekeep talent.\n\nIt gatekeeps information.\n\nGetting signed, getting playlisted, releasing properly, understanding your rights — none of it is actually that complicated once someone explains it to you. But that explanation has historically only been available to artists who could afford a manager, a lawyer, or a label deal.\n\nEveryone else just figures it out the hard way. Or doesn't figure it out at all.\n\nThat's what Ardito is here to change.",
    hashtags: "#musicindustry #indieartist #releasemanagement #londonmusic #artistdevelopment",
  },
  {
    id: 3, title: "London is one of the hardest cities in the world to break as an independent artist.",
    type: "Hot Take", date: "2026-04-01", format: "Carousel 3 slides", series: "London Lens", topic: "London",
    caption: "London is one of the hardest cities in the world to break as an independent artist.\n\nAnd I don't think people talk about that enough.\n\nThe scene is incredible. The talent is everywhere. But the cost of living means most artists are working full time just to survive, let alone release music properly. Venues are closing. The algorithm doesn't care where you're from. And most of the advice online is written for Americans.\n\nIt's a lot.\n\nBut it also means that the artists who do figure it out here — who release properly, build a real strategy, and stay consistent — stand out. Because most people give up before they get there.\n\nThat's who Ardito is for. The ones who aren't giving up.",
    hashtags: "#londonmusic #londonartist #indieartist #emergingartist #releasemanagement",
  },
  {
    id: 4, title: "Stop releasing your music on a Friday",
    type: "Video", date: "2026-04-03", format: "Reel", series: "Hot Takes", topic: "Release Strategy",
    caption: "Everyone releases on a Friday — and I get it, that's what you're supposed to do.\n\nBut what that also means is you're competing with every major label, every hyped indie, and every artist who Googled \"best day to drop.\"\n\nFriday gets the most streams but it also gets the most noise. For artists at an early stage, mid-week can actually give your music more room to breathe — you're not drowning in the Friday pile.\n\nAnd look, if you're pitching to Spotify editorial properly, you're submitting four weeks before release anyway. The day you drop matters a lot less than the plan behind it.\n\nWhat does your release plan actually look like? DM us.",
    hashtags: "#musicrelease #indieartist #spotifystrategy #releasemanagement #londonmusic",
  },
  {
    id: 5, title: "What release management actually is (and why you probably need it)",
    type: "Ardito Explains", date: "2026-04-05", format: "Carousel 4 slides", series: "Ardito Explains", topic: "Release Management",
    caption: "Most artists think releasing music means uploading it to a distributor and posting on the day.\n\nThat's the smallest part of it.\n\nRelease management is everything that happens before, during, and after your music goes live. The strategy, the timing, the pitching, the content, the follow-through. Done properly it's a 6-week campaign, not a single moment.\n\nThe artists who grow treat every release like a project. The ones who stay stuck treat it like an upload.\n\nThat's what we do at Ardito — we run the project so you can focus on the music.\n\nDM us about your next release.",
    hashtags: "#releasemanagement #indieartist #musicrelease #londonmusic #artistdevelopment",
  },
  {
    id: 6, title: "You get 500 characters to get on a Spotify playlist. Here's what to write.",
    type: "Video", date: "2026-04-08", format: "Reel", series: "Ardito Explains", topic: "Spotify",
    caption: "When you submit to Spotify editorial, you get 500 characters to make your case.\n\nAnd most artists write something like \"it's a chill R&B track with emotional lyrics\" — and that's it.\n\nWhat actually works is being specific. Genre, mood, one or two similar artists, and crucially — the story behind the song. What does it feel like to listen to? When would someone put this on?\n\nReal humans read every single one of these pitches, and they're trying to match songs to moments. Give them that context.\n\nAnd submit at least four weeks before your release date. Not the week before.\n\nScreenshot this for your next release.",
    hashtags: "#spotifyeditorial #musicrelease #indieartist #spotifystrategy #releasemanagement",
  },
  {
    id: 7, title: "DistroKid vs TuneCore vs Amuse — the honest breakdown",
    type: "Ardito Explains", date: "2026-04-10", format: "Carousel 5 slides", series: "Ardito Explains", topic: "Distribution",
    caption: "One of the most common questions we get: which distributor should I use?\n\nHonest answer — it depends on how you release.\n\nDistroKid: flat annual fee, unlimited releases. Best if you're putting out music regularly and want simplicity.\n\nTuneCore: pay per release. Better if you release less frequently and want stronger publishing admin support.\n\nAmuse: has a free tier. Good starting point, less ideal as you grow and need faster distribution speeds.\n\nAll three get your music on Spotify, Apple Music, and the rest. The difference is in the detail — and the detail matters more than most people think.\n\nAny questions about which is right for you? DM us.",
    hashtags: "#musicdistribution #distrokid #indieartist #releasemanagement #londonmusic",
  },
  {
    id: 8, title: "Your city does not owe you a career",
    type: "Video", date: "2026-04-13", format: "Reel", series: "Hot Takes", topic: "Streaming",
    caption: "I know this might be an unpopular thing to say, but building a local fanbase as your main strategy in 2026 genuinely isn't enough.\n\nThe artists building real careers right now have listeners in cities they've never been to. Because the algorithm doesn't care where you're from. Playlists don't care.\n\nThe way Spotify's recommendation engine works, it's matching your sound to listeners based on what they already love — and that can happen anywhere in the world.\n\nYour sound can travel. Your postcode can't.\n\nSo instead of trying to be the biggest artist in your city, think about who globally actually wants to hear what you're making — because that audience exists.\n\nCheck your Spotify for Artists — where are your listeners actually coming from?",
    hashtags: "#spotifystrategy #indieartist #londonmusic #musicmarketing #releasemanagement",
  },
  {
    id: 9, title: "Your cover art is losing you streams before anyone presses play.",
    type: "Hot Take", date: "2026-04-15", format: "Single image", series: "Hot Takes", topic: "Branding",
    caption: "Your cover art is losing you streams before anyone presses play.\n\nI know that's not what you want to hear. But I've seen it too many times.\n\nAn artist with genuinely good music — mixed well, released properly — and the streams flatline. Then you look at the cover and it's a blurry photo from their camera roll with a font that came free with Canva.\n\nHere's the thing: your visual identity is your first impression. On Spotify, on Instagram, in a playlist — people decide in under a second whether to tap or scroll past.\n\nThe artists who treat branding like part of the release — because it is — are the ones where everything clicks. The music lands differently when it looks the part.\n\nWhat does your cover art say about you before someone even hits play?",
    hashtags: "#artistbranding #indieartist #musicrelease #londonmusic #releasemanagement",
  },
  {
    id: 10, title: "What is SubmitHub and should you use it?",
    type: "Video", date: "2026-04-17", format: "Reel", series: "Ardito Explains", topic: "Playlisting",
    caption: "SubmitHub is a platform where you can pitch your music directly to independent playlist curators, blogs, and influencers.\n\nYou buy credits, you submit your track, and curators have 48 hours to respond — and they have to give you feedback if they pass.\n\nNow, acceptance rates are low. You will get a lot of nos. But the feedback is actually useful, especially when you're early on and still figuring out how your music is landing.\n\nAnd even one playlist add from a curator with a decent following can make a real difference to your numbers.\n\nKey things: submit two to three weeks before your release date, write a proper pitch rather than just copying your bio, and be specific about who your music is for.\n\nHave you used SubmitHub before? Drop your experience below.",
    hashtags: "#submithub #playlistpitching #indieartist #musicrelease #spotifystrategy",
  },
  {
    id: 11, title: "Your Spotify for Artists profile matters more than you think.",
    type: "Ardito Explains", date: "2026-04-20", format: "Carousel 4 slides", series: "Ardito Explains", topic: "Spotify",
    caption: "Your Spotify for Artists profile is the first thing a playlist curator, A&R, or new listener sees when they find you.\n\nAnd most artists leave it half empty.\n\nNo photo. No bio. No Artist Pick. Canvas not set up. Concerts section blank even when they're gigging every weekend.\n\nIt signals an unserious artist before anyone has heard a note.\n\nClaiming and filling in your profile takes about 20 minutes. It's one of the easiest wins in music and most people never do it.\n\nGo do it today.",
    hashtags: "#spotifyforartists #indieartist #releasemanagement #musicmarketing #londonmusic",
  },
  {
    id: 12, title: "Waiting until it's perfect is a release strategy. Just not a good one.",
    type: "Video", date: "2026-04-22", format: "Reel", series: "Hot Takes", topic: "Mindset",
    caption: "Waiting until your music is perfect before releasing it is a choice — and I completely understand the instinct. But it's costing you.\n\nEvery week you sit on a track, someone else in your genre is putting something out. Consistency is one of the things that actually helps with algorithmic visibility — the more you release, the more data Spotify has to work with when recommending your music.\n\nYour first release isn't going to be perfect. Your fifth probably won't be either. But every single one builds your catalogue, grows your audience, and gives the algorithm more to work with.\n\nThe track sitting in your drafts right now is doing nothing for anyone.\n\nRelease the thing.\n\nWhat's sitting in your drafts right now?",
    hashtags: "#musicrelease #indieartist #spotifystrategy #artistdevelopment #londonmusic",
  },
  {
    id: 13, title: "A label deal doesn't mean someone believes in you.",
    type: "Hot Take", date: "2026-04-24", format: "Carousel 4 slides", series: "Hot Takes", topic: "Industry",
    caption: "Most artists think a label deal means someone believes in them.\n\nSometimes it does. A lot of the time it means someone sees an opportunity to own your music for the next 15 years.\n\nA 360 deal means the label takes a cut of your live income, merch, and sync — not just your music. Recoupable advances aren't free money — you pay them back from your own royalties before you see a penny. And owning your masters matters more than it sounds.\n\nI'm not anti-label. Some deals make complete sense at the right stage. But most artists sign without understanding what they're actually agreeing to.\n\nYou don't need a label to build a real career in 2026. But if you want one — know what you're walking into.",
    hashtags: "#musicindustry #labeldeals #indieartist #artistdevelopment #londonmusic",
  },
  {
    id: 14, title: "The first 48 hours after release matter more than you think",
    type: "Video", date: "2026-04-27", format: "Reel", series: "Ardito Explains", topic: "Release Strategy",
    caption: "The moment your song goes live, Spotify starts watching.\n\nYour track automatically goes into your followers' Release Radar — and the algorithm is paying attention to what happens next. If people are saving it, adding it to playlists, listening all the way through — that's the signal Spotify needs to push it further.\n\nSo release week is not the time to go quiet on socials. That's when you need to be most active. Post, share, text people, ask your close ones to save it not just stream it.\n\nA save carries way more algorithmic weight than ten passive plays.\n\nAsk your fans to SAVE your track, not just stream it.",
    hashtags: "#spotifystrategy #musicrelease #indieartist #releasemanagement #londonmusic",
  },
  {
    id: 15, title: "The gender gap in streaming data nobody talks about.",
    type: "Hot Take", date: "2026-04-29", format: "Carousel 4 slides", series: "Hot Takes", topic: "Industry",
    caption: "The gender gap in streaming isn't just about who gets signed.\n\nIt's baked into the algorithm.\n\nStudies consistently show that female and non-binary artists receive fewer algorithmic recommendations than male artists — even at equivalent streaming numbers. The algorithm is trained on historical data. Historical data skews heavily male. The result is a system that quietly disadvantages artists before they've even released anything.\n\nI wrote my BA dissertation on gender and identity in pop music. This stuff has been on my radar for years. And it's one of the reasons the way we approach release strategy at Ardito isn't one-size-fits-all.\n\nKnowing this doesn't fix it. But it changes how you strategise.",
    hashtags: "#womeninmusic #musicindustry #indieartist #genderequality #releasemanagement",
  },
  {
    id: 16, title: "Why your skip rate is quietly killing your music",
    type: "Video", date: "2026-05-01", format: "Reel", series: "Ardito Explains", topic: "Spotify",
    caption: "Most artists obsess over stream counts.\n\nBut the metric that's actually deciding whether Spotify pushes your music further is your skip rate — specifically, how many people are skipping before the 30-second mark.\n\nBecause Spotify only counts a stream after 30 seconds. And if people are skipping early, the algorithm reads that as a signal that your song isn't connecting — and it stops recommending it.\n\nSo your first 30 seconds are the most important 30 seconds of your whole track. The hook has to work. The intro cannot be too slow. This is why so many artists are starting with the chorus now.\n\nCheck your skip rate in Spotify for Artists. What does yours say?",
    hashtags: "#spotifystrategy #musicrelease #indieartist #spotifyforartists #releasemanagement",
  },
  {
    id: 17, title: "I wrote my dissertation on masculinity in pop music. Here's what stuck with me.",
    type: "Hot Take", date: "2026-05-04", format: "Carousel 3 slides", series: "Hot Takes", topic: "Industry",
    caption: "I wrote my BA dissertation on masculinity in pop music.\n\nIt started as an academic exercise. It ended up completely changing how I think about the music industry.\n\nThe way an artist presents their identity — their gender, their image, their persona — affects everything. Playlist placement. Press coverage. Fan perception. Brand deals. It's not separate from the music. It's woven into every part of how a release lands.\n\nMost release strategies treat this as an afterthought, if they think about it at all.\n\nI don't think that's good enough. And it's part of why Ardito approaches release management the way we do — because who you are as an artist is as important as what you're releasing.",
    hashtags: "#musicindustry #artistidentity #indieartist #womeninmusic #releasemanagement",
  },
  {
    id: 18, title: "What a pre-save actually does (and what it doesn't)",
    type: "Ardito Explains", date: "2026-05-06", format: "Carousel 5 slides", series: "Ardito Explains", topic: "Release Strategy",
    caption: "A pre-save doesn't stream your music early. It doesn't guarantee playlist placement. It doesn't go viral on its own.\n\nSo why does it matter?\n\nBecause on release day, Spotify's algorithm looks at how many people saved your track in the first 24–48 hours. A pre-save campaign converts directly into day-one saves — which tells the algorithm your music is worth pushing.\n\nIt's not magic. But it's one of the only tools an independent artist has to influence what happens on release day before the release actually happens.\n\nThe artists who skip it are leaving the most important window completely empty.\n\nWant the full release checklist? DM us \"checklist\" and we'll send it over.",
    hashtags: "#presave #musicrelease #spotifystrategy #indieartist #releasemanagement",
  },
  {
    id: 19, title: "Nobody is coming to save your music career",
    type: "Video", date: "2026-05-08", format: "Reel", series: "Hot Takes", topic: "Mindset",
    caption: "A lot of artists are waiting.\n\nWaiting for a label to find them, for a playlist to pick them up out of nowhere, for someone to notice. And look, those things can happen — but they happen to artists who are already doing the work, not instead of it.\n\nThe independent music landscape right now gives artists more tools than ever to build something real without a label. But that also means the work is yours. Nobody is going to do your pitching, build your release strategy, or grow your audience for you — unless you actively put that in place.\n\nThe artists who make it aren't luckier. They just started earlier.\n\nWhat's the one thing you've been putting off? Tell us below.",
    hashtags: "#musicindustry #indieartist #artistdevelopment #releasemanagement #londonmusic",
  },
  {
    id: 20, title: "London venues worth playing before 1k followers.",
    type: "Hot Take", date: "2026-05-11", format: "Carousel 4 slides", series: "London Lens", topic: "London",
    caption: "You don't need 1k followers to play a good room in London.\n\nYou need a good EPK and the nerve to send the email.\n\nWindmill Brixton. The Sebright Arms. George Tavern. Oslo Hackney. These are the rooms where London's music community actually shows up — not just fans, but industry too. Playing them early builds your live presence, your reputation, and your confidence in a way that no amount of streaming will.\n\nMost small venues accept direct bookings. No agent needed. A decent one-pager, some links, and a genuine message is enough to get a support slot.\n\nBuild your live presence before you need it. The artists who blow up online almost always have roots in a real scene.",
    hashtags: "#londonmusic #livemusic #indieartist #londongigs #emergingartist",
  },
];

const ALL_TYPES = ["All", "Ardito Explains", "Hot Take", "Video", "Recent Updates"];
const ALL_TOPICS = ["All", ...new Set(ALL_POSTS.map(p => p.topic))];
const ALL_SERIES = ["All", ...new Set(ALL_POSTS.map(p => p.series))];

export default function ContentLibrary() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterTopic, setFilterTopic] = useState("All");
  const [filterSeries, setFilterSeries] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [expanded, setExpanded] = useState(null);
  const [copied, setCopied] = useState(null);

  function copyCaption(id, text) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  const filtered = ALL_POSTS
    .filter(p => {
      const q = search.toLowerCase();
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.caption.toLowerCase().includes(q) || p.topic.toLowerCase().includes(q) || p.hashtags.toLowerCase().includes(q);
      const matchType = filterType === "All" || p.type === filterType;
      const matchTopic = filterTopic === "All" || p.topic === filterTopic;
      const matchSeries = filterSeries === "All" || p.series === filterSeries;
      return matchSearch && matchType && matchTopic && matchSeries;
    })
    .sort((a, b) => sortBy === "date" ? new Date(a.date) - new Date(b.date) : a.type.localeCompare(b.type));

  return (
    <div className="library-wrap">
      <div className="roster-header">
        <h2 className="section-title">Content Library</h2>
        <span className="library-count">{filtered.length} of {ALL_POSTS.length} posts</span>
      </div>

      <div className="library-filters">
        <input
          className="search-input"
          placeholder="Search by title, caption, topic, hashtag…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="filter-row">
          <div className="filter-group">
            <span className="filter-label">Type</span>
            <div className="filter-tabs">
              {ALL_TYPES.map(t => (
                <button key={t} className={`filter-btn${filterType === t ? " active" : ""}`} onClick={() => setFilterType(t)}>{t}</button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <span className="filter-label">Topic</span>
            <div className="filter-tabs">
              {ALL_TOPICS.map(t => (
                <button key={t} className={`filter-btn${filterTopic === t ? " active" : ""}`} onClick={() => setFilterTopic(t)}>{t}</button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <span className="filter-label">Sort</span>
            <div className="filter-tabs">
              <button className={`filter-btn${sortBy === "date" ? " active" : ""}`} onClick={() => setSortBy("date")}>By date</button>
              <button className={`filter-btn${sortBy === "type" ? " active" : ""}`} onClick={() => setSortBy("type")}>By type</button>
            </div>
          </div>
        </div>
      </div>

      <div className="library-list">
        {filtered.length === 0 && <p className="empty-state">No posts match this search.</p>}
        {filtered.map(p => {
          const col = TYPE_COLOURS[p.type] || TYPE_COLOURS["Hot Take"];
          const isExp = expanded === p.id;
          return (
            <div key={p.id} className="lib-card" style={{ borderLeft: `3px solid ${col.label}` }}>
              <div className="lib-card-top" onClick={() => setExpanded(isExp ? null : p.id)}>
                <div className="lib-card-left">
                  <span className="post-type" style={{ color: col.label }}>{p.type}</span>
                  <p className="lib-title">{p.title}</p>
                  <div className="lib-meta">
                    <span>{p.date}</span>
                    <span>{p.format}</span>
                    <span>{p.topic}</span>
                  </div>
                </div>
                <span className="chevron">{isExp ? "▲" : "▼"}</span>
              </div>

              {isExp && (
                <div className="lib-detail">
                  <div className="lib-caption-wrap">
                    <div className="lib-caption-header">
                      <span className="detail-label">Caption</span>
                      <button
                        className="copy-btn"
                        onClick={() => copyCaption(p.id, p.caption)}
                      >
                        {copied === p.id ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="lib-caption">{p.caption}</p>
                  </div>
                  <div className="lib-hashtags">{p.hashtags}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
