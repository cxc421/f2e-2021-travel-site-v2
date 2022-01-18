import { useEffect } from "react";

const isTrue = () => true;

export default function useLogOnce(data: any, checkFn: () => boolean = isTrue) {
  useEffect(() => {
    if (checkFn()) {
      console.log(data);
    }
  }, [data, checkFn]);
}
