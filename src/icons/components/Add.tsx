import type { SVGProps } from "react";
const SvgAdd = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#Add_svg__a)">
      <path fill="#999" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
    </g>
    <defs>
      <clipPath id="Add_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgAdd;
