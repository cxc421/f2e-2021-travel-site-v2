import { ChangeEventHandler, FC, KeyboardEventHandler } from "react";
import cn from "classnames";
import style from "./searchbox.module.scss";

export interface SearchboxProps {
  value: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onTypeEnter?: () => void;
}

export const Searchbox: FC<SearchboxProps> = ({
  value,
  onChange,
  className,
  onTypeEnter,
}) => {
  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && onTypeEnter) {
      onTypeEnter();
    }
  };

  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      placeholder="搜尋關鍵字"
      className={cn(style.searchInput, className)}
      onKeyUp={handleKeyUp}
    />
  );
};
