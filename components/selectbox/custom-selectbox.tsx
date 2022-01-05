import { FC, useState } from "react";
import { SelectBox, SelectOption } from "./selectbox";

type Option = {
  text: string;
  value: string;
};

export interface CustomSelectboxProps {
  options: Option[];
  defaultValue: string;
  className?: string;
  onChange?: (newValue: string) => void;
}

export const CustomSelectbox: FC<CustomSelectboxProps> = ({
  options,
  defaultValue,
  className,
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <SelectBox value={value} onChange={handleValueChange} className={className}>
      {options.map((option) => (
        <SelectOption key={option.value} value={option.value}>
          {option.text}
        </SelectOption>
      ))}
    </SelectBox>
  );
};
