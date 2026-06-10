import data from '../data/dashboards.json'
import Header from '../components/Header'
import DepartmentCard from '../components/DepartmentCard'

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-base)' }}>
      <Header
        title="Dashboard Library"
        subtitle="Select your department"
      />

      <div className="px-8 pt-10 pb-6">
        <p className="text-sm" style={{ color: '#A0A0A0' }}>Welcome to the</p>
        <h1 className="text-4xl font-bold text-white mt-1">Dashboard Library</h1>
        <p className="text-sm mt-2" style={{ color: '#A0A0A0' }}>
          Select your department to access your dashboards
        </p>
        <div
          className="mt-3"
          style={{ width: '40px', height: '3px', backgroundColor: '#E60000', borderRadius: '2px' }}
        />
      </div>

      <div className="px-8 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.departments.map((dept) => (
            <DepartmentCard key={dept.id} department={dept} />
          ))}
        </div>
      </div>
    </div>
  )
}
