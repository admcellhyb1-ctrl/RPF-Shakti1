import { Complaint, ComplaintStatus, TimelineEvent, User } from '../types';

const COMPLAINTS_KEY = 'rpf_shakti_complaints';
const SESSION_KEY = 'rpf_shakti_session';

export const getComplaints = (): Complaint[] => {
  const data = localStorage.getItem(COMPLAINTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveComplaint = (complaint: Complaint): void => {
  const complaints = getComplaints();
  complaints.unshift(complaint); // Add to top
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
};

export const updateComplaintStatus = (id: string, newStatus: ComplaintStatus, note: string, updatedBy: string): void => {
  const complaints = getComplaints();
  const index = complaints.findIndex(c => c.id === id);
  if (index !== -1) {
    const updatedComplaint = { ...complaints[index] };
    updatedComplaint.status = newStatus;
    updatedComplaint.updatedAt = Date.now();
    
    const newEvent: TimelineEvent = {
      status: newStatus,
      timestamp: Date.now(),
      note,
      updatedBy
    };
    
    updatedComplaint.timeline.push(newEvent);
    complaints[index] = updatedComplaint;
    localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
  }
};

export const getUserSession = (): User | null => {
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
};

export const setUserSession = (user: User | null): void => {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
};

export const generateId = (): string => {
  return 'RPF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};