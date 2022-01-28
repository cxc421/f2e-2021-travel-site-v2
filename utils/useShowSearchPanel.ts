import { useState, useEffect } from "react";

const SHOW_SEARCH_PANEL_KEY = "showSearchPanel";

export const useShowSearchPanel = () => {
  const [show, setShow] = useState(false);

  // if (typeof window !== "undefined") {
  //   console.log(`history length: ${window.history.length}`);
  // }

  useEffect(() => {
    if (window.location.hash === `#${SHOW_SEARCH_PANEL_KEY}`) {
      location.replace(window.location.pathname);
      return;
    }

    const handleHashChange = () => {
      // console.log("window.location.hash=" + window.location.hash);
      setShow(window.location.hash === `#${SHOW_SEARCH_PANEL_KEY}`);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return {
    showSearchPanel: show,
    setShowSearchPanel: (show: boolean) => {
      if (show) {
        window.location.hash = SHOW_SEARCH_PANEL_KEY;
      } else {
        window.history.back();
      }
    },
  };
};
