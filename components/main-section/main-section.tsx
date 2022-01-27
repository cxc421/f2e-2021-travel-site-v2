import { forwardRef } from "react";
import cn from "classnames";
import style from "./main-section.module.scss";

export interface MainSectionProps {
  className?: string;
  children?: React.ReactNode;
}

export type MainSectionType = HTMLDivElement;

export const MainSection = forwardRef<MainSectionType, MainSectionProps>(
  ({ className, children }: MainSectionProps, ref) => (
    <main role="main" className={cn(style.container, className)} ref={ref}>
      {children}
    </main>
  )
);
MainSection.displayName = "MainSection";
