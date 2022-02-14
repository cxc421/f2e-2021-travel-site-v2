import { FC } from "react";
import cn from "classnames";
import style from "./nav-link.module.scss";
import Link from "next/link";

export interface NavLinkProps {
  color: "red" | "yellow" | "green";
  icon: "triangle" | "circle" | "rectangle";
  href: string;
  disable?: boolean;
}

export const NavLink: FC<NavLinkProps> = ({
  color,
  icon,
  href,
  children,
  disable = false,
}) => {
  // if (disable) {
  //   return (
  //     <a className={style.container} href="#">
  //       <div className={cn(style.icon, style[color], style[icon])} />
  //       <span className={cn(style.text, style[color])}>{children}</span>
  //     </a>
  //   );
  // }

  return (
    <Link href={href}>
      <a
        className={style.container}
        onClick={(e) => disable && e.preventDefault()}
      >
        <div className={cn(style.icon, style[color], style[icon])} />
        <span className={cn(style.text, style[color])}>{children}</span>
      </a>
    </Link>
  );
};
