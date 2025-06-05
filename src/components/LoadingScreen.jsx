import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-slate-50 z-50'>
      <div className='text-center'>
        <Loader2 className='w-12 h-12 text-primary-600 animate-spin mx-auto' />
        <p className='mt-4 text-lg font-medium text-primary-700'>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
