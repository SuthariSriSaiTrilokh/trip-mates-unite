
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Trip, User } from "@/types";

interface TripHeaderProps {
  trip: Trip;
  participants: User[];
}

export function TripHeader({ trip, participants }: TripHeaderProps) {
  const navigate = useNavigate();

  return (
    <>
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
    </>
  );
}
