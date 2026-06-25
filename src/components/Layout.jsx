import { NavLink, Outlet } from 'react-router-dom'
import './layout.css'

export default function Layout() {
  return (
    <div>
      <nav className="nav">
        <div className="nav-inner">
          <h1 className="brand">Live Crypto Dashboard</h1>
          <div className="links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Dashboard
            </NavLink>
          </div>
        </div>
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </div>
  )
}
