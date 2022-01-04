import { FC, useState } from "react";
import { SelectBox, SelectOption } from "../selectbox/selectbox";

export interface CategorySelectboxProps {
  className?: string;
  onChange?: (newValue: string) => void;
}

export const CategorySelectbox: FC<CategorySelectboxProps> = ({
  className,
  onChange,
}) => {
  const [value, setValue] = useState("1");

  return (
    <SelectBox value={value} onChange={(newValue) => setValue(newValue)}>
      <SelectOption value={"1"}>類別</SelectOption>
      <SelectOption value={"2"}>景點</SelectOption>
      <SelectOption value={"3"}>活動</SelectOption>
    </SelectBox>
  );
};
