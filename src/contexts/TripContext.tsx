
import React, { createContext, useContext, useState } from "react";
import { Expense, Hotel, Photo, Trip } from "@/types";
import { mockExpenses, mockHotels, mockPhotos, mockTrips } from "@/data/mockData";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

interface TripContextType {
  trips: Trip[];
  userTrips: Trip[];
  currentTrip: Trip | null;
  photos: Photo[];
  expenses: Expense[];
  nearbyHotels: Hotel[];
  
  createTrip: (trip: Omit<Trip, "id" | "createdBy">) => void;
  setCurrentTrip: (tripId: string) => void;
  addPhotoToTrip: (tripId: string, photoData: Omit<Photo, "id" | "uploadedBy" | "uploadDate">) => void;
  addExpenseToTrip: (tripId: string, expenseData: Omit<Expense, "id" | "paidBy" | "date">) => void;
  getNearbyHotels: (latitude: number, longitude: number) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authState } = useAuth();
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [currentTrip, setCurrentTripState] = useState<Trip | null>(null);
  const [photos, setPhotos] = useState<Photo[]>(mockPhotos);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [nearbyHotels, setNearbyHotels] = useState<Hotel[]>([]);

  const userTrips = authState.user
    ? trips.filter(
        (trip) =>
          trip.participants.includes(authState.user!.id) ||
          trip.createdBy === authState.user!.id
      )
    : [];

  const createTrip = (tripData: Omit<Trip, "id" | "createdBy">) => {
    if (!authState.user) {
      toast.error("You must be logged in to create a trip");
      return;
    }

    const newTrip: Trip = {
      ...tripData,
      id: `trip${trips.length + 1}`,
      createdBy: authState.user.id,
    };

    setTrips([...trips, newTrip]);
    toast.success("Trip created successfully!");
  };

  const setCurrentTrip = (tripId: string) => {
    const trip = trips.find((t) => t.id === tripId);
    if (trip) {
      setCurrentTripState(trip);
    } else {
      toast.error("Trip not found");
    }
  };

  const addPhotoToTrip = (
    tripId: string,
    photoData: Omit<Photo, "id" | "uploadedBy" | "uploadDate">
  ) => {
    if (!authState.user) {
      toast.error("You must be logged in to add photos");
      return;
    }

    const newPhoto: Photo = {
      ...photoData,
      id: `photo${photos.length + 1}`,
      tripId,
      uploadedBy: authState.user.id,
      uploadDate: new Date().toISOString(),
    };

    setPhotos([...photos, newPhoto]);
    toast.success("Photo added successfully!");
  };

  const addExpenseToTrip = (
    tripId: string,
    expenseData: Omit<Expense, "id" | "paidBy" | "date">
  ) => {
    if (!authState.user) {
      toast.error("You must be logged in to add expenses");
      return;
    }

    const newExpense: Expense = {
      ...expenseData,
      id: `expense${expenses.length + 1}`,
      tripId,
      paidBy: authState.user.id,
      date: new Date().toISOString().split("T")[0],
    };

    setExpenses([...expenses, newExpense]);
    toast.success("Expense added successfully!");
  };

  const getNearbyHotels = (latitude: number, longitude: number) => {
    // In a real app, this would make an API call to get nearby hotels
    // For our mock, we'll just filter existing hotels based on proximity
    const nearbyHotelsList = mockHotels.filter(
      (hotel) =>
        Math.abs(hotel.latitude - latitude) < 0.1 &&
        Math.abs(hotel.longitude - longitude) < 0.1
    );
    
    setNearbyHotels(nearbyHotelsList.length ? nearbyHotelsList : mockHotels);
    toast.success(`Found ${nearbyHotelsList.length || mockHotels.length} nearby hotels`);
  };

  const value: TripContextType = {
    trips,
    userTrips,
    currentTrip,
    photos,
    expenses,
    nearbyHotels,
    createTrip,
    setCurrentTrip,
    addPhotoToTrip,
    addExpenseToTrip,
    getNearbyHotels,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
};
