import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [profile, setProfile] = useState(null); // Profile state

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/login');
    fetchWalletData();
    fetchTransactionHistory();
    fetchUserProfile(); // Call profile API
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
      setProfile(res.data.data); // Adjust based on API structure
    } catch (err) {
      console.error('Failed to fetch profile data');
    }
  };

  const handleAddFunds = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Enter a valid amount.');
      return;
    }

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
      setAmount('');
      await fetchWalletData();
      await fetchTransactionHistory();
      alert('Funds added successfully!');
      setActiveTab('dashboard');
    } catch (err) {
      alert('Failed to add funds.');
    }
  };

  const handleSendMoney = async (e) => {
    e.preventDefault();
    if (!recipient || !sendAmount || Number(sendAmount) <= 0) {
      alert('Please enter a valid recipient name and amount.');
      return;
    }

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
      alert('Money sent successfully!');
      setRecipient('');
      setSendAmount('');
      await fetchWalletData();
      await fetchTransactionHistory();
      setActiveTab('dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send money.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-green-400 to-blue-500 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">WalletApp</h2>
        <ul className="space-y-4">
          <li className="hover:underline cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            Dashboard
          </li>
          <li className="hover:underline cursor-pointer" onClick={() => setActiveTab('addFunds')}>
            Add Funds
          </li>
          <li className="hover:underline cursor-pointer" onClick={() => setActiveTab('sendMoney')}>
            Send Money
          </li>
          <li className="hover:underline cursor-pointer" onClick={() => setActiveTab('transactions')}>
            Transactions
          </li>
          <li className="hover:underline cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        {/* Header with Profile Info */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">Welcome, {profile?.name || 'User'}</h1>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {profile?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <>
            <h1 className="text-3xl font-bold mb-4">Wallet Balance</h1>
            <p className="text-2xl mb-6 text-green-700">₹ {wallet.toFixed(2)}</p>
          </>
        )}

        {activeTab === 'addFunds' && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Add Funds</h1>
            <form onSubmit={handleAddFunds} className="max-w-md">
              <label className="block mb-2 font-semibold">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                placeholder="Enter amount in ₹"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Funds
              </button>
            </form>
          </div>
        )}

        {activeTab === 'sendMoney' && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Send Money</h1>
            <form onSubmit={handleSendMoney} className="max-w-md">
              <label className="block mb-2 font-semibold">Recipient Username</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                placeholder="e.g. santhosh"
              />
              <label className="block mb-2 font-semibold">Amount</label>
              <input
                type="number"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                placeholder="Enter amount in ₹"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Send Money
              </button>
            </form>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Transaction History</h1>
            {transactions.length === 0 ? (
              <p className="text-gray-500">No transactions found.</p>
            ) : (
              <ul className="space-y-4">
                {transactions.map((tx) => (
                  <li key={tx._id} className="p-4 border rounded shadow bg-white">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">
                          {tx.from === tx.to
                            ? 'Self Wallet Transfer'
                            : `From: ${tx.from} → To: ${tx.to}`}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(tx.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            tx.amount >= 0 ? 'text-green-600' : 'text-red-500'
                          }`}
                        >
                          ₹ {tx.amount}
                        </p>
                        <p className="text-xs text-gray-600 capitalize">{tx.status}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
