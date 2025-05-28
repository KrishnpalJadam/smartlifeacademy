import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MainSalesChatbot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // ✅ Add only those routes where chatbot should work
  const allowedRoutes = ["/hero", "/signup"];
  const isRouteAllowed = allowedRoutes.includes(location.pathname);

  // ✅ Get role from localStorage
  const role = localStorage.getItem("role");
  const shouldHideChatbot = role !== null || !isRouteAllowed; // Hide if role exists OR route not allowed

  useEffect(() => {
    if (shouldHideChatbot) return; // Don't load chatbot if restricted

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "C2m5Tk3OoCDcV_reP4Rbz";
    script.domain = "www.chatbase.co";
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById("C2m5Tk3OoCDcV_reP4Rbz");
      if (existingScript) {
        existingScript.remove();
      }

      // Remove chatbot iframe
      const chatbotIframe = document.querySelector("iframe[src*='chatbase.co']");
      if (chatbotIframe && chatbotIframe.parentNode) {
        chatbotIframe.parentNode.removeChild(chatbotIframe);
      }
    };
  }, [shouldHideChatbot]);

  // Close chatbot when clicking outside
  useEffect(() => {
    if (shouldHideChatbot) return;

    const handleClickOutside = (event) => {
      const chatbotIframe = document.querySelector("iframe[src*='chatbase.co']");
      if (chatbotIframe && !chatbotIframe.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [shouldHideChatbot]);

  if (shouldHideChatbot) return null; // Don't render anything

  return (
    <div>
      {/* <button onClick={() => setIsVisible(!isVisible)}>Toggle Chatbot</button> */}
      <div
        id="chatbot-container"
        style={{
          display: isVisible ? "block" : "none",
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      ></div>
    </div>
  );
};

export default MainSalesChatbot;
