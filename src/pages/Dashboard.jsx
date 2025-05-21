import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import AddFunds from './AddFunds';
import SendMoney from './SendMoney';
import Transactions from './Transactions';

const Dashboard = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profile, setProfile] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/login');
    fetchWalletData();
    fetchTransactionHistory();
    fetchUserProfile();
  }, [navigate]);

  const fetchWalletData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/wallet', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWallet(res.data.data.balance);
    } catch (err) {
      alert('Session expired. Please log in again.');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/transaction/history', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data.data);
    } catch (err) {
      console.error('Failed to fetch transaction history');
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data.data);
    } catch (err) {
      console.error('Failed to fetch profile data');
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'addFunds':
        return <AddFunds onAddFunds={handleAddFunds} fetchData={fetchWalletData} fetchTransactions={fetchTransactionHistory} setActiveTab={setActiveTab} />;
      case 'sendMoney':
        return <SendMoney onSendMoney={handleSendMoney} fetchData={fetchWalletData} fetchTransactions={fetchTransactionHistory} setActiveTab={setActiveTab} />;
      case 'transactions':
        return <Transactions transactions={transactions} />;
      default:
        return <DashboardContent wallet={wallet} />;
    }
  };

  const handleAddFunds = async (amount) => {
    try {
      await axios.post(
        'http://localhost:5000/api/wallet/add-funds',
        { amount: Number(amount) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      await fetchWalletData();
      await fetchTransactionHistory();
      alert('Funds added successfully!');
      setActiveTab('dashboard');
      return true;
    } catch (err) {
      alert('Failed to add funds.');
      return false;
    }
  };

  const handleSendMoney = async (recipient, sendAmount) => {
    try {
      await axios.post(
        'http://localhost:5000/api/transaction/send',
        {
          toUserName: recipient,
          amount: Number(sendAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      await fetchWalletData();
      await fetchTransactionHistory();
      alert('Money sent successfully!');
      setActiveTab('dashboard');
      return true;
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send money.');
      return false;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-8">
        {/* Enhanced Professional Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome back, <span className="text-indigo-600">{profile?.name || 'User'}</span>
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            {/* Notification Icon */}
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-lg border border-gray-200">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {profile?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
              </div>
              
              <div className="text-right hidden md:block">
                <p className="font-semibold text-gray-800 text-sm">{profile?.name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate max-w-[160px]">
                  {profile?.email || 'user@example.com'}
                </p>
              </div>
              
              <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;