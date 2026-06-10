export default function Header({ title, subtitle, left }) {
  return (
    <div
      className="w-full px-8 py-4 flex justify-between items-center"
      style={{ backgroundColor: '#111111', borderBottom: '1px solid #222222' }}
    >
      <div className="flex items-center gap-4">
        {left}
        <div className="flex items-center gap-3">
          <div style={{ width: '4px', height: '28px', backgroundColor: '#E60000', borderRadius: '2px', flexShrink: 0 }} />
          <div>
            <p className="text-white font-bold text-xl leading-tight">{title}</p>
            {subtitle && (
              <p className="text-sm leading-tight mt-0.5" style={{ color: '#A0A0A0' }}>{subtitle}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span style={{ color: '#E60000', fontSize: '8px' }}>●</span>
        <span className="text-sm" style={{ color: '#555555' }}>Vodacom Credit &amp; Collections</span>
      </div>
    </div>
  )
}
