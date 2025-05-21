import { motion } from 'framer-motion';

const Transactions = ({ transactions }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl"
    >
      <h1 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">
        Transaction History
      </h1>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 italic">No transactions found.</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((tx) => (
            <li
              key={tx._id}
              className="p-4 bg-gray-50 hover:bg-gray-100 transition border border-gray-200 rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base font-semibold text-gray-700">
                    {tx.from === tx.to
                      ? '🌀 Self Wallet Transfer'
                      : `🔁 From: ${tx.from} → To: ${tx.to}`}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
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
                  <p
                    className={`text-xs font-medium capitalize mt-1 ${
                      tx.status === 'success'
                        ? 'text-green-500'
                        : tx.status === 'pending'
                        ? 'text-yellow-500'
                        : 'text-red-500'
                    }`}
                  >
                    {tx.status}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default Transactions;
