import {
  ChangeEventHandler,
  FC,
  forwardRef,
  KeyboardEventHandler,
} from "react";
import cn from "classnames";
import style from "./searchbox.module.scss";

export interface SearchboxProps {
  value: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onTypeEnter?: () => void;
}

export type SearchboxType = HTMLInputElement;

export const Searchbox = forwardRef<SearchboxType, SearchboxProps>(
  ({ value, onChange, className, onTypeEnter }, ref) => {
    const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === "Enter" && onTypeEnter) {
        onTypeEnter();
      }
    };

    return (
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={onChange}
        placeholder="搜尋關鍵字"
        className={cn(style.searchInput, className)}
        onKeyUp={handleKeyUp}
      />
    );
  }
);
Searchbox.displayName = "SearchBox";
