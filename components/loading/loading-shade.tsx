import { useEffect } from "react";
import style from "./loading-shade.module.scss";

export const LoadingShade = () => {
  useEffect(() => {
    const element = document.createElement("div");
    element.className = style.container;
    document.body.appendChild(element);
    return () => {
      document.body.removeChild(element);
    };
  }, []);

  return null;
};
