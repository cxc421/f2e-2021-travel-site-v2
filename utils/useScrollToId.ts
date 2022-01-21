import { useEffect, useRef } from "react";

export const useScrollToId = (page: number, id?: string) => {
  const prevPageRef = useRef(page);

  useEffect(() => {
    if (page !== prevPageRef.current) {
      prevPageRef.current = page;

      // scroll
      if (id) {
        const element = document.getElementById(id);
        element?.scrollTo({ top: 0 });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [page, prevPageRef, id]);
};
