import { useParams, useNavigate } from 'react-router-dom'
import data from '../data/dashboards.json'
import Header from '../components/Header'
import DashboardList from '../components/DashboardList'

export default function Department() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dept = data.departments.find((d) => d.id === id)

  const backButton = (
    <button
      onClick={() => navigate('/')}
      className="flex items-center gap-1.5 text-sm transition-colors duration-200"
      style={{ color: '#A0A0A0' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#A0A0A0')}
    >
      <span>←</span>
      <span>Back</span>
    </button>
  )

  if (!dept) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-base)' }}>
        <Header title="Dashboard Library" left={backButton} />
        <div className="px-8 py-20 text-center">
          <p className="text-lg" style={{ color: '#A0A0A0' }}>
            Department not found.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-5 py-2 rounded-lg text-sm font-medium text-white transition-colors duration-200"
            style={{ backgroundColor: '#E60000' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#B00000')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E60000')}
          >
            Back to home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-base)' }}>
      <Header title="Dashboard Library" left={backButton} />

      <div className="px-8 pt-8 pb-6">
        <div
          className="inline-flex items-center justify-center rounded-2xl p-4 text-4xl"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          {dept.icon}
        </div>
        <h1 className="text-3xl font-bold text-white mt-4">{dept.name}</h1>
        <p className="mt-2 text-sm" style={{ color: '#A0A0A0' }}>{dept.description}</p>
        <div
          className="mt-3"
          style={{ width: '40px', height: '3px', backgroundColor: '#E60000', borderRadius: '2px' }}
        />
      </div>

      <div className="px-8 pb-10">
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: '#A0A0A0' }}
        >
          Available Dashboards
        </p>
        <div className="flex flex-col gap-4">
          {dept.dashboards.map((dashboard) => (
            <DashboardList key={dashboard.name} dashboard={dashboard} />
          ))}
        </div>
      </div>
    </div>
  )
}
