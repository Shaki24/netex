'use client';
import React, { useState, useEffect } from 'react';

interface Wallet {
  balance: number;
  transactions: Array<{
    id: string;
    amount: number;
    type: string;
    date: string;
  }>;
}

export default function WalletPage() {
  const [wallet, setWallet] = useState<Wallet>({
    balance: 0,
    transactions: [],
  });
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user/wallet', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setWallet(data);
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };

  const quickAmounts = [100, 500, 1000, 5000, 10000];

  const handleDeposit = async (depositAmount: number | string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/payment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: depositAmount }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Payment successful!');
        setAmount('');
        setSelectedAmount(null);
        fetchWallet();
      } else {
        alert(data.message || 'Payment failed');
      }
    } catch (error) {
      alert('Error processing payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Current Balance */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-lg">
        <p className="text-lg opacity-90">Your Current Balance</p>
        <h2 className="text-5xl font-bold mt-2">₹{wallet.balance.toFixed(2)}</h2>
        <p className="text-sm opacity-75 mt-4">Total available funds in your wallet</p>
      </div>

      {/* Deposit Section */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">💳 Add Funds</h2>

        {/* Quick Amount Buttons */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">Quick Deposit Amounts:</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {quickAmounts.map(amt => (
              <button
                key={amt}
                onClick={() => {
                  setSelectedAmount(amt);
                  setAmount(amt.toString());
                }}
                className={`p-3 rounded-lg font-semibold transition ${
                  selectedAmount === amt
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Or Enter Custom Amount
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                placeholder="Enter amount"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => amount && handleDeposit(amount)}
              disabled={!amount || loading}
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition"
            >
              {loading ? 'Processing...' : 'Deposit'}
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-2 border-primary p-4 rounded-lg text-center cursor-pointer hover:bg-primary/10 transition">
            <p className="text-2xl mb-2">💳</p>
            <p className="font-semibold text-gray-800">Credit Card</p>
            <p className="text-sm text-gray-600">Instant</p>
          </div>
          <div className="border-2 border-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition">
            <p className="text-2xl mb-2">🏦</p>
            <p className="font-semibold text-gray-800">Bank Transfer</p>
            <p className="text-sm text-gray-600">1-2 hours</p>
          </div>
          <div className="border-2 border-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition">
            <p className="text-2xl mb-2">📱</p>
            <p className="font-semibold text-gray-800">UPI</p>
            <p className="text-sm text-gray-600">Instant</p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Transaction History</h2>
        <div className="space-y-4">
          {wallet.transactions.length > 0 ? (
            wallet.transactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="font-semibold text-gray-800">{tx.type}</p>
                  <p className="text-sm text-gray-600">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
                <span className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 py-8">No transactions yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
