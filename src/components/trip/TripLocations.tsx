
import { Button } from "@/components/ui/button";
import { Trip, User } from "@/types";

interface TripLocationsProps {
  trip: Trip;
  participants: User[];
}

export function TripLocations({ trip, participants }: TripLocationsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Live Locations</h2>
        <Button>Update My Location</Button>
      </div>
      
      <div className="bg-gray-100 h-96 rounded-xl relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">
            Map would be displayed here with all participants' locations
          </p>
        </div>
        
        <div className="absolute bottom-6 right-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium mb-2">Participants</h3>
          <div className="space-y-2">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 bg-primary-${participant.id}`}></div>
                <span>{participant.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
