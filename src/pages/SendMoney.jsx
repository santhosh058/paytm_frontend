import { useState } from 'react';
import { motion } from 'framer-motion';

const SendMoney = ({ onSendMoney, setActiveTab }) => {
  const [recipient, setRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipient || !sendAmount || Number(sendAmount) <= 0) {
      alert('Please enter a valid recipient username and amount.');
      return;
    }

    const success = await onSendMoney(recipient, sendAmount);
    if (success) {
      setRecipient('');
      setSendAmount('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-md mx-auto bg-white shadow-2xl rounded-2xl p-6 mt-10"
    >
      <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6">
        Send Money
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Username
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            placeholder="e.g. santhosh"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            placeholder="Enter amount in ₹"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        >
          Send Money
        </button>
      </form>
    </motion.div>
  );
};

export default SendMoney;
