// Shared SVG building blocks for the Northstar illustrations.
// Every illustration is a single <svg> drawn on a fixed design canvas
// (matching the slot's natural aspect ratio) and scaled to fill its parent
// with `preserveAspectRatio="… slice"`, so it covers any rendered size
// without distortion — the same behaviour as `object-fit: cover`.
import './illustrations.css'
import { C, STAR_PATH } from './tokens'



/** Root canvas. `align` follows SVG preserveAspectRatio alignment keywords. */
export function Art({ w, h, bg, label, align = 'xMidYMid', className = '', style, children }) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio={`${align} slice`}
      className={`ns-art ${className}`}
      style={style}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      {bg && <rect width={w} height={h} fill={bg} />}
      {children}
    </svg>
  )
}

/** Text with sensible defaults. */
export function T({ x, y, size = 14, weight = 500, fill = C.n90, anchor, opacity, children, ...rest }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      textAnchor={anchor}
      opacity={opacity}
      {...rest}
    >
      {children}
    </text>
  )
}

/** Skeleton text line (rounded bar). */
export function Line({ x, y, w, h = 10, fill = C.n20, r, opacity }) {
  return <rect x={x} y={y} width={w} height={h} rx={r ?? h / 2} fill={fill} opacity={opacity} />
}

/** Round avatar with initials. */
export function Avatar({ cx, cy, r = 18, fill = C.p40, initials, color = C.white, ring }) {
  return (
    <g>
      {ring && <circle cx={cx} cy={cy} r={r + 3} fill={ring} />}
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      {initials && (
        <text
          x={cx}
          y={cy + r * 0.36}
          fontSize={r * 0.95}
          fontWeight={650}
          fill={color}
          textAnchor="middle"
        >
          {initials}
        </text>
      )}
    </g>
  )
}

/** Lucide icon placed inside an SVG canvas. */
export function Ico({ as: Icon, x, y, size = 16, color = C.n60, stroke = 2 }) {
  return <Icon x={x} y={y} width={size} height={size} color={color} strokeWidth={stroke} aria-hidden="true" />
}

/** Pill / chip. */
export function Chip({ x, y, w, h = 28, fill, stroke, text, color = C.n90, size = 13, weight = 600, r }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r ?? h / 2} fill={fill} stroke={stroke} />
      {text && (
        <text x={x + w / 2} y={y + h / 2 + size * 0.36} fontSize={size} fontWeight={weight} fill={color} textAnchor="middle">
          {text}
        </text>
      )}
    </g>
  )
}

/** Keyboard shortcut cap. */
export function Kbd({ x, y, label, dark = false, size = 12 }) {
  const w = Math.max(22, label.length * size * 0.62 + 12)
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={22}
        rx={5}
        fill={dark ? 'rgba(255,255,255,0.08)' : C.n10}
        stroke={dark ? 'rgba(255,255,255,0.14)' : C.n20}
      />
      <text x={x + w / 2} y={y + 15} fontSize={size} fontWeight={600} fill={dark ? 'rgba(255,255,255,0.7)' : C.n60} textAnchor="middle">
        {label}
      </text>
    </g>
  )
}

/** Window frame with drop shadow. `dark` switches the chrome palette. */
export function Window({ id, x, y, w, h, r = 18, fill = C.white, dark = false, shadow = true, children, clip = true }) {
  const clipId = `${id}-clip`
  const shadowId = `${id}-shadow`
  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <rect x={x} y={y} width={w} height={h} rx={r} />
        </clipPath>
        {shadow && (
          <filter id={shadowId} x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="24" stdDeviation="28" floodColor="#000" floodOpacity={dark ? 0.45 : 0.22} />
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.08" />
          </filter>
        )}
      </defs>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={r}
        fill={fill}
        filter={shadow ? `url(#${shadowId})` : undefined}
        stroke={dark ? 'rgba(252,250,247,0.10)' : 'rgba(115,113,109,0.14)'}
      />
      <g clipPath={clip ? `url(#${clipId})` : undefined}>{children}</g>
    </g>
  )
}

/** macOS-ish traffic lights, kept neutral so it does not read as any real OS chrome. */
export function Dots({ x, y, dark = false }) {
  const f = dark ? 'rgba(255,255,255,0.18)' : C.n20
  return (
    <g>
      <circle cx={x} cy={y} r={6} fill={f} />
      <circle cx={x + 20} cy={y} r={6} fill={f} />
      <circle cx={x + 40} cy={y} r={6} fill={f} />
    </g>
  )
}


export function Star({ x, y, size = 24, fill = 'currentColor', className }) {
  const s = size / 24
  return <path d={STAR_PATH} transform={`translate(${x} ${y}) scale(${s})`} fill={fill} className={className} />
}

/** Soft radial glow used behind floating windows. */
export function Glow({ id, cx, cy, r, color, opacity = 0.6 }) {
  return (
    <g>
      <defs>
        <radialGradient id={id}>
          <stop offset="0%" stopColor={color} stopOpacity={opacity} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} />
    </g>
  )
}
