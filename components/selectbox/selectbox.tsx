import { Dispatch, SetStateAction, FC, RefObject, isValidElement } from "react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  Children,
} from "react";
import Image from "next/image";
import cn from "classnames";
import style from "./selectbox.module.scss";
import dropdownImgSrc from "./images/dropdown.png";

/**
 * Select Context
 */
interface SelectContent {
  value: string;
  handleOptionMouseDown: (optionValue: string) => void;
}

const SelectCtx = createContext<SelectContent | null>(null);
SelectCtx.displayName = "SelectContext";

function useSelectContent() {
  const value = useContext(SelectCtx);
  if (!value) {
    throw new Error(`userSelectContent() must be used within SelectBox`);
  }
  return value;
}

/**
 * Select Option
 */
export interface SelectOptionProps {
  value: string;
}

export const SelectOption: FC<SelectOptionProps> = ({
  value: optionValue,
  children,
}) => {
  const { value, handleOptionMouseDown } = useSelectContent();

  return (
    <div
      className={cn(style.option)}
      data-selected={value === optionValue}
      onMouseDown={() => handleOptionMouseDown(optionValue)}
    >
      <div className={style.optionText}>{children}</div>
    </div>
  );
};

/**
 * Select Box
 */
function useMaxHeight(ref: RefObject<HTMLDivElement>, showList: boolean) {
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (showList) {
      if (ref && ref.current) {
        const { top, height } = ref.current.getBoundingClientRect();
        const viewHight = document.documentElement.clientHeight;
        const maxDisplayOptionNum = Math.max(
          2,
          Math.floor((viewHight - top) / height) - 1
        );
        const maxHeight = maxDisplayOptionNum * height;
        setMaxHeight(maxHeight);
      }
    } else {
      setMaxHeight(0);
    }
  }, [ref, showList]);

  return maxHeight;
}

function useShowList(
  ref: RefObject<HTMLDivElement>
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (showList) {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setShowList(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside, true);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside, true);
      };
    }
  }, [ref, showList]);

  return [showList, setShowList];
}

export interface SelectBoxProps {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
}

export const SelectBox: FC<SelectBoxProps> = ({
  value,
  onChange,
  className,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showList, setShowList] = useShowList(ref);
  const maxHeight = useMaxHeight(ref, showList);
  const selectOption = Children.toArray(children).find((child) =>
    isValidElement(child) ? child.props.value === value : false
  );
  const contextValue: SelectContent = {
    value,
    handleOptionMouseDown(newValue) {
      setShowList((show) => !show);
      if (newValue !== value) {
        onChange(newValue);
      }
    },
  };

  return (
    <div ref={ref} className={cn(style.container, className)}>
      <SelectCtx.Provider value={contextValue}>
        {selectOption}
        <div className={style.dropdownImgArea}>
          <Image
            src={dropdownImgSrc}
            width={25}
            height={24}
            alt="drop down"
            onMouseDown={() => setShowList(true)}
          />
        </div>

        {showList && (
          <div className={style.dropdownList} style={{ maxHeight }}>
            {children}
          </div>
        )}
      </SelectCtx.Provider>
    </div>
  );
};
