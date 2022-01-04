import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { Button } from "../button/button";
import { NavLink } from "../nav-link/nav-link";
import style from "./header.module.scss";
import logoSrc from "./images/taiwan-logo.png";
import gpsImgSrc from "./images/gps.png";
import searchImgSrc from "./images/search.png";

export interface HeaderProps {}

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

export const Header: FC<HeaderProps> = () => {
  const router = useRouter();
  console.log(router.pathname);

  return (
    <>
      <div className={style.container}>
        <Logo />
        <NavLinkList />
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
      </div>
      <div className={style.shadow} />
      <div className={style.placeHolder} />
    </>
  );
};
