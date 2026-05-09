'use client';
import React, { useEffect, useState } from 'react';

interface AdminStats {
  totalUsers: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalEarnings: number;
  pendingWithdrawals: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalEarnings: 0,
    pendingWithdrawals: 0,
  });

  useEffect(() => {
    // Fetch admin stats
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">📊 Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-primary">
          <p className="text-gray-600 text-sm font-semibold">Total Users</p>
          <h3 className="text-3xl font-bold text-primary mt-2">{stats.totalUsers}</h3>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-secondary">
          <p className="text-gray-600 text-sm font-semibold">Total Deposits</p>
          <h3 className="text-3xl font-bold text-secondary mt-2">₹{stats.totalDeposits}</h3>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-gold">
          <p className="text-gray-600 text-sm font-semibold">Withdrawals</p>
          <h3 className="text-3xl font-bold text-gold mt-2">₹{stats.totalWithdrawals}</h3>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-sacred">
          <p className="text-gray-600 text-sm font-semibold">Total Earnings</p>
          <h3 className="text-3xl font-bold text-sacred mt-2">₹{stats.totalEarnings}</h3>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm font-semibold">Pending Withdrawals</p>
          <h3 className="text-3xl font-bold text-red-500 mt-2">{stats.pendingWithdrawals}</h3>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">👥 Recent Users</h2>
          <div className="space-y-3">
            <p className="text-gray-600 text-center py-8">No data available</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📝 Pending Approvals</h2>
          <div className="space-y-3">
            <p className="text-gray-600 text-center py-8">No pending items</p>
          </div>
        </div>
      </div>
    </div>
  );
}
