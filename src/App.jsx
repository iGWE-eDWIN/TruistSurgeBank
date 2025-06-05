import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/hook/useAuth';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import LoadingScreen from './components/LoadingScreen';

//Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';

const App = () => {
  const { currentUser, loading, checkAdmin } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const checkAdminStatus = async () => {
        const admin = await checkAdmin(currentUser._id);
        console.log(admin);
        setIsAdmin(admin);
      };

      checkAdminStatus();
    } else {
      setIsAdmin(false);
    }
  }, [currentUser, checkAdmin]);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route
        path='/login'
        element={!currentUser ? <Login /> : <Navigate to='/dashboard' />}
      />
      <Route
        path='/register'
        element={!currentUser ? <Register /> : <Navigate to='/dashboard' />}
      />

      <Route
        path='/dashboard/*'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path='/admin'
        element={
          !currentUser ? (
            <AdminLogin />
          ) : (
            isAdmin & <Navigate to='/admin/dashboard' />
          )
        }
      />
      <Route
        path='/admin/dashboard/*'
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
