export const pxToNumber = (() => {
  let cache: { [px: string]: number } = {};

  return (px: string): number => {
    if (typeof cache[px] === "number") {
      return cache[px];
    }
    cache[px] = Number(px.split("px")[0]);
    return cache[px];
  };
})();
