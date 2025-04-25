
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useTrip } from "@/contexts/TripContext";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function JoinTripPage() {
  const { authState } = useAuth();
  const { trips, setCurrentTrip } = useTrip();
  const navigate = useNavigate();
  
  const [tripCode, setTripCode] = useState("");

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would validate against the server
    // For our demo, we'll just check if the trip exists in our mock data
    const trip = trips.find((t) => t.id === tripCode);
    
    if (trip) {
      // Add current user to the trip participants
      // In a real app, this would be an API call
      setCurrentTrip(trip.id);
      toast.success(`Successfully joined ${trip.name}!`);
      navigate(`/trip/${trip.id}`);
    } else {
      toast.error("Invalid trip code. Please check and try again.");
    }
  };

  return (
    <div className="container py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Join a Trip</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tripCode">Trip Code</Label>
              <Input
                id="tripCode"
                placeholder="Enter trip code (e.g. trip1, trip2)"
                required
                value={tripCode}
                onChange={(e) => setTripCode(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Enter the trip code shared with you by the trip creator
              </p>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" type="button" onClick={() => navigate("/trips")}>
                Cancel
              </Button>
              <Button type="submit">Join Trip</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
