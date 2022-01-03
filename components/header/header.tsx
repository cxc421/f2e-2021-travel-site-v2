import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { NavLink } from "../nav-link/nav-link";
import style from "./header.module.scss";
import logoSrc from "./images/taiwan-logo.png";

export interface HeaderProps {}

const Logo = () => (
  <Link href="/">
    <a className={style.logo}>
      <Image src={logoSrc} width={99} height={57} alt="logo" />
    </a>
  </Link>
);

export const Header: FC<HeaderProps> = () => {
  return (
    <div className={style.container}>
      <Logo />
      <ul className={style.navLinkList}>
        <li>
          <NavLink icon="triangle" color="red" href="/attractions">
            台灣景點
          </NavLink>
        </li>
        <li>
          <NavLink icon="rectangle" color="yellow" href="/restaurant">
            美食住宿
          </NavLink>
        </li>
        <li>
          <NavLink icon="circle" color="green" href="/traffic">
            景點交通
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
