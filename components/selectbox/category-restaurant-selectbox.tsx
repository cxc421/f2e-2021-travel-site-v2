import { FC } from "react";
import { SelectBox, SelectOption } from "./selectbox";

export type CategoryRestaurant = "" | "restaurant" | "hotel";

export const categoryRestaurantOptions: {
  value: CategoryRestaurant;
  text: string;
}[] = [
  { value: "", text: "類別" },
  { value: "restaurant", text: "美食" },
  { value: "hotel", text: "住宿" },
];

export interface CategoryRestaurantSelectboxProps {
  value: CategoryRestaurant;
  onChange: (value: CategoryRestaurant) => void;
  className?: string;
  showTooltip?: boolean;
}

export const CategoryRestaurantSelectbox: FC<
  CategoryRestaurantSelectboxProps
> = ({ value, onChange, className, showTooltip }) => {
  return (
    <SelectBox
      value={value}
      onChange={(newValue) => onChange(newValue as CategoryRestaurant)}
      className={className}
      showTooltip={showTooltip}
      tooltipText="請先選擇類別"
    >
      {categoryRestaurantOptions.map(({ value, text }) => (
        <SelectOption key={value} value={value}>
          {text}
        </SelectOption>
      ))}
    </SelectBox>
  );
};
