import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/hook/useAuth';
import { applyForLoan } from '../../services/userServices';
import { AlertCircle, Loader2, DollarSign, Calculator } from 'lucide-react';
import { toast } from 'react-toastify';

const LoanApplication = () => {
  // const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: 'student',
    amount: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loanTypes = [
    { id: 'student', name: 'Student Loan', rate: 3 },
    { id: 'personal', name: 'Personal Loan', rate: 5 },
    { id: 'business', name: 'Business Loan', rate: 6 },
    { id: 'mortgage', name: 'Mortgage Loan', rate: 6 },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const calculateMonthlyPayment = () => {
    if (!formData.amount) return null;

    const amount = Number(formData.amount);
    const rate = loanTypes.find((lt) => lt.id === formData.type).rate;
    const monthlyRate = rate / 100 / 12;
    const months = 12;

    const monthlyPayment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    return monthlyPayment.toFixed(2);
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

    try {
      setError('');
      setLoading(true);
      await applyForLoan(formData.type, formData.amount);
      toast.success('Loan application submitted successfully');
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to submit loan application: ' + error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const monthlyPayment = calculateMonthlyPayment();
  const selectedLoanType = loanTypes.find((lt) => lt.id === formData.type);

  return (
    <>
      <div className='page-container'>
        <div className='max-w-2xl mx-auto'>
          <h1 className='text-2xl font-bold mb-6 text-slate-800'>
            Apply for a Loan
          </h1>

          {error && (
            <div className='mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start'>
              <AlertCircle className='h-5 w-5 mr-2 mt-0.5 flex-shrink-0' />
              <span>{error}</span>
            </div>
          )}

          <div className='card'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='type' className='label'>
                  Loan Type
                </label>
                <select
                  id='type'
                  className='input'
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  {loanTypes.map((loan) => (
                    <option key={loan.id} value={loan.id}>
                      {loan.name} - {loan.rate}% APR
                    </option>
                  ))}
                </select>
              </div>

              <div className='form-group'>
                <label htmlFor='amount' className='label'>
                  Loan Amount ($)
                </label>
                <div className='relative'>
                  <DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
                  <input
                    type='number'
                    id='amount'
                    className='input pl-10'
                    placeholder='Enter loan amount'
                    value={formData.amount}
                    onChange={handleChange}
                    min='1000'
                    step='100'
                    required
                  />
                </div>
              </div>

              {formData.amount && monthlyPayment && (
                <div className='mt-6 p-4 bg-primary-50 rounded-lg'>
                  <h3 className='text-lg font-semibold text-primary-900 mb-3'>
                    Loan Summary
                  </h3>
                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <span className='text-primary-700'>Loan Type:</span>
                      <span className='font-medium'>
                        {selectedLoanType.name}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-primary-700'>Interest Rate:</span>
                      <span className='font-medium'>
                        {selectedLoanType.rate}% APR
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-primary-700'>Loan Amount:</span>
                      <span className='font-medium'>
                        ${Number(formData.amount).toFixed(2)}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-primary-700'>Payment Period:</span>
                      <span className='font-medium'>12 months</span>
                    </div>
                    <div className='flex justify-between pt-2 border-t border-primary-100'>
                      <span className='text-primary-900 font-medium'>
                        Monthly Payment:
                      </span>
                      <span className='font-bold text-primary-900'>
                        ${monthlyPayment}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className='mt-6'>
                <button
                  type='submit'
                  className='btn-primary w-full flex justify-center items-center'
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className='animate-spin h-5 w-5 mr-2' />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Calculator className='h-5 w-5 mr-2' />
                      Apply for Loan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanApplication;
