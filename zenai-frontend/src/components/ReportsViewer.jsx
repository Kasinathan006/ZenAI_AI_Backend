import React, { useEffect, useState } from "react";
import api from "../api/client";
import "./ReportsViewer.css";

function ReportsViewer() {
  const [reports, setReports] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailStatus, setEmailStatus] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get("/reports");
        setReports(res.data || []);
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const downloadReport = (report) => {
    const blob = new Blob([report.report_markdown], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `zenai_report_${report.id}.txt`;
    link.click();
  };

  const sendEmail = async (reportId) => {
    const recipient = prompt("Enter recipient email:");
    if (!recipient) return;

    setEmailStatus((prev) => ({ ...prev, [reportId]: "sending" }));

    try {
      const res = await api.post(`/reports/${reportId}/email`, null, {
        params: { recipient },
      });
      console.log("Email sent:", res.data);
      setEmailStatus((prev) => ({ ...prev, [reportId]: "sent" }));
      alert("Email sent successfully.");
    } catch (err) {
      console.error("Email error:", err);
      setEmailStatus((prev) => ({ ...prev, [reportId]: "failed" }));
      alert("Failed to send email. Please try again.");
    }
  };

  if (loading) return <p className="loading">Loading reports...</p>;

  return (
    <div className="reports-viewer">
      <h2>ZenAI Project Reports</h2>
      {reports.length === 0 && <p className="no-reports">No reports found yet.</p>}

      {reports.map((r) => (
        <div key={r.id} className="report-card">
          <div
            className="report-header"
            onClick={() => setExpanded(expanded === r.id ? null : r.id)}
          >
            <h3>{r.user}'s Report</h3>
            <p>{new Date(r.created_at).toLocaleString()}</p>
          </div>

          <div className="report-summary">
            <p>{r.summary_text ? r.summary_text.slice(0, 160) + "..." : ""}</p>
          </div>

          {expanded === r.id && (
            <pre className="report-markdown">{r.report_markdown}</pre>
          )}

          <div className="report-actions">
            <button onClick={() => downloadReport(r)}>Download</button>
            <button
              onClick={() => sendEmail(r.id)}
              disabled={emailStatus[r.id] === "sending"}
            >
              {emailStatus[r.id] === "sending"
                ? "Sending..."
                : emailStatus[r.id] === "sent"
                ? "Sent"
                : "Email"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReportsViewer;
