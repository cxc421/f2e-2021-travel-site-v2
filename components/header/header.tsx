import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import cn from "classnames";
import { NavLink } from "./nav-link";
import style from "./header.module.scss";
import logoSrc from "./images/taiwan-logo.png";
import { SearchButton } from "../button/search-button";
import { GpsButton } from "../button/gps-button";

const Logo = () => (
  <Link href="/">
    <a className={style.logo}>
      <Image src={logoSrc} width={99} height={57} alt="logo" />
    </a>
  </Link>
);

const NavLinkList = () => (
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
);

const MobileButtonArea = () => (
  <div className={style.mobileButtonArea}>
    <SearchButton size={30} title="Go to search page" />
    <GpsButton size={30} title="Get current location" />
  </div>
);

const MobileNavList = () => {
  const { pathname } = useRouter();

  return (
    <ul className={style.mobileNavList}>
      <li>
        <Link href="/attractions">
          <a className={cn({ [style.selected]: pathname === "/attractions" })}>
            台灣景點
          </a>
        </Link>
      </li>
      <li>
        <Link href="/restaurant">
          <a className={cn({ [style.selected]: pathname === "/restaurant" })}>
            美食住宿
          </a>
        </Link>
      </li>
      <li>
        <Link href="/traffic">
          <a className={cn({ [style.selected]: pathname === "/traffic" })}>
            景點交通
          </a>
        </Link>
      </li>
    </ul>
  );
};

interface MobileFilterAreaProps {
  content?: JSX.Element;
}

const MobileFilterArea: FC<MobileFilterAreaProps> = ({ content }) => (
  <div className={style.mobileFilterArea}>{content}</div>
);

export interface HeaderProps {
  mobileFilterContent?: JSX.Element;
}

export const Header: FC<HeaderProps> = ({ mobileFilterContent }) => {
  return (
    <div className={style.wraper}>
      <header className={style.container}>
        <Logo />
        <NavLinkList />
        <MobileButtonArea />
        <MobileNavList />
        <MobileFilterArea content={mobileFilterContent} />
      </header>
      <div className={style.shadow} />
    </div>
  );
};
