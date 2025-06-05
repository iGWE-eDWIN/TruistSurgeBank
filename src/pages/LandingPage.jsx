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

const LandingPage = () => {
  return (
    <div className='bg-white'>
      <Navbar />

      {/* Hero Section */}
      <section className='relative bg-primary-900 text-white overflow-hidden'>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20"></div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10'>
          <div className='lg:grid lg:grid-cols-2 gap-12 items-center'>
            <div className='mb-12 lg:mb-0 animate-fade-in'>
              <h1 className='text-4xl md:text-5xl font-bold mb-6 leading-tight'>
                Banking Made Simple, Secure, and Swift
              </h1>
              <p className='text-lg mb-8 text-blue-100 max-w-xl'>
                Experience the future of banking with Truist Surge. Seamless
                transactions, robust security, and intuitive banking tools at
                your fingertips.
              </p>
              <div className='flex flex-wrap gap-4'>
                <Link
                  to='/register'
                  className='btn bg-white text-primary-900 hover:bg-blue-50'
                >
                  Get Started
                  <ChevronRight className='ml-1 h-5 w-5' />
                </Link>
                <Link
                  to='/login'
                  className='btn border-2 border-white text-white hover:bg-white hover:text-primary-900'
                >
                  Log In
                </Link>
              </div>
            </div>
            <div className='relative'>
              <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-md mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-300'>
                <div className='bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-6 shadow-inner'>
                  <div className='flex justify-between items-start mb-8'>
                    <div>
                      <p className='text-sm text-blue-200'>Current Balance</p>
                      <h3 className='text-2xl font-bold'>$12,345.67</h3>
                    </div>
                    <div className='bg-blue-300/20 rounded-full p-2'>
                      <Smartphone className='h-6 w-6' />
                    </div>
                  </div>
                  <div className='mb-6'>
                    <p className='text-sm text-blue-200'>Card Number</p>
                    <p className='font-mono'>•••• •••• •••• 4567</p>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-sm text-blue-200'>Expiry Date</p>
                      <p>05/28</p>
                    </div>
                    <div>
                      <p className='text-sm text-blue-200'>CVV</p>
                      <p>•••</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='absolute -bottom-6 -right-6 bg-accent-500 text-white rounded-full px-4 py-2 shadow-lg transform -rotate-6 text-sm font-medium'>
                Account
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-navy-800 mb-4'>
              Why Choose Truist Surge?
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              We combine cutting-edge security with a seamless user experience
              to provide you with the best banking services.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md'>
              <div className='w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center mb-4'>
                <LockKeyhole className='h-6 w-6 text-navy-600' />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Secure Banking</h3>
              <p className='text-gray-600'>
                Bank with confidence knowing your data and money are protected
                with state-of-the-art security.
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md'>
              <div className='w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4'>
                <ArrowRightLeft className='h-6 w-6 text-emerald-600' />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Easy Transfers</h3>
              <p className='text-gray-600'>
                Send and receive money instantly without complex procedures or
                hidden fees.
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md'>
              <div className='w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4'>
                <BarChart3 className='h-6 w-6 text-gold-600' />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Financial Insights</h3>
              <p className='text-gray-600'>
                Track your spending and monitor your financial health with
                detailed transaction history.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className='py-16 bg-primary-800 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl font-bold mb-6'>
            Ready to experience modern banking?
          </h2>
          <p className='text-lg mb-8 text-blue-100 max-w-2xl mx-auto'>
            Join thousands of satisfied customers who have made the switch to
            TruistSurge.
          </p>
          <Link
            to='/register'
            className='btn bg-white text-primary-900 hover:bg-blue-50'
          >
            Create Your Account
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className='bg-slate-900 text-slate-400 py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div>
              <div className='flex items-center mb-4'>
                <CreditCard className='h-6 w-6 text-white' />
                <span className='ml-2 text-xl font-bold text-white'>
                  TruistSurge
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
              <p className='mb-2'>1900 29th Ave S, Homewood</p>
              <p className='mb-2'> AL 35209, United States</p>
              <p className='mb-2'>truistsurge@aol.com</p>
              <p>+14402817685</p>
            </div>
          </div>

          <div className='mt-8 pt-8 border-t border-slate-800 text-center'>
            <p>&copy; 2020 TruistSurge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
