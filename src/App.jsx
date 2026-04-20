import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import StudentDashboard from './pages/StudentDashboard';
import NewProposal from './pages/NewProposal';
import ManageProposals from './pages/ManageProposals';
import SupervisorDashboard from './pages/SupervisorDashboard';
import BrowseProposals from './pages/BrowseProposals';
import MyProjects from './pages/MyProjects';
import DossierDetail from './pages/DossierDetail';
import ExpertiseSettings from './pages/ExpertiseSettings';
import ModuleLeaderDashboard from './pages/ModuleLeaderDashboard';
import ResearchAreas from './pages/ResearchAreas';
import AllocationOversight from './pages/AllocationOversight';
import UserManagement from './pages/UserManagement';
import AuditLogs from './pages/AuditLogs';
import NotificationsPage from './pages/NotificationsPage';
import ProfileSettings from './pages/ProfileSettings';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import SupportPage from './pages/SupportPage';
import StudentLayout from './components/StudentLayout';

import './App.css';
import './UnifiedTheme.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/support" element={<SupportPage />} />

        {/* Student Protected Layout */}
        <Route element={<StudentLayout />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/new-proposal" element={<NewProposal />} />
          <Route path="/edit-proposal/:id" element={<NewProposal />} />
          <Route path="/manage-proposals" element={<ManageProposals />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfileSettings />} />
        </Route>

        {/* Other Dashboards (Currently without unified layout) */}
        <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
        <Route path="/browse-proposals" element={<BrowseProposals />} />
        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/project-detail" element={<DossierDetail />} />
        <Route path="/expertise-settings" element={<ExpertiseSettings />} />
        <Route path="/module-leader-dashboard" element={<ModuleLeaderDashboard />} />
        <Route path="/research-areas" element={<ResearchAreas />} />
        <Route path="/allocation-oversight" element={<AllocationOversight />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/audit-logs" element={<AuditLogs />} />
      </Routes>
    </Router>
  );
}

export default App;
