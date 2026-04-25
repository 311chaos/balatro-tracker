export const contentType = 'image/svg+xml';
export const size = { width: 32, height: 32 };

type ChipColors = { chip: string; ring: string };

const ENV_COLORS: Record<string, ChipColors> = {
  production: { chip: '#DB663C', ring: '#8B2800' }, // orange
  preview: { chip: '#2288DD', ring: '#114477' }, // blue
};

const LOCAL_COLORS: ChipColors = { chip: '#339944', ring: '#1A5522' }; // green

const getColors = (): ChipColors =>
  ENV_COLORS[process.env.VERCEL_ENV ?? ''] ?? LOCAL_COLORS;

const buildSvg = ({ chip, ring }: ChipColors) =>
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <radialGradient id="body" cx="16" cy="16" r="15" gradientUnits="userSpaceOnUse">
      <stop offset="58%" stop-color="${chip}"/>
      <stop offset="58%" stop-color="${ring}"/>
      <stop offset="66%" stop-color="${ring}"/>
      <stop offset="66%" stop-color="${chip}"/>
      <stop offset="88%" stop-color="${chip}"/>
      <stop offset="88%" stop-color="${ring}"/>
    </radialGradient>
    <radialGradient id="gloss" cx="11" cy="10" r="10" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="white" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="chip">
      <circle cx="16" cy="16" r="15"/>
    </clipPath>
  </defs>
  <circle cx="16" cy="17" r="15" fill="black" fill-opacity="0.25"/>
  <circle cx="16" cy="16" r="15" fill="url(#body)"/>
  <rect x="14" y="1.5" width="4" height="5.5" fill="#111111" clip-path="url(#chip)" transform="rotate(0   16 16)"/>
  <rect x="14" y="1.5" width="4" height="5.5" fill="#FFFFFF" clip-path="url(#chip)" transform="rotate(45  16 16)"/>
  <rect x="14" y="1.5" width="4" height="5.5" fill="#111111" clip-path="url(#chip)" transform="rotate(90  16 16)"/>
  <rect x="14" y="1.5" width="4" height="5.5" fill="#FFFFFF" clip-path="url(#chip)" transform="rotate(135 16 16)"/>
  <rect x="14" y="1.5" width="4" height="5.5" fill="#111111" clip-path="url(#chip)" transform="rotate(180 16 16)"/>
  <rect x="14" y="1.5" width="4" height="5.5" fill="#FFFFFF" clip-path="url(#chip)" transform="rotate(225 16 16)"/>
  <rect x="14" y="1.5" width="4" height="5.5" fill="#111111" clip-path="url(#chip)" transform="rotate(270 16 16)"/>
  <rect x="14" y="1.5" width="4" height="5.5" fill="#FFFFFF" clip-path="url(#chip)" transform="rotate(315 16 16)"/>
  <circle cx="16" cy="16" r="9.5" fill="${chip}" stroke="${ring}" stroke-width="1.5"/>
  <circle cx="16" cy="16" r="15" fill="url(#gloss)"/>
</svg>`.trim();

const Icon = () =>
  new Response(buildSvg(getColors()), {
    headers: { 'Content-Type': 'image/svg+xml' },
  });

export default Icon;
