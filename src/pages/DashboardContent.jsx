import { useEffect, useState } from 'react';

const DashboardContent = ({ wallet }) => {
  const [displayBalance, setDisplayBalance] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Animate the balance when it changes
    if (wallet !== displayBalance) {
      setIsAnimating(true);
      
      const increment = wallet / 30; // Adjust for smoother/faster animation
      let current = displayBalance;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= wallet) {
          current = wallet;
          clearInterval(timer);
          setIsAnimating(false);
        }
        setDisplayBalance(current);
      }, 20);

      return () => clearInterval(timer);
    }
  }, [wallet]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Wallet Balance</h1>
          <p className="text-gray-500 mt-1">Current available balance</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>

      <div className={`relative p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-inner border border-green-100 overflow-hidden ${isAnimating ? 'animate-pulse' : ''}`}>
        {/* Animated background elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-200 rounded-full opacity-10"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full opacity-10"></div>
        
        <div className="relative z-10">
          <div className="flex items-end space-x-2">
            <span className="text-4xl md:text-5xl font-bold text-gray-800">₹</span>
            <span className="text-4xl md:text-6xl font-bold text-gray-800 transition-all duration-300">
              {displayBalance.toFixed(2)}
            </span>
          </div>
          
          <div className="mt-4 flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${wallet > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {wallet > 0 ? 'Active' : 'Inactive'}
            </span>
            <span className="text-sm text-gray-500">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;