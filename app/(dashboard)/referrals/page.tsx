'use client';
import React, { useState, useEffect } from 'react';

interface Referral {
  id: string;
  name: string;
  email: string;
  commission: number;
  status: string;
  joinedDate: string;
}

interface ReferralStats {
  code: string;
  totalReferrals: number;
  totalCommission: number;
  activeReferrals: number;
  referrals: Referral[];
}

export default function ReferralsPage() {
  const [stats, setStats] = useState<ReferralStats>({
    code: '',
    totalReferrals: 0,
    totalCommission: 0,
    activeReferrals: 0,
    referrals: [],
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchReferralStats();
  }, []);

  const fetchReferralStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/referral/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching referral stats:', error);
    }
  };

  const copyToClipboard = () => {
    const referralLink = `${window.location.origin}/register?ref=${stats.code}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Referral Code Card */}
      <div className="bg-gradient-to-r from-sacred to-primary text-white p-8 rounded-lg">
        <p className="text-lg opacity-90">Your Referral Code</p>
        <h2 className="text-4xl font-bold mt-2 font-mono">{stats.code}</h2>
        <p className="text-sm opacity-75 mt-4">Share this code to earn 20% commission on referrals</p>
        <button
          onClick={copyToClipboard}
          className="mt-6 px-6 py-2 bg-white text-sacred rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          {copied ? '✓ Copied!' : '📋 Copy Referral Link'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-primary">
          <p className="text-gray-600 text-sm font-semibold">Total Referrals</p>
          <h3 className="text-3xl font-bold text-primary mt-2">{stats.totalReferrals}</h3>
          <p className="text-xs text-gray-500 mt-2">People you've invited</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-secondary">
          <p className="text-gray-600 text-sm font-semibold">Active Referrals</p>
          <h3 className="text-3xl font-bold text-secondary mt-2">{stats.activeReferrals}</h3>
          <p className="text-xs text-gray-500 mt-2">Currently earning from</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-gold">
          <p className="text-gray-600 text-sm font-semibold">Commission Earned</p>
          <h3 className="text-3xl font-bold text-gold mt-2">₹{stats.totalCommission.toFixed(2)}</h3>
          <p className="text-xs text-gray-500 mt-2">20% of referral earnings</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 How Referrals Work</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold text-gray-800">Share Your Code</h3>
              <p className="text-gray-600 text-sm">Share your unique referral code with friends and family</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold text-gray-800">They Join & Deposit</h3>
              <p className="text-gray-600 text-sm">Your referrals sign up and make their first deposit</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-sacred text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold text-gray-800">You Earn Commission</h3>
              <p className="text-gray-600 text-sm">Automatically receive 20% commission on their contributions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Referrals List */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 Your Referrals</h2>
        <div className="space-y-4">
          {stats.referrals.length > 0 ? (
            stats.referrals.map(referral => (
              <div key={referral.id} className="flex items-center justify-between pb-4 border-b">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{referral.name}</p>
                  <p className="text-sm text-gray-600">{referral.email}</p>
                  <p className="text-xs text-gray-500 mt-1">Joined {new Date(referral.joinedDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gold text-lg">₹{referral.commission.toFixed(2)}</p>
                  <span className={`text-xs font-semibold ${referral.status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
                    {referral.status === 'active' ? '🟢 Active' : '⚪ Inactive'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 py-8">No referrals yet. Start sharing!</p>
          )}
        </div>
      </div>
    </div>
  );
}
