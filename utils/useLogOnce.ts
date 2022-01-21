import { useEffect } from "react";

const isTrue = () => true;
const log = (data: any) => console.log(data);

export default function useLogOnce(
  data: any,
  checkFn: () => boolean = isTrue,
  execFn: (data: any) => void = log
) {
  useEffect(() => {
    if (checkFn()) {
      execFn(data);
    }
  }, [data, checkFn, execFn]);
}
