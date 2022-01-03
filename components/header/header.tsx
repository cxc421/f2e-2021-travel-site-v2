import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import style from "./header.module.scss";
import logoSrc from "./images/taiwan-logo.png";

export interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <div className={style.container}>
      <Link href="/">
        <a className={style.logo}>
          <Image src={logoSrc} width={99} height={57} alt="logo" />
        </a>
      </Link>
    </div>
  );
};
