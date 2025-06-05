import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader2, ShieldAlert } from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/hook/useAuth';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const user = await adminLogin(email, password);
      console.log(user);

      if (user) {
        toast.success('Admin login successful');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      setError('Failed to log in: ' + error.message);
      toast.error('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-slate-50 py-12'>
        <div className='max-w-md mx-auto px-4'>
          <div className='card animate-fade-in'>
            <div className='mb-6 text-center'>
              <ShieldAlert className='h-12 w-12 text-primary-600 mx-auto mb-2' />
              <h1 className='text-2xl font-bold text-primary-900'>
                Admin Login
              </h1>
              <p className='text-slate-600 mt-2'>
                Access the administrative dashboard
              </p>
            </div>

            {error && (
              <div className='mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start'>
                <AlertCircle className='h-5 w-5 mr-2 mt-0.5 flex-shrink-0' />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='email' className='label'>
                  Email Address
                </label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
                  <input
                    type='email'
                    id='email'
                    className='input pl-10'
                    placeholder='admin@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor='password' className='label'>
                  Password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
                  <input
                    type='password'
                    id='password'
                    className='input pl-10'
                    placeholder='••••••••'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type='submit'
                className='btn-primary w-full flex justify-center items-center'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className='animate-spin h-5 w-5 mr-2' />
                    Logging in...
                  </>
                ) : (
                  'Admin Log In'
                )}
              </button>
            </form>

            <div className='mt-6 text-center text-sm'>
              <p className='text-slate-600'>
                <Link
                  to='/login'
                  className='text-primary-600 hover:text-primary-800 font-medium'
                >
                  Back to User Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminLogin;
