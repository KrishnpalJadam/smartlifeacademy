import { useEffect, useState } from "react";

const MainSalesChatbot = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
      if (chatbotIframe) {
        chatbotIframe.parentNode.removeChild(chatbotIframe);
      }
    };
  }, []);

  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const chatbotIframe = document.querySelector("iframe[src*='chatbase.co']");
      if (chatbotIframe && !chatbotIframe.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
