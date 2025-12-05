import { User, UserRole } from './types';

// Mock Users for Demo
export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Constable Anita Singh',
    mobile: '9876543210',
    role: UserRole.USER,
    unit: 'RPF Post New Delhi',
    division: 'Delhi',
    zone: 'Northern Railway'
  },
  {
    id: 'a1',
    name: 'Divisional Inspector Rao',
    mobile: 'admin_div',
    role: UserRole.ADMIN_DIV,
    unit: 'Div HQ Delhi',
    division: 'Delhi',
    zone: 'Northern Railway'
  },
  {
    id: 'a2',
    name: 'Zonal IG Sharma',
    mobile: 'admin_zone',
    role: UserRole.ADMIN_ZONE,
    unit: 'Zonal HQ Baroda House',
    division: 'All',
    zone: 'Northern Railway'
  }
];

export const APP_NAME = "RPF Shakti";
export const THEME_GRADIENT = "bg-gradient-to-br from-red-50 via-white to-red-50";
export const PRIMARY_COLOR = "text-red-700";
export const PRIMARY_BG = "bg-red-700";
