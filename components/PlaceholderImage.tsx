// Reliable local SVG placeholders — no external API dependency
// Each category gets a unique geometric pattern + color palette

const palettes = [
  { bg: "#0E2A4A", fg: "#2E72B8", accent: "#D98A3D" },  // navy/steel/amber
  { bg: "#14365C", fg: "#3B82C4", accent: "#E8A85C" },  // deep blue
  { bg: "#1A3A4E", fg: "#4A90B8", accent: "#C07830" },  // teal-ish
  { bg: "#2C3E50", fg: "#5B8BA0", accent: "#D9904D" },  // slate
  { bg: "#1B2838", fg: "#3D6A8E", accent: "#E09850" },  // dark steel
  { bg: "#0F2B3D", fg: "#4088B0", accent: "#D08040" },  // ocean dark
  { bg: "#1E3545", fg: "#3A7898", accent: "#C88848" },  // mid blue
  { bg: "#223848", fg: "#5080A0", accent: "#D8883C" },  // industrial blue
];

const patterns = [
  // Diagonal stripes
  (p: typeof palettes[0]) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="${p.bg}"/>
      <g opacity="0.08">
        ${Array.from({length:20}, (_,i) =>
          `<line x1="${i*60-200}" y1="0" x2="${i*60+200}" y2="600" stroke="white" stroke-width="2"/>`
        ).join('')}
      </g>
      <circle cx="400" cy="300" r="140" fill="none" stroke="${p.accent}" stroke-width="1.5" opacity="0.5"/>
      <circle cx="400" cy="300" r="80" fill="none" stroke="${p.accent}" stroke-width="1" opacity="0.3"/>
      <circle cx="400" cy="300" r="4" fill="${p.accent}" opacity="0.7"/>
    </svg>`,
  // Grid pattern
  (p: typeof palettes[0]) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="${p.bg}"/>
      <g opacity="0.06">
        ${Array.from({length:10}, (_,i) =>
          `<line x1="0" y1="${i*60}" x2="800" y2="${i*60}" stroke="white" stroke-width="1.5"/>`
        ).join('')}
        ${Array.from({length:14}, (_,i) =>
          `<line x1="${i*60}" y1="0" x2="${i*60}" y2="600" stroke="white" stroke-width="1.5"/>`
        ).join('')}
      </g>
      <rect x="280" y="200" width="240" height="200" fill="none" stroke="${p.accent}" stroke-width="2" opacity="0.4" rx="2"/>
      <rect x="320" y="240" width="160" height="120" fill="none" stroke="${p.fg}" stroke-width="1" opacity="0.3" rx="1"/>
      <circle cx="400" cy="300" r="3" fill="${p.accent}" opacity="0.5"/>
    </svg>`,
  // Concentric circles
  (p: typeof palettes[0]) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="${p.bg}"/>
      <g opacity="0.06">
        ${Array.from({length:24}, (_,i) =>
          `<line x1="${Math.cos(i*15*Math.PI/180)*500+400}" y1="${Math.sin(i*15*Math.PI/180)*500+300}" x2="400" y2="300" stroke="white" stroke-width="0.8"/>`
        ).join('')}
      </g>
      ${[200,160,120,80,40].map((r,i) =>
        `<circle cx="400" cy="300" r="${r}" fill="none" stroke="${i===0?p.accent:p.fg}" stroke-width="${i===0?1.5:0.8}" opacity="${0.15+i*0.04}"/>`
      ).join('')}
    </svg>`,
  // Hexagon pattern
  (p: typeof palettes[0]) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="${p.bg}"/>
      <g opacity="0.07">
        ${Array.from({length:6}, (_,r) => {
          const cx = 400, cy = 300, radius = (r+1)*50;
          const points = Array.from({length:6}, (_,i) => {
            const angle = i*60 - 30;
            return `${cx+radius*Math.cos(angle*Math.PI/180)},${cy+radius*Math.sin(angle*Math.PI/180)}`;
          }).join(' ');
          return `<polygon points="${points}" fill="none" stroke="white" stroke-width="1.2"/>`;
        }).join('')}
      </g>
      <circle cx="400" cy="300" r="3" fill="${p.accent}" opacity="0.5"/>
    </svg>`,
  // Dot matrix
  (p: typeof palettes[0]) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="${p.bg}"/>
      <g opacity="0.07">
        ${Array.from({length:20}, (_,r) =>
          Array.from({length:27}, (_,c) =>
            `<circle cx="${c*30+15}" cy="${r*30+15}" r="${(r+c)%3+1.5}" fill="white"/>`
          ).join('')
        ).join('')}
      </g>
      <rect x="200" y="150" width="400" height="300" fill="none" stroke="${p.accent}" stroke-width="1" opacity="0.5" rx="4"/>
      <rect x="240" y="190" width="320" height="220" fill="none" stroke="${p.fg}" stroke-width="0.8" opacity="0.3" rx="2"/>
    </svg>`,
  // Wave lines
  (p: typeof palettes[0]) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="${p.bg}"/>
      <g opacity="0.06">
        ${Array.from({length:12}, (_,i) => {
          const y = 60 + i*45;
          return `<path d="M0,${y} Q200,${y-20} 400,${y} Q600,${y+20} 800,${y}" fill="none" stroke="white" stroke-width="1.5"/>`;
        }).join('')}
      </g>
      <line x1="350" y1="200" x2="450" y2="400" stroke="${p.accent}" stroke-width="1.5" opacity="0.4"/>
      <line x1="450" y1="200" x2="350" y2="400" stroke="${p.fg}" stroke-width="1" opacity="0.25"/>
    </svg>`,
  // Triangles
  (p: typeof palettes[0]) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="${p.bg}"/>
      <g opacity="0.05">
        ${[[400,120,200,480,600,480],[400,180,260,450,540,450],[400,230,310,420,490,420]].map(pts =>
          `<polygon points="${pts.join(',')}" fill="none" stroke="white" stroke-width="1.2"/>`
        ).join('')}
      </g>
      <polygon points="400,180 280,430 520,430" fill="none" stroke="${p.accent}" stroke-width="1.5" opacity="0.45"/>
      <circle cx="400" cy="330" r="2.5" fill="${p.accent}" opacity="0.5"/>
    </svg>`,
  // Diamond/rhombus
  (p: typeof palettes[0]) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="${p.bg}"/>
      <g opacity="0.05">
        ${[[400,150,550,300,400,450,250,300],[400,200,500,300,400,400,300,300]].map(pts =>
          `<polygon points="${pts.join(',')}" fill="none" stroke="white" stroke-width="1"/>`
        ).join('')}
      </g>
      <polygon points="400,170 530,300 400,430 270,300" fill="none" stroke="${p.accent}" stroke-width="1.5" opacity="0.45"/>
      <circle cx="400" cy="300" r="3" fill="${p.accent}" opacity="0.4"/>
    </svg>`,
];

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function getPlaceholderImage(seed: string): string {
  const h = hashString(seed);
  const palette = palettes[h % palettes.length];
  const pattern = patterns[h % patterns.length];
  const svg = pattern(palette);
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}
