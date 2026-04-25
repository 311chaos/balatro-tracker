type LogoProps = {
  size?: number;
  className?: string;
};

const Logo = ({ size = 36, className }: LogoProps) => {
  const width = Math.round(size * (175 / 36));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 175 36"
      width={width}
      height={size}
      className={className}
    >
      <defs>
        <radialGradient
          id="lbody"
          cx="16"
          cy="16"
          r="15"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="58%" stopColor="#DB663C" />
          <stop offset="58%" stopColor="#8B2800" />
          <stop offset="66%" stopColor="#8B2800" />
          <stop offset="66%" stopColor="#DB663C" />
          <stop offset="88%" stopColor="#DB663C" />
          <stop offset="88%" stopColor="#8B2800" />
        </radialGradient>
        <radialGradient
          id="lgloss"
          cx="11"
          cy="10"
          r="10"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <clipPath id="lchip">
          <circle cx="16" cy="16" r="15" />
        </clipPath>
        <linearGradient id="tgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe566" />
          <stop offset="100%" stopColor="#DB663C" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0.6 0 0 0  0.8 0.4 0 0 0  0 0 0 0 0  0 0 0 0.4 0"
            result="coloredBlur"
          />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <svg x="0" y="2" width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="17" r="15" fill="black" fillOpacity="0.25" />
        <circle cx="16" cy="16" r="15" fill="url(#lbody)" />
        <rect
          x="14"
          y="1.5"
          width="4"
          height="5.5"
          fill="#111"
          clipPath="url(#lchip)"
          transform="rotate(0   16 16)"
        />
        <rect
          x="14"
          y="1.5"
          width="4"
          height="5.5"
          fill="#FFF"
          clipPath="url(#lchip)"
          transform="rotate(45  16 16)"
        />
        <rect
          x="14"
          y="1.5"
          width="4"
          height="5.5"
          fill="#111"
          clipPath="url(#lchip)"
          transform="rotate(90  16 16)"
        />
        <rect
          x="14"
          y="1.5"
          width="4"
          height="5.5"
          fill="#FFF"
          clipPath="url(#lchip)"
          transform="rotate(135 16 16)"
        />
        <rect
          x="14"
          y="1.5"
          width="4"
          height="5.5"
          fill="#111"
          clipPath="url(#lchip)"
          transform="rotate(180 16 16)"
        />
        <rect
          x="14"
          y="1.5"
          width="4"
          height="5.5"
          fill="#FFF"
          clipPath="url(#lchip)"
          transform="rotate(225 16 16)"
        />
        <rect
          x="14"
          y="1.5"
          width="4"
          height="5.5"
          fill="#111"
          clipPath="url(#lchip)"
          transform="rotate(270 16 16)"
        />
        <rect
          x="14"
          y="1.5"
          width="4"
          height="5.5"
          fill="#FFF"
          clipPath="url(#lchip)"
          transform="rotate(315 16 16)"
        />
        <circle
          cx="16"
          cy="16"
          r="9.5"
          fill="#DB663C"
          stroke="#8B2800"
          strokeWidth="1.5"
        />
        <circle cx="16" cy="16" r="15" fill="url(#lgloss)" />
      </svg>

      <text
        x="40"
        y="19"
        fontFamily="m6x11, monospace"
        fontSize="18"
        fill="url(#tgrad)"
        filter="url(#glow)"
        letterSpacing="1"
      >
        BALATRO
      </text>
      <text
        x="41"
        y="31"
        fontFamily="m6x11, monospace"
        fontSize="9"
        fill="#a1a1aa"
        letterSpacing="4"
      >
        TRACKER
      </text>
    </svg>
  );
};

export { Logo };
