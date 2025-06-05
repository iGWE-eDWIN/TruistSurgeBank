import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/hook/useAuth';
import LoadingScreen from './LoadingScreen';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default ProtectedRoute;
