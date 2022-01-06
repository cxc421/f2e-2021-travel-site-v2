import { FC, MouseEventHandler } from "react";
import Image from "next/image";
import { Button } from "./button";
import searchImgSrc from "./images/search.png";

export interface SearchButtonProps {
  size: number;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  title?: string;
}

export const SearchButton: FC<SearchButtonProps> = ({
  size,
  className,
  onClick,
  title,
}) => (
  <Button size={size} className={className} onClick={onClick} bgColor="red">
    <Image
      src={searchImgSrc}
      width={18}
      height={18}
      title={title}
      alt="search"
    />
  </Button>
);
