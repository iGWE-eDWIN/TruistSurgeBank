import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  Smartphone,
  ChevronRight,
  LockKeyhole,
  BarChart3,
  PiggyBank,
  CreditCard,
  ArrowRightLeft,
} from 'lucide-react';

const Footer = () => {
  return (
    <div className='bg-white'>
      {/* Footer */}
      <footer className='bg-slate-900 text-slate-400 py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div>
              <div className='flex items-center mb-4'>
                <CreditCard className='h-6 w-6 text-white' />
                <span className='ml-2 text-xl font-bold text-white'>
                  RoyalTrust
                </span>
              </div>
              <p className='mb-4'>Banking solutions for the digital age.</p>
            </div>

            <div>
              <h3 className='text-white font-semibold mb-4'>Quick Links</h3>
              <ul className='space-y-2'>
                <li>
                  <Link to='/' className='hover:text-white transition-colors'>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to='/login'
                    className='hover:text-white transition-colors'
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to='/register'
                    className='hover:text-white transition-colors'
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-white font-semibold mb-4'>Contact</h3>
              <p className='mb-2'>Mobile,AL 36608,United state</p>
              <p className='mb-2'>royaltrustbank9@gmail.com</p>
              <p>+15137833921</p>
            </div>
          </div>

          <div className='mt-8 pt-8 border-t border-slate-800 text-center'>
            <p>&copy; 2022 RoyalTrust. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
