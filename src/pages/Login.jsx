import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/hook/useAuth';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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
      await login(email, password);
      toast.success('Login successful');
      navigate('/dashboard');
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
              <h1 className='text-2xl font-bold text-primary-900'>
                Welcome Back
              </h1>
              <p className='text-slate-600 mt-2'>
                Log in to access your Truist Surge account
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
                    placeholder='you@example.com'
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
                  'Log In'
                )}
              </button>
            </form>

            <div className='mt-6 text-center text-sm'>
              <p className='text-slate-600'>
                Don't have an account?{' '}
                <Link
                  to='/register'
                  className='text-primary-600 hover:text-primary-800 font-medium'
                >
                  Register
                </Link>
              </p>
              <p className='mt-2'>
                <Link
                  to='/admin'
                  className='text-slate-500 hover:text-slate-700'
                >
                  Admin Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
