import React from "react";

interface WalletProps {
  balance: number;
  history: { date: Date; amount: number }[];
}

const Wallet: React.FC<WalletProps> = ({ balance, history }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-[500px] flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">My Wallet</h2>
      <div className="bg-indigo-100 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Current Balance</h3>
        <p className="text-3xl font-bold text-indigo-600">₹{balance}</p>
      </div>
      <div className="overflow-auto">
        <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
        <table className="w-full border-collapse">
          <thead>
            {history.length == 0 ? (
              <div className="flex justify-center items-center text-lg font-medium text-blue-800">
                No Transactions..
              </div>
            ) : (
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">
                  Amount
                </th>
              </tr>
            )}
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="px-4 py-2 text-gray-700">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {item.amount >= 0 ? (
                    <span className="text-green-600">+₹{item.amount}</span>
                  ) : (
                    <span className="text-red-600">
                      -₹{Math.abs(item.amount)}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wallet;
