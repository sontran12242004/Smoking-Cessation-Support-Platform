import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './Dashboard.jsx'
import Dashboard from './Dashboard'
import Login from './components/Login'

// 1. Tạo router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Trang chính
  },
  {
    path: "/dashboard",
    element: <Dashboard />, // Trang Dashboard
  },
  {
    path: "/login",
    element: <Login />, // Trang Login
  },
])

// 2. Thay thế <App /> bằng <RouterProvider>
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)