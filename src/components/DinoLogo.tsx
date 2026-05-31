// Stylized recreation of the Dino (Dino Polska) wordmark + mascot for editorial use.
export default function DinoLogo({ height = 28 }: { height?: number }) {
  // viewBox is 200x80 → keep aspect ratio
  const width = (height * 200) / 80
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Dino"
      role="img"
    >
      {/* mascot — friendly long-neck dino */}
      <g fill="#34a93a">
        <path d="M44 70c-9 0-16-6-16-16 0-8 4-13 4-20 0-9-4-12-4-20 0-7 5-12 12-12 6 0 10 4 11 10 1 5-1 9-1 13 0 6 4 9 9 11 6 2 11 6 11 14 0 12-9 20-21 20H44z" />
      </g>
      {/* belly highlight */}
      <path d="M46 64c-6 0-10-4-10-11 0-5 3-8 3-13 6 3 9 8 9 14 0 4-1 7-2 10z" fill="#5fc065" />
      {/* eye */}
      <circle cx="46" cy="20" r="3.4" fill="#fff" />
      <circle cx="47" cy="20.5" r="1.7" fill="#16301a" />

      {/* wordmark: Dino */}
      <text
        x="86"
        y="58"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="46"
        fontWeight="700"
        fill="#34a93a"
        letterSpacing="-1"
      >
        Dino
      </text>
    </svg>
  )
}
