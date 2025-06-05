import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/hook/useAuth';
import LoadingScreen from './LoadingScreen';

const AdminRoute = ({ children }) => {
  const { currentUser, checkAdmin } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      if (currentUser) {
        const admin = await checkAdmin(currentUser.uid);
        setIsAdmin(admin);
      }
      setLoading(false);
    };
    verifyAdmin();
  }, [currentUser, checkAdmin]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!currentUser) {
    return <Navigate to='/admin' />;
  }

  if (!isAdmin) {
    return <Navigate to='/dashboard' />;
  }

  return children;
};

export default AdminRoute;
