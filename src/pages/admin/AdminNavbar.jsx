import { useState } from 'react';
import { Link, useNavigate, useLocation, matchPath } from 'react-router-dom';
import {
  Menu,
  X,
  LogOut,
  ShieldAlert,
  Users,
  DollarSign,
  ClipboardList,
  Calculator,
} from 'lucide-react';
import { useAuth } from '../../context/hook/useAuth';

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // const isActive = (path) => {
  //   return (
  //     location.pathname === path || location.pathname.startsWith(path + '/')
  //   );
  // };
  const isActive = (path) => {
    return matchPath({ path, end: true }, location.pathname) !== null;
  };

  return (
    <nav className='bg-slate-900 text-white shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Link to='/admin/dashboard' className='flex items-center'>
              <ShieldAlert className='h-8 w-8 text-white' />
              <span className='ml-2 text-xl font-bold'>Admin Panel</span>
            </Link>
          </div>

          <div className='hidden md:flex md:items-center md:space-x-4'>
            <Link
              to='/admin/dashboard'
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/admin/dashboard')
                  ? 'bg-primary-700 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to='/admin/dashboard/users'
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/admin/dashboard/users')
                  ? 'bg-primary-700 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Manage Users
            </Link>
            <Link
              to='/admin/dashboard/loans'
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/admin/dashboard/loans')
                  ? 'bg-primary-700 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Manage Loans
            </Link>
            <Link
              to='/admin/dashboard/transactions'
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/admin/dashboard/transactions')
                  ? 'bg-primary-700 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Transactions
            </Link>

            <button
              onClick={handleLogout}
              className='ml-4 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-red-600 hover:text-white transition-colors'
            >
              <LogOut className='h-4 w-4 inline-block mr-1' />
              Logout
            </button>
          </div>

          <div className='flex md:hidden items-center'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none'
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
          <Link
            to='/admin/dashboard'
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/admin/dashboard')
                ? 'bg-primary-700 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to='/admin/dashboard/users'
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/admin/dashboard/users')
                ? 'bg-primary-700 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Manage Users
          </Link>
          <Link
            to='/admin/dashboard/loans'
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive('/admin/dashboard/loans')
                ? 'bg-primary-700 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            Manage Loans
          </Link>
          <Link
            to='/admin/dashboard/transactions'
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/admin/dashboard/transactions')
                ? 'bg-primary-700 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Transactions
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-300 hover:bg-red-600 hover:text-white'
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
export default AdminNavbar;
