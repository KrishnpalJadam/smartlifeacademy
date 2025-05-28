import { useEffect } from "react";
import BASE_URL from "./Config";

const LogoutOnTabClose = ({ userId }) => {
  useEffect(() => {
    const handleTabClose = () => {
      const data = JSON.stringify({ userId });

      const blob = new Blob([data], {
        type: "application/json",
      });

      navigator.sendBeacon(`${BASE_URL}/logout`, blob);
    };

    window.addEventListener("unload", handleTabClose);

    return () => {
      window.removeEventListener("unload", handleTabClose);
    };
  }, [userId]);

  return null;
};

export default LogoutOnTabClose;
