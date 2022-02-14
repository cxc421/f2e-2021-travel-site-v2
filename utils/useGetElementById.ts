import { useEffect, useState } from "react";

export const useGetElementById = (id: string) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById(id));
  }, [id]);

  return element;
};
