'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-sacred to-primary text-white p-6 fixed h-screen left-0 top-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif">🙏 Prayer Stock</h1>
          <p className="text-sm opacity-75 mt-2">Spiritual Investment</p>
        </div>

        <nav className="space-y-4">
          <Link href="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-white/20 transition">
            📊 Dashboard
          </Link>
          <Link href="/wallet" className="block px-4 py-2 rounded-lg hover:bg-white/20 transition">
            💰 Wallet
          </Link>
          <Link href="/referrals" className="block px-4 py-2 rounded-lg hover:bg-white/20 transition">
            🤝 Referrals
          </Link>
          <Link href="/withdraw" className="block px-4 py-2 rounded-lg hover:bg-white/20 transition">
            💳 Withdraw
          </Link>
          <Link href="/profile" className="block px-4 py-2 rounded-lg hover:bg-white/20 transition">
            👤 Profile
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition font-semibold"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Top Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Welcome to Your Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Shaki24</span>
            <img src="https://avatar.vercel.sh/shaki" alt="avatar" className="w-10 h-10 rounded-full" />
          </div>
        </div>

        {/* Content */}
        {children}
      </main>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg z-50"
      >
        ☰
      </button>
    </div>
  );
}
