export const prepareSvgForInline = (svg: string) => {
  return svg
    .replace(/width="24(px)?"/gi, 'width="100%"')
    .replace(/height="24(px)?"/gi, 'height="100%"')
    .replace(/\sfill="(?!none)[^"]*"/gi, ' fill="currentColor"')
    .replace(/\sstroke="(?!none)[^"]*"/gi, ' stroke="currentColor"');
};
