import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2, DollarSign } from 'lucide-react';
import { toast } from 'react-toastify';
import { attemptWithdrawal } from '../../services/userServices';
import Navbar from '../../components/Navbar';

const Withdraw = ({ refreshData }) => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    try {
      setError('');
      setLoading(true);

      // As per requirements, attempt withdrawal will show loading and then error
      await attemptWithdrawal(amount);

      // This code will not run due to the simulated error in attemptWithdrawal
      if (refreshData) refreshData();
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className='page-container'>
        <div className='max-w-lg mx-auto'>
          <h1 className='text-2xl font-bold mb-6 text-slate-800'>
            Withdraw Funds
          </h1>

          {error && (
            <div className='mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start'>
              <AlertCircle className='h-5 w-5 mr-2 mt-0.5 flex-shrink-0' />
              <span>{error}</span>
            </div>
          )}

          <div className='card animate-fade-in'>
            <div className='mb-6'>
              <div className='rounded-lg bg-amber-50 border border-amber-200 p-4 mb-6'>
                <p className='text-amber-800 text-sm'>
                  <strong>Note:</strong> To complete a withdrawal, please
                  contact customer support or visit your local branch.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='amount' className='label'>
                    Amount to Withdraw ($)
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
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className='mt-6'>
                  <button
                    type='submit'
                    className='btn-primary w-full flex justify-center items-center'
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className='animate-spin h-5 w-5 mr-2' />
                        Processing Withdrawal...
                      </>
                    ) : (
                      'Withdraw Funds'
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className='border-t border-slate-200 pt-4'>
              <button
                onClick={() => navigate('/dashboard')}
                className='text-primary-600 hover:text-primary-800 text-sm font-medium'
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdraw;
