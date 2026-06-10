import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function DepartmentCard({ department }) {
  const navigate = useNavigate()
  const { id, name, description, colour, icon, dashboards } = department
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={() => navigate(`/department/${id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card-hover w-full text-left rounded-2xl p-6 cursor-pointer"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderLeft: `3px solid ${colour}`,
      }}
    >
      <div
        className="inline-flex items-center justify-center rounded-xl p-3 text-2xl"
        style={{ backgroundColor: '#2A2A2A' }}
      >
        {icon}
      </div>

      <p className="text-white font-semibold text-lg mt-4">{name}</p>
      <p className="text-sm mt-1 leading-relaxed" style={{ color: '#A0A0A0' }}>{description}</p>

      <div className="flex items-center justify-between mt-4">
        <span
          className="text-xs px-3 py-1 rounded-full"
          style={{ backgroundColor: '#2A2A2A', color: '#A0A0A0' }}
        >
          {dashboards.length} dashboard{dashboards.length !== 1 ? 's' : ''}
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
    </button>
  )
}
