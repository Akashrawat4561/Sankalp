// src/utils/constants.js
export const ROLES = {
    CITIZEN: 'citizen',
    CONTRACTOR: 'contractor',
    AUDITOR: 'auditor',
    GOVERNMENT: 'government',
    ADMIN: 'admin'
  }
  
  export const PROJECT_STATUS = {
    PLANNED: 'planned',
    ACTIVE: 'active',
    DELAYED: 'delayed',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
  }
  
  export const RISK_LEVELS = {
    LOW: { label: 'Low Risk', color: 'green', threshold: 0.3 },
    MEDIUM: { label: 'Medium Risk', color: 'yellow', threshold: 0.6 },
    HIGH: { label: 'High Risk', color: 'red', threshold: 1.0 }
  }
  
  export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
      REFRESH: '/api/auth/refresh'
    },
    PROJECTS: {
      LIST: '/api/projects',
      DETAIL: '/api/projects/:id',
      STATS: '/api/projects/stats'
    },
    CONTRACTORS: {
      LIST: '/api/contractors',
      DETAIL: '/api/contractors/:id'
    }
  }
  
  export const COLORS = {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    }
  }