import { useAuth } from '../../context/hook/useAuth';
import { UserCircle, Mail, CreditCard, Calendar } from 'lucide-react';
import Navbar from '../../components/Navbar';

const AccountSettings = () => {
  const { currentUser } = useAuth();

  // Format date
  // const formatCreationDate = (timestamp) => {
  //   if (!timestamp) return 'N/A';
  //   const date = timestamp.toDate();
  //   return new Intl.DateTimeFormat('en-US', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   }).format(date);
  // };
  // const formatCreationDate = (timestamp) => {
  //   if (!timestamp) return 'N/A';

  //   let date;

  //   // If Firestore Timestamp object
  //   if (typeof timestamp.toDate === 'function') {
  //     date = timestamp.toDate();
  //   }
  //   // If it's a string or Date-like
  //   else {
  //     date = new Date(timestamp);
  //   }

  //   if (isNaN(date)) return 'Invalid Date';

  //   return new Intl.DateTimeFormat('en-US', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   }).format(date);
  // };

  return (
    <>
      {/* <Navbar /> */}
      <div className='page-container'>
        <div className='max-w-2xl mx-auto'>
          <h1 className='text-2xl font-bold mb-6 text-slate-800'>
            Account Settings
          </h1>

          <div className='card mb-6'>
            <h2 className='text-lg font-semibold mb-4 text-slate-800'>
              Profile Information
            </h2>

            <div className='space-y-4'>
              <div className='flex items-start border-b border-slate-100 pb-4'>
                <UserCircle className='h-5 w-5 text-slate-400 mt-0.5 mr-3' />
                <div>
                  <p className='text-sm text-slate-500'>Full Name</p>
                  <p className='font-medium text-slate-800'>
                    {currentUser?.fullName}
                  </p>
                </div>
              </div>

              <div className='flex items-start border-b border-slate-100 pb-4'>
                <Mail className='h-5 w-5 text-slate-400 mt-0.5 mr-3' />
                <div>
                  <p className='text-sm text-slate-500'>Email Address</p>
                  <p className='font-medium text-slate-800'>
                    {currentUser?.email}
                  </p>
                </div>
              </div>

              <div className='flex items-start border-b border-slate-100 pb-4'>
                <CreditCard className='h-5 w-5 text-slate-400 mt-0.5 mr-3' />
                <div>
                  <p className='text-sm text-slate-500'>Account Number</p>
                  <p className='font-medium text-slate-800'>
                    {currentUser?.accountNumber}
                  </p>
                </div>
              </div>

              {/* <div className='flex items-start'>
                <Calendar className='h-5 w-5 text-slate-400 mt-0.5 mr-3' />
                <div>
                  <p className='text-sm text-slate-500'>Account Created</p>
                  <p className='font-medium text-slate-800'>
                    {formatCreationDate(currentUser?.createdAt)}
                  </p>
                </div>
              </div> */}
            </div>
          </div>

          <div className='card'>
            <h2 className='text-lg font-semibold mb-4 text-slate-800'>
              Customer Support
            </h2>
            <p className='text-slate-600 mb-4'>
              Need help with your account? Our customer support team is ready to
              assist you.
            </p>
            <div className='bg-primary-50 p-4 rounded-lg'>
              <p className='text-primary-800 font-medium'>
                Contact Information:
              </p>
              <ul className='mt-2 text-primary-700'>
                <li>Email: truistsurge@aol.com</li>
                {/* <li>Phone: 1-800-NEXUSPAY</li> */}
                <li>Hours: Monday - Friday, 9am - 5pm EST</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AccountSettings;
