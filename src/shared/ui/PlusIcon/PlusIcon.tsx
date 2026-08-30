interface PlusIconProps {
  size?: number;
  lineClassName?: string;
}

export const PlusIcon = ({ size = 24, lineClassName }: PlusIconProps) => {
  const half = size / 2;
  const pad = Math.round(size / 6);
  const from = pad;
  const to = size - pad;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1={half}
        y1={from}
        x2={half}
        y2={to}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={lineClassName}
      />
      <line
        x1={from}
        y1={half}
        x2={to}
        y2={half}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
