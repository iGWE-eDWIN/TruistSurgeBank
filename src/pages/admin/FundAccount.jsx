import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CreditCard,
  DollarSign,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
// import { useAuth } from '../../context/hook/useAuth';
import { toast } from 'react-toastify';
import { fundUserAccount, getUserProfile } from '../../services/adminservices';

const FundAccount = () => {
  const { userId } = useParams();
  // console.log(userId);
  //   const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await getUserProfile(userId);
        console.log(userData);
        setUser(userData);
      } catch (error) {
        setError('Failed to load user data: ' + error.message);
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.amount ||
      isNaN(formData.amount) ||
      Number(formData.amount) <= 0
    ) {
      setError('Please enter a valid amount');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      await fundUserAccount(userId, formData.amount, formData.description);

      setSuccess(true);
      toast.success(
        `Successfully funded ${user.fullName}'s account with $${formData.amount}`
      );

      // Reset form
      setFormData({
        amount: '',
        description: '',
      });

      // Refresh user data to show updated balance
      const updatedUserData = await getUserProfile(userId);
      setUser(updatedUserData);
    } catch (error) {
      setError('Failed to fund account: ' + error.message);
      toast.error('Failed to fund account: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) {
    return (
      <div className='page-container'>
        <div className='flex justify-center items-center py-12'>
          <Loader2 className='w-8 h-8 text-primary-600 animate-spin' />
        </div>
      </div>
    );
  }
  return (
    <div className='page-container'>
      <h1 className='text-2xl font-bold mb-6 text-slate-800'>
        Fund User Account
      </h1>

      {error && (
        <div className='mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start'>
          <AlertCircle className='h-5 w-5 mr-2 mt-0.5 flex-shrink-0' />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className='mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-start'>
          <CheckCircle2 className='h-5 w-5 mr-2 mt-0.5 flex-shrink-0' />
          <span>Successfully funded account!</span>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='md:col-span-1'>
          <div className='card'>
            <h2 className='text-lg font-semibold mb-4 text-slate-800'>
              User Details
            </h2>

            <div className='space-y-4'>
              <div className='flex items-center'>
                <CreditCard className='h-5 w-5 text-slate-400 mr-3' />
                <div>
                  <p className='text-sm text-slate-500'>Account</p>
                  <p className='font-medium text-slate-800'>
                    {user.accountNumber}
                  </p>
                </div>
              </div>

              <div>
                <p className='text-sm text-slate-500'>Name</p>
                <p className='font-medium text-slate-800'>{user.fullName}</p>
              </div>

              <div>
                <p className='text-sm text-slate-500'>Email</p>
                <p className='font-medium text-slate-800'>{user.email}</p>
              </div>

              <div>
                <p className='text-sm text-slate-500'>Current Balance</p>
                <p className='font-semibold text-slate-800'>
                  ${user.accountBalance.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='md:col-span-2'>
          <div className='card'>
            <h2 className='text-lg font-semibold mb-4 text-slate-800'>
              Fund Account
            </h2>

            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='amount' className='label'>
                  Amount to Fund ($)
                </label>
                <div className='relative'>
                  <DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
                  <input
                    type='number'
                    id='amount'
                    className='input pl-10'
                    placeholder='0.00'
                    min='0.01'
                    step='0.01'
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor='description' className='label'>
                  Description (Optional)
                </label>
                <textarea
                  id='description'
                  className='input'
                  placeholder='Reason for funding'
                  rows='2'
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className='flex gap-3 mt-6'>
                <button
                  type='button'
                  onClick={() => navigate('/admin/dashboard/users')}
                  className='btn-outline flex-1'
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='btn-success flex-1 flex justify-center items-center'
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className='animate-spin h-5 w-5 mr-2' />
                      Processing...
                    </>
                  ) : (
                    <>
                      <DollarSign className='h-4 w-4 mr-2' />
                      Fund Account
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundAccount;
