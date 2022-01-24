import { FC } from "react";
import { SelectBox, SelectOption } from "./selectbox";

export type CategoryAttractions = "" | "scenicSpot" | "activity";

export const categoryAttractionOptions: {
  value: CategoryAttractions;
  text: string;
}[] = [
  { value: "", text: "類別" },
  { value: "scenicSpot", text: "景點" },
  { value: "activity", text: "活動" },
];

export interface CategoryAttractionsSelectboxProps {
  value: CategoryAttractions;
  onChange: (value: CategoryAttractions) => void;
  className?: string;
}

export const CategoryAttractionsSelectbox: FC<
  CategoryAttractionsSelectboxProps
> = ({ value, onChange, className }) => {
  return (
    <SelectBox
      value={value}
      onChange={(newValue) => onChange(newValue as CategoryAttractions)}
      className={className}
    >
      {categoryAttractionOptions.map(({ value, text }) => (
        <SelectOption key={value} value={value}>
          {text}
        </SelectOption>
      ))}
    </SelectBox>
  );
};
