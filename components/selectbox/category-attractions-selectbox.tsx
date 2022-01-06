import { FC } from "react";
import { SelectBox, SelectOption } from "./selectbox";

export type CategoryAttractions = "" | "ScenicSpot" | "Activity";

export const categoryAttractionOptions: {
  value: CategoryAttractions;
  text: string;
}[] = [
  { value: "", text: "類別" },
  { value: "ScenicSpot", text: "景點" },
  { value: "Activity", text: "活動" },
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
