import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "../components/auth/SignUp";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthLayout from "../components/layouts/AuthLayout";
import SignIn from "../components/auth/SignIn";
import MainLayout from "../components/layouts/MainLayout";

import NotFound from "../components/not-found/NotFound";
import FormBuilder from "../components/form-builder/FormBuilder";

import Dashboard from "../components/dashboard/Dashboard";

import GlobalErrorBoundary from "../components/common/ErrorBoundry/GlobalErrorBoundary";

const AppRoutes: React.FC = () => {
  return (
    <GlobalErrorBoundary>
      <Routes>
        {/* Authentication Routes with AuthLayout */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        {/* Protected Routes with Sidebar */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <MainLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* Forms List in Dashboard Layout */}
          <Route path="forms" index element={<Dashboard />} />
        </Route>

        {/* Protected Routes without Sidebar (Form Builder) */}
        <Route
          element={
            <ProtectedRoutes>
              <MainLayout hideSidebar={true} />
            </ProtectedRoutes>
          }
        >
          {/* Form Builder Routes */}
          <Route path="projects/:projectId">
            <Route path="forms">
              <Route path="new" element={<FormBuilder />} />
              <Route path=":formId">
                <Route path="edit" element={<FormBuilder />} />
                <Route path="preview" element={<FormBuilder />} />
                <Route path="responses" element={<FormBuilder />} />
                <Route path="settings" element={<FormBuilder />} />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </GlobalErrorBoundary>
  );
};

export default AppRoutes;
