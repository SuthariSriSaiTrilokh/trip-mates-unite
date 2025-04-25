import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTrip } from "@/contexts/TripContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { mockUsers } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Camera, CreditCard, Hotel, MapPin, Users } from "lucide-react";
import { TripHeader } from "@/components/trip/TripHeader";
import { TripPhotos } from "@/components/trip/TripPhotos";
import { TripLocations } from "@/components/trip/TripLocations";
import { TripExpenses } from "@/components/trip/TripExpenses";
import { TripHotels } from "@/components/trip/TripHotels";
import { TripFriends } from "@/components/trip/TripFriends";
import { User } from "@/types";
import { Button } from "@/components/ui/button";

export default function TripDetailsPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { trips, setCurrentTrip, photos, expenses, nearbyHotels, getNearbyHotels } = useTrip();
  const { authState } = useAuth();
  const [participants, setParticipants] = useState<User[]>([]);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [activeTab, setActiveTab] = useState("photos");

  const trip = trips.find((t) => t.id === tripId);

  useEffect(() => {
    if (tripId) {
      setCurrentTrip(tripId);
    }
  }, [tripId, setCurrentTrip]);

  useEffect(() => {
    if (trip) {
      const tripParticipants = mockUsers.filter((user) =>
        trip.participants.includes(user.id)
      );
      setParticipants(tripParticipants);
      
      if (trip.location.includes("Malibu")) {
        setLocation({ latitude: 34.0259, longitude: -118.7798 });
      } else if (trip.location.includes("Rocky")) {
        setLocation({ latitude: 39.5501, longitude: -105.7821 });
      } else if (trip.location.includes("New York")) {
        setLocation({ latitude: 40.7831, longitude: -73.9712 });
      }
    }
  }, [trip]);

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!trip) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold">Trip not found</h1>
        <Button className="mt-4" onClick={() => navigate("/trips")}>
          Back to My Trips
        </Button>
      </div>
    );
  }

  const handleFindHotels = () => {
    getNearbyHotels(location.latitude, location.longitude);
  };

  return (
    <div className="container py-10">
      <TripHeader trip={trip} participants={participants} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 w-full justify-start">
          <TabsTrigger value="photos" className="flex items-center">
            <Camera className="h-4 w-4 mr-2" /> Photos
          </TabsTrigger>
          <TabsTrigger value="locations" className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" /> Locations
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" /> Expenses
          </TabsTrigger>
          <TabsTrigger value="hotels" className="flex items-center">
            <Hotel className="h-4 w-4 mr-2" /> Nearby Hotels
          </TabsTrigger>
          <TabsTrigger value="friends" className="flex items-center">
            <Users className="h-4 w-4 mr-2" /> Friends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="photos">
          <TripPhotos 
            trip={trip} 
            photos={photos} 
            currentUserId={authState.user?.id || ''} 
            users={mockUsers} 
          />
        </TabsContent>

        <TabsContent value="locations">
          <TripLocations trip={trip} participants={participants} />
        </TabsContent>

        <TabsContent value="expenses">
          <TripExpenses 
            trip={trip} 
            expenses={expenses} 
            currentUserId={authState.user?.id || ''} 
            users={mockUsers} 
          />
        </TabsContent>

        <TabsContent value="hotels">
          <TripHotels hotels={nearbyHotels} onFindHotels={handleFindHotels} />
        </TabsContent>

        <TabsContent value="friends">
          <TripFriends trip={trip} participants={participants} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
