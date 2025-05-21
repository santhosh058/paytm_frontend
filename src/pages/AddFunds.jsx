import { useState } from 'react';
import { motion } from 'framer-motion';

const AddFunds = ({ onAddFunds, setActiveTab }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Enter a valid amount.');
      return;
    }

    const success = await onAddFunds(amount);
    if (success) {
      setAmount('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-md mx-auto bg-white shadow-2xl rounded-2xl p-6 mt-10"
    >
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
        Add Funds
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Enter amount in ₹"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Add Funds
        </button>
      </form>
    </motion.div>
  );
};

export default AddFunds;
