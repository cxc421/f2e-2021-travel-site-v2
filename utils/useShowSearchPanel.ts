import { useState, useEffect } from "react";

const SHOW_SEARCH_PANEL_KEY = "showSearchPanel";

function removeHash() {
  history.replaceState(
    "",
    document.title,
    window.location.pathname + window.location.search
  );
}

export const useShowSearchPanel = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      console.log("window.location.hash=" + window.location.hash);
      setShow(window.location.hash === `#${SHOW_SEARCH_PANEL_KEY}`);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return {
    showSearchPanel: show,
    setShowSearchPanel: (show: boolean) => {
      if (show) {
        window.location.hash = SHOW_SEARCH_PANEL_KEY;
      } else {
        window.location.hash = "";
        removeHash();
      }
    },
  };
};
