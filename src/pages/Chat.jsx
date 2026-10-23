
import { useState } from "react";

export default function Chat() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! How can I help you today?",
            sender: "bot",
        },
    ]);

    const[message,setMessage]=useState("")

    const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
        id: Date.now(),
        text: message,
        sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">

      <div className="w-full max-w-3xl h-[90vh] bg-white
                      rounded-2xl shadow-md flex flex-col
                      overflow-hidden">

        {/* Top Bar */}
        <div className="bg-blue-600 text-white p-4">
          <h1 className="text-lg font-semibold">
            AI Assistant
          </h1>
          <p className="text-sm text-blue-100">
            Your smart assistant
          </p>
        </div>

        {/* Chat Area */}
        
        <div className="flex-1 overflow-y-auto p-5 space-y-4">

            {messages.map((msg) => (
                <div
                key={msg.id}
                className={`flex ${
                    msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
                >
                <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-tr-sm"
                        : "bg-gray-100 text-gray-800 rounded-tl-sm"
                    }`}
                >
                    {msg.text}
                </div>
                </div>
            ))}

        </div>


        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-3">

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 min-w-0 rounded-xl
                         border border-gray-300 px-4 py-3
                         outline-none focus:ring-2
                         focus:ring-blue-500"
            />

            <button
              onClick={handleSend}

              onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSend();
                }
                }}
              className="rounded-xl bg-blue-600 px-5
                         text-white font-medium
                         hover:bg-blue-700 transition"
            >
              Send
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
