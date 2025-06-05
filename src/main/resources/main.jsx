import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Signup from './Signup'
import Login from './Login'
import Dashboard from './Dashboard'
import Members from './Members' // Import component Members
import Packages from './Packages'
import Coaches from './Coaches'

// 1. Tạo router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />, // Trang đăng ký làm trang chính
  },
  {
    path: "/login",
    element: <Login />, // Trang đăng nhập
  },
  {
    path: "/dashboard",
    element: <Dashboard />, // Trang Dashboard
  },
  {
    path: "/members",
    element: <Members />, // Trang Members
  },
  {
    path: "/packages",
    element: <Packages />,
  },
  {
    path: "/coaches",
    element: <Coaches />,
  },
])

// 2. Thay thế <App /> bằng <RouterProvider>
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)