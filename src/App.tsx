import { useState } from "react";
import Calendar from "./components/Calendar";
import ArtistRoster from "./components/ArtistRoster";
import ReleaseTracker from "./components/ReleaseTracker";
import ContentLibrary from "./components/ContentLibrary";
import NewsFeed from "./components/NewsFeed";
import PostIdeas from "./components/PostIdeas";
import ArditorAssistant from "./components/ArditorAssistant";
import "./App.css";

const TABS = [
  { id: "calendar", label: "Posting Calendar" },
  { id: "library", label: "Content Library" },
  { id: "news", label: "News Feed" },
  { id: "ideas", label: "Post Ideas" },
  { id: "roster", label: "Artist Roster" },
  { id: "releases", label: "Release Tracker" },
  { id: "assistant", label: "Ardito Assistant" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("calendar");

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-name">Ardito</span>
            <span className="brand-sub">Command Centre</span>
          </div>
          <nav className="tab-nav">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`tab-btn${activeTab === t.id ? " active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="app-main">
        {activeTab === "calendar" && <Calendar />}
        {activeTab === "roster" && <ArtistRoster />}
        {activeTab === "releases" && <ReleaseTracker />}
        {activeTab === "library" && <ContentLibrary />}
        {activeTab === "news" && <NewsFeed />}
        {activeTab === "ideas" && <PostIdeas />}
        {activeTab === "assistant" && <ArditorAssistant />}
        {activeTab !== "calendar" && activeTab !== "roster" && activeTab !== "releases" && activeTab !== "library" && activeTab !== "news" && activeTab !== "ideas" && activeTab !== "assistant" && (
          <div className="coming-soon">
            <p>{TABS.find((t) => t.id === activeTab)?.label} — coming soon</p>
          </div>
        )}
      </main>
    </div>
  );
}
