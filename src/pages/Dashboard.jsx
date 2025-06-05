import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import {
  getUserProfile,
  getRecentTransactions,
} from '../services/userServices';
import {
  CreditCard,
  RefreshCw,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  DollarSign,
  Calculator,
} from 'lucide-react';

// Components and Pages
import Navbar from '../components/Navbar';
import TransactionHistory from './user/TransactionHistory';
import Transfer from './user/Transfer';
import Withdraw from './user/Withdraw';
import AccountSettings from './user/AccountSettings';
import LoanApplication from './user/LoanApplication';
import LoadingScreen from '../components/LoadingScreen';

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    setLoading(true);
    try {
      const profile = await getUserProfile();
      // console.log(profile);
      setUserProfile(profile);

      const transactions = await getRecentTransactions(5);
      // console.log(transactions);
      setRecentTransactions(transactions);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await refreshData();
    };
    // const fetchUserData = async () => {
    //   try {
    //     setLoading(true);
    //     const profile = await getUserProfile();
    //     setUserProfile(profile);

    //     const transactions = await getRecentTransactions(5);
    //     setRecentTransactions(transactions);
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchData();
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

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Navbar />
      <div className='bg-slate-50 min-h-screen'>
        <Routes>
          <Route
            path='/'
            element={
              <div className='page-container'>
                <div className='flex justify-between items-center mb-8'>
                  <div>
                    <h1 className='text-2xl font-bold text-slate-800'>
                      Welcome, {userProfile?.fullName}
                    </h1>
                    <p className='text-slate-600'>
                      Account Number: {userProfile?.accountNumber}
                    </p>
                  </div>
                  <button
                    onClick={refreshData}
                    className='icon-btn'
                    title='Refresh data'
                  >
                    <RefreshCw className='h-5 w-5 text-slate-600' />
                  </button>
                </div>

                {/* Account Overview */}
                <div className='mb-8'>
                  <div className='bg-white rounded-xl shadow-md p-6 relative overflow-hidden border-l-4 border-primary-600'>
                    <div className='absolute top-0 right-0 bg-primary-600/10 w-24 h-24 rounded-full -translate-y-8 translate-x-8'></div>
                    <div className='relative'>
                      <p className='text-slate-600 mb-1'>Current Balance</p>
                      <h2 className='text-3xl md:text-4xl font-bold text-slate-900'>
                        ${userProfile?.accountBalance.toFixed(2)}
                      </h2>
                      <div className='mt-4 flex space-x-3'>
                        <Link to='/dashboard/transfer' className='btn-primary'>
                          <ArrowUpRight className='h-4 w-4 mr-1 inline-block' />
                          Transfer
                        </Link>
                        <Link to='/dashboard/withdraw' className='btn-outline'>
                          <ArrowDownLeft className='h-4 w-4 mr-1 inline-block' />
                          Withdraw
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions and Transactions */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                  {/* Quick Actions */}
                  <div className='card'>
                    <h3 className='text-lg font-semibold mb-4 text-slate-800'>
                      Quick Actions
                    </h3>
                    <div className='grid grid-cols-2 gap-4'>
                      <Link
                        to='/dashboard/transfer'
                        className='p-4 bg-primary-50 rounded-lg text-center hover:bg-primary-100 transition-colors'
                      >
                        <ArrowUpRight className='h-6 w-6 mx-auto mb-2 text-primary-600' />
                        <span className='text-sm font-medium text-primary-900'>
                          Send Money
                        </span>
                      </Link>
                      <Link
                        to='/dashboard/transactions'
                        className='p-4 bg-slate-50 rounded-lg text-center hover:bg-slate-100 transition-colors'
                      >
                        <Clock className='h-6 w-6 mx-auto mb-2 text-slate-600' />
                        <span className='text-sm font-medium text-slate-800'>
                          History
                        </span>
                      </Link>
                      <Link
                        to='/dashboard/loan'
                        className='p-4 bg-slate-50 rounded-lg text-center hover:bg-slate-100 transition-colors'
                      >
                        <Calculator className='h-6 w-6 mx-auto mb-2 text-slate-600' />
                        <span className='text-sm font-medium text-slate-800'>
                          Apply for Loan
                        </span>
                      </Link>
                      <Link
                        to='/dashboard/withdraw'
                        className='p-4 bg-slate-50 rounded-lg text-center hover:bg-slate-100 transition-colors'
                      >
                        <DollarSign className='h-6 w-6 mx-auto mb-2 text-slate-600' />
                        <span className='text-sm font-medium text-slate-800'>
                          Withdraw
                        </span>
                      </Link>
                      <Link
                        to='/dashboard/settings'
                        className='p-4 bg-slate-50 rounded-lg text-center hover:bg-slate-100 transition-colors'
                      >
                        <CreditCard className='h-6 w-6 mx-auto mb-2 text-slate-600' />
                        <span className='text-sm font-medium text-slate-800'>
                          Account
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Recent Transactions */}
                  <div className='lg:col-span-2'>
                    <div className='card'>
                      <div className='flex justify-between items-center mb-4'>
                        <h3 className='text-lg font-semibold text-slate-800'>
                          Recent Transactions
                        </h3>
                        <Link
                          to='/dashboard/transactions'
                          className='text-primary-600 hover:text-primary-800 text-sm font-medium'
                        >
                          View All
                        </Link>
                      </div>

                      {Array.isArray(recentTransactions) &&
                      recentTransactions.length > 0 ? (
                        <div className='space-y-1'>
                          {recentTransactions.map((transaction) => (
                            <div
                              key={transaction._id}
                              className='transaction-item slide-in'
                            >
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
                                            transaction.senderName ||
                                            transaction.sender
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
                          ))}
                        </div>
                      ) : (
                        <div className='text-center py-6 text-slate-500'>
                          <p>No transactions yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path='transfer'
            element={<Transfer refreshData={refreshData} />}
          />
          <Route path='transactions' element={<TransactionHistory />} />
          <Route
            path='withdraw'
            element={<Withdraw refreshData={refreshData} />}
          />
          <Route
            path='settings'
            element={<AccountSettings userProfile={userProfile} />}
          />
          <Route
            path='loan'
            element={<LoanApplication refreshData={refreshData} />}
          />
        </Routes>
      </div>
    </>
  );
};
export default Dashboard;
