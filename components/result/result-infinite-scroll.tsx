import { FC, useState } from "react";
import { IntegratedData } from "../../libs/types";
import { MainTitle } from "../main-section/main-title";
import { MainCardVerticalArea } from "../main-section/main-card-vertical-area";
import { CardVertical } from "../card/card-vertical";
import { typeToImageBtnText } from "./libs/type-to-image-button-text";

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
  const [displayData, setDisplayData] = useState<IntegratedData[]>(() => data);

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
    </>
  );
};
