import { useEffect, useState } from "react";

export const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    function isTouchDevice() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    setIsTouch(isTouchDevice());
  }, []);

  return isTouch;
};
