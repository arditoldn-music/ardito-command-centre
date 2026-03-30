import { useState, useEffect, useCallback } from "react";

const SOURCES = [
  { name: "Music Ally",             url: "https://musically.com/feed/", tab: "ardito" },
  { name: "Music Business Worldwide", url: "https://www.musicbusinessworldwide.com/feed/", tab: "ardito" },
  { name: "Pitchfork",              url: "https://pitchfork.com/rss/news/feed.xml", tab: "ardito" },
  { name: "The Guardian Music",     url: "https://www.theguardian.com/music/rss", tab: "ardito" },
  { name: "Rolling Stone",          url: "https://www.rollingstone.com/music/feed/", tab: "ardito" },
  { name: "Stereogum",              url: "https://www.stereogum.com/feed/", tab: "tom" },
  { name: "Bandcamp Daily",         url: "https://daily.bandcamp.com/feed", tab: "tom" },
  { name: "The Quietus",            url: "https://thequietus.com/feed", tab: "tom" },
];

const PROXY = "https://api.rss2json.com/v1/api.json?rss_url=";

const ARDITO_KEYWORDS = [
  "spotify","distribution","streaming","playlist","independent artist",
  "release","royalt","tiktok","algorithm","label deal","sync","publishing",
  "music industry","distrokid","tunecore","apple music","youtube music",
  "pitching","content id","editorial","a&r","unsigned","emerging artist",
];

function scoreLocally(title, desc) {
  const text = (title + " " + desc).toLowerCase();
  const hits = ARDITO_KEYWORDS.filter(k => text.includes(k)).length;
  if (hits >= 3) return 9;
  if (hits === 2) return 7;
  if (hits === 1) return 5;
  return 3;
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  if (d < 7) return `${d}d ago`;
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("ardito");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchFeeds = useCallback(async () => {
    setLoading(true);
    setError(null);
    const results = [];

    await Promise.allSettled(
      SOURCES.map(async (src) => {
        try {
          const res = await fetch(`${PROXY}${encodeURIComponent(src.url)}&count=10`);
          const data = await res.json();
          if (data.items) {
            data.items.forEach(item => {
              const desc = item.description?.replace(/<[^>]+>/g, "").slice(0, 200) || "";
              results.push({
                id: item.link,
                title: item.title,
                source: src.name,
                tab: src.tab,
                url: item.link,
                date: item.pubDate,
                desc,
                score: scoreLocally(item.title, desc),
              });
            });
          }
        } catch {}
      })
    );

    results.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.date) - new Date(a.date);
    });

    setArticles(results);
    setLastUpdated(new Date());
    setLoading(false);
  }, []);

  useEffect(() => { fetchFeeds(); }, [fetchFeeds]);

  const visible = articles.filter(a => a.tab === activeTab);

  function scoreColour(s) {
    if (s >= 8) return "#f0c040";
    if (s >= 6) return "#a8d5a2";
    return "#3a4a3a";
  }

  return (
    <div className="news-wrap">
      <div className="roster-header">
        <div>
          <h2 className="section-title">News Feed</h2>
          {lastUpdated && (
            <p className="news-updated">Updated {timeAgo(lastUpdated)}</p>
          )}
        </div>
        <button
          className="btn-add-artist"
          onClick={fetchFeeds}
          disabled={loading}
        >
          {loading ? "Loading…" : "↻ Refresh"}
        </button>
      </div>

      <div className="filter-tabs" style={{ marginBottom: 20 }}>
        <button
          className={`filter-btn${activeTab === "ardito" ? " active" : ""}`}
          onClick={() => setActiveTab("ardito")}
        >
          Ardito picks
        </button>
        <button
          className={`filter-btn${activeTab === "tom" ? " active" : ""}`}
          onClick={() => setActiveTab("tom")}
        >
          Tom's tabs
        </button>
      </div>

      {error && (
        <div className="news-error">Could not load some feeds. {error}</div>
      )}

      {loading && (
        <div className="news-loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="news-skeleton" />
          ))}
        </div>
      )}

      {!loading && visible.length === 0 && (
        <p className="empty-state">No articles loaded — try refreshing.</p>
      )}

      <div className="news-list">
        {visible.map(a => (
          <a
            key={a.id}
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            className="news-card"
          >
            <div className="news-card-top">
              <span className="news-source">{a.source}</span>
              <div className="news-card-right">
                <span className="news-score" style={{ color: scoreColour(a.score) }}>
                  {a.score >= 8 ? "⚡ High relevance" : a.score >= 6 ? "Relevant" : ""}
                </span>
                <span className="news-date">{timeAgo(a.date)}</span>
              </div>
            </div>
            <p className="news-title">{a.title}</p>
            {a.desc && <p className="news-desc">{a.desc}</p>}
          </a>
        ))}
      </div>
    </div>
  );
}
