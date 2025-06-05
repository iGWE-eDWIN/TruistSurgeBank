import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/hook/useAuth';
import { transferFunds } from '../../services/userServices';
import {
  ArrowRight,
  AlertCircle,
  Loader2,
  CheckCircle2,
  KeyRound,
} from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar';

const Transfer = ({ refreshData }) => {
  //   const { currentUser } = useAuth();
  const navigate = useNavigate();

  // banks array
  const banks = [
    'Select Bank',
    'Bank Of America',
    'Capital One Bank',
    'Citibank',
    'Chase Bank',
    'JPMorgan Chase',
    'PNC Bank',
    'TD Bank',
    'M&T Bank',
    'First Citizens Bank',
    'Comerica Bank',
    'Zions Bank',
    'New York Community Bank',
    'Synovus Bank',
    'First Horizon Bank',
    'Valley National Bank',
    'City National Bank',
    'Frost Bank',
    'Western Alliance Bank',
    'East West Bank',
    'Ally Bank',
    'Discover Bank',
    'American Express National Bank',
    'Chime (Backed By The Bancorp Bank/Stride SoFi Bank)',
    'Varo Bank',
    'Axos Bank',
    'LendingClub Bank',
    'Current (Backed By Choice Financial Group)',
    'One Finance (Backed By Coastal Community Bank)',
    'Bank Of The West (Acquired By BMO In 2023)',
    'Banner Bank',
    'SouthState Bank',
    'Pinnacle Financial Partners',
    'Cadence Bank',
    'Associated Bank',
    'Wintrust Bank',
    'Ameris Bank',
    'Pacific Western Bank (Now Part Of Banc Of California)',
    'Customers Bank',
    'Goldman Sachs',
    'Wells Fargo Bank',
    'RoyalTrust',
    'BMO Harris Bank',
    'Morgan Stanley',
    'State Street',
    'Citizens Bank',
    'Fifth Third Bank',
    'BNY',
  ];

  const [formData, setFormData] = useState({
    accountNumber: '',
    amount: '',
    description: '',
    transferPin: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Pin Confirmation, 3: Success

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    if (!formData.accountNumber) {
      setError('Account number is required');
      return false;
    }

    if (
      !formData.amount ||
      isNaN(formData.amount) ||
      Number(formData.amount) <= 0
    ) {
      setError('Please enter a valid amount');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setError('');
    setStep(2); // Move to PIN confirmation
  };

  const handleConfirm = async () => {
    if (!formData.transferPin) {
      setError('Please enter your transfer PIN');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await transferFunds(
        formData.accountNumber,
        formData.amount,
        formData.description,
        formData.transferPin
      );

      setSuccess(true);
      setStep(3); // Move to success
      toast.success('Transfer completed successfully');
      if (refreshData) refreshData();
    } catch (error) {
      setError(error.message);
      // setStep(1); // Back to form on error
      if (error.message.includes('suspended')) {
        navigate('/dashboard');
      }
      toast.error('Transfer failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      accountNumber: '',
      amount: '',
      description: '',
      transferPin: '',
    });
    setError('');
    setSuccess(false);
    setStep(1);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className='page-container'>
        <div className='max-w-lg mx-auto'>
          <h1 className='text-2xl font-bold mb-6 text-slate-800'>
            Transfer Funds
          </h1>

          {error && (
            <div className='mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start'>
              <AlertCircle className='h-5 w-5 mr-2 mt-0.5 flex-shrink-0' />
              <span>{error}</span>
            </div>
          )}

          {step === 1 && (
            <div className='card animate-fade-in'>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='bank' className='label'>
                    Select Bank
                  </label>
                  <select
                    id='bank'
                    className='input'
                    value={formData.bank}
                    onChange={handleChange}
                    required
                  >
                    {banks.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='accountNumber' className='label'>
                    Recipient Account Number
                  </label>
                  <input
                    type='text'
                    id='accountNumber'
                    className='input'
                    placeholder='Enter account number'
                    value={formData.accountNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='amount' className='label'>
                    Amount ($)
                  </label>
                  <input
                    type='number'
                    id='amount'
                    className='input'
                    placeholder='0.00'
                    min='0.01'
                    step='0.01'
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='description' className='label'>
                    Description (Optional)
                  </label>
                  <textarea
                    id='description'
                    className='input'
                    placeholder="What's this transfer for?"
                    rows='2'
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className='mt-6'>
                  <button type='submit' className='btn-primary w-full'>
                    Continue{' '}
                    <ArrowRight className='ml-1 h-4 w-4 inline-block' />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className='card animate-fade-in'>
              <h2 className='text-lg font-semibold mb-4 text-slate-800'>
                Confirm Transfer
              </h2>
              <div className='space-y-4 mb-6 p-4 bg-slate-50 rounded-lg'>
                <div className='flex justify-between'>
                  <span className='text-slate-600'>To Account:</span>
                  <span className='font-medium'>{formData.accountNumber}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-slate-600'>Amount:</span>
                  <span className='font-medium'>
                    ${Number(formData.amount).toFixed(2)}
                  </span>
                </div>
                {formData.description && (
                  <div className='flex justify-between'>
                    <span className='text-slate-600'>Description:</span>
                    <span className='font-medium'>{formData.description}</span>
                  </div>
                )}
              </div>

              <div className='form-group'>
                <label htmlFor='transferPin' className='label'>
                  Enter Transfer PIN
                </label>
                <div className='relative'>
                  <KeyRound className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
                  <input
                    type='password'
                    id='transferPin'
                    className='input pl-10'
                    placeholder='Enter your 4-digit PIN'
                    maxLength='4'
                    value={formData.transferPin}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className='flex gap-3'>
                <button
                  onClick={() => setStep(1)}
                  className='btn-outline flex-1'
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  onClick={handleConfirm}
                  className='btn-primary flex-1 flex justify-center items-center'
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className='animate-spin h-5 w-5 mr-2' />
                      Processing...
                    </>
                  ) : (
                    'Confirm Transfer'
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && success && (
            <div className='card animate-fade-in text-center'>
              <div className='mb-4'>
                <CheckCircle2 className='h-16 w-16 mx-auto text-green-500' />
              </div>
              <h2 className='text-xl font-semibold mb-2 text-slate-800'>
                Transfer Successful!
              </h2>
              <p className='text-slate-600 mb-6'>
                You have transferred ${Number(formData.amount).toFixed(2)} to
                account {formData.accountNumber}
              </p>

              <div className='flex gap-3'>
                <button onClick={resetForm} className='btn-outline flex-1'>
                  New Transfer
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className='btn-primary flex-1'
                >
                  Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Transfer;
