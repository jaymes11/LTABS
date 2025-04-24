import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Admin pages
import AdminLogin from './pages/auth/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageLaptops from './pages/admin/ManageLaptops'
import ManageUsers from './pages/admin/ManageUsers'
import BorrowingHistory from './pages/admin/BorrowingHistory'

// Layout components
import AdminLayout from './components/layout/AdminLayout'

// Error pages
import NotFound from './pages/errorPages/NotFound'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/admin/login" />} />
        <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
        
        {/* Admin routes (protected) */}
        <Route 
          path="/admin/*" 
          element={
            isAuthenticated ? (
              <AdminLayout onLogout={handleLogout}>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="laptops" element={<ManageLaptops />} />
                  <Route path="users" element={<ManageUsers />} />
                  <Route path="history" element={<BorrowingHistory />} />
                  <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                </Routes>
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" />
            )
          } 
        />
        
        {/* Error routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
