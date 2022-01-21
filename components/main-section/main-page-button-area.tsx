import { FC } from "react";
import { NextButton } from "../button/next-button";
import { PreviousButton } from "../button/previous-button";
import style from "./main-page-button-area.module.scss";

export interface MainPageButtonsAreaProps {
  onClickPrevBtn: () => void;
  onClickNextBtn: () => void;
  page: number;
}

export const MainPageButtonsArea: FC<MainPageButtonsAreaProps> = ({
  onClickNextBtn,
  onClickPrevBtn,
  page,
}) => (
  <div className={style.container}>
    <PreviousButton size={32} onClick={onClickPrevBtn} bgColor="black" />
    <span className={style.numberText}>{page}</span>
    <NextButton size={32} onClick={onClickNextBtn} bgColor="red" />
  </div>
);
