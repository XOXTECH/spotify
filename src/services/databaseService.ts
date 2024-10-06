import axios from 'axios';
import { User } from '../types';

const API_URL = 'https://api.example.com'; // Replace with your actual API URL when you have one

export const fetchPotentialMatches = async (userId: number): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_URL}/potential-matches/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching potential matches:', error);
    return [];
  }
};

export const saveSwipe = async (userId: number, swipedUserId: number, liked: boolean): Promise<void> => {
  try {
    await axios.post(`${API_URL}/swipes`, { userId, swipedUserId, liked });
  } catch (error) {
    console.error('Error saving swipe:', error);
  }
};

export const updateUserProfile = async (userId: number, profile: Partial<User>): Promise<void> => {
  try {
    await axios.put(`${API_URL}/users/${userId}`, profile);
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
};

// Mock data for development
const mockUsers: User[] = [
  { id: 1, name: 'Alice', age: 28, bio: 'Music lover' },
  { id: 2, name: 'Bob', age: 32, bio: 'Rock enthusiast' },
  { id: 3, name: 'Charlie', age: 25, bio: 'Jazz aficionado' },
];

// Mock API functions
export const mockFetchPotentialMatches = async (userId: number): Promise<User[]> => {
  return mockUsers.filter(user => user.id !== userId);
};

export const mockSaveSwipe = async (userId: number, swipedUserId: number, liked: boolean): Promise<void> => {
  console.log(`User ${userId} swiped ${liked ? 'right' : 'left'} on user ${swipedUserId}`);
};

export const mockUpdateUserProfile = async (userId: number, profile: Partial<User>): Promise<void> => {
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...profile };
    console.log(`Updated profile for user ${userId}:`, mockUsers[userIndex]);
  }
};