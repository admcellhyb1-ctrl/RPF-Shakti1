import { User } from '../types';
import { MOCK_USERS } from '../constants';
import { setUserSession } from './storageService';

export const loginUser = async (identifier: string, isOTP: boolean): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple mock logic
      const user = MOCK_USERS.find(u => u.mobile === identifier);
      
      if (user) {
        setUserSession(user);
        resolve(user);
      } else {
        reject(new Error("User not found or invalid credentials"));
      }
    }, 1000); // Simulate network delay
  });
};

export const logoutUser = (): void => {
  setUserSession(null);
};