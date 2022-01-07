import { FC } from "react";
import cn from "classnames";
import style from "./main-section.module.scss";

export interface MainSectionProps {
  className?: string;
}

export const MainSection: FC<MainSectionProps> = ({ children, className }) => (
  <main role="main" className={cn(style.container, className)}>
    {children}
  </main>
);
