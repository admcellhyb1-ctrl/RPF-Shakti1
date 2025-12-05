export enum UserRole {
  USER = 'USER',
  ADMIN_DIV = 'ADMIN_DIV',
  ADMIN_ZONE = 'ADMIN_ZONE',
  ADMIN_RB = 'ADMIN_RB'
}

export enum ComplaintStatus {
  SUBMITTED = 'Submitted',
  UNDER_REVIEW = 'Under Review',
  ACTION_TAKEN = 'Action Taken',
  CLOSED = 'Closed',
  ESCALATED = 'Escalated'
}

export enum ComplaintCategory {
  HARASSMENT = 'Workplace Harassment',
  INFRASTRUCTURE = 'Infrastructure/Facilities',
  DUTY_ROSTER = 'Duty Roster Issues',
  LEAVE = 'Leave/Welfare',
  SAFETY = 'Personal Safety',
  OTHER = 'Other'
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  role: UserRole;
  unit: string; // Post or Station
  division: string;
  zone: string;
}

export interface TimelineEvent {
  status: ComplaintStatus;
  timestamp: number;
  note?: string;
  updatedBy?: string;
}

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  userUnit: string;
  category: ComplaintCategory;
  description: string;
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  status: ComplaintStatus;
  timeline: TimelineEvent[];
  createdAt: number;
  updatedAt: number;
  attachments: string[]; // Base64 strings or URLs
  isAnonymous: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}