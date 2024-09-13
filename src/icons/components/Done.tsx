import type { SVGProps } from "react";
const SvgDone = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M20.293 5.293 9 16.586l-4.293-4.293-1.414 1.414L9 19.414 21.707 6.707z"
    />
  </svg>
);
export default SvgDone;
