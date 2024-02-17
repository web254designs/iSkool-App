// components/Transactions.jsx

import React from 'react';

const Transactions = () => {
    // Dummy transactions data (replace with your actual data)
    const transactions = [
        { id: 1, type: 'Contribution', amount: 100.00, date: '2024-01-15' },
        { id: 2, type: 'Withdrawal', amount: -50.00, date: '2024-01-20' },
        { id: 3, type: 'Contribution', amount: 150.00, date: '2024-02-05' },
        // Add more transactions as needed
    ];

    return (
        <div className="min-h-screen">
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Your Chama Transactions</h2>

                {/* Display the list of transactions */}
                <ul>
                    {transactions.map(transaction => (
                        <li key={transaction.id} className="mb-2">
                            <strong>{transaction.type}</strong>
                            <span className={`ml-2 ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                ${Math.abs(transaction.amount).toFixed(2)}
                            </span>
                            <span className="ml-2 text-gray-500">{transaction.date}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Transactions;
