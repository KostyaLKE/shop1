export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 420 480"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-h-[420px]"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="glowBg" cx="50%" cy="58%" r="50%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="phoneBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e2d42" />
          <stop offset="100%" stopColor="#0f1c2e" />
        </linearGradient>
        <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#172340" />
          <stop offset="100%" stopColor="#0c1525" />
        </linearGradient>
        <linearGradient id="btnGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* ── Background glow ── */}
      <ellipse cx="210" cy="280" rx="160" ry="130" fill="url(#glowBg)" filter="url(#softBlur)" />

      {/* ── Outer dashed case border ── */}
      <rect x="122" y="48" width="176" height="340" rx="38"
        fill="none" stroke="#2563EB" strokeWidth="1.8"
        strokeDasharray="10 6" opacity="0.35" />

      {/* ── Phone shadow ── */}
      <ellipse cx="210" cy="408" rx="68" ry="14" fill="#000" opacity="0.18" />

      {/* ── Phone body ── */}
      <rect x="130" y="56" width="160" height="324" rx="32" fill="url(#phoneBody)" />

      {/* ── Side buttons ── */}
      <rect x="128" y="148" width="4" height="28" rx="2" fill="#2d3f55" />
      <rect x="128" y="184" width="4" height="28" rx="2" fill="#2d3f55" />
      <rect x="288" y="162" width="4" height="46" rx="2" fill="#2d3f55" />

      {/* ── Screen ── */}
      <rect x="140" y="74" width="140" height="288" rx="22" fill="url(#screen)" />

      {/* ── Dynamic island ── */}
      <rect x="179" y="64" width="62" height="14" rx="7" fill="#0a1320" />
      <circle cx="229" cy="71" r="3.5" fill="#172030" />

      {/* ── Product cards on screen (2×2 grid) ── */}
      {/* Card 1 - Чохол */}
      <rect x="148" y="90" width="58" height="58" rx="12" fill="#1a2d44" filter="url(#cardShadow)" />
      <rect x="153" y="95" width="48" height="36" rx="8" fill="#213a56" />
      {/* phone case shape */}
      <rect x="163" y="99" width="28" height="22" rx="4" fill="none" stroke="#2563EB" strokeWidth="2" />
      <rect x="160" y="101" width="4" height="8" rx="2" fill="#2563EB" />
      <rect x="191" y="101" width="4" height="8" rx="2" fill="#2563EB" />
      <text x="177" y="144" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="Inter, sans-serif">Чохли</text>

      {/* Card 2 - Скло */}
      <rect x="214" y="90" width="58" height="58" rx="12" fill="#1a2d44" filter="url(#cardShadow)" />
      <rect x="219" y="95" width="48" height="36" rx="8" fill="#213a56" />
      {/* glass shape */}
      <rect x="228" y="100" width="30" height="22" rx="3" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
      <line x1="231" y1="107" x2="255" y2="107" stroke="#60a5fa" strokeWidth="1" opacity="0.4" />
      <line x1="231" y1="113" x2="255" y2="113" stroke="#60a5fa" strokeWidth="1" opacity="0.4" />
      <text x="243" y="144" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="Inter, sans-serif">Скло</text>

      {/* Card 3 - Кабель */}
      <rect x="148" y="156" width="58" height="58" rx="12" fill="#1a2d44" filter="url(#cardShadow)" />
      <rect x="153" y="161" width="48" height="36" rx="8" fill="#213a56" />
      {/* cable shape */}
      <path d="M163 172 Q177 166 177 179 Q177 192 191 186" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="160" y="170" width="6" height="10" rx="2" fill="#34d399" />
      <rect x="188" y="182" width="6" height="10" rx="2" fill="#34d399" />
      <text x="177" y="210" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="Inter, sans-serif">Кабелі</text>

      {/* Card 4 - Power Bank */}
      <rect x="214" y="156" width="58" height="58" rx="12" fill="#1a2d44" filter="url(#cardShadow)" />
      <rect x="219" y="161" width="48" height="36" rx="8" fill="#213a56" />
      {/* battery shape */}
      <rect x="228" y="168" width="30" height="16" rx="4" fill="none" stroke="#fbbf24" strokeWidth="1.8" />
      <rect x="258" y="172" width="4" height="8" rx="2" fill="#fbbf24" />
      <rect x="230" y="170" width="18" height="12" rx="2" fill="#fbbf24" opacity="0.6" />
      <text x="243" y="210" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="Inter, sans-serif">Power Bank</text>

      {/* CTA button on screen */}
      <rect x="150" y="226" width="120" height="28" rx="14" fill="url(#btnGrad)" />
      <text x="210" y="244" textAnchor="middle" fontSize="10" fill="white" fontFamily="Inter, sans-serif" fontWeight="600">
        В кошик
      </text>

      {/* Price */}
      <text x="210" y="268" textAnchor="middle" fontSize="11" fill="#e2e8f0" fontFamily="Inter, sans-serif" fontWeight="700">
        від 149 грн
      </text>

      {/* Bottom bar / home indicator */}
      <rect x="185" y="342" width="50" height="4" rx="2" fill="#2d3f55" />

      {/* ── Floating badge: shield (top-right) ── */}
      <g transform="translate(318, 88)">
        <rect x="-28" y="-28" width="56" height="56" rx="18" fill="#1e3a5f" stroke="#2563EB" strokeWidth="1.5" filter="url(#cardShadow)" />
        {/* shield path */}
        <path d="M0 -14 L12 -8 L12 2 Q12 12 0 18 Q-12 12 -12 2 L-12 -8 Z" fill="#2563EB" opacity="0.85" />
        <path d="M-5 1 L-1 5 L7 -4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* ── Floating badge: headphones (bottom-right) ── */}
      <g transform="translate(326, 312)">
        <rect x="-26" y="-26" width="52" height="52" rx="16" fill="#1e3a5f" stroke="#334155" strokeWidth="1.5" filter="url(#cardShadow)" />
        <path d="M-10 0 Q-10 -14 0 -14 Q10 -14 10 0" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="-13" y="-2" width="6" height="10" rx="3" fill="#2563EB" />
        <rect x="7" y="-2" width="6" height="10" rx="3" fill="#2563EB" />
      </g>

      {/* ── Floating badge: lightning (top-left) ── */}
      <g transform="translate(92, 148)">
        <rect x="-26" y="-26" width="52" height="52" rx="16" fill="#1e3a5f" stroke="#334155" strokeWidth="1.5" filter="url(#cardShadow)" />
        <path d="M4 -16 L-6 2 L2 2 L-4 16 L8 -2 L0 -2 Z" fill="#fbbf24" />
      </g>

      {/* ── Floating badge: case (bottom-left) ── */}
      <g transform="translate(86, 296)">
        <rect x="-26" y="-26" width="52" height="52" rx="16" fill="#1e3a5f" stroke="#334155" strokeWidth="1.5" filter="url(#cardShadow)" />
        <rect x="-11" y="-12" width="22" height="26" rx="5" fill="none" stroke="#34d399" strokeWidth="2" />
        <rect x="-15" y="-6" width="4" height="8" rx="2" fill="#34d399" />
        <rect x="11" y="-6" width="4" height="8" rx="2" fill="#34d399" />
        <circle cx="0" cy="6" r="2.5" fill="#34d399" />
      </g>

      {/* ── Sparkle dots ── */}
      <circle cx="115" cy="82" r="3.5" fill="#2563EB" opacity="0.7" />
      <circle cx="348" cy="200" r="2.5" fill="#2563EB" opacity="0.5" />
      <circle cx="100" cy="230" r="2" fill="#60a5fa" opacity="0.5" />
      <circle cx="336" cy="140" r="2" fill="#60a5fa" opacity="0.4" />
      <circle cx="152" cy="400" r="2.5" fill="#2563EB" opacity="0.4" />
      <circle cx="268" cy="44" r="2" fill="#2563EB" opacity="0.5" />
      <circle cx="356" cy="376" r="3" fill="#2563EB" opacity="0.3" />

      {/* ── 4-point stars ── */}
      <g transform="translate(338, 60)" opacity="0.6">
        <line x1="0" y1="-6" x2="0" y2="6" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="-6" y1="0" x2="6" y2="0" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g transform="translate(74, 336)" opacity="0.5">
        <line x1="0" y1="-5" x2="0" y2="5" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="-5" y1="0" x2="5" y2="0" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g transform="translate(364, 250)" opacity="0.4">
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="-4" y1="0" x2="4" y2="0" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}
