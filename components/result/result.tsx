import { RefObject, FC, useCallback, useEffect } from "react";
import type { IntegratedData } from "../../libs/types";
import type { HeaderType } from "../header/header";
import type { MainSectionType } from "../main-section/main-section";
import { useState } from "react";
import { ResultPagination } from "./result-pagination";
import { ResultInfiniteScroll } from "./result-infinite-scroll";
import { getViewWidth } from "./libs/get-view-width";

type ResultDisplay = "pagination" | "infinite-scroll";
function useResultDisplay(): ResultDisplay {
  const getDisplay = useCallback(() => {
    const vw = getViewWidth();
    if (vw > 768) {
      return "pagination" as const;
    }
    return "infinite-scroll" as const;
  }, []);
  const [display, setDisplay] = useState<ResultDisplay>(getDisplay);

  useEffect(() => {
    const updateDisplay = () => {
      setDisplay(getDisplay());
    };
    window.addEventListener("resize", updateDisplay);
    return () => window.removeEventListener("resize", updateDisplay);
  }, [getDisplay]);

  return display;
}

export interface ResultSectionProps {
  data: IntegratedData[];
  dataTotal: number;
  loadMore: (amount?: number) => void;
  titleText: string;
  onClickCard: (data: IntegratedData) => void;
  headerRef: RefObject<HeaderType>;
  mainSectionRef: RefObject<MainSectionType>;
}

export const ResultSection: FC<ResultSectionProps> = (props) => {
  const display = useResultDisplay();

  if (display === "pagination") {
    return <ResultPagination {...props} />;
  }

  return (
    <ResultInfiniteScroll
      data={props.data}
      dataTotal={props.dataTotal}
      loadMore={props.loadMore}
      onClickCard={props.onClickCard}
      titleText={props.titleText}
    />
  );
};
