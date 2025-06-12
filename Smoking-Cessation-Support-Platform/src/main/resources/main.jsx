import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Signup from './Signup'
import Login from './Login'
import Dashboard from './Dashboard'
import Members from './Members.jsx'; // Import component Members
import Packages from './Packages'
import Coaches from './Coaches'
import RatingsFeedbacksManagement from './RatingsFeedbacksManagement'
import Contents from './Contents' // Import Contents component
import ConfirmCoachSchedule from './ConfirmCoachSchedule' // Import ConfirmCoachSchedule
import ForCoach from './ForCoach.jsx';
import CoachProfile from './CoachProfile.jsx';
import CoachEditProfile from './CoachEditProfile.jsx';
import RequestSchedule from './RequestSchedule.jsx';

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
  {
    path: "/ratings",
    element: <RatingsFeedbacksManagement />,
  },
  {
    path: "/contents",
    element: <Contents />, // Thêm route cho Contents
  },
  {
    path: "/confirm-coach-schedule",
    element: <ConfirmCoachSchedule />, // Thêm route cho ConfirmCoachSchedule
  },
  {
    path: "/coach-schedule",
    element: <ForCoach />,
  },
  {
    path: "/profile",
    element: <CoachProfile />,
  },
  {
    path: "/edit-profile",
    element: <CoachEditProfile />,
  },
  {
    path: "/request-schedule",
    element: <RequestSchedule />,
  },
])

// 2. Thay thế <App /> bằng <RouterProvider>
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)