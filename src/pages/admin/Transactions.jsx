import { useState, useEffect } from 'react';
import { getAllTransactions } from '../../services/adminservices';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Filter,
  Loader2,
  AlertCircle,
} from 'lucide-react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'credit', 'debit'

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await getAllTransactions();
        // console.log(data);
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch =
      (transaction.description &&
        transaction.description.toLowerCase().includes(searchTermLower)) ||
      (transaction.userId &&
        transaction.userId.toLowerCase().includes(searchTermLower)) ||
      (transaction.recipient &&
        transaction.recipient.toLowerCase().includes(searchTermLower)) ||
      (transaction.sender &&
        transaction.sender.toLowerCase().includes(searchTermLower));

    const matchesFilter = filter === 'all' || transaction.type === filter;

    return matchesSearch && matchesFilter;
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className='page-container'>
      <h1 className='text-2xl font-bold mb-6 text-slate-800'>
        Transaction History
      </h1>

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
              placeholder='Search transactions...'
              className='input pl-10'
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className='flex items-center space-x-2'>
            <Filter className='h-5 w-5 text-slate-400' />
            <select
              className='border border-slate-300 rounded-md px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-300'
              value={filter}
              onChange={handleFilterChange}
            >
              <option value='all'>All Transactions</option>
              <option value='credit'>Credits Only</option>
              <option value='debit'>Debits Only</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className='flex justify-center items-center py-12'>
          <Loader2 className='w-8 h-8 text-primary-600 animate-spin' />
        </div>
      ) : filteredTransactions.length > 0 ? (
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='min-w-full'>
              <thead className='bg-slate-50 text-slate-700'>
                <tr>
                  <th className='py-3 px-4 text-left'>Date & Time</th>
                  <th className='py-3 px-4 text-left'>Description</th>
                  <th className='py-3 px-4 text-left'>From/To</th>
                  <th className='py-3 px-4 text-center'>Type</th>
                  <th className='py-3 px-4 text-right'>Amount</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={
                      transaction._id ||
                      `${transaction.timestamp}-${Math.random()}`
                    }
                    className='hover:bg-slate-50'
                  >
                    <td className='py-3 px-4 text-sm text-slate-600'>
                      {formatDate(transaction.timestamp)}
                    </td>
                    <td className='py-3 px-4 text-slate-800 font-medium'>
                      {transaction.description ||
                        (transaction.type === 'credit'
                          ? 'Account Funded'
                          : 'Transfer')}
                    </td>
                    <td className='py-3 px-4 text-slate-600'>
                      {transaction.type === 'credit'
                        ? transaction.sender
                          ? `From: ${
                              transaction.senderName || transaction.sender
                            }`
                          : 'System/Admin'
                        : `To: ${
                            transaction.recipientName || transaction.recipient
                          }`}
                    </td>
                    <td className='py-3 px-4'>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.type === 'credit'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.type === 'credit' ? (
                          <ArrowDownLeft className='h-3 w-3 mr-1' />
                        ) : (
                          <ArrowUpRight className='h-3 w-3 mr-1' />
                        )}
                        {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                      </span>
                    </td>
                    <td
                      className={`py-3 px-4 text-right font-semibold ${
                        transaction.type === 'credit'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'credit' ? '+' : '-'}$
                      {transaction.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className='text-center py-12 bg-white rounded-lg shadow'>
          <p className='text-slate-500'>No transactions found</p>
        </div>
      )}
    </div>
  );
};
export default Transactions;
