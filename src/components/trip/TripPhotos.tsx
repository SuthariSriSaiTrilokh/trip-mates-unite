
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Photo, Trip, User } from "@/types";

interface TripPhotosProps {
  trip: Trip;
  photos: Photo[];
  currentUserId: string;
  users: User[];
}

export function TripPhotos({ trip, photos, currentUserId, users }: TripPhotosProps) {
  const navigate = useNavigate();
  const tripPhotos = photos.filter((photo) => photo.tripId === trip.id);

  return (
    <>
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
          {tripPhotos.map((photo) => {
            const uploader = users.find(u => u.id === photo.uploadedBy);
            return (
              <div
                key={photo.id}
                className="rounded-md overflow-hidden card-hover flex flex-col"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption || "Trip photo"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 bg-white">
                  {photo.caption && <p className="text-sm mb-1">{photo.caption}</p>}
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>Captured by: {uploader?.name}</span>
                    <span>{format(new Date(photo.uploadDate), "MMM d")}</span>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                    {photo.uploadedBy === currentUserId && (
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
