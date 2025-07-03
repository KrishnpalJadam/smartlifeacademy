import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Sallessupoortchatboard = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // 👉 Sirf hero page par aur jab login nahi ho tab dikhana
  if (location.pathname !== "/hero" || isLoggedIn) {
    return null;
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "C2m5Tk3OoCDcV_reP4Rbz";
    script.domain = "www.chatbase.co";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openChatbot = () => {
    if (window.chatbase) {
      window.chatbase("open");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
      <button className="btn salessupoortbutton" onClick={openChatbot}>
        Sales Support
      </button>
    </div>
  );
};

export default Sallessupoortchatboard;
