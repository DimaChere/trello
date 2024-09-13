import type { SVGProps } from "react";
const SvgChat = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <g clipPath="url(#Chat_svg__a)">
      <path
        fill="#000"
        d="M2.833 2.833h11.334v8.5H3.662l-.829.83zm0-1.416c-.779 0-1.41.637-1.41 1.416l-.006 12.75L4.25 12.75h9.917a1.42 1.42 0 0 0 1.416-1.417v-8.5a1.42 1.42 0 0 0-1.416-1.416zM4.25 8.5h5.667v1.417H4.25zm0-2.125h8.5v1.417h-8.5zm0-2.125h8.5v1.417h-8.5z"
      />
    </g>
    <defs>
      <clipPath id="Chat_svg__a">
        <path fill="#fff" d="M0 0h17v17H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgChat;
