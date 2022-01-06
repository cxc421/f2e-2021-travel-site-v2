import { FC } from "react";
import { SelectBox, SelectOption } from "./selectbox";

export type CategoryRestaurant = "" | "Restaurant" | "Hotel";

export const categoryRestaurantOptions: {
  value: CategoryRestaurant;
  text: string;
}[] = [
  { value: "", text: "類別" },
  { value: "Restaurant", text: "美食" },
  { value: "Hotel", text: "住宿" },
];

export interface CategoryRestaurantSelectboxProps {
  value: CategoryRestaurant;
  onChange: (value: CategoryRestaurant) => void;
  className?: string;
}

export const CategoryRestaurantSelectbox: FC<
  CategoryRestaurantSelectboxProps
> = ({ value, onChange, className }) => {
  return (
    <SelectBox
      value={value}
      onChange={(newValue) => onChange(newValue as CategoryRestaurant)}
      className={className}
    >
      {categoryRestaurantOptions.map(({ value, text }) => (
        <SelectOption key={value} value={value}>
          {text}
        </SelectOption>
      ))}
    </SelectBox>
  );
};
