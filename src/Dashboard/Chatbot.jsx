import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Chatbot = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    // Chatbot Initialization with New Script
    (function () {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args) => {
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
        };
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") return target.q;
            return (...args) => target(prop, ...args);
          },
        });
      }
      const onLoad = function () {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "C2m5Tk3OoCDcV_reP4Rbz"; // Updated Script ID
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);

        // Additional Script Injection
        const extraScript = document.createElement("script");
        extraScript.innerHTML = `(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="xB5JEEai2oLb7sB1o6fFp";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`;
        document.body.appendChild(extraScript);
      };

      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    })();
  }, []);

  // Toggle Chatbot
  const toggleChatbot = () => {
    if (isChatbotOpen) {
      window.chatbase("close");
    } else {
      window.chatbase("open");
    }
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      <button
        className="btn rounded-circle p-4 shadow-lg"
        onClick={toggleChatbot}
        title={isChatbotOpen ? "Close Chatbot" : "Open Chatbot"}
      >
        <i className="fas fa-comments fa-2x" style={{ visibility: "hidden" }}></i>
      </button>
    </div>
  );
};

export default Chatbot;
