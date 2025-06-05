import { useState, useEffect } from 'react';
// import { useAuth } from '../../context/hook/useAuth';
import { getUserTransactions } from '../../services/userServices';
import {
  ArrowDownLeft,
  ArrowUpRight,
  AlertCircle,
  Loader2,
  Filter,
} from 'lucide-react';
import Navbar from '../../components/Navbar';

const TransactionHistory = () => {
  //   const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'credit', 'debit'

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await getUserTransactions();
        setTransactions(data);
        setError('');
      } catch (error) {
        setError('Failed to load transactions: ' + error.message);
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  return (
    <>
      {/* <Navbar /> */}
      <div className='page-container'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-2xl font-bold mb-6 text-slate-800'>
            Transaction History
          </h1>

          {error && (
            <div className='mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start'>
              <AlertCircle className='h-5 w-5 mr-2 mt-0.5 flex-shrink-0' />
              <span>{error}</span>
            </div>
          )}

          <div className='card'>
            <div className='mb-6 flex justify-between items-center'>
              <h2 className='text-lg font-semibold text-slate-800'>
                All Transactions
              </h2>

              <div className='flex items-center gap-2'>
                <Filter className='h-4 w-4 text-slate-500' />
                <select
                  className='border-none text-sm text-slate-600 bg-slate-100 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-300'
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value='all'>All</option>
                  <option value='credit'>Credits Only</option>
                  <option value='debit'>Debits Only</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className='flex justify-center items-center py-12'>
                <Loader2 className='w-8 h-8 text-primary-600 animate-spin' />
              </div>
            ) : filteredTransactions.length > 0 ? (
              <div className='space-y-4'>
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction._id}
                    className='p-4 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors bg-white'
                  >
                    <div className='flex justify-between items-start mb-2'>
                      <div className='flex items-center'>
                        <div
                          className={`p-2 rounded-full mr-3 ${
                            transaction.type === 'credit'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {transaction.type === 'credit' ? (
                            <ArrowDownLeft className='h-4 w-4' />
                          ) : (
                            <ArrowUpRight className='h-4 w-4' />
                          )}
                        </div>
                        <div>
                          <p className='font-medium text-slate-800'>
                            {transaction.type === 'credit'
                              ? transaction.sender
                                ? `From ${
                                    transaction.senderName || transaction.sender
                                  }`
                                : 'Account Funded'
                              : `To ${
                                  transaction.recipientName ||
                                  transaction.recipient
                                }`}
                          </p>
                          <p className='text-xs text-slate-500'>
                            {formatDate(transaction.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`font-semibold ${
                          transaction.type === 'credit'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'credit' ? '+' : '-'}$
                        {transaction.amount.toFixed(2)}
                      </div>
                    </div>

                    {transaction.description && (
                      <div className='mt-2 pl-10 text-sm text-slate-600'>
                        <p>Note: {transaction.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-12 text-slate-500'>
                <p>No transactions found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
