import { useEffect } from "react";

const MainSalesChatbot = () => {
  const CHATBOT_ID = "xB5JEEai2oLb7sB1o6fFp"; // 🔁 Sales chatbot ID

  useEffect(() => {
    const existing = document.getElementById("sales-chatbot-script");
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "sales-chatbot-script";
    script.setAttribute("chatbotId", CHATBOT_ID);
    script.setAttribute("domain", "www.chatbase.co");
    document.body.appendChild(script);

    return () => {
      document.getElementById("sales-chatbot-script")?.remove();
      document.querySelector("iframe[src*='chatbase.co']")?.remove();
    };
  }, []);

  return null;
};

export default MainSalesChatbot;
