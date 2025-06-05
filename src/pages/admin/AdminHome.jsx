// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// import { getAllUsers, getAllTransactions } from '../../services/adminservices';
// import {
//   Users,
//   DollarSign,
//   ClipboardList,
//   ArrowRight,
//   Loader2,
// } from 'lucide-react';

// const AdminHome = () => {
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalTransactions: 0,
//     recentTransactions: [],
//   });

//   useEffect(() => {
//     const fetchAdminData = async () => {
//       try {
//         setLoading(true);
//         const users = await getAllUsers();
//         // console.log(users);
//         const transactions = await getAllTransactions();
//         // console.log(transactions); // Get recent transactions

//         setStats({
//           totalUsers: users.length,
//           totalTransactions: transactions.length,
//           recentTransactions: transactions,
//         });
//       } catch (error) {
//         console.error('Error fetching admin data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdminData();
//   }, []);

//   // Format date
//   const formatDate = (timestamp) => {
//     if (!timestamp) return '';
//     const date = timestamp.toDate();
//     return new Intl.DateTimeFormat('en-US', {
//       month: 'short',
//       day: '2-digit',
//       hour: '2-digit',
//       minute: '2-digit',
//     }).format(date);
//   };

//   if (loading) {
//     return (
//       <div className='flex justify-center items-center h-[calc(100vh-64px)]'>
//         <Loader2 className='w-12 h-12 text-primary-600 animate-spin' />
//       </div>
//     );
//   }
//   return (
//     <div className='page-container'>
//       <h1 className='text-2xl font-bold mb-6 text-slate-800'>
//         Admin Dashboard
//       </h1>

//       {/* Stats Cards */}
//       <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
//         <div className='card bg-gradient-to-br from-primary-600 to-primary-800 text-white'>
//           <div className='flex items-start'>
//             <Users className='h-8 w-8 mr-3' />
//             <div>
//               <p className='text-sm opacity-90'>Total Users</p>
//               <h3 className='text-3xl font-bold'>{stats.totalUsers}</h3>
//             </div>
//           </div>
//           <div className='mt-4'>
//             <Link
//               to='/admin/dashboard/users'
//               className='text-sm flex items-center hover:underline'
//             >
//               Manage Users
//               <ArrowRight className='h-4 w-4 ml-1' />
//             </Link>
//           </div>
//         </div>

//         <div className='card bg-gradient-to-br from-secondary-600 to-secondary-800 text-white'>
//           <div className='flex items-start'>
//             <DollarSign className='h-8 w-8 mr-3' />
//             <div>
//               <p className='text-sm opacity-90'>Transactions</p>
//               <h3 className='text-3xl font-bold'>{stats.totalTransactions}</h3>
//             </div>
//           </div>
//           <div className='mt-4'>
//             <Link
//               to='/admin/dashboard/transactions'
//               className='text-sm flex items-center hover:underline'
//             >
//               View Transactions
//               <ArrowRight className='h-4 w-4 ml-1' />
//             </Link>
//           </div>
//         </div>

//         <div className='card bg-gradient-to-br from-slate-700 to-slate-900 text-white'>
//           <div className='flex items-start'>
//             <ClipboardList className='h-8 w-8 mr-3' />
//             <div>
//               <p className='text-sm opacity-90'>Admin Actions</p>
//               <h3 className='text-xl font-bold mt-1'>System Management</h3>
//             </div>
//           </div>
//           <div className='mt-4'>
//             <Link
//               to='/admin/dashboard/users'
//               className='text-sm flex items-center hover:underline'
//             >
//               Manage Accounts
//               <ArrowRight className='h-4 w-4 ml-1' />
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className='card'>
//         <h2 className='text-xl font-semibold mb-4 text-slate-800'>
//           Recent Activity
//         </h2>

//         {stats.recentTransactions.length > 0 ? (
//           <div className='divide-y divide-slate-100'>
//             {stats.recentTransactions.map((transaction) => (
//               <div
//                 key={transaction.id}
//                 className='py-3 flex justify-between items-center'
//               >
//                 <div>
//                   <p className='font-medium text-slate-800'>
//                     {transaction.type === 'credit'
//                       ? 'Account Funded'
//                       : 'Transfer'}{' '}
//                     -{' '}
//                     <span
//                       className={
//                         transaction.type === 'credit'
//                           ? 'text-green-600'
//                           : 'text-red-600'
//                       }
//                     >
//                       ${transaction.amount.toFixed(2)}
//                     </span>
//                   </p>
//                   <p className='text-xs text-slate-500'>
//                     {formatDate(transaction.timestamp)}
//                   </p>
//                 </div>
//                 <Link
//                   to='/admin/dashboard/transactions'
//                   className='text-primary-600 text-sm hover:text-primary-700'
//                 >
//                   Details
//                 </Link>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className='text-slate-500 text-center py-4'>
//             No recent transactions
//           </p>
//         )}

//         <div className='mt-4 pt-4 border-t border-slate-100'>
//           <Link
//             to='/admin/dashboard/transactions'
//             className='text-primary-600 hover:text-primary-800 flex items-center text-sm font-medium'
//           >
//             View All Transactions
//             <ArrowRight className='h-4 w-4 ml-1' />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminHome;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getAllUsers, getAllTransactions } from '../../services/adminservices';
import {
  Users,
  DollarSign,
  ClipboardList,
  ArrowRight,
  Loader2,
} from 'lucide-react';

const AdminHome = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    recentTransactions: [],
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const users = await getAllUsers();
        const transactions = await getAllTransactions();

        setStats({
          totalUsers: users.length,
          totalTransactions: transactions.length,
          recentTransactions: transactions,
        });
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // Robust date formatting with fallback
  const formatDate = (timestamp) => {
    try {
      const date =
        typeof timestamp?.toDate === 'function'
          ? timestamp.toDate()
          : new Date(timestamp);
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[calc(100vh-64px)]'>
        <Loader2 className='w-12 h-12 text-primary-600 animate-spin' />
      </div>
    );
  }

  return (
    <div className='page-container'>
      <h1 className='text-2xl font-bold mb-6 text-slate-800'>
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        {/* Total Users */}
        <div className='card bg-gradient-to-br from-primary-600 to-primary-800 text-white'>
          <div className='flex items-start'>
            <Users className='h-8 w-8 mr-3' />
            <div>
              <p className='text-sm opacity-90'>Total Users</p>
              <h3 className='text-3xl font-bold'>{stats.totalUsers}</h3>
            </div>
          </div>
          <div className='mt-4'>
            <Link
              to='/admin/dashboard/users'
              className='text-sm flex items-center hover:underline'
            >
              Manage Users
              <ArrowRight className='h-4 w-4 ml-1' />
            </Link>
          </div>
        </div>

        {/* Total Transactions */}
        <div className='card bg-gradient-to-br from-secondary-600 to-secondary-800 text-white'>
          <div className='flex items-start'>
            <DollarSign className='h-8 w-8 mr-3' />
            <div>
              <p className='text-sm opacity-90'>Transactions</p>
              <h3 className='text-3xl font-bold'>{stats.totalTransactions}</h3>
            </div>
          </div>
          <div className='mt-4'>
            <Link
              to='/admin/dashboard/transactions'
              className='text-sm flex items-center hover:underline'
            >
              View Transactions
              <ArrowRight className='h-4 w-4 ml-1' />
            </Link>
          </div>
        </div>

        {/* System Management */}
        <div className='card bg-gradient-to-br from-slate-700 to-slate-900 text-white'>
          <div className='flex items-start'>
            <ClipboardList className='h-8 w-8 mr-3' />
            <div>
              <p className='text-sm opacity-90'>Admin Actions</p>
              <h3 className='text-xl font-bold mt-1'>System Management</h3>
            </div>
          </div>
          <div className='mt-4'>
            <Link
              to='/admin/dashboard/users'
              className='text-sm flex items-center hover:underline'
            >
              Manage Accounts
              <ArrowRight className='h-4 w-4 ml-1' />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className='card'>
        <h2 className='text-xl font-semibold mb-4 text-slate-800'>
          Recent Activity
        </h2>

        {stats.recentTransactions.length > 0 ? (
          <div className='divide-y divide-slate-100'>
            {stats.recentTransactions.map((transaction, index) => (
              <div
                key={
                  transaction.id ||
                  `${transaction.timestamp?.seconds || 'tx'}-${index}`
                }
                className='py-3 flex justify-between items-center'
              >
                <div>
                  <p className='font-medium text-slate-800'>
                    {transaction.type === 'credit'
                      ? 'Account Funded'
                      : 'Transfer'}{' '}
                    –{' '}
                    <span
                      className={
                        transaction.type === 'credit'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      ${transaction?.amount?.toFixed?.(2) || '0.00'}
                    </span>
                  </p>
                  <p className='text-xs text-slate-500'>
                    {formatDate(transaction.timestamp)}
                  </p>
                </div>
                <Link
                  to='/admin/dashboard/transactions'
                  className='text-primary-600 text-sm hover:text-primary-700'
                >
                  Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-slate-500 text-center py-4'>
            No recent transactions
          </p>
        )}

        <div className='mt-4 pt-4 border-t border-slate-100'>
          <Link
            to='/admin/dashboard/transactions'
            className='text-primary-600 hover:text-primary-800 flex items-center text-sm font-medium'
          >
            View All Transactions
            <ArrowRight className='h-4 w-4 ml-1' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
