import { FC, useState } from "react";
import cities, { City } from "../../constants/cities";
import { SelectBox, SelectOption } from "./selectbox";

export interface CitySelectboxProps {
  className?: string;
  onChange?: (newValue: string) => void;
}

export const CitySelectbox: FC<CitySelectboxProps> = ({ className }) => {
  const [value, setValue] = useState("all");

  return (
    <SelectBox
      className={className}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <SelectOption value="all">所有縣市</SelectOption>
      {cities.map((city) => (
        <SelectOption key={city.value} value={city.value}>
          {city.text}
        </SelectOption>
      ))}
    </SelectBox>
  );
};
