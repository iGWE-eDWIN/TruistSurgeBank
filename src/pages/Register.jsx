import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/hook/useAuth';
import { Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setError('');
      setLoading(true);
      await register(formData.email, formData.password, formData.fullName);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to create an account: ' + error.message);
      toast.error('Registration failed: ' + error.message);
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
                Create Account
              </h1>
              <p className='text-slate-600 mt-2'>
                Join Truist Surge and start your banking journey
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
                <label htmlFor='fullName' className='label'>
                  Full Name
                </label>
                <div className='relative'>
                  <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
                  <input
                    type='text'
                    id='fullName'
                    className='input pl-10'
                    placeholder='John Doe'
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

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
                    value={formData.email}
                    onChange={handleChange}
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
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor='confirmPassword' className='label'>
                  Confirm Password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
                  <input
                    type='password'
                    id='confirmPassword'
                    className='input pl-10'
                    placeholder='••••••••'
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className='mt-6 text-center text-sm'>
              <p className='text-slate-600'>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='text-primary-600 hover:text-primary-800 font-medium'
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
