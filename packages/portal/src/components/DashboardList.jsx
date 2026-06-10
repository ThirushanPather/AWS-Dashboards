import { useState } from 'react'

export default function DashboardList({ dashboard }) {
  const { name, description, url, updated } = dashboard
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card-hover flex items-center gap-4 rounded-xl p-5 no-underline"
      style={{ backgroundColor: 'var(--bg-card)' }}
    >
      <span style={{ color: '#E60000', fontSize: '8px', flexShrink: 0 }}>●</span>

      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold">{name}</p>
        <p className="text-sm mt-1" style={{ color: '#A0A0A0' }}>{description}</p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span
          className="text-xs px-3 py-1 rounded-full font-medium"
          style={{ backgroundColor: '#1A3A1A', color: '#00C853' }}
        >
          ● {updated}
        </span>
        <span
          className="text-lg font-light transition-transform duration-200"
          style={{
            color: '#555555',
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          }}
        >
          →
        </span>
      </div>
    </a>
  )
}
