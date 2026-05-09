export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'subadmin' | 'admin';
  balance: number;
  referralCode: string;
  referredBy?: string;
  totalEarnings: number;
  emailVerified: boolean;
  status: 'active' | 'inactive' | 'blocked';
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifscCode: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Prayer {
  id: string;
  title: string;
  category: string;
  content: string;
  userId: string;
  views: number;
  likes: string[];
  comments: Array<{
    userId: string;
    text: string;
    createdAt: Date;
  }>;
  isPublic: boolean;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'credit' | 'debit';
  amount: number;
  reason: string;
  paymentMethod?: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  createdAt: Date;
}

export interface Referral {
  id: string;
  referrerId: string;
  referreeId: string;
  commission: number;
  commissionPercentage: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  approvedAt?: Date;
}

export interface Withdrawal {
  id: string;
  userId: string;
  amount: number;
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifscCode: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  processedBy?: string;
  rejectionReason?: string;
  createdAt: Date;
  processedAt?: Date;
}
