// ---------------------------------------------------------------------------
// MythArt
// ---------------------------------------------------------------------------
// Renders a custom SVG illustration for a myth based on its `artwork` key.
// Each illustration is an atmospheric scene built from SVG shapes with
// gradients and glow filters — no external image files needed.
//
// HOW TO ADD A NEW ILLUSTRATION:
//   1. Add a new key to the `ArtworkKey` union below.
//   2. Add a matching `case` in the switch below returning an <svg> scene.
//   3. Set that key as the `artwork` value on the myth row in the database.
// ---------------------------------------------------------------------------

export type ArtworkKey =
  | 'prometheus'
  | 'ragnarok'
  | 'anubis'
  | 'amaterasu'
  | 'morrigan'
  | 'fafnir'
  | 'churning'
  | 'quetzalcoatl'
  | 'inanna'
  | 'anansi'
  | 'nuwa'
  | 'orpheus'
  | 'default';

interface MythArtProps {
  artwork: string;
  className?: string;
}

export default function MythArt({ artwork, className }: MythArtProps) {
  const key = (artwork as ArtworkKey) || 'default';
  return (
    <div className={className}>
      <svg
        viewBox="0 0 400 220"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        {renderScene(key)}
      </svg>
    </div>
  );
}

function renderScene(key: ArtworkKey) {
  switch (key) {
    case 'prometheus':
      return <Prometheus />;
    case 'ragnarok':
      return <Ragnarok />;
    case 'anubis':
      return <Anubis />;
    case 'amaterasu':
      return <Amaterasu />;
    case 'morrigan':
      return <Morrigan />;
    case 'fafnir':
      return <Fafnir />;
    case 'churning':
      return <Churning />;
    case 'quetzalcoatl':
      return <Quetzalcoatl />;
    case 'inanna':
      return <Inanna />;
    case 'anansi':
      return <Anansi />;
    case 'nuwa':
      return <Nuwa />;
    case 'orpheus':
      return <Orpheus />;
    default:
      return <DefaultScene />;
  }
}

// --- Reusable defs ---------------------------------------------------------

function GlowDefs({ id, color }: { id: string; color: string }) {
  return (
    <defs>
      <radialGradient id={`${id}-bg`} cx="50%" cy="55%" r="75%">
        <stop offset="0%" stopColor={color} stopOpacity="0.55" />
        <stop offset="45%" stopColor="#1a1428" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#0a0710" />
      </radialGradient>
      <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

function StarField({ count = 30 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    cx: (i * 137.5) % 400,
    cy: (i * 53) % 220,
    r: (i % 3) * 0.5 + 0.4,
    o: ((i * 7) % 10) / 10 + 0.1,
  }));
  return (
    <g fill="#fdf3d3">
      {stars.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} opacity={s.o} />
      ))}
    </g>
  );
}

// --- Individual scenes -----------------------------------------------------
// Each is a small atmospheric vignette. They share the 400x220 viewBox.

function Prometheus() {
  return (
    <>
      <GlowDefs id="prom" color="#d9b14a" />
      <rect width="400" height="220" fill="url(#prom-bg)" />
      <StarField count={20} />
      {/* mountain */}
      <path d="M0 220 L90 110 L140 160 L210 70 L280 150 L340 120 L400 220 Z" fill="#120d1c" opacity="0.9" />
      {/* fire ember */}
      <g filter="url(#prom-glow)">
        <circle cx="210" cy="120" r="8" fill="#eccf6e" />
        <circle cx="210" cy="120" r="4" fill="#fdf3d3" />
      </g>
      {/* flames */}
      <path d="M200 140 Q205 120 210 135 Q215 115 220 140 Q210 150 200 140Z" fill="#d9b14a" opacity="0.7" filter="url(#prom-glow)" />
    </>
  );
}

function Ragnarok() {
  return (
    <>
      <GlowDefs id="rag" color="#6d44b0" />
      <rect width="400" height="220" fill="url(#rag-bg)" />
      <StarField count={15} />
      {/* burning horizon */}
      <rect x="0" y="150" width="400" height="70" fill="#9c721f" opacity="0.4" />
      <path d="M0 160 Q100 150 200 158 T400 155 L400 220 L0 220Z" fill="#c3932b" opacity="0.3" />
      {/* jagged peaks */}
      <path d="M0 220 L60 130 L100 170 L160 90 L200 160 L260 110 L320 170 L400 140 L400 220 Z" fill="#0a0710" opacity="0.95" />
      {/* fire glow at peaks */}
      <circle cx="160" cy="95" r="14" fill="#eccf6e" opacity="0.5" filter="url(#rag-glow)" />
      <circle cx="260" cy="115" r="10" fill="#d9b14a" opacity="0.5" filter="url(#rag-glow)" />
      {/* wolf silhouette moon */}
      <circle cx="320" cy="50" r="22" fill="#c9a8ff" opacity="0.3" filter="url(#rag-glow)" />
    </>
  );
}

function Anubis() {
  return (
    <>
      <GlowDefs id="anu" color="#c3932b" />
      <rect width="400" height="220" fill="url(#anu-bg)" />
      <StarField count={18} />
      {/* pyramids */}
      <path d="M40 220 L120 90 L200 220Z" fill="#1a1428" opacity="0.9" />
      <path d="M180 220 L260 120 L340 220Z" fill="#241b36" opacity="0.85" />
      <path d="M120 220 L200 130 L280 220Z" fill="#120d1c" opacity="0.95" />
      {/* gold edge on pyramids */}
      <path d="M120 90 L200 220" stroke="#c3932b" strokeWidth="1" opacity="0.4" />
      <path d="M260 120 L340 220" stroke="#eccf6e" strokeWidth="1" opacity="0.3" />
      {/* scale of ma'at */}
      <g filter="url(#anu-glow)" transform="translate(300 40)">
        <line x1="0" y1="0" x2="0" y2="30" stroke="#eccf6e" strokeWidth="1.5" />
        <line x1="-20" y1="12" x2="20" y2="12" stroke="#eccf6e" strokeWidth="1.5" />
        <path d="M-20 12 L-26 22 L-14 22Z" fill="none" stroke="#d9b14a" strokeWidth="1" />
        <path d="M20 12 L14 22 L26 22Z" fill="#fdf3d3" opacity="0.6" />
        <line x1="0" y1="30" x2="0" y2="38" stroke="#eccf6e" strokeWidth="1" />
      </g>
    </>
  );
}

function Amaterasu() {
  return (
    <>
      <GlowDefs id="ama" color="#f7e3a3" />
      <rect width="400" height="220" fill="url(#ama-bg)" />
      {/* rising sun */}
      <circle cx="200" cy="120" r="45" fill="#fdf3d3" opacity="0.9" filter="url(#ama-glow)" />
      <circle cx="200" cy="120" r="28" fill="#eccf6e" />
      {/* rays */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={200 + Math.cos(a) * 50}
            y1={120 + Math.sin(a) * 50}
            x2={200 + Math.cos(a) * 78}
            y2={120 + Math.sin(a) * 78}
            stroke="#f7e3a3"
            strokeWidth="2"
            opacity="0.5"
          />
        );
      })}
      {/* torii gate silhouette */}
      <g fill="#0a0710" opacity="0.85" transform="translate(200 175)">
        <rect x="-50" y="-30" width="100" height="6" />
        <rect x="-55" y="-42" width="110" height="6" />
        <rect x="-40" y="-36" width="6" height="50" />
        <rect x="34" y="-36" width="6" height="50" />
      </g>
      {/* mountains */}
      <path d="M0 220 L120 170 L200 200 L300 165 L400 220Z" fill="#0a0710" opacity="0.9" />
    </>
  );
}

function Morrigan() {
  return (
    <>
      <GlowDefs id="mor" color="#8a5fd6" />
      <rect width="400" height="220" fill="url(#mor-bg)" />
      {/* blood moon */}
      <circle cx="100" cy="70" r="28" fill="#9c721f" opacity="0.4" filter="url(#mor-glow)" />
      <StarField count={12} />
      {/* battlefield horizon */}
      <path d="M0 220 L100 180 L180 195 L280 175 L400 200 L400 220Z" fill="#120d1c" />
      {/* raven in flight */}
      <g transform="translate(250 90)" fill="#0a0710" filter="url(#mor-glow)">
        <path d="M0 0 Q-18 -6 -30 -2 Q-18 2 -8 2 Q0 6 8 2 Q18 2 30 -2 Q18 -6 0 0Z" />
        <circle cx="0" cy="0" r="3" />
      </g>
      {/* mist */}
      <ellipse cx="200" cy="200" rx="200" ry="20" fill="#6d44b0" opacity="0.15" />
    </>
  );
}

function Fafnir() {
  return (
    <>
      <GlowDefs id="faf" color="#c3932b" />
      <rect width="400" height="220" fill="url(#faf-bg)" />
      <StarField count={10} />
      {/* cave arch */}
      <path d="M40 220 L40 80 Q200 30 360 80 L360 220Z" fill="#120d1c" opacity="0.6" />
      {/* gold hoard */}
      <g filter="url(#faf-glow)">
        <circle cx="160" cy="180" r="10" fill="#eccf6e" />
        <circle cx="180" cy="175" r="7" fill="#d9b14a" />
        <circle cx="200" cy="185" r="9" fill="#eccf6e" />
        <circle cx="220" cy="178" r="6" fill="#c3932b" />
        <circle cx="145" cy="188" r="5" fill="#d9b14a" />
        <circle cx="240" cy="188" r="8" fill="#eccf6e" />
      </g>
      {/* dragon eye */}
      <g filter="url(#faf-glow)">
        <ellipse cx="280" cy="100" rx="20" ry="10" fill="#1a1428" stroke="#8a5fd6" strokeWidth="2" />
        <ellipse cx="280" cy="100" rx="7" ry="9" fill="#c9a8ff" />
        <circle cx="280" cy="100" r="3" fill="#0a0710" />
      </g>
      {/* dragon scale ridge */}
      <path d="M230 120 L260 105 L255 120 L285 108 L280 125 L310 115" fill="none" stroke="#241b36" strokeWidth="3" />
    </>
  );
}

function Churning() {
  return (
    <>
      <GlowDefs id="chu" color="#a87cf0" />
      <rect width="400" height="220" fill="url(#chu-bg)" />
      <StarField count={16} />
      {/* ocean waves */}
      <path d="M0 150 Q50 140 100 150 T200 150 T300 150 T400 150 L400 220 L0 220Z" fill="#2f2450" opacity="0.6" />
      <path d="M0 170 Q60 160 120 170 T240 170 T360 170 L400 170 L400 220 L0 220Z" fill="#1a1428" opacity="0.7" />
      {/* Mount Mandara */}
      <path d="M200 60 L150 160 L250 160Z" fill="#120d1c" opacity="0.9" />
      <path d="M200 60 L200 160" stroke="#c3932b" strokeWidth="1" opacity="0.4" />
      {/* serpent coil around mountain */}
      <path d="M170 130 Q200 120 230 130 Q200 140 170 130" fill="none" stroke="#c3932b" strokeWidth="3" opacity="0.7" filter="url(#chu-glow)" />
      <path d="M165 110 Q200 100 235 110 Q200 120 165 110" fill="none" stroke="#d9b14a" strokeWidth="2.5" opacity="0.6" filter="url(#chu-glow)" />
      {/* nectar glow */}
      <circle cx="200" cy="90" r="6" fill="#fdf3d3" filter="url(#chu-glow)" />
    </>
  );
}

function Quetzalcoatl() {
  return (
    <>
      <GlowDefs id="quez" color="#d9b14a" />
      <rect width="400" height="220" fill="url(#quez-bg)" />
      <StarField count={14} />
      {/* step pyramid */}
      <g fill="#1a1428" opacity="0.9">
        <rect x="120" y="180" width="160" height="40" />
        <rect x="140" y="150" width="120" height="30" />
        <rect x="160" y="120" width="80" height="30" />
        <rect x="180" y="90" width="40" height="30" />
      </g>
      {/* temple glow */}
      <rect x="185" y="95" width="10" height="20" fill="#eccf6e" opacity="0.7" filter="url(#quez-glow)" />
      {/* feathered serpent */}
      <path d="M40 180 Q90 140 140 170 Q180 190 210 150 Q250 110 200 70" fill="none" stroke="#c3932b" strokeWidth="6" opacity="0.6" filter="url(#quez-glow)" />
      <path d="M40 180 Q90 140 140 170 Q180 190 210 150 Q250 110 200 70" fill="none" stroke="#eccf6e" strokeWidth="2" opacity="0.8" />
      {/* serpent head */}
      <circle cx="200" cy="70" r="6" fill="#c9a8ff" filter="url(#quez-glow)" />
      {/* sun */}
      <circle cx="340" cy="45" r="16" fill="#f7e3a3" opacity="0.5" filter="url(#quez-glow)" />
    </>
  );
}

function Inanna() {
  return (
    <>
      <GlowDefs id="ina" color="#8a5fd6" />
      <rect width="400" height="220" fill="url(#ina-bg)" />
      <StarField count={20} />
      {/* seven gates descending */}
      {[180, 150, 120, 95, 70, 50, 35].map((y, i) => (
        <rect key={i} x={200 - (40 - i * 4)} y={y} width={(40 - i * 4) * 2} height="3" fill="#6d44b0" opacity={0.3 + i * 0.08} />
      ))}
      {/* descent figure */}
      <g filter="url(#ina-glow)">
        <circle cx="200" cy="40" r="5" fill="#eccf6e" />
        <line x1="200" y1="45" x2="200" y2="75" stroke="#d9b14a" strokeWidth="2" opacity="0.7" />
      </g>
      {/* underworld realm */}
      <rect x="0" y="195" width="400" height="25" fill="#0a0710" opacity="0.9" />
      <path d="M0 195 Q100 185 200 192 T400 190 L400 220 L0 220Z" fill="#120d1c" />
    </>
  );
}

function Anansi() {
  return (
    <>
      <GlowDefs id="anan" color="#c3932b" />
      <rect width="400" height="220" fill="url(#anan-bg)" />
      <StarField count={12} />
      {/* web */}
      <g stroke="#d9b14a" strokeWidth="0.6" opacity="0.4" fill="none">
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          return <line key={i} x1="200" y1="110" x2={200 + Math.cos(a) * 180} y2={110 + Math.sin(a) * 100} />;
        })}
        {[30, 60, 90, 120].map((r) => (
          <circle key={r} cx="200" cy="110" r={r} />
        ))}
      </g>
      {/* spider body */}
      <g filter="url(#anan-glow)">
        <ellipse cx="200" cy="110" rx="14" ry="10" fill="#1a1428" stroke="#c3932b" strokeWidth="1.5" />
        <circle cx="200" cy="100" r="6" fill="#120d1c" stroke="#d9b14a" strokeWidth="1" />
        {/* legs */}
        <path d="M190 108 L165 95 L155 100" fill="none" stroke="#1a1428" strokeWidth="2" />
        <path d="M210 108 L235 95 L245 100" fill="none" stroke="#1a1428" strokeWidth="2" />
        <path d="M190 114 L160 120 L150 130" fill="none" stroke="#1a1428" strokeWidth="2" />
        <path d="M210 114 L240 120 L250 130" fill="none" stroke="#1a1428" strokeWidth="2" />
      </g>
    </>
  );
}

function Nuwa() {
  return (
    <>
      <GlowDefs id="nuw" color="#a87cf0" />
      <rect width="400" height="220" fill="url(#nuw-bg)" />
      <StarField count={18} />
      {/* cracked sky */}
      <g stroke="#c9a8ff" strokeWidth="1.5" opacity="0.6" fill="none" filter="url(#nuw-glow)">
        <path d="M0 40 L120 55 L200 35 L280 60 L400 45" />
        <path d="M120 55 L130 90" />
        <path d="M280 60 L270 95" />
      </g>
      {/* five-colored stones */}
      <g filter="url(#nuw-glow)">
        <circle cx="140" cy="120" r="8" fill="#d9b14a" />
        <circle cx="170" cy="130" r="7" fill="#8a5fd6" />
        <circle cx="200" cy="125" r="9" fill="#c3932b" />
        <circle cx="230" cy="132" r="7" fill="#c9a8ff" />
        <circle cx="260" cy="122" r="8" fill="#eccf6e" />
      </g>
      {/* serpent goddess */}
      <g filter="url(#nuw-glow)">
        <circle cx="200" cy="90" r="7" fill="#fdf3d3" />
        <path d="M200 97 Q195 110 205 125 Q195 140 205 160" fill="none" stroke="#eccf6e" strokeWidth="3" />
      </g>
      {/* flood waves */}
      <path d="M0 180 Q50 170 100 180 T200 180 T300 180 T400 180 L400 220 L0 220Z" fill="#2f2450" opacity="0.7" />
    </>
  );
}

function Orpheus() {
  return (
    <>
      <GlowDefs id="orp" color="#6d44b0" />
      <rect width="400" height="220" fill="url(#orp-bg)" />
      <StarField count={14} />
      {/* cavern arch */}
      <path d="M0 220 L0 70 Q200 20 400 70 L400 220Z" fill="#120d1c" opacity="0.7" />
      {/* lyre */}
      <g transform="translate(200 110)" filter="url(#orp-glow)">
        <path d="M-15 -20 Q-20 -30 -10 -35 Q10 -35 20 -25 L15 -10Z" fill="#c3932b" opacity="0.7" />
        <line x1="-12" y1="-28" x2="-12" y2="-12" stroke="#eccf6e" strokeWidth="1" />
        <line x1="-6" y1="-30" x2="-6" y2="-12" stroke="#eccf6e" strokeWidth="1" />
        <line x1="0" y1="-32" x2="0" y2="-12" stroke="#eccf6e" strokeWidth="1" />
        <line x1="6" y1="-30" x2="6" y2="-12" stroke="#eccf6e" strokeWidth="1" />
        <line x1="12" y1="-28" x2="12" y2="-12" stroke="#eccf6e" strokeWidth="1" />
      </g>
      {/* musical glow notes */}
      <g fill="#fdf3d3" opacity="0.6" filter="url(#orp-glow)">
        <circle cx="160" cy="80" r="3" />
        <circle cx="240" cy="90" r="2.5" />
        <circle cx="180" cy="60" r="2" />
        <circle cx="220" cy="70" r="3" />
      </g>
      {/* river styx */}
      <path d="M0 195 Q80 185 160 195 T320 195 L400 195 L400 220 L0 220Z" fill="#1a1428" opacity="0.8" />
    </>
  );
}

function DefaultScene() {
  return (
    <>
      <GlowDefs id="def" color="#c3932b" />
      <rect width="400" height="220" fill="url(#def-bg)" />
      <StarField count={25} />
      <circle cx="200" cy="110" r="30" fill="#eccf6e" opacity="0.4" filter="url(#def-glow)" />
      <path d="M0 220 L120 160 L200 190 L300 155 L400 220Z" fill="#0a0710" opacity="0.85" />
    </>
  );
}
