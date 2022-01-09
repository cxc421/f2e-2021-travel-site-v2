import { FC, useRef, useState, MouseEventHandler, UIEventHandler } from "react";
import { Button } from "../button/button";
import style from "./horizontal-scroll.module.scss";
import previousImgSrc from "./images/previous.png";
import nextImgSrc from "./images/next.png";
import Image from "next/image";

export interface HorizontalScrollProps {}

type MoudeDownInfo = {
  pageX: number;
  scrollLeft: number;
};

export const HorizontalScroll: FC<HorizontalScrollProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<"left" | "right" | "middle">("left");
  const [isDraging, setIsDraging] = useState(false);
  const [mdInfo, setMdInfo] = useState<MoudeDownInfo>({
    pageX: 0,
    scrollLeft: 0,
  });

  const startDrag: MouseEventHandler<HTMLDivElement> = (e) => {
    if (ref.current) {
      setMdInfo({
        pageX: e.pageX,
        scrollLeft: ref.current.scrollLeft,
      });
      setIsDraging(true);
    }
  };

  const stopDrag = () => setIsDraging(false);

  const handleDrag: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isDraging && ref.current) {
      const xDiff = e.pageX - mdInfo.pageX;
      ref.current.scrollLeft = mdInfo.scrollLeft - xDiff;
    }
  };

  const updatePosition: UIEventHandler<HTMLDivElement> = () => {
    const element = ref.current;
    if (element) {
      if (element.scrollLeft === 0) {
        setPosition("left");
      } else if (
        element.scrollWidth - element.scrollLeft ===
        element.clientWidth
      ) {
        setPosition("right");
      } else {
        setPosition("middle");
      }
    }
  };

  const toRight = () => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollWidth,
        behavior: "smooth",
      });
    }
  };

  const toLeft = () => {
    if (ref.current) {
      ref.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={style.wrapper}>
      {position !== "left" && (
        <Button
          className={style.previousImg}
          bgColor="white"
          size={32}
          onClick={toLeft}
        >
          <Image src={previousImgSrc} width={24} height={24} alt="previous" />
        </Button>
      )}
      {position !== "right" && (
        <Button
          className={style.nextImg}
          bgColor="black"
          size={32}
          onClick={toRight}
        >
          <Image src={nextImgSrc} width={24} height={24} alt="next" />
        </Button>
      )}
      <div
        className={style.container}
        ref={ref}
        onMouseDown={startDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onMouseMove={handleDrag}
        onScroll={updatePosition}
      >
        {/* <div className={style.testChildren}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
        </div> */}
        {children}
      </div>
    </div>
  );
};
