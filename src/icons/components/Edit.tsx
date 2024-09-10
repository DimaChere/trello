import type { SVGProps } from "react";
const SvgEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#999"
      d="M18.414 2a1 1 0 0 0-.707.293l-2 2-1.414 1.414L3 17v4h4L21.707 6.293a1 1 0 0 0 0-1.414l-2.586-2.586A1 1 0 0 0 18.414 2m0 2.414 1.172 1.172-1.293 1.293-1.172-1.172zm-2.707 2.707 1.172 1.172L6.172 19H5v-1.172z"
    />
  </svg>
);
export default SvgEdit;
