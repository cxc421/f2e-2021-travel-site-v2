import { TdxApiType } from "../../../libs/types";

export const typeToImageBtnText = (type: TdxApiType) => {
  switch (type) {
    case "activity":
      return "活動詳情";
    case "hotel":
      return "住宿詳情";
    case "restaurant":
      return "美食詳情";
    case "scenicSpot":
      return "景點詳情";
  }
};
