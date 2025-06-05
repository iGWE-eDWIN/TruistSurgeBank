import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/hook/useAuth';
import {
  Menu,
  X,
  User,
  LogOut,
  CreditCard,
  Home,
  ChevronDown,
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className='bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Link to='/' className='flex items-center'>
              <CreditCard className='h-8 w-8 text-primary-600' />
              <span className='ml-2 text-xl font-bold text-primary-900'>
                TruistSurge
              </span>
            </Link>
          </div>

          <div className='hidden md:flex md:items-center md:space-x-4'>
            {currentUser ? (
              <>
                <Link
                  to='/dashboard'
                  className='px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors'
                >
                  Dashboard
                </Link>
                <div className='relative group'>
                  <button className='flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-primary-600 focus:outline-none transition-colors'>
                    <span>Services</span>
                    <ChevronDown className='ml-1 h-4 w-4' />
                  </button>
                  <div className='absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10'>
                    <Link
                      to='/dashboard/transfer'
                      className='block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100'
                    >
                      Transfer Funds
                    </Link>
                    <Link
                      to='/dashboard/transactions'
                      className='block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100'
                    >
                      Transaction History
                    </Link>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className='flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-red-600 transition-colors'
                >
                  <LogOut className='h-4 w-4 mr-1' />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/'
                  className='px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors'
                >
                  <Home className='h-4 w-4 inline mr-1' />
                  <span>Home</span>
                </Link>
                <Link
                  to='/login'
                  className='px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors'
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className='px-3 py-2 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors'
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <div className='flex md:hidden items-center'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-primary-600 hover:bg-slate-100 focus:outline-none'
            >
              {isOpen ? (
                <X className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <Menu className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
          {currentUser ? (
            <>
              <Link
                to='/dashboard'
                className='block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-100 transition-colors'
              >
                Dashboard
              </Link>
              <Link
                to='/dashboard/transfer'
                className='block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-100 transition-colors'
              >
                Transfer Funds
              </Link>
              <Link
                to='/dashboard/transactions'
                className='block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-100 transition-colors'
              >
                Transaction History
              </Link>
              <button
                onClick={handleLogout}
                className='w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to='/'
                className='block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-100 transition-colors'
              >
                Home
              </Link>
              <Link
                to='/login'
                className='block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-100 transition-colors'
              >
                Login
              </Link>
              <Link
                to='/register'
                className='block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-100 transition-colors'
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
