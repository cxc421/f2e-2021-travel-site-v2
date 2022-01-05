import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import cn from "classnames";
import { Button } from "../button/button";
import { NavLink } from "../nav-link/nav-link";
import style from "./header.module.scss";
import logoSrc from "./images/taiwan-logo.png";
import gpsImgSrc from "./images/gps.png";
import searchImgSrc from "./images/search.png";

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
    <Button size={30} bgColor="red">
      <Image
        src={searchImgSrc}
        width={18}
        height={18}
        title="Go to search page"
        alt="search"
      />
    </Button>
    <Button size={30} bgColor="yellow">
      <Image
        src={gpsImgSrc}
        width={16}
        height={22}
        title="Get current location"
        alt="gps"
      />
    </Button>
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
    <>
      <div className={style.container}>
        <Logo />
        <NavLinkList />
        <MobileButtonArea />
        <MobileNavList />
        <MobileFilterArea content={mobileFilterContent} />
      </div>
      <div className={style.shadow} />
      <div className={style.placeHolder} />
    </>
  );
};
