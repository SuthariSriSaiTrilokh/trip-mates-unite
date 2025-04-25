
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTrip } from "@/contexts/TripContext";
import { formatDistance } from "date-fns";
import { Plus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function TripsPage() {
  const { authState } = useAuth();
  const { userTrips, setCurrentTrip } = useTrip();
  const navigate = useNavigate();

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleTripClick = (tripId: string) => {
    setCurrentTrip(tripId);
    navigate(`/trip/${tripId}`);
  };

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Trips</h1>
        <Button onClick={() => navigate("/create-trip")}>
          <Plus className="mr-2 h-4 w-4" /> Create Trip
        </Button>
      </div>

      {userTrips.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-2">No trips yet</h2>
          <p className="text-gray-500 mb-6">
            Create your first trip to get started.
          </p>
          <Button onClick={() => navigate("/create-trip")}>
            <Plus className="mr-2 h-4 w-4" /> Create Trip
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userTrips.map((trip) => (
            <div
              key={trip.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer card-hover"
              onClick={() => handleTripClick(trip.id)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={
                    trip.coverImage ||
                    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop"
                  }
                  alt={trip.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{trip.name}</h3>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    {new Date(trip.startDate) > new Date()
                      ? "Upcoming"
                      : new Date(trip.endDate) < new Date()
                      ? "Past"
                      : "Ongoing"}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{trip.location}</p>
                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{trip.participants.length} participants</span>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  {new Date(trip.startDate) > new Date()
                    ? `Starts ${formatDistance(
                        new Date(trip.startDate),
                        new Date(),
                        { addSuffix: true }
                      )}`
                    : new Date(trip.endDate) < new Date()
                    ? `Ended ${formatDistance(new Date(trip.endDate), new Date(), {
                        addSuffix: true,
                      })}`
                    : `Ends ${formatDistance(new Date(trip.endDate), new Date(), {
                        addSuffix: true,
                      })}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
