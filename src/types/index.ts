
export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type Trip = {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  location: string;
  createdBy: string;
  participants: string[];
  coverImage?: string;
};

export type Photo = {
  id: string;
  tripId: string;
  uploadedBy: string;
  imageUrl: string;
  caption?: string;
  uploadDate: string;
};

export type Expense = {
  id: string;
  tripId: string;
  description: string;
  amount: number;
  currency: string;
  paidBy: string;
  splitWith: string[];
  date: string;
  category: string;
};

export type Location = {
  userId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
};

export type Hotel = {
  id: string;
  name: string;
  address: string;
  rating: number;
  price: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};
