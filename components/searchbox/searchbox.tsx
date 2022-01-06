import { ChangeEventHandler, FC } from "react";
import cn from "classnames";
import style from "./searchbox.module.scss";

export interface SearchboxProps {
  value: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Searchbox: FC<SearchboxProps> = ({
  value,
  onChange,
  className,
}) => (
  <input
    type="search"
    value={value}
    onChange={onChange}
    placeholder="搜尋關鍵字"
    className={cn(style.searchInput, className)}
  />
);
