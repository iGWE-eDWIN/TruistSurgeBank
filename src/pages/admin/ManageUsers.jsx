// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   getAllUsers,
//   deleteUserAccount,
//   toggleUserBlock,
// } from '../../services/adminservices';
// import {
//   Search,
//   User,
//   DollarSign,
//   Trash2,
//   AlertCircle,
//   Loader2,
//   Lock,
//   Unlock,
// } from 'lucide-react';
// import { toast } from 'react-toastify';

// const ManageUsers = () => {
//   //   const { currentUser } = useAuth();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [blockLoading, setBlockLoading] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const usersData = await getAllUsers();
//         console.log(usersData);
//         setUsers(usersData);
//         setError('');
//       } catch (error) {
//         setError('Failed to load users: ' + error.message);
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };
//   const filteredUsers = users.filter((user) => {
//     const searchTermLower = searchTerm.toLowerCase();
//     return (
//       user.fullName.toLowerCase().includes(searchTermLower) ||
//       user.email.toLowerCase().includes(searchTermLower) ||
//       user.accountNumber.includes(searchTerm)
//     );
//   });

//   const handleDeleteClick = (user) => {
//     setUserToDelete(user);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!userToDelete) return;

//     setDeleteLoading(true);
//     try {
//       await deleteUserAccount(userToDelete.id);

//       // Update local state
//       setUsers(users.filter((user) => user.id !== userToDelete.id));

//       toast.success(`User ${userToDelete.fullName} deleted successfully`);
//       setShowDeleteModal(false);
//     } catch (error) {
//       toast.error('Failed to delete user: ' + error.message);
//       console.error('Error deleting user:', error);
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   const handleToggleBlock = async (userId) => {
//     setBlockLoading(userId);
//     try {
//       const updatedUser = await toggleUserBlock(userId);
//       setUsers(
//         users.map((user) =>
//           user.id === userId
//             ? { ...user, isBlocked: updatedUser.isBlocked }
//             : user
//         )
//       );
//       toast.success(
//         `User ${updatedUser.isBlocked ? 'blocked' : 'unblocked'} successfully`
//       );
//     } catch (error) {
//       toast.error('Failed to update user status: ' + error.message);
//     } finally {
//       setBlockLoading(null);
//     }
//   };

//   // const formatCreationDate = (timestamp) => {
//   //   if (!timestamp) return 'N/A';
//   //   const date = timestamp.toDate();
//   //   return new Intl.DateTimeFormat('en-US', {
//   //     year: 'numeric',
//   //     month: 'short',
//   //     day: 'numeric',
//   //   }).format(date);
//   // };
//   const formatCreationDate = (timestamp) => {
//     console.log('timestamp:', timestamp, typeof timestamp);
//     if (!timestamp) return 'N/A';

//     let date;
//     if (typeof timestamp.toDate === 'function') {
//       // Firestore timestamp object
//       date = timestamp.toDate();
//     } else if (timestamp instanceof Date) {
//       // Already a Date object
//       date = timestamp;
//     } else {
//       // Try to parse it as a string or number date
//       date = new Date(timestamp);
//     }

//     return new Intl.DateTimeFormat('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     }).format(date);
//   };
//   return (
//     <div className='page-container'>
//       <h1 className='text-2xl font-bold mb-6 text-slate-800'>Manage Users</h1>

//       {error && (
//         <div className='mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start'>
//           <AlertCircle className='h-5 w-5 mr-2 mt-0.5 flex-shrink-0' />
//           <span>{error}</span>
//         </div>
//       )}

//       <div className='card mb-6'>
//         <div className='relative'>
//           <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
//           <input
//             type='text'
//             placeholder='Search users by name, email, or account number...'
//             className='input pl-10'
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </div>
//       </div>

//       {loading ? (
//         <div className='flex justify-center items-center py-12'>
//           <Loader2 className='w-8 h-8 text-primary-600 animate-spin' />
//         </div>
//       ) : filteredUsers.length > 0 ? (
//         <div className='overflow-x-auto'>
//           <table className='min-w-full bg-white rounded-lg overflow-hidden shadow'>
//             <thead className='bg-slate-50 text-slate-700'>
//               <tr>
//                 <th className='py-3 px-4 text-left'>Name</th>
//                 <th className='py-3 px-4 text-left'>Email</th>
//                 <th className='py-3 px-4 text-left'>State</th>
//                 <th className='py-3 px-4 text-left'>City</th>
//                 <th className='py-3 px-4 text-left'>zipCode</th>
//                 <th className='py-3 px-4 text-left'>Ssn</th>
//                 <th className='py-3 px-4 text-left'>Home Address</th>
//                 <th className='py-3 px-4 text-left'>Account #</th>
//                 <th className='py-3 px-4 text-right'>Balance</th>
//                 <th className='py-3 px-4 text-left'>Created</th>
//                 <th className='py-3 px-4 text-center'>Actions</th>
//               </tr>
//             </thead>
//             <tbody className='divide-y divide-slate-100'>
//               {filteredUsers.map((user) => (
//                 <tr key={user.id} className='hover:bg-slate-50'>
//                   <td className='py-3 px-4'>
//                     <div className='flex items-center'>
//                       <User className='h-5 w-5 text-slate-400 mr-2' />
//                       <span className='font-medium text-slate-800'>
//                         {user.fullName}
//                       </span>
//                     </div>
//                   </td>
//                   <td className='py-3 px-4 text-slate-600'>{user.email}</td>
//                   <td className='py-3 px-4 text-slate-600'>{user.state}</td>
//                   <td className='py-3 px-4 text-slate-600'>{user.city}</td>
//                   <td className='py-3 px-4 text-slate-600'>{user.zipCode}</td>
//                   <td className='py-3 px-4 text-slate-600'>{user.ssn}</td>
//                   <td className='py-3 px-4 text-slate-600'>
//                     {user.homeAddress}
//                   </td>
//                   <td className='py-3 px-4 text-slate-600 font-mono'>
//                     {user.accountNumber}
//                   </td>
//                   <td className='py-3 px-4 text-right font-semibold text-slate-800'>
//                     ${user.accountBalance?.toFixed(2) || '0.00'}
//                   </td>
//                   <td className='py-3 px-4 text-slate-600'>
//                     {formatCreationDate(user.createdAt)}
//                   </td>
//                   <td className='py-3 px-4'>
//                     <div className='flex justify-center space-x-2'>
//                       <Link
//                         to={`/admin/dashboard/fund/${user.id}`}
//                         className='p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors'
//                         title='Fund Account'
//                       >
//                         <DollarSign className='h-4 w-4' />
//                       </Link>
//                       <button
//                         onClick={() => handleToggleBlock(user.id)}
//                         className={`p-1.5 rounded transition-colors ${
//                           user.isBlocked
//                             ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
//                             : 'bg-red-100 text-red-600 hover:bg-red-200'
//                         }`}
//                         title={user.isBlocked ? 'Unblock User' : 'Block User'}
//                         disabled={blockLoading === user.id}
//                       >
//                         {blockLoading === user.id ? (
//                           <Loader2 className='h-4 w-4 animate-spin' />
//                         ) : user.isBlocked ? (
//                           <Unlock className='h-4 w-4' />
//                         ) : (
//                           <Lock className='h-4 w-4' />
//                         )}
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(user)}
//                         className='p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors'
//                         title='Delete User'
//                       >
//                         <Trash2 className='h-4 w-4' />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className='text-center py-12 bg-white rounded-lg shadow'>
//           <p className='text-slate-500'>No users found</p>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
//           <div className='bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in'>
//             <h3 className='text-xl font-semibold mb-4 text-slate-800'>
//               Confirm Deletion
//             </h3>
//             <p className='text-slate-600 mb-6'>
//               Are you sure you want to delete the account for{' '}
//               <span className='font-semibold'>{userToDelete?.fullName}</span>?
//               This action cannot be undone.
//             </p>
//             <div className='flex justify-end space-x-3'>
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className='px-4 py-2 border border-slate-300 rounded text-slate-700 hover:bg-slate-50'
//                 disabled={deleteLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className='btn-danger flex items-center'
//                 disabled={deleteLoading}
//               >
//                 {deleteLoading ? (
//                   <>
//                     <Loader2 className='animate-spin h-4 w-4 mr-2' />
//                     Deleting...
//                   </>
//                 ) : (
//                   <>
//                     <Trash2 className='h-4 w-4 mr-2' />
//                     Delete Account
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default ManageUsers;

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  getAllUsers,
  deleteUserAccount,
  toggleUserBlock,
} from '../../services/adminservices';
import {
  Search,
  User,
  DollarSign,
  Trash2,
  AlertCircle,
  Loader2,
  Lock,
  Unlock,
} from 'lucide-react';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState({
    blockId: null,
    deleteId: null,
  });
  const [modalUser, setModalUser] = useState(null);
  const [error, setError] = useState('');

  // Fetch users
  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const data = await getAllUsers();
        if (isMounted) {
          setUsers(data);
        }
      } catch (err) {
        setError(err?.message || 'Failed to fetch users');
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  // Search filtering
  const filteredUsers = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return users.filter(
      (u) =>
        u.fullName.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.accountNumber.includes(searchTerm)
    );
  }, [users, searchTerm]);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      const date =
        typeof timestamp.toDate === 'function'
          ? timestamp.toDate()
          : new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Invalid date';
    }
  };

  const handleBlockToggle = async (userId) => {
    setActionLoading((prev) => ({ ...prev, blockId: userId }));
    try {
      const updated = await toggleUserBlock(userId);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, isBlocked: updated.isBlocked } : user
        )
      );
      toast.success(
        `User ${updated.isBlocked ? 'blocked' : 'unblocked'} successfully`
      );
    } catch (err) {
      toast.error('Failed to update status: ' + err.message);
    } finally {
      setActionLoading((prev) => ({ ...prev, blockId: null }));
    }
  };

  const handleDelete = async () => {
    if (!modalUser) return;
    setActionLoading((prev) => ({ ...prev, deleteId: modalUser.id }));
    try {
      await deleteUserAccount(modalUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== modalUser.id));
      toast.success(`Deleted ${modalUser.fullName}`);
      setModalUser(null);
    } catch (err) {
      toast.error('Failed to delete: ' + err.message);
    } finally {
      setActionLoading((prev) => ({ ...prev, deleteId: null }));
    }
  };

  return (
    <div className='page-container'>
      <h1 className='text-2xl font-bold mb-4'>Manage Users</h1>

      {error && (
        <div className='flex items-center text-red-600 bg-red-100 p-3 rounded mb-4'>
          <AlertCircle className='mr-2' /> {error}
        </div>
      )}

      <div className='mb-6 relative'>
        <Search className='absolute top-1/2 left-3 -translate-y-1/2 text-slate-400' />
        <input
          type='text'
          placeholder='Search by name, email or account #'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='input pl-10'
        />
      </div>

      {loadingUsers ? (
        <div className='flex justify-center py-10'>
          <Loader2 className='h-6 w-6 animate-spin text-primary-600' />
        </div>
      ) : filteredUsers.length === 0 ? (
        <p className='text-center text-slate-500'>No users found</p>
      ) : (
        <div className='overflow-x-auto bg-white rounded shadow'>
          <table className='min-w-full'>
            <thead className='bg-slate-50 text-left text-sm font-semibold text-slate-600'>
              <tr>
                <th className='p-3'>Name</th>
                <th className='p-3'>Email</th>
                <th className='p-3'>Account #</th>
                <th className='p-3'>Balance</th>
                <th className='p-3'>transferPin</th>
                <th className='p-3'>Created</th>
                <th className='p-3 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className='hover:bg-slate-50'>
                  <td className='p-3'>{user.fullName}</td>
                  <td className='p-3'>{user.email}</td>
                  <td className='p-3 font-mono'>{user.accountNumber}</td>
                  <td className='p-3'>${user.accountBalance?.toFixed(2)}</td>
                  <td className='p-3'>{user.transferPin}</td>
                  <td className='p-3'>{formatDate(user.createdAt)}</td>
                  <td className='p-3 text-center space-x-2'>
                    <Link
                      to={`/admin/dashboard/fund/${user.id}`}
                      className='btn-sm bg-green-100 text-green-600'
                      title='Fund Account'
                    >
                      <DollarSign className='h-4 w-4' />
                    </Link>
                    <button
                      onClick={() => handleBlockToggle(user.id)}
                      className={`btn-sm ${
                        user.isBlocked
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                      disabled={actionLoading.blockId === user.id}
                    >
                      {actionLoading.blockId === user.id ? (
                        <Loader2 className='h-4 w-4 animate-spin' />
                      ) : user.isBlocked ? (
                        <Unlock className='h-4 w-4' />
                      ) : (
                        <Lock className='h-4 w-4' />
                      )}
                    </button>
                    <button
                      onClick={() => setModalUser(user)}
                      className='btn-sm bg-red-100 text-red-600'
                      title='Delete User'
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {modalUser && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded shadow max-w-sm w-full'>
            <h3 className='text-lg font-semibold mb-2 text-slate-800'>
              Confirm Deletion
            </h3>
            <p className='text-slate-600 mb-4'>
              Are you sure you want to delete{' '}
              <strong>{modalUser.fullName}</strong>? This cannot be undone.
            </p>
            <div className='flex justify-end gap-3'>
              <button
                className='btn border'
                onClick={() => setModalUser(null)}
                disabled={actionLoading.deleteId === modalUser.id}
              >
                Cancel
              </button>
              <button
                className='btn-danger'
                onClick={handleDelete}
                disabled={actionLoading.deleteId === modalUser.id}
              >
                {actionLoading.deleteId === modalUser.id ? (
                  <>
                    <Loader2 className='h-4 w-4 animate-spin mr-2' />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className='h-4 w-4 mr-2' />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
