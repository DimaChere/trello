import type { SVGProps } from "react";
const SvgSend = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#999"
      d="M3 20V4l19 8zm2-3 11.85-5L5 7v3.5l6 1.5-6 1.5zm0 0V7v10"
    />
  </svg>
);
export default SvgSend;
