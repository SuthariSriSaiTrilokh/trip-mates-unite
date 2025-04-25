
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Expense, Trip, User } from "@/types";

interface TripExpensesProps {
  trip: Trip;
  expenses: Expense[];
  currentUserId: string;
  users: User[];
}

export function TripExpenses({ trip, expenses, currentUserId, users }: TripExpensesProps) {
  const navigate = useNavigate();
  const tripExpenses = expenses.filter((expense) => expense.tripId === trip.id);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Expenses</h2>
        <Button onClick={() => navigate(`/trip/${trip.id}/expenses/add`)}>
          Add Expense
        </Button>
      </div>

      {tripExpenses.length === 0 ? (
        <div className="text-center py-12">
          <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">No expenses yet</h3>
          <p className="mt-1 text-gray-500">
            Track your shared expenses by adding them here.
          </p>
          <Button
            className="mt-4"
            onClick={() => navigate(`/trip/${trip.id}/expenses/add`)}
          >
            Add Expense
          </Button>
        </div>
      ) : (
        <div>
          <div className="border rounded-md overflow-hidden mb-8">
            <div className="grid grid-cols-5 gap-4 font-medium p-4 bg-gray-50">
              <div className="col-span-2">Description</div>
              <div>Paid by</div>
              <div>Date</div>
              <div className="text-right">Amount</div>
            </div>
            <div className="divide-y">
              {tripExpenses.map((expense) => {
                const payer = users.find((u) => u.id === expense.paidBy);
                return (
                  <div
                    key={expense.id}
                    className="grid grid-cols-5 gap-4 p-4 items-center"
                  >
                    <div className="col-span-2">
                      <div className="font-medium">{expense.description}</div>
                      <div className="text-sm text-gray-500">
                        {expense.category}
                      </div>
                    </div>
                    <div>{payer?.name}</div>
                    <div>{format(new Date(expense.date), "MMM d, yyyy")}</div>
                    <div className="text-right font-medium flex justify-end items-center">
                      {expense.currency} {expense.amount.toFixed(2)}
                      {expense.paidBy === currentUserId && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 h-6 w-6 text-red-500"
                        >
                          <span className="sr-only">Remove</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Balances</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium mb-3">Total Expenses by Category</h4>
                <div className="h-60 flex items-center justify-center text-gray-500">
                  Pie chart visualization would appear here
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium mb-3">Expenses Over Time</h4>
                <div className="h-60 flex items-center justify-center text-gray-500">
                  Bar chart visualization would appear here
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
