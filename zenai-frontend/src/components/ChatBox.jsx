// src/components/ChatBox.jsx

import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "./ChatBox.css";

function ChatBox({ messages, loading }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="chatbox-container">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-bubble ${msg.role === "user" ? "user" : "assistant"}`}
        >
          {msg.role === "assistant" ? (
            <ReactMarkdown className="markdown">{msg.text}</ReactMarkdown>
          ) : (
            <span>{msg.text}</span>
          )}
        </div>
      ))}

      {loading && (
        <div className="chat-bubble assistant typing">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}

export default ChatBox;
