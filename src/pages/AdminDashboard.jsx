import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminNavbar from './admin/AdminNavbar';
import AdminHome from './admin/AdminHome';
import ManageUsers from './admin/ManageUsers';
import FundAccount from './admin/FundAccount';
import Transactions from './admin/Transactions';
import ManageLoans from './admin/ManageLoans';
import LoadingScreen from '../components/LoadingScreen';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading admin data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      <AdminNavbar />

      <Routes>
        <Route path='/' element={<AdminHome />} />
        <Route path='/users' element={<ManageUsers />} />
        <Route path='/fund/:userId' element={<FundAccount />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/loans' element={<ManageLoans />} />
      </Routes>
    </div>
  );
};
export default AdminDashboard;
