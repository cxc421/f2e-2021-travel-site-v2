import { FC } from "react";
import { SelectBox, SelectOption } from "./selectbox";

export type City =
  | ""
  | "Taipei"
  | "NewTaipei"
  | "Taoyuan"
  | "Taichung"
  | "Tainan"
  | "Kaohsiung"
  | "Keelung"
  | "Hsinchu"
  | "HsinchuCounty"
  | "MiaoliCounty"
  | "ChanghuaCounty"
  | "NantouCounty"
  | "YunlinCounty"
  | "ChiayiCounty"
  | "Chiayi"
  | "PingtungCounty"
  | "YilanCounty"
  | "HualienCounty"
  | "TaitungCounty"
  | "KinmenCounty"
  | "PenghuCounty"
  | "LienchiangCounty";

export const cityOptions: {
  value: City;
  text: string;
}[] = [
  { text: "所有縣市", value: "" },
  { text: "台北市", value: "Taipei" },
  { text: "新北市", value: "NewTaipei" },
  { text: "桃園市", value: "Taoyuan" },
  { text: "台中市", value: "Taichung" },
  { text: "台南市", value: "Tainan" },
  { text: "高雄市", value: "Kaohsiung" },
  { text: "基隆市", value: "Keelung" },
  { text: "新竹市", value: "Hsinchu" },
  { text: "新竹縣", value: "HsinchuCounty" },
  { text: "苗栗縣", value: "MiaoliCounty" },
  { text: "彰化縣", value: "ChanghuaCounty" },
  { text: "南投縣", value: "NantouCounty" },
  { text: "雲林縣", value: "YunlinCounty" },
  { text: "嘉義縣", value: "ChiayiCounty" },
  { text: "嘉義市", value: "Chiayi" },
  { text: "屏東縣", value: "PingtungCounty" },
  { text: "宜蘭縣", value: "YilanCounty" },
  { text: "花蓮縣", value: "HualienCounty" },
  { text: "台東縣", value: "TaitungCounty" },
  { text: "金門縣", value: "KinmenCounty" },
  { text: "澎湖縣", value: "PenghuCounty" },
  { text: "連江縣", value: "LienchiangCounty" },
];

export interface CitySelectboxProps {
  value: City;
  onChange: (value: City) => void;
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
      onChange={(newValue) => onChange(newValue as City)}
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
