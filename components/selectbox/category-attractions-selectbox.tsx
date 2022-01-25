import { FC } from "react";
import { SelectBox, SelectOption } from "./selectbox";

export type CategoryAttractions = "" | "scenicSpot" | "activity";

export const categoryAttractionOptions: {
  value: CategoryAttractions;
  text: string;
  disabled?: boolean;
}[] = [
  { value: "", text: "類別", disabled: true },
  { value: "scenicSpot", text: "景點" },
  { value: "activity", text: "活動" },
];

export interface CategoryAttractionsSelectboxProps {
  value: CategoryAttractions;
  onChange: (value: CategoryAttractions) => void;
  className?: string;
  showTooltip?: boolean;
}

export const CategoryAttractionsSelectbox: FC<
  CategoryAttractionsSelectboxProps
> = ({ value, onChange, className, showTooltip }) => {
  return (
    <SelectBox
      value={value}
      onChange={(newValue) => onChange(newValue as CategoryAttractions)}
      className={className}
      showTooltip={showTooltip}
      tooltipText="請先選擇類別"
    >
      {categoryAttractionOptions.map(({ value, text, disabled }) => (
        <SelectOption key={value} value={value} disabled={disabled}>
          {text}
        </SelectOption>
      ))}
    </SelectBox>
  );
};
