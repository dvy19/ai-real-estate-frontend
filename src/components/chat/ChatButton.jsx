
import { useNavigate } from "react-router-dom";

export default function ChatbotButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/chat")}
      className="fixed bottom-6 right-6 rounded-full
                 bg-blue-600 px-6 py-3 text-white
                 font-medium shadow-lg
                 hover:bg-blue-700 transition"
    >
      Chat with AI
    </button>
  );
}
