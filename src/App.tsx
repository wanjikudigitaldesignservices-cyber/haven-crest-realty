import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { RoleRoute } from './components/shared/RoleRoute';

// Public Pages (21 routes)
import { HomePage } from './pages/public/HomePage';
import { BuyListingsPage } from './pages/public/BuyListingsPage';
import { RentListingsPage } from './pages/public/RentListingsPage';
import { PropertyDetailPage } from './pages/public/PropertyDetailPage';
import { SearchResultsPage } from './pages/public/SearchResultsPage';
import { NeighborhoodsPage } from './pages/public/NeighborhoodsPage';
import { NeighborhoodDetailPage } from './pages/public/NeighborhoodDetailPage';
import { AgentsDirectoryPage } from './pages/public/AgentsDirectoryPage';
import { AgentProfilePage } from './pages/public/AgentProfilePage';
import { AboutPage } from './pages/public/AboutPage';
import { CareersPage } from './pages/public/CareersPage';
import { BlogHubPage } from './pages/public/BlogHubPage';
import { BlogPostPage } from './pages/public/BlogPostPage';
import { FinancingGuidePage } from './pages/public/FinancingGuidePage';
import { ContactPage } from './pages/public/ContactPage';
import { ValuationPage } from './pages/public/ValuationPage';
import { ScheduleViewingPage } from './pages/public/ScheduleViewingPage';
import { SavedListingsPage } from './pages/public/SavedListingsPage';
import { FAQPage } from './pages/public/FAQPage';
import { PrivacyPage } from './pages/public/PrivacyPage';
import { TermsPage } from './pages/public/TermsPage';

// Auth & System Pages
import { LoginPage } from './pages/auth/LoginPage';
import { ForbiddenPage } from './pages/auth/ForbiddenPage';
import { NotFoundPage } from './pages/auth/NotFoundPage';

// Agent Portal (6 routes)
import { AgentDashboardPage } from './pages/agent/AgentDashboardPage';
import { AgentListingsPage } from './pages/agent/AgentListingsPage';
import { CreateListingPage } from './pages/agent/CreateListingPage';
import { EditListingPage } from './pages/agent/EditListingPage';
import { AgentLeadsPage } from './pages/agent/AgentLeadsPage';
import { AgentSettingsPage } from './pages/agent/AgentSettingsPage';

// Admin Portal (6 routes)
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminListingsPage } from './pages/admin/AdminListingsPage';
import { AdminAgentsPage } from './pages/admin/AdminAgentsPage';
import { AdminLeadsPage } from './pages/admin/AdminLeadsPage';
import { AdminContentPage } from './pages/admin/AdminContentPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export const App: React.FC = () => {
  const location = useLocation();
  const isPortalRoute = location.pathname.startsWith('/agent') || location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-brand-stone-50 text-brand-stone-900 selection:bg-brand-gold selection:text-brand-dark">
      {/* Public Navbar (hidden on portal dashboards) */}
      {!isPortalRoute && <Navbar />}

      {/* Main Content Router */}
      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/buy" element={<BuyListingsPage />} />
          <Route path="/rent" element={<RentListingsPage />} />
          <Route path="/property/:slug" element={<PropertyDetailPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/neighborhoods" element={<NeighborhoodsPage />} />
          <Route path="/neighborhoods/:slug" element={<NeighborhoodDetailPage />} />
          <Route path="/agents" element={<AgentsDirectoryPage />} />
          <Route path="/agents/:slug" element={<AgentProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/blog" element={<BlogHubPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/financing" element={<FinancingGuidePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/valuation" element={<ValuationPage />} />
          <Route path="/schedule-viewing" element={<ScheduleViewingPage />} />
          <Route path="/saved" element={<SavedListingsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Authentication & Error Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forbidden" element={<ForbiddenPage />} />

          {/* Agent Portal (Role-gated: Agent or Admin) */}
          <Route
            path="/agent/dashboard"
            element={
              <RoleRoute allowedRoles={['agent', 'admin']}>
                <AgentDashboardPage />
              </RoleRoute>
            }
          />
          <Route
            path="/agent/listings"
            element={
              <RoleRoute allowedRoles={['agent', 'admin']}>
                <AgentListingsPage />
              </RoleRoute>
            }
          />
          <Route
            path="/agent/listings/new"
            element={
              <RoleRoute allowedRoles={['agent', 'admin']}>
                <CreateListingPage />
              </RoleRoute>
            }
          />
          <Route
            path="/agent/listings/:id/edit"
            element={
              <RoleRoute allowedRoles={['agent', 'admin']}>
                <EditListingPage />
              </RoleRoute>
            }
          />
          <Route
            path="/agent/leads"
            element={
              <RoleRoute allowedRoles={['agent', 'admin']}>
                <AgentLeadsPage />
              </RoleRoute>
            }
          />
          <Route
            path="/agent/settings"
            element={
              <RoleRoute allowedRoles={['agent', 'admin']}>
                <AgentSettingsPage />
              </RoleRoute>
            }
          />

          {/* Admin Portal (Role-gated: Admin only) */}
          <Route
            path="/admin/dashboard"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminDashboardPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/listings"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminListingsPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/agents"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminAgentsPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/leads"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminLeadsPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/content"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminContentPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminSettingsPage />
              </RoleRoute>
            }
          />

          {/* Fallback 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Public Footer */}
      {!isPortalRoute && <Footer />}
    </div>
  );
};
