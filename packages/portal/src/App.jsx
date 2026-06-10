import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Department from './pages/Department'

export default function App() {
  return (
    <BrowserRouter basename="/portal">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/department/:id" element={<Department />} />
      </Routes>
    </BrowserRouter>
  )
}
