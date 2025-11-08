import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ReportsViewer from "./components/ReportsViewer";
import "./index.css";

function Root() {
  const [activeTab, setActiveTab] = React.useState("chat");

  return (
    <div className="root-wrapper">
      <nav className="navbar">
        <h2>ZenAI</h2>
        <div className="tabs">
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
        </div>
      </nav>

      <main>
        {activeTab === "chat" ? <App /> : <ReportsViewer />}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);