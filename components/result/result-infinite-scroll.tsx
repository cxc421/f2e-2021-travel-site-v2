import { FC, memo, useState } from "react";
import VirtualScroller from "virtual-scroller/react";
import { IntegratedData } from "../../libs/types";
import { MainTitle } from "../main-section/main-title";
import { CardVertical } from "../card/card-vertical";
import { typeToImageBtnText } from "./libs/type-to-image-button-text";
import vcardAreaStyle from "../main-section/main-card-vertical-area.module.scss";

const pxToNumber = (() => {
  let cache: { [px: string]: number } = {};

  return (px: string): number => {
    if (typeof cache[px] === "number") {
      return cache[px];
    }
    cache[px] = Number(px.split("px")[0]);
    return cache[px];
  };
})();

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
  titleText: string;
  onClickCard: (data: IntegratedData) => void;
}

export const ResultInfiniteScroll: FC<ResultInfiniteScrollProps> = ({
  data,
  titleText,
  onClickCard,
}) => {
  const [scrollableContainer] = useState(() =>
    document.getElementById("__next")
  );

  return (
    <>
      <MainTitle type="triangle">{titleText}</MainTitle>
      <VirtualScroller
        className={vcardAreaStyle.container}
        items={data}
        itemComponent={VirtualScrollerCardVertical}
        itemComponentProps={{ onClickCard }}
        preserveScrollPositionOnPrependItems
        // @ts-ignore
        getColumnsCount={getColumnsCount}
        scrollableContainer={scrollableContainer}
      />
    </>
  );
};
