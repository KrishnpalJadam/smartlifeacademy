import React, { useEffect } from "react";

const Sallessupoortchatboard = () => {
  useEffect(() => {
    // Load Chatbase script when the component mounts
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "C2m5Tk3OoCDcV_reP4Rbz";
    script.domain = "www.chatbase.co";
    document.body.appendChild(script);

    return () => {
      // Cleanup if necessary
      document.body.removeChild(script);
    };
  }, []);

  // Function to open Chatbase chatbot
  const openChatbot = () => {
    if (window.chatbase) {
      window.chatbase("open");
    }
  };

  return (
    <div>
      {/* Sales Support Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
        <button
          className="btn salessupoortbutton"
          style={{ backgroundColor: "#fcd34d", margin: "10px" }}
          onClick={openChatbot} // Click to open chatbot
        >
          Sales Support
        </button>
      </div>
    </div>
  );
};

export default Sallessupoortchatboard;
