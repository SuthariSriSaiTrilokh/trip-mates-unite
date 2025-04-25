
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTrip } from "@/contexts/TripContext";
import { User } from "@/types";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Camera,
  CreditCard,
  Hotel,
  MapPin,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { mockUsers } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

export default function TripDetailsPage() {
  const { tripId } = useParams();
  const { trips, setCurrentTrip, photos, expenses, nearbyHotels, getNearbyHotels } = useTrip();
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState<User[]>([]);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

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
      
      // Mock location data based on the trip location
      // In a real app, this would come from geolocation or an API
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

  const tripPhotos = photos.filter((photo) => photo.tripId === trip.id);
  const tripExpenses = expenses.filter((expense) => expense.tripId === trip.id);

  const handleFindHotels = () => {
    getNearbyHotels(location.latitude, location.longitude);
  };

  return (
    <div className="container py-10">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/trips")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to My Trips
      </Button>

      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
        <img
          src={
            trip.coverImage ||
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop"
          }
          alt={trip.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{trip.name}</h1>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                {format(new Date(trip.startDate), "MMM d")} -{" "}
                {format(new Date(trip.endDate), "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{trip.location}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>{participants.length} participants</span>
            </div>
          </div>
        </div>
      </div>

      {trip.description && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">About this trip</h2>
          <p className="text-gray-700">{trip.description}</p>
        </div>
      )}

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="mb-8 w-full justify-start">
          <TabsTrigger value="photos" className="flex items-center">
            <Camera className="h-4 w-4 mr-2" /> Photos
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" /> Expenses
          </TabsTrigger>
          <TabsTrigger value="hotels" className="flex items-center">
            <Hotel className="h-4 w-4 mr-2" /> Nearby Hotels
          </TabsTrigger>
          <TabsTrigger value="participants" className="flex items-center">
            <Users className="h-4 w-4 mr-2" /> Participants
          </TabsTrigger>
        </TabsList>

        <TabsContent value="photos">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Trip Photos</h2>
            <Button onClick={() => navigate(`/trip/${trip.id}/photos/add`)}>
              Upload Photos
            </Button>
          </div>

          {tripPhotos.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No photos yet</h3>
              <p className="mt-1 text-gray-500">
                Start capturing memories by uploading photos.
              </p>
              <Button
                className="mt-4"
                onClick={() => navigate(`/trip/${trip.id}/photos/add`)}
              >
                Upload Photos
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tripPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="aspect-square rounded-md overflow-hidden card-hover"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption || "Trip photo"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="expenses">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Expenses</h2>
            <Button onClick={() => navigate(`/trip/${trip.id}/expenses/add`)}>
              Add Expense
            </Button>
          </div>

          {tripExpenses.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No expenses yet</h3>
              <p className="mt-1 text-gray-500">
                Track your shared expenses by adding them here.
              </p>
              <Button
                className="mt-4"
                onClick={() => navigate(`/trip/${trip.id}/expenses/add`)}
              >
                Add Expense
              </Button>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <div className="grid grid-cols-5 gap-4 font-medium p-4 bg-gray-50">
                <div className="col-span-2">Description</div>
                <div>Paid by</div>
                <div>Date</div>
                <div className="text-right">Amount</div>
              </div>
              <div className="divide-y">
                {tripExpenses.map((expense) => {
                  const payer = mockUsers.find((u) => u.id === expense.paidBy);
                  return (
                    <div
                      key={expense.id}
                      className="grid grid-cols-5 gap-4 p-4 items-center"
                    >
                      <div className="col-span-2">
                        <div className="font-medium">{expense.description}</div>
                        <div className="text-sm text-gray-500">{expense.category}</div>
                      </div>
                      <div>{payer?.name}</div>
                      <div>{format(new Date(expense.date), "MMM d, yyyy")}</div>
                      <div className="text-right font-medium">
                        {expense.currency} {expense.amount.toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-4 bg-gray-50 text-right">
                <div className="font-medium">
                  Total: ${" "}
                  {tripExpenses
                    .reduce((sum, expense) => sum + expense.amount, 0)
                    .toFixed(2)}
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="hotels">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Nearby Hotels</h2>
            <Button onClick={handleFindHotels}>
              Find Hotels
            </Button>
          </div>
          {nearbyHotels.length === 0 ? (
            <div className="text-center py-12">
              <Hotel className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No hotels found</h3>
              <p className="mt-1 text-gray-500">
                Click "Find Hotels" to search for accommodations near your trip location.
              </p>
              <Button className="mt-4" onClick={handleFindHotels}>
                Find Hotels
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="border rounded-lg overflow-hidden shadow-sm card-hover"
                >
                  <div className="h-48">
                    <img
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{hotel.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{hotel.address}</p>
                    <div className="mt-2 flex justify-between">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{hotel.rating}</span>
                      </div>
                      <div className="font-medium">{hotel.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="participants">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Trip Participants</h2>
            <Button variant="outline" onClick={() => navigate(`/trip/${trip.id}/invite`)}>
              Invite More
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {participants.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-4 border rounded-lg"
              >
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
