import { useState, useEffect } from "react";
import ChatBox from "./components/ChatBox";
import ReportsViewer from "./components/ReportsViewer";
import api, { testConnection } from "./api/client";
import "./App.css";
import "./components/ChatBox.css";
import "./components/ReportsViewer.css";

function App() {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");

  useEffect(() => {
    testConnection();
  }, []);

  const handleSend = async () => {
    if (!userMessage.trim() || loading) return;

    const userMsg = { role: "user", text: userMessage };
    setChatHistory((prev) => [...prev, userMsg]);
    setUserMessage("");
    setLoading(true);

    try {
      const res = await api.post("/chat/report", {
        user: "Project Manager",
        message: userMessage,
      });

      const { messages, report_markdown, summary } = res.data;

      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          text: messages?.[1]?.text || "Report generated successfully.",
        },
      ]);

      setReport({ markdown: report_markdown, summary });
    } catch (err) {
      console.error("Error:", err);
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", text: "Error fetching report. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>ZenAI Project Manager</h1>
        <p className="subtitle">AI-powered Notion sync & daily reports</p>
        <nav className="app-nav">
          <button
            className={activeTab === "chat" ? "active" : ""}
            onClick={() => setActiveTab("chat")}
          >
            Chat
          </button>
          <button
            className={activeTab === "reports" ? "active" : ""}
            onClick={() => setActiveTab("reports")}
          >
            Reports
          </button>
        </nav>
      </header>

      {activeTab === "chat" && (
        <>
          <ChatBox messages={chatHistory} loading={loading} />
          <div className="input-container">
            <textarea
              className="chat-input"
              placeholder="Ask ZenAI for a Notion report..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              rows="2"
            />
            <button onClick={handleSend} disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </div>

          {report && (
            <div className="report-section">
              <h2>Project Summary</h2>
              <p>Total Tasks: {report.summary?.total_tasks}</p>
              <p>Completed: {report.summary?.completed}</p>
              <p>In Progress: {report.summary?.in_progress}</p>
              <p>To Do: {report.summary?.todo}</p>

              <h3>Markdown Report</h3>
              <pre className="report-box">{report.markdown}</pre>
            </div>
          )}
        </>
      )}

      {activeTab === "reports" && <ReportsViewer />}
    </div>
  );
}

export default App;
