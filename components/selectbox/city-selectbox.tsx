import { FC } from "react";
import { SelectBox, SelectOption } from "./selectbox";

export type CityValue =
  | ""
  | "臺北市"
  | "新北市"
  | "桃園市"
  | "臺中市"
  | "臺南市"
  | "高雄市"
  | "基隆市"
  | "新竹市"
  | "新竹縣"
  | "苗栗縣"
  | "彰化縣"
  | "南投縣"
  | "雲林縣"
  | "嘉義縣"
  | "嘉義市"
  | "屏東縣"
  | "宜蘭縣"
  | "花蓮縣"
  | "臺東縣"
  | "金門縣"
  | "澎湖縣"
  | "連江縣";

export const cityOptions: {
  value: CityValue;
  text: string;
}[] = [
  { text: "所有縣市", value: "" },
  { text: "台北市", value: "臺北市" },
  { text: "新北市", value: "新北市" },
  { text: "桃園市", value: "桃園市" },
  { text: "台中市", value: "臺中市" },
  { text: "台南市", value: "臺南市" },
  { text: "高雄市", value: "高雄市" },
  { text: "基隆市", value: "基隆市" },
  { text: "新竹市", value: "新竹市" },
  { text: "新竹縣", value: "新竹縣" },
  { text: "苗栗縣", value: "苗栗縣" },
  { text: "彰化縣", value: "彰化縣" },
  { text: "南投縣", value: "南投縣" },
  { text: "雲林縣", value: "雲林縣" },
  { text: "嘉義縣", value: "嘉義縣" },
  { text: "嘉義市", value: "嘉義市" },
  { text: "屏東縣", value: "屏東縣" },
  { text: "宜蘭縣", value: "宜蘭縣" },
  { text: "花蓮縣", value: "花蓮縣" },
  { text: "台東縣", value: "臺東縣" },
  { text: "金門縣", value: "金門縣" },
  { text: "澎湖縣", value: "澎湖縣" },
  { text: "連江縣", value: "連江縣" },
];

export interface CitySelectboxProps {
  value: CityValue;
  onChange: (value: CityValue) => void;
  className?: string;
}

export const CitySelectbox: FC<CitySelectboxProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <SelectBox
      value={value}
      onChange={(newValue) => onChange(newValue as CityValue)}
      className={className}
    >
      {cityOptions.map(({ value, text }) => (
        <SelectOption key={value} value={value}>
          {text}
        </SelectOption>
      ))}
    </SelectBox>
  );
};
