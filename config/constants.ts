export const APP_NAME = 'My Prayer Stock';
export const APP_DESCRIPTION = 'Spiritual Investment Platform';

export const COLORS = {
  primary: '#8B5CF6',
  secondary: '#EC4899',
  accent: '#F59E0B',
  gold: '#D4AF37',
  sacred: '#6B46C1',
  dark: '#1F2937',
  light: '#F9FAFB',
};

export const REFERRAL_COMMISSION_PERCENTAGE = 20;
export const MIN_WITHDRAWAL = 100;
export const MAX_DEPOSIT = 100000;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
  },
  USER: {
    STATS: '/api/user/stats',
    WALLET: '/api/user/wallet',
    PROFILE: '/api/user/profile',
  },
  PAYMENT: {
    SUBMIT: '/api/payment/submit',
  },
  REFERRAL: {
    STATS: '/api/referral/stats',
  },
  WITHDRAW: {
    REQUEST: '/api/withdraw/request',
  },
};

export const PRAYER_CATEGORIES = [
  'Gratitude',
  'Healing',
  'Protection',
  'Blessing',
  'Guidance',
  'Peace',
  'Strength',
  'Love',
];
