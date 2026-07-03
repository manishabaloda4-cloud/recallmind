import { useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:8002";

export default function App() {
  const [tab, setTab] = useState("remember");
  const [content, setContent] = useState("");
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const [sessionId, setSessionId] = useState("default");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [memories, setMemories] = useState([]);

  const showMsg = (msg, isError = false) => {
    setMessage({ text: msg, error: isError });
    setTimeout(() => setMessage(""), 3000);
  };

  const remember = async () => {
    if (!content.trim()) return showMsg("Enter something to remember!", true);
    setLoading(true);
    try {
      await axios.post(`${API}/remember`, { content, session_id: sessionId });
      setMemories((prev) => [...prev, { text: content, time: new Date().toLocaleTimeString() }]);
      setContent("");
      showMsg("✅ Memory stored successfully!");
    } catch (e) {
      showMsg("❌ Error: " + (e.response?.data?.detail || e.message), true);
    }
    setLoading(false);
  };

  const recall = async () => {
    if (!query.trim()) return showMsg("Enter a query!", true);
    setLoading(true);
    try {
      const res = await axios.post(`${API}/recall`, { query, session_id: sessionId });
      setResults(res.data.results);
      if (res.data.results.length === 0) showMsg("No memories found for this query.", true);
    } catch (e) {
      showMsg("❌ Error: " + (e.response?.data?.detail || e.message), true);
    }
    setLoading(false);
  };

  const forget = async () => {
    if (!topic.trim()) return showMsg("Enter a topic to forget!", true);
    setLoading(true);
    try {
      await axios.post(`${API}/forget`, { topic, session_id: sessionId });
      setMemories([]);
      setResults([]);
      setTopic("");
      showMsg("🗑️ Memory cleared!");
    } catch (e) {
      showMsg("❌ Error: " + (e.response?.data?.detail || e.message), true);
    }
    setLoading(false);
  };

  const improve = async () => {
    setLoading(true);
    try {
      await axios.post(`${API}/improve`, { session_id: sessionId });
      showMsg("⚡ Memory connections strengthened!");
    } catch (e) {
      showMsg("❌ Error: " + (e.response?.data?.detail || e.message), true);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <header>
        <h1>🧠 RecallMind</h1>
        <p>AI that never forgets — powered by Cognee</p>
        <div className="session">
          <label>Session ID:</label>
          <input value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
        </div>
      </header>

      <nav>
        {["remember", "recall", "forget", "improve"].map((t) => (
          <button key={t} className={tab === t ? "active" : ""} onClick={() => { setTab(t); setResults([]); }}>
            {t === "remember" ? "📝 Remember" : t === "recall" ? "🔍 Recall" : t === "forget" ? "🗑️ Forget" : "⚡ Improve"}
          </button>
        ))}
      </nav>

      {message && <div className={`msg ${message.error ? "error" : "success"}`}>{message.text}</div>}

      <main>
        {tab === "remember" && (
          <div className="panel">
            <h2>📝 Remember</h2>
            <p>Feed knowledge into RecallMind's memory graph</p>
            <textarea
              rows={5}
              placeholder="e.g. The meeting with client was about expanding to 3 new cities in Q3..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={remember} disabled={loading}>
              {loading ? "⏳ Storing..." : "📝 Store Memory"}
            </button>
            {memories.length > 0 && (
              <div className="memory-list">
                <h3>Stored this session:</h3>
                {memories.map((m, i) => (
                  <div key={i} className="memory-item">
                    <span className="time">{m.time}</span>
                    <span>{m.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "recall" && (
          <div className="panel">
            <h2>🔍 Recall</h2>
            <p>Ask anything — RecallMind searches across all memories</p>
            <input
              placeholder="e.g. What did we discuss about Q3 expansion?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && recall()}
            />
            <button onClick={recall} disabled={loading}>
              {loading ? "⏳ Searching..." : "🔍 Search Memory"}
            </button>
            {results.length > 0 && (
              <div className="results">
                <h3>Found {results.length} memories:</h3>
                {results.map((r, i) => (
                  <div key={i} className="result-item">
                    <span className="num">{i + 1}</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "forget" && (
          <div className="panel">
            <h2>🗑️ Forget</h2>
            <p>Clear memories from the knowledge graph</p>
            <input
              placeholder="e.g. Q3 meeting notes"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <button onClick={forget} disabled={loading} className="danger">
              {loading ? "⏳ Clearing..." : "🗑️ Clear Memory"}
            </button>
          </div>
        )}

        {tab === "improve" && (
          <div className="panel">
            <h2>⚡ Improve</h2>
            <p>Strengthen memory connections and self-optimize the knowledge graph</p>
            <div className="improve-info">
              <div className="info-card">🕸️ <strong>Graph Optimization</strong><p>Reconnects related memories for faster recall</p></div>
              <div className="info-card">🔗 <strong>Link Discovery</strong><p>Finds hidden connections between stored knowledge</p></div>
              <div className="info-card">⚡ <strong>Self-Learning</strong><p>RecallMind gets smarter with every improvement</p></div>
            </div>
            <button onClick={improve} disabled={loading} className="improve-btn">
              {loading ? "⏳ Optimizing..." : "⚡ Improve Memory"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}