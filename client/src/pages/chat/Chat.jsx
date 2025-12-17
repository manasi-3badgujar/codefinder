import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const Chat = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [readOnly, setReadOnly] = useState(false);

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  /* ===== FETCH CHAT ===== */
  useEffect(() => {
    const fetchChat = async () => {
      const res = await api.get(`/chats/${projectId}`);
      setMessages(res.data.messages || []);
      setReadOnly(res.data.readOnly);
    };
    fetchChat();
  }, [projectId]);

  /* ===== SOCKET ===== */
  useEffect(() => {
    socketRef.current = io("http://localhost:6001", {
      auth: { token: localStorage.getItem("token") }
    });

    socketRef.current.emit("joinRoom", { projectId });

    socketRef.current.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socketRef.current.disconnect();
  }, [projectId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (readOnly || !text.trim()) return;
    socketRef.current.emit("sendMessage", { projectId, text });
    setText("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
      >
        ← Back
      </button>

      <div className="border rounded h-[400px] overflow-y-auto p-4 bg-white dark:bg-gray-800">
        {messages.map((m, i) => {
          const senderId =
            typeof m.sender === "string" ? m.sender : m.sender?._id;
          const isMe = senderId === user?._id;

          return (
            <div
              key={i}
              className={`mb-3 flex ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs text-sm
                ${
                  isMe
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-purple-600 text-white rounded-bl-none"
                }`}
              >
                {!isMe && (
                  <div className="text-xs opacity-80 mb-1">
                    {m.sender?.name || "User"}
                  </div>
                )}
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={text}
          disabled={readOnly}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border p-2 rounded disabled:opacity-50"
          placeholder={
            readOnly
              ? "Chat is read-only (work submitted)"
              : "Type message..."
          }
        />
        <button
          onClick={sendMessage}
          disabled={readOnly}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
