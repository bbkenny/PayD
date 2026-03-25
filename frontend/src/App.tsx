import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Debugger from './pages/Debugger';
import PayrollScheduler from './pages/PayrollScheduler';
import EmployeeEntry from './pages/EmployeeEntry';
import AppLayout from './components/AppLayout';
import HelpCenter from './pages/HelpCenter';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorFallback from './components/ErrorFallback';
import Settings from './pages/Settings';
import CustomReportBuilder from './pages/CustomReportBuilder';
import CrossAssetPayment from './pages/CrossAssetPayment';
import TransactionHistory from './pages/TransactionHistory';
import RevenueSplitDashboard from './pages/RevenueSplitDashboard';

import EmployeePortal from './pages/EmployeePortal';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import { useTranslation } from 'react-i18next';
import { contractService } from './services/contracts';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { t } = useTranslation();

  // Initialize contract service on app startup
  useEffect(() => {
    contractService.initialize().catch((error) => {
      console.error('Failed to initialize contract service:', error);
    });
  }, []);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ErrorBoundary
                fallback={
                  <ErrorFallback
                    title={t('errorFallback.homeTitle')}
                    description={t('errorFallback.homeDescription')}
                  />
                }
              >
                <Home />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payroll"
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <ErrorBoundary
                fallback={
                  <ErrorFallback
                    title={t('errorFallback.payrollTitle')}
                    description={t('errorFallback.payrollDescription')}
                  />
                }
              >
                <PayrollScheduler />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <ErrorBoundary
                fallback={
                  <ErrorFallback
                    title={t('errorFallback.employeesTitle')}
                    description={t('errorFallback.employeesDescription')}
                  />
                }
              >
                <EmployeeEntry />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal"
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <ErrorBoundary
                fallback={
                  <ErrorFallback
                    title="Employee Portal Error"
                    description="Something went wrong loading your portal."
                  />
                }
              >
                <EmployeePortal />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <ErrorBoundary fallback={<ErrorFallback />}>
                <CustomReportBuilder />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/debug"
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <ErrorBoundary
                fallback={
                  <ErrorFallback
                    title={t('errorFallback.debuggerTitle')}
                    description={t('errorFallback.debuggerDescription')}
                  />
                }
              >
                <Debugger />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/debug/:contractName"
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <ErrorBoundary
                fallback={
                  <ErrorFallback
                    title={t('errorFallback.debuggerTitle')}
                    description={t('errorFallback.debuggerDescription')}
                  />
                }
              >
                <Debugger />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <ErrorBoundary fallback={<ErrorFallback onReset={() => {}} />}>
                <Settings />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <ErrorBoundary fallback={<ErrorFallback onReset={() => {}} />}>
                <HelpCenter />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cross-asset-payment"
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <ErrorBoundary fallback={<ErrorFallback onReset={() => {}} />}>
                <CrossAssetPayment />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <ErrorBoundary fallback={<ErrorFallback onReset={() => {}} />}>
                <TransactionHistory />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/revenue-split"
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <ErrorBoundary fallback={<ErrorFallback onReset={() => {}} />}>
                <RevenueSplitDashboard />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
      </Route>
    </Routes>
  );
}

export default App;
