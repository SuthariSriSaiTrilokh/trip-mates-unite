import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Trip, User } from "@/types";

interface TripHeaderProps {
  trip: Trip;
  participants: User[];
}

export function TripHeader({ trip, participants }: TripHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={() => navigate("/trips")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Trips
      </Button>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{trip.name}</h1>
          <p className="text-gray-500">
            {format(new Date(trip.startDate), "MMM d")} -{" "}
            {format(new Date(trip.endDate), "MMM d, yyyy")}
          </p>
          <p className="text-gray-500">Location: {trip.location}</p>
        </div>
        <div className="space-x-2">
          {participants.map((participant) => (
            <img
              key={participant.id}
              src={participant.avatarUrl}
              alt={participant.name}
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              title={participant.name}
            />
          ))}
        </div>
      </div>
      <p className="text-md">{trip.description}</p>
    </div>
  );
}
