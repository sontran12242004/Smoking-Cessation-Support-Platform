import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import Login from './Login'
import SignUp from './SignUp'
import EliteWelcome from './EliteMember/EliteWelcome'
import EliteHome from './EliteMember/EliteHome'
import EliteDailyCheckIn from './EliteMember/EliteDailyCheckIn'
import Questionnaire from './EliteMember/Questionnaire'
import TimeofSuccess from './EliteMember/TimeofSuccess'
import EliteDashboard from './EliteMember/EliteDashboard'
import EliteHealthMetric from './EliteMember/EliteHealthMetric'
import EliteAchievement from './EliteMember/EliteAchievement'
import EliteCoach from './EliteMember/EliteCoach'
import EliteBookAppointment from './EliteMember/EliteBookAppointment'
import EliteCommunity from './EliteMember/EliteCommunity'
import EliteFeedback from './EliteMember/EliteFeedback'
import EliteNotificationsCenter from './EliteMember/EliteNotificationsCenter'
import EliteEditProfile from './EliteMember/EliteEditProfile'
import PackagePage from './Package/PackagePage'
import AdminDashboard from './Admin/AdminDashboard'
import AdminMembers from './Admin/AdminMembers'
import AdminPackage from './Admin/AdminPackage'
import Contents from './Admin/AdminContents/Contents'
import SendEmail from './Admin/AdminContents/SendEmail'
import Coaches from './Admin/AdminContents/Coaches'
import RatingsFeedbacksManagement from './Admin/RatingsFeedbacksManagement'
import ConfirmCoachSchedule from './Admin/ConfirmCoachSchedule'
import CoachDashboard from './Coach/CoachDashboard'
import CoachProfile from './Coach/CoachProfile'
import RequestSchedule from './Coach/RequestSchedule'
import CoachEditProfile from './Coach/CoachEditProfile'

// Standard Member Imports
import StandardMemberHome from './StandardMember/StandardMemberHome';
import StandardMemberDashboard from './StandardMember/StandardMemberDashboard';
import StandardAchievement from './StandardMember/StandardAchievement';
import StandardMember_Coach from './StandardMember/StandardMember_Coach';
import StandardMember_Commun from './StandardMember/StandardMember_Commun';
import Feedback from './StandardMember/Feedback';
import NotificationCenter from './StandardMember/NotificationCenter';
import DailyCheckIn from './StandardMember/DailyCheckIn';
import StandardEditProfile from './StandardMember/StandardEditProfile'
import StandardQuestionnaire from './StandardMember/StandardQuestionnaire';
import StandardTimeofSuccess from './StandardMember/StandardTimeofSuccess';

// Footer Imports
import AboutUs from './Footer/AboutUs';
import OurPrograms from './Footer/OurPrograms';
import SuccessStories from './Footer/SuccessStories';
import Blog from './Footer/Blog';
import Contact from './Footer/Contact';
import FAQ from './Footer/FAQ';
import HelpCenter from './Footer/HelpCenter';
import PrivacyPolicy from './Footer/PrivacyPolicy';
import TermsOfService from './Footer/TermsOfService';
import CookiePolicy from './Footer/CookiePolicy';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/elitewelcome" element={<EliteWelcome />} />
      <Route path="/elite/home" element={<EliteHome />} />
      <Route path="/elite/daily-checkin" element={<EliteDailyCheckIn />} />
      <Route path="/elite/questionnaire" element={<Questionnaire />} />
      <Route path="/elite/timeofsuccess" element={<TimeofSuccess />} />
      <Route path="/elite/dashboard" element={<EliteDashboard />} />
      <Route path="/elitehealthmetric" element={<EliteHealthMetric />} />
      <Route path="/elite/achievement" element={<EliteAchievement />} />
      <Route path="/elite/coach" element={<EliteCoach />} />
      <Route path="/elite/book-appointment" element={<EliteBookAppointment />} />
      <Route path="/elite/community" element={<EliteCommunity />} />
      <Route path="/elite/feedback" element={<EliteFeedback />} />
      <Route path="/elite/notification" element={<EliteNotificationsCenter />} />
      <Route path="/elite/edit-profile" element={<EliteEditProfile />} />

      {/* Standard Member Routes */}
      <Route path="/standard/home" element={<StandardMemberHome />} />
      <Route path="/standard/dashboard" element={<StandardMemberDashboard />} />
      <Route path="/standard/achievement" element={<StandardAchievement />} />
      <Route path="/standard/coach" element={<StandardMember_Coach />} />
      <Route path="/standard/community" element={<StandardMember_Commun />} />
      <Route path="/standard/feedback" element={<Feedback />} />
      <Route path="/standard/notification" element={<NotificationCenter />} />
      <Route path="/standard/daily-checkin" element={<DailyCheckIn />} />
      <Route path="/standard/edit-profile" element={<StandardEditProfile />} />
      <Route path="/standard/questionnaire" element={<StandardQuestionnaire />} />
      <Route path="/standard/timeofsuccess" element={<StandardTimeofSuccess />} />

      <Route path="/package" element={<PackagePage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/members" element={<AdminMembers />} />
      <Route path="/admin/packages" element={<AdminPackage />} />
      <Route path="/admin/contents" element={<Contents />} />
      <Route path="/admin/contents/send-email" element={<SendEmail />} />
      <Route path="/admin/coaches" element={<Coaches />} />
      <Route path="/admin/ratings" element={<RatingsFeedbacksManagement />} />
      <Route path="/confirm-coach-schedule" element={<ConfirmCoachSchedule />} />


      // Coach router

      <Route path="/coach/dashboard" element={<CoachDashboard />} />
      <Route path="/coach/profile" element={<CoachProfile />} />
      <Route path="/coach/request-schedule" element={<RequestSchedule />} />
      
      <Route path="/coach/edit-profile" element={<CoachEditProfile />} />

      {/* Footer Routes */}
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/our-programs" element={<OurPrograms />} />
      <Route path="/success-stories" element={<SuccessStories />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
    </Routes>
  )
}

export default App 
