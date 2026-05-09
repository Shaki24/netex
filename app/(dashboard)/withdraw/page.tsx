'use client';
import React, { useState, useEffect } from 'react';

interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
}

interface Withdrawal {
  id: string;
  amount: number;
  status: string;
  date: string;
}

export default function WithdrawPage() {
  const [balance, setBalance] = useState(0);
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: '',
  });
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [formMode, setFormMode] = useState<'view' | 'edit'>('view');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user/wallet', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setBalance(data.balance);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/withdraw/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: parseFloat(withdrawAmount),
          bankDetails,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Withdrawal request submitted successfully!');
        setWithdrawAmount('');
        fetchData();
      } else {
        alert(data.message || 'Withdrawal failed');
      }
    } catch (error) {
      alert('Error submitting withdrawal request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Current Balance */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-lg">
        <p className="text-lg opacity-90">Available Balance</p>
        <h2 className="text-5xl font-bold mt-2">₹{balance.toFixed(2)}</h2>
        <p className="text-sm opacity-75 mt-4">Ready to withdraw</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Withdrawal Form */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">💳 Withdraw Funds</h2>

          <form onSubmit={handleWithdraw} className="space-y-6">
            {/* Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Withdrawal Amount
              </label>
              <div className="flex gap-2">
                <span className="flex items-center px-4 bg-gray-100 rounded-lg text-gray-700 font-semibold">₹</span>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount"
                  max={balance}
                  required
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Maximum: ₹{balance.toFixed(2)}</p>
            </div>

            {/* Bank Details */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Bank Details</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    name="accountName"
                    value={bankDetails.accountName}
                    onChange={handleBankDetailsChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={bankDetails.accountNumber}
                    onChange={handleBankDetailsChange}
                    placeholder="1234567890"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={bankDetails.bankName}
                    onChange={handleBankDetailsChange}
                    placeholder="HDFC Bank"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={bankDetails.ifscCode}
                    onChange={handleBankDetailsChange}
                    placeholder="HDFC0001234"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !withdrawAmount}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {loading ? 'Processing...' : 'Request Withdrawal'}
            </button>
          </form>
        </div>

        {/* Info Sidebar */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">ℹ️ Important Info</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <p className="font-semibold text-gray-800 mb-1">Minimum Withdrawal</p>
              <p>₹100</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Processing Time</p>
              <p>1-2 business days</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Charges</p>
              <p>None</p>
            </div>
            <div className="border-t pt-4">
              <p className="font-semibold text-gray-800 mb-2">📋 Required Documents</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Valid Bank Account</li>
                <li>IFSC Code</li>
                <li>Account Holder Name</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal History */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Withdrawal History</h2>
        <div className="space-y-4">
          {withdrawals.length > 0 ? (
            withdrawals.map(w => (
              <div key={w.id} className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="font-semibold text-gray-800">₹{w.amount.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">{new Date(w.date).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  w.status === 'completed' ? 'bg-green-100 text-green-800' :
                  w.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 py-8">No withdrawals yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
