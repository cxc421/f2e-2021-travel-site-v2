import { Dispatch, SetStateAction, FC, RefObject, isValidElement } from "react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  Children,
} from "react";
import cn from "classnames";
import style from "./selectbox.module.scss";

/**
 * Select Context
 */
interface SelectContent {
  value: string;
  showList: boolean;
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
  const { value, showList, handleOptionMouseDown } = useSelectContent();

  return (
    <div
      className={cn(style.option, { [style.inList]: showList })}
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
  const [maxHeight, setMaxHeight] = useState(40);

  useEffect(() => {
    if (showList) {
      if (ref && ref.current) {
        const { top } = ref.current.getBoundingClientRect();
        const viewHight = document.documentElement.clientHeight;
        const optionHeight = 40;
        const maxDisplayOptionNum = Math.max(
          2,
          Math.floor((viewHight - top) / optionHeight) - 1
        );
        const maxHeight = maxDisplayOptionNum * optionHeight;
        setMaxHeight(maxHeight);
      }
    } else {
      setMaxHeight(40);
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
}

export const SelectBox: FC<SelectBoxProps> = ({
  value,
  onChange,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showList, setShowList] = useShowList(ref);
  const maxHeight = useMaxHeight(ref, showList);
  const selectChild = Children.toArray(children).find((child) =>
    isValidElement(child) ? child.props.value === value : false
  );
  const selectText = isValidElement(selectChild)
    ? selectChild.props.children
    : "";
  const contextValue: SelectContent = {
    value,
    showList,
    handleOptionMouseDown(newValue) {
      setShowList((show) => !show);
      if (newValue !== value) {
        onChange(newValue);
      }
    },
  };

  return (
    <div ref={ref} className={style.container} style={{ maxHeight }}>
      <SelectCtx.Provider value={contextValue}>
        {!showList ? (
          <>
            <SelectOption value={value}>{selectText}</SelectOption>
            {/* <img
              className={styles.dropdownIcon}
              src={downIconSrc}
              alt="drop down"
              onMouseDown={() => setShowList(true)}
            /> */}
          </>
        ) : (
          children
        )}
      </SelectCtx.Provider>
    </div>
  );
};
