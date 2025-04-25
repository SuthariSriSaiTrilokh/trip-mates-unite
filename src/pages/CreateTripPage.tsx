
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/contexts/AuthContext";
import { useTrip } from "@/contexts/TripContext";
import { Trip } from "@/types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export default function CreateTripPage() {
  const { authState } = useAuth();
  const { createTrip } = useTrip();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [participants, setParticipants] = useState("");
  const [coverImage, setCoverImage] = useState("");

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }
    
    const participantEmails = participants
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email !== "");
    
    const newTrip: Omit<Trip, "id" | "createdBy"> = {
      name,
      description,
      location,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      participants: [authState.user!.id, ...participantEmails],
      coverImage: coverImage || undefined,
    };
    
    createTrip(newTrip);
    navigate("/trips");
  };

  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Trip</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Trip Name</Label>
              <Input
                id="name"
                placeholder="Summer Beach Vacation"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell us about your trip"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Malibu, CA"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) =>
                        startDate ? date < startDate : false
                      }
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="participants">Invite Participants (comma-separated emails)</Label>
              <Input
                id="participants"
                placeholder="friend1@example.com, friend2@example.com"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Enter email addresses separated by commas
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
              <Input
                id="coverImage"
                placeholder="https://example.com/image.jpg"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" type="button" onClick={() => navigate("/trips")}>
                Cancel
              </Button>
              <Button type="submit">Create Trip</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
