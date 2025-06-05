import { Link } from 'react-router-dom';
import { useAuth } from '../context/hook/useAuth';
import { Home } from 'lucide-react';
import Navbar from '../components/Navbar';

const NotFound = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-slate-50 flex items-center justify-center px-4'>
        <div className='text-center max-w-md'>
          <h1 className='text-6xl font-bold text-primary-600 mb-4'>404</h1>
          <h2 className='text-2xl font-semibold text-slate-800 mb-3'>
            Page Not Found
          </h2>
          <p className='text-slate-600 mb-8'>
            The page you are looking for doesn't exist or has been moved.
          </p>

          <Link
            to={currentUser ? '/dashboard' : '/'}
            className='btn-primary inline-flex items-center'
          >
            <Home className='h-4 w-4 mr-2' />
            Go {currentUser ? 'to Dashboard' : 'Home'}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
