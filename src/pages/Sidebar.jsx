const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-gradient-to-b from-green-400 to-blue-500 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">WalletApp</h2>
      <ul className="space-y-4">
        <li 
          className={`hover:underline cursor-pointer ${activeTab === 'dashboard' ? 'font-bold' : ''}`} 
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </li>
        <li 
          className={`hover:underline cursor-pointer ${activeTab === 'addFunds' ? 'font-bold' : ''}`} 
          onClick={() => setActiveTab('addFunds')}
        >
          Add Funds
        </li>
        <li 
          className={`hover:underline cursor-pointer ${activeTab === 'sendMoney' ? 'font-bold' : ''}`} 
          onClick={() => setActiveTab('sendMoney')}
        >
          Send Money
        </li>
        <li 
          className={`hover:underline cursor-pointer ${activeTab === 'transactions' ? 'font-bold' : ''}`} 
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </li>
        <li className="hover:underline cursor-pointer">Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;