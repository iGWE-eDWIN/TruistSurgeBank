import { useState, useEffect } from 'react';
import { getAllLoans, updateLoanStatus } from '../../services/adminservices';
import {
  Calculator,
  Search,
  Filter,
  AlertCircle,
  Loader2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ManageLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved', 'rejected'
  const [processingLoan, setProcessingLoan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchLoans = async () => {
      setLoading(true);
      try {
        const data = await getAllLoans();
        if (isMounted) {
          setLoans(data.loans);
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError(`Failed to load loans: ${err?.message || 'Unknown error'}`);
          console.error('Error fetching loans:', err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLoans();

    return () => {
      isMounted = false; // prevent state update after unmount
    };
  }, []);

  const handleStatusChange = async (loanId, newStatus) => {
    try {
      setProcessingLoan(loanId);
      await updateLoanStatus(loanId, newStatus);

      setLoans(
        loans.map((loan) =>
          loan._id === loanId ? { ...loan, status: newStatus } : loan
        )
      );

      toast.success(`Loan ${newStatus} successfully`);

      if (newStatus === 'approved') {
        navigate('admin/dashboard'); // adjust this path as needed
      }
    } catch (error) {
      toast.error('Failed to update loan status: ' + error.message);
    } finally {
      setProcessingLoan(null);
    }
  };

  const filteredLoans = Array.isArray(loans)
    ? loans.filter((loan) => {
        const matchesSearch =
          loan.userId?.fullName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          loan.type?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filter === 'all' || loan.status === filter;

        return matchesSearch && matchesFilter;
      })
    : [];

  const formatDate = (timestamp) => {
    try {
      if (!timestamp) return 'Invalid date';

      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return 'Invalid date';

      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className='page-container'>
      <h1 className='text-2xl font-bold mb-6 text-slate-800'>Manage Loans</h1>

      {error && (
        <div className='mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start'>
          <AlertCircle className='h-5 w-5 mr-2 mt-0.5 flex-shrink-0' />
          <span>{error}</span>
        </div>
      )}

      <div className='card mb-6'>
        <div className='flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4'>
          <div className='relative flex-grow'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
            <input
              type='text'
              placeholder='Search by user or loan type...'
              className='input pl-10'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className='flex items-center space-x-2'>
            <Filter className='h-5 w-5 text-slate-400' />
            <select
              className='border border-slate-300 rounded-md px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-300'
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value='all'>All Loans</option>
              <option value='pending'>Pending</option>
              <option value='approved'>Approved</option>
              <option value='rejected'>Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className='flex justify-center items-center py-12'>
          <Loader2 className='w-8 h-8 text-primary-600 animate-spin' />
        </div>
      ) : filteredLoans.length > 0 ? (
        <div className='space-y-4'>
          {filteredLoans.map((loan) => (
            <div
              key={loan._id}
              className='card hover:shadow-lg transition-shadow'
            >
              <div className='flex flex-col md:flex-row md:items-center justify-between'>
                <div className='flex-1'>
                  <div className='flex items-start mb-4'>
                    <Calculator className='h-5 w-5 text-primary-600 mt-1 mr-2' />
                    <div>
                      <h3 className='text-lg font-semibold text-slate-800'>
                        {loan.type.charAt(0).toUpperCase() + loan.type.slice(1)}{' '}
                        Loan
                      </h3>
                      <p className='text-sm text-slate-600'>
                        By {loan.userId.fullName}
                      </p>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
                    <div>
                      <p className='text-sm text-slate-500'>Amount</p>
                      <p className='font-semibold'>${loan.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className='text-sm text-slate-500'>Interest Rate</p>
                      <p className='font-semibold'>{loan.interestRate}%</p>
                    </div>
                    <div>
                      <p className='text-sm text-slate-500'>Monthly Payment</p>
                      <p className='font-semibold'>
                        ${loan.monthlyPayment.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-slate-500'>Total Payment</p>
                      <p className='font-semibold'>
                        ${loan.totalPayment.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          loan.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : loan.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {loan.status.charAt(0).toUpperCase() +
                          loan.status.slice(1)}
                      </span>
                      <span className='ml-2 text-sm text-slate-500'>
                        Applied on {formatDate(loan.createdAt)}
                      </span>
                    </div>

                    {loan.status === 'pending' && (
                      <div className='flex space-x-2'>
                        <button
                          onClick={() =>
                            handleStatusChange(loan._id, 'approved')
                          }
                          disabled={processingLoan === loan._id}
                          className='btn-success flex items-center text-sm'
                        >
                          {processingLoan === loan._id ? (
                            <Loader2 className='animate-spin h-4 w-4 mr-1' />
                          ) : (
                            <CheckCircle2 className='h-4 w-4 mr-1' />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(loan._id, 'rejected')
                          }
                          disabled={processingLoan === loan._id}
                          className='btn-danger flex items-center text-sm'
                        >
                          {processingLoan === loan._id ? (
                            <Loader2 className='animate-spin h-4 w-4 mr-1' />
                          ) : (
                            <XCircle className='h-4 w-4 mr-1' />
                          )}
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center py-12 bg-white rounded-lg shadow'>
          <p className='text-slate-500'>No loans found</p>
        </div>
      )}
    </div>
  );
};

export default ManageLoans;
