import {
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  MouseEvent,
} from "react";
import cn from "classnames";
import { SearchButton } from "../button/search-button";
import { Searchbox, SearchboxType } from "../searchbox/searchbox";
import style from "./search-panel.module.scss";

export interface SearchPanelProps {
  show: boolean;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  onHide: () => void;
  searchHistory: string[];
  clearSearchHistory: (idx?: number) => void;
}

export const SearchPanel: FC<SearchPanelProps> = ({
  show,
  onHide,
  searchText,
  setSearchText,
  searchHistory,
  clearSearchHistory,
}) => {
  const searchboxRef = useRef<SearchboxType>(null);

  useEffect(() => {
    const searchboxElement = searchboxRef.current;
    if (show) {
      searchboxElement?.focus();
    } else {
      searchboxElement?.blur();
    }
  }, [show]);

  const handleClickHistorySearchTerm = (searchTerm: string) => {
    setSearchText(searchTerm);
  };

  const handleClearAllHistory = () => clearSearchHistory();

  const handleClickClickSingleHistory = (
    e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
    idx: number
  ) => {
    e.stopPropagation();
    clearSearchHistory(idx);
  };

  return (
    <div className={cn(style.container, show ? style.show : style.hide)}>
      <div className={style.top}>
        <Searchbox
          ref={searchboxRef}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onTypeEnter={onHide}
        />
        <SearchButton size={40} onClick={onHide} />
      </div>
      <div className={style.center}>
        {searchHistory.length > 0 && (
          <>
            <div className={style.clearSearchArea}>
              <button onClick={handleClearAllHistory}>清除搜尋記錄</button>
            </div>
            <ul className={style.searhHistoryList}>
              {searchHistory.map((searchTerm, idx) => (
                <li
                  key={idx}
                  onClick={() => handleClickHistorySearchTerm(searchTerm)}
                >
                  <span className={style.historyText}>{searchTerm}</span>
                  <span
                    className={style.closeIcon}
                    onClick={(e) => handleClickClickSingleHistory(e, idx)}
                  >
                    ❌
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className={style.bottom}>
        Taiwan Tourguide © Code: Chris Chuang / Design: KT
      </div>
    </div>
  );
};
