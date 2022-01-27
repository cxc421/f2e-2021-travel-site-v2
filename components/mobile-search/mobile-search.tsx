import { FC, useState } from "react";
import { SearchButton } from "../button/search-button";
import { Searchbox } from "../searchbox/searchbox";
import style from "./mobile-search.module.scss";

export interface MobileSearchProps {}

export const MobileSearch: FC<MobileSearchProps> = ({}) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={style.container}>
      <div className={style.top}>
        <Searchbox
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <SearchButton size={40} />
      </div>
      <div className={style.center}>
        <div className={style.clearSearchArea}>
          <button>清除搜尋記錄</button>
        </div>
        <ul className={style.searhHistoryList}>
          <li>跨年晚會</li>
          <li>夜市</li>
          <li>音樂會</li>
          <li>畫展</li>
          <li>歌手</li>
        </ul>
      </div>
      <div className={style.bottom}>
        Taiwan Tourguide © Code: Chris Chuang / Design: KT
      </div>
    </div>
  );
};
