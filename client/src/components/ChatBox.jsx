import { useState } from "react";

export default function ChatBox({ messages, currentUser, onSend }) {
  const [text, setText] = useState("");

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`chat-msg ${m.senderId === currentUser ? "me" : "other"}`}
          >
            {m.message}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={text}
          placeholder="Type message..."
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && text && (onSend(text), setText(""))}
        />
        <button onClick={() => {
          if (!text) return;
          onSend(text);
          setText("");
        }}>
          Send
        </button>
      </div>
    </div>
  );
};