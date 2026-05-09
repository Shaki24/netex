'use client';
import React, { useEffect, useState } from 'react';

interface Stats {
  balance: number;
  totalEarnings: number;
  referrals: number;
  prayers: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    balance: 0,
    totalEarnings: 0,
    referrals: 0,
    prayers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/user/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-primary">
          <p className="text-gray-600 text-sm font-semibold">Current Balance</p>
          <h3 className="text-3xl font-bold text-primary mt-2">₹{stats.balance.toFixed(2)}</h3>
          <p className="text-xs text-gray-500 mt-2">Available to withdraw</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-secondary">
          <p className="text-gray-600 text-sm font-semibold">Total Earnings</p>
          <h3 className="text-3xl font-bold text-secondary mt-2">₹{stats.totalEarnings.toFixed(2)}</h3>
          <p className="text-xs text-gray-500 mt-2">All time earnings</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-gold">
          <p className="text-gray-600 text-sm font-semibold">Active Referrals</p>
          <h3 className="text-3xl font-bold text-gold mt-2">{stats.referrals}</h3>
          <p className="text-xs text-gray-500 mt-2">People you referred</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-sacred">
          <p className="text-gray-600 text-sm font-semibold">Prayers Shared</p>
          <h3 className="text-3xl font-bold text-sacred mt-2">{stats.prayers}</h3>
          <p className="text-xs text-gray-500 mt-2">Community prayers</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b">
            <div>
              <p className="font-semibold text-gray-800">Referral Commission</p>
              <p className="text-sm text-gray-600">From John Doe</p>
            </div>
            <span className="text-green-600 font-bold">+₹500</span>
          </div>
          <div className="flex items-center justify-between pb-4 border-b">
            <div>
              <p className="font-semibold text-gray-800">Deposit</p>
              <p className="text-sm text-gray-600">Via Card</p>
            </div>
            <span className="text-blue-600 font-bold">+₹1000</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">Withdrawal</p>
              <p className="text-sm text-gray-600">Bank Transfer</p>
            </div>
            <span className="text-red-600 font-bold">-₹2000</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-primary to-secondary text-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">💰 Ready to Deposit?</h3>
          <p className="opacity-90 mb-4">Add funds to your wallet and start earning</p>
          <a href="/wallet" className="inline-block px-6 py-2 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100">
            Deposit Now
          </a>
        </div>

        <div className="bg-gradient-to-br from-secondary to-sacred text-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">🤝 Invite Friends</h3>
          <p className="opacity-90 mb-4">Earn 20% commission on their contributions</p>
          <a href="/referrals" className="inline-block px-6 py-2 bg-white text-secondary rounded-lg font-semibold hover:bg-gray-100">
            Share Referral
          </a>
        </div>
      </div>
    </div>
  );
}
