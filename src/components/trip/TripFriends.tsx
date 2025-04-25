
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Trip, User } from "@/types";

interface TripFriendsProps {
  trip: Trip;
  participants: User[];
}

export function TripFriends({ trip, participants }: TripFriendsProps) {
  const navigate = useNavigate();

  return (
    <>
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
            className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="h-12 w-12 rounded-full overflow-hidden mr-4 relative">
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-300 to-teal-300 opacity-20 rounded-full"></div>
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
    </>
  );
}
