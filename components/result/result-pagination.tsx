import { IntegratedData } from "../../libs/types";
import { RefObject, FC, useState, useEffect } from "react";
import { HeaderType } from "../header/header";
import { MainSectionType } from "../main-section/main-section";
import { CardVertical } from "../card/card-vertical";
import { MainTitle } from "../main-section/main-title";
import { MainCardVerticalArea } from "../main-section/main-card-vertical-area";
import { MainPageButtonsArea } from "../main-section/main-page-button-area";
import { typeToImageBtnText } from "./libs/type-to-image-button-text";

export interface ResultPaginationProps {
  data: IntegratedData[];
  titleText: string;
  onClickCard: (data: IntegratedData) => void;
  headerRef: RefObject<HeaderType>;
  mainSectionRef: RefObject<MainSectionType>;
}

export const ResultPagination: FC<ResultPaginationProps> = ({
  data,
  titleText,
  onClickCard,
  headerRef,
  mainSectionRef,
}) => {
  const PER_PAGE_DATA_NUM = 20;
  const [page, setPage] = useState<number>(1);

  const startIdx = PER_PAGE_DATA_NUM * (page - 1);
  const endIdx = startIdx + PER_PAGE_DATA_NUM;
  const displayData = data.slice(startIdx, endIdx);
  const showPageButton = data.length > PER_PAGE_DATA_NUM;
  const totalPage = Math.ceil(data.length / PER_PAGE_DATA_NUM);

  const handleClickNextBtn = () => {
    const hasNextPage = endIdx < data.length;
    if (hasNextPage) {
      setPage((page) => page + 1);
    }
  };

  const handleClickPrevBtn = () => {
    const hasPrevPage = page > 1;
    if (hasPrevPage) {
      setPage((page) => page - 1);
    }
  };

  useEffect(() => {
    const headerElement = headerRef.current;
    const mainSectionElement = mainSectionRef.current;
    if (headerElement && mainSectionElement) {
      const root = document.getElementById("__next");
      const headerHeight = headerElement.getBoundingClientRect().height;
      const mainSectionTop = mainSectionElement.getBoundingClientRect().top;

      root?.scrollTo({
        top: root.scrollTop - (headerHeight - mainSectionTop),
        behavior: "smooth",
      });
    }
  }, [page, headerRef, mainSectionRef]);

  const cardContent = displayData.map((data) => (
    <CardVertical
      key={data.id}
      img={data.picture[0]?.url}
      title={data.name}
      location={
        data.location === "to see the official site" ||
        data.location === "詳見官網" ||
        data.location === undefined
          ? data.city || data.address
          : data.location
      }
      imageButtonText={typeToImageBtnText(data.type)}
      disKm={data.disKm}
      onClick={() => onClickCard(data)}
    />
  ));

  return (
    <>
      <MainTitle type="triangle">{titleText}</MainTitle>
      <MainCardVerticalArea>{cardContent}</MainCardVerticalArea>
      {showPageButton && (
        <MainPageButtonsArea
          onClickNextBtn={handleClickNextBtn}
          onClickPrevBtn={handleClickPrevBtn}
          page={page}
          totalPage={totalPage}
        />
      )}
    </>
  );
};
