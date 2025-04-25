
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useTrip } from "@/contexts/TripContext";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function AddPhotoPage() {
  const { tripId } = useParams();
  const { authState } = useAuth();
  const { trips, addPhotoToTrip } = useTrip();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  const trip = trips.find((t) => t.id === tripId);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPhotoToTrip(trip.id, { imageUrl, caption, tripId: trip.id });
    navigate(`/trip/${trip.id}`);
  };

  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Add Photo to {trip.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Enter the URL of the image you want to upload
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="caption">Caption (optional)</Label>
              <Textarea
                id="caption"
                placeholder="Add a caption to your photo"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            {imageUrl && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="border rounded-md overflow-hidden aspect-video">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate(`/trip/${trip.id}`)}
              >
                Cancel
              </Button>
              <Button type="submit">Upload Photo</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
