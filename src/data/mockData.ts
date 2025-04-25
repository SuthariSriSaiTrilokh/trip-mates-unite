
import { Expense, Hotel, Photo, Trip, User } from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "user2",
    name: "Maria Garcia",
    email: "maria@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "user3",
    name: "John Smith",
    email: "john@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "user4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

// Mock Trips
export const mockTrips: Trip[] = [
  {
    id: "trip1",
    name: "Beach Weekend",
    description: "Weekend getaway to the coast",
    startDate: "2023-06-10",
    endDate: "2023-06-12",
    location: "Malibu, CA",
    createdBy: "user1",
    participants: ["user1", "user2", "user3"],
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "trip2",
    name: "Mountain Hiking",
    description: "Exploring mountain trails and camping",
    startDate: "2023-07-15",
    endDate: "2023-07-20",
    location: "Rocky Mountains, CO",
    createdBy: "user2",
    participants: ["user1", "user2", "user4"],
    coverImage: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "trip3",
    name: "City Exploration",
    description: "Weekend in the big city",
    startDate: "2023-08-05",
    endDate: "2023-08-07",
    location: "New York, NY",
    createdBy: "user3",
    participants: ["user2", "user3", "user4"],
    coverImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop",
  },
];

// Mock Photos
export const mockPhotos: Photo[] = [
  {
    id: "photo1",
    tripId: "trip1",
    uploadedBy: "user1",
    imageUrl: "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?q=80&w=1000&auto=format&fit=crop",
    caption: "Amazing sunset at the beach",
    uploadDate: "2023-06-10T18:30:00",
  },
  {
    id: "photo2",
    tripId: "trip1",
    uploadedBy: "user2",
    imageUrl: "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?q=80&w=1000&auto=format&fit=crop",
    caption: "Beach volleyball fun",
    uploadDate: "2023-06-11T14:20:00",
  },
  {
    id: "photo3",
    tripId: "trip2",
    uploadedBy: "user4",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff204c?q=80&w=1000&auto=format&fit=crop",
    caption: "Mountain view",
    uploadDate: "2023-07-16T10:15:00",
  },
  {
    id: "photo4",
    tripId: "trip2",
    uploadedBy: "user1",
    imageUrl: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=1000&auto=format&fit=crop",
    caption: "Camping under the stars",
    uploadDate: "2023-07-17T21:45:00",
  },
  {
    id: "photo5",
    tripId: "trip3",
    uploadedBy: "user3",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop",
    caption: "City skyline view",
    uploadDate: "2023-08-05T16:30:00",
  },
];

// Mock Expenses
export const mockExpenses: Expense[] = [
  {
    id: "expense1",
    tripId: "trip1",
    description: "Dinner at seafood restaurant",
    amount: 120.50,
    currency: "USD",
    paidBy: "user1",
    splitWith: ["user1", "user2", "user3"],
    date: "2023-06-10",
    category: "Food",
  },
  {
    id: "expense2",
    tripId: "trip1",
    description: "Beach equipment rental",
    amount: 75.00,
    currency: "USD",
    paidBy: "user2",
    splitWith: ["user1", "user2", "user3"],
    date: "2023-06-11",
    category: "Activities",
  },
  {
    id: "expense3",
    tripId: "trip2",
    description: "Camping supplies",
    amount: 200.25,
    currency: "USD",
    paidBy: "user4",
    splitWith: ["user1", "user2", "user4"],
    date: "2023-07-15",
    category: "Supplies",
  },
  {
    id: "expense4",
    tripId: "trip3",
    description: "Museum tickets",
    amount: 60.00,
    currency: "USD",
    paidBy: "user3",
    splitWith: ["user2", "user3", "user4"],
    date: "2023-08-05",
    category: "Activities",
  },
  {
    id: "expense5",
    tripId: "trip3",
    description: "Taxi rides",
    amount: 45.75,
    currency: "USD",
    paidBy: "user2",
    splitWith: ["user2", "user3", "user4"],
    date: "2023-08-06",
    category: "Transportation",
  },
];

// Mock Hotels
export const mockHotels: Hotel[] = [
  {
    id: "hotel1",
    name: "Oceanview Resort",
    address: "123 Beach Rd, Malibu, CA",
    rating: 4.7,
    price: "$250/night",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    latitude: 34.0259,
    longitude: -118.7798,
  },
  {
    id: "hotel2",
    name: "Mountain Lodge",
    address: "456 Pine Trail, Rocky Mountains, CO",
    rating: 4.5,
    price: "$180/night",
    imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1000&auto=format&fit=crop",
    latitude: 39.5501,
    longitude: -105.7821,
  },
  {
    id: "hotel3",
    name: "City Center Hotel",
    address: "789 Broadway, New York, NY",
    rating: 4.3,
    price: "$320/night",
    imageUrl: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?q=80&w=1000&auto=format&fit=crop",
    latitude: 40.7831,
    longitude: -73.9712,
  },
  {
    id: "hotel4",
    name: "Beachside Inn",
    address: "321 Coast Hwy, Malibu, CA",
    rating: 4.2,
    price: "$210/night",
    imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1000&auto=format&fit=crop",
    latitude: 34.0368,
    longitude: -118.6834,
  },
  {
    id: "hotel5",
    name: "Summit Retreat",
    address: "654 Mountain View Rd, Rocky Mountains, CO",
    rating: 4.8,
    price: "$230/night",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    latitude: 39.6015,
    longitude: -105.9035,
  },
];

// Mock Current User
export const mockCurrentUser = mockUsers[0];
