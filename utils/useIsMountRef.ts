import { useEffect, useRef } from "react";

export const useIsMountRef = () => {
  const isMountRef = useRef(false);

  useEffect(() => {
    isMountRef.current = true;
    return () => {
      isMountRef.current = false;
    };
  }, [isMountRef]);

  return isMountRef;
};
