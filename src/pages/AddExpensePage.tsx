
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useTrip } from "@/contexts/TripContext";
import { mockUsers } from "@/data/mockData";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const expenseCategories = [
  "Food",
  "Accommodation",
  "Transportation",
  "Activities",
  "Shopping",
  "Other",
];

export default function AddExpensePage() {
  const { tripId } = useParams();
  const { authState } = useAuth();
  const { trips, addExpenseToTrip } = useTrip();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [category, setCategory] = useState("Food");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  const trip = trips.find((t) => t.id === tripId);
  const tripParticipants = trip
    ? mockUsers.filter((user) => trip.participants.includes(user.id))
    : [];

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

  const handleParticipantToggle = (userId: string) => {
    setSelectedParticipants((current) =>
      current.includes(userId)
        ? current.filter((id) => id !== userId)
        : [...current, userId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Make sure we have at least one participant
    const splitWith =
      selectedParticipants.length > 0
        ? selectedParticipants
        : tripParticipants.map((p) => p.id);

    addExpenseToTrip(trip.id, {
      description,
      amount: parseFloat(amount),
      currency,
      category,
      splitWith,
      tripId: trip.id,
    });

    navigate(`/trip/${trip.id}`);
  };

  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Add Expense to {trip.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Dinner at restaurant"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={currency}
                  onValueChange={(value) => setCurrency(value)}
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="JPY">JPY (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Split with</Label>
              <div className="border rounded-md p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b">
                  <span className="font-medium">Participants</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSelectedParticipants(
                        selectedParticipants.length === tripParticipants.length
                          ? []
                          : tripParticipants.map((p) => p.id)
                      )
                    }
                  >
                    {selectedParticipants.length === tripParticipants.length
                      ? "Deselect All"
                      : "Select All"}
                  </Button>
                </div>
                {tripParticipants.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`user-${user.id}`}
                      checked={selectedParticipants.includes(user.id)}
                      onCheckedChange={() => handleParticipantToggle(user.id)}
                    />
                    <label
                      htmlFor={`user-${user.id}`}
                      className="flex items-center cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full mr-2 overflow-hidden">
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{user.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate(`/trip/${trip.id}`)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Expense</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
