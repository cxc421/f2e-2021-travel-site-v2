import { FC, memo, useRef } from "react";
import VirtualScroller from "virtual-scroller/react";
import { IntegratedData } from "../../libs/types";
import { MainTitle, MainTitleProps } from "../main-section/main-title";
import { CardVertical } from "../card/card-vertical";
import { typeToImageBtnText } from "./libs/type-to-image-button-text";
import vcardAreaStyle from "../main-section/main-card-vertical-area.module.scss";
import { pxToNumber } from "./libs/px-to-number";

function getColumnsCount(container: any) {
  const width = container.getWidth();
  // console.log({ width, a: vcardAreaStyle.screenDesktop });
  if (width > pxToNumber(vcardAreaStyle.screenDesktopSmall)) {
    // console.log(`coulmn count = ${vcardAreaStyle.vcardColumnDesktop}`);
    return Number(vcardAreaStyle.vcardColumnDesktop);
  }
  if (width > pxToNumber(vcardAreaStyle.screenTablet)) {
    // console.log(`coulmn count = ${vcardAreaStyle.vcardColumnDesktopSmall}`);
    return Number(vcardAreaStyle.vcardColumnDesktopSmall);
  }
  if (width > pxToNumber(vcardAreaStyle.screenMobile)) {
    // console.log(`coulmn count = ${vcardAreaStyle.vcardColumnTablet}`);
    return Number(vcardAreaStyle.vcardColumnTablet);
  }
  // console.log(`coulmn count = ${vcardAreaStyle.vcardColumnMobile}`);
  return Number(vcardAreaStyle.vcardColumnMobile);
}

interface VirtualScrollerCardVerticalProps {
  children: IntegratedData;
  onClickCard: (data: IntegratedData) => void;
}

const VirtualScrollerCardVertical = memo(
  ({ children: data, onClickCard }: VirtualScrollerCardVerticalProps) => (
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
  )
);
VirtualScrollerCardVertical.displayName = "VirtualScrollerCardVertical";

export interface ResultInfiniteScrollProps {
  data: IntegratedData[];
  dataTotal: number;
  loadMore: (amount?: number) => void;
  titleText: string;
  titleType: MainTitleProps["type"];
  onClickCard: (data: IntegratedData) => void;
  scrollableContainer: HTMLElement | null;
}

export const ResultInfiniteScroll: FC<ResultInfiniteScrollProps> = ({
  data,
  dataTotal,
  loadMore,
  titleText,
  titleType,
  onClickCard,
  scrollableContainer,
}) => {
  // Fix VirtualScroller not update onStateChange change issue
  const dataTotalRef = useRef(0);
  const loadMoreRef = useRef(loadMore);
  dataTotalRef.current = dataTotal;
  loadMoreRef.current = loadMore;
  const onVirtualScrollerStateChange = ({ items, lastShownItemIndex }: any) => {
    const curDataNum = items.length;
    const dataTotal = dataTotalRef.current;
    const loadMore = loadMoreRef.current;
    // console.log({ lastShownItemIndex, curDataNum, dataTotal });
    if (curDataNum !== dataTotal && curDataNum - lastShownItemIndex < 100) {
      // console.log(`Trigger loadMore`);
      loadMore();
    }
  };

  return (
    <>
      <MainTitle type={titleType}>{titleText}</MainTitle>
      <VirtualScroller
        className={vcardAreaStyle.container}
        items={data}
        itemComponent={VirtualScrollerCardVertical}
        itemComponentProps={{ onClickCard }}
        preserveScrollPositionOnPrependItems
        // @ts-ignore
        getColumnsCount={getColumnsCount}
        scrollableContainer={scrollableContainer}
        onStateChange={onVirtualScrollerStateChange}
      />
    </>
  );
};
