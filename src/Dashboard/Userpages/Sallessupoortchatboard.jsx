  import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Sallessupoortchatboard = () => {
  const location = useLocation();

  // ✅ Strict condition: show only on exact "/hero" route
  const shouldShow = location.pathname === "/hero";

  useEffect(() => {
    if (!shouldShow) return;

    // 🧹 Remove old script if already present
    const existingScript = document.getElementById("sales-chatbot");
    if (existingScript) {
      existingScript.remove();
    }

    // ➕ Inject Chatbase script with correct chatbotId
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "sales-chatbot";
    script.setAttribute("chatbotId", "YOUR_SALES_BOT_ID"); // 🔁 Replace with your actual Sales Bot ID
    script.setAttribute("domain", "www.chatbase.co");
    document.body.appendChild(script);

    return () => {
      script.remove(); // 🧼 Cleanup on unmount
    };
  }, [shouldShow]);

  if (!shouldShow) return null;

  const openChatbot = () => {
    if (window.chatbase) {
      window.chatbase("open");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
      <button className="btn btn-warning" onClick={openChatbot}>
        Sales Support
      </button>
    </div>
  );
};

export default Sallessupoortchatboard;
