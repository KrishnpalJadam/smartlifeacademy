import { useEffect } from "react";

const CombinedChatbot = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const chatbotId = isLoggedIn
    ?"xB5JEEai2oLb7sB1o6fFp"  // Dashboard chatbot
    :"C2m5Tk3OoCDcV_reP4Rbz" ; // Public pages chatbot

  useEffect(() => {
    // ✅ Remove all previous chatbot scripts + iframe
    const existingScript = document.querySelector("script[src*='chatbase.co']");
    if (existingScript) existingScript.remove();

    const chatbotIframe = document.querySelector("iframe[src*='chatbase.co']");
    if (chatbotIframe) chatbotIframe.remove();

    // ✅ Inject new chatbot script
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "chatbase-script";
    script.setAttribute("chatbotId", chatbotId);
    script.setAttribute("domain", "www.chatbase.co");
    document.body.appendChild(script);

    // ✅ Cleanup on component unmount
    return () => {
      document.getElementById("chatbase-script")?.remove();
      document.querySelector("iframe[src*='chatbase.co']")?.remove();
    };
  }, [chatbotId]);

  return null;
};

export default CombinedChatbot;
