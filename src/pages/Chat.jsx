
import { useState  , useEffect} from "react";
import mlService from "../services/mlService";

export default function Chat() {
   
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendQuestion = async () => {
        const question = input.trim();
        if (!question || loading) return;

        setMessages(prev => [
            ...prev,
            { id: Date.now(), sender: 'user', text: question }
        ]);

        setInput('');
        setLoading(true);

        try {
            const response = await mlService.sendRag(question);

            const answer = response.data.answer;

            setMessages(prev => [
                ...prev,
                { id: Date.now() + 1, sender: 'ai', text: answer }
            ]);
        }
         catch (err) {
            console.error(err);
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now() + 1,
                    sender: 'ai',
                    text: 'Sorry, something went wrong. Please try again.'
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await mlService.getRagHistory();


                const history = response.data;

                console.log(history)

                const formattedMessages = history.reverse().flatMap((chat) => [
                    {
                        id: `${chat._id}-question`,
                        sender: "user",
                        text: chat.question
                    },
                    {
                        id: `${chat._id}-answer`,
                        sender: "ai",
                        text: chat.answer
                    }
                ]);

                setMessages(formattedMessages);
            } catch (err) {
                console.log("Failed to fetch chat history:", err);
            }
        };

        fetchHistory();
    }, []);

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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                  if (e.key === 'Enter') sendQuestion();
              }}
              placeholder="Type your message..."
              className="flex-1 min-w-0 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
              onClick={sendQuestion}
              disabled={loading || !input.trim()}
              className="rounded-xl bg-blue-600 px-5 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
          >
              {loading ? 'Thinking...' : 'Send'}
          </button>

          </div>
        </div>

      </div>
    </div>
  );
}
