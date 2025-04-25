
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TripProvider } from "./contexts/TripContext";
import { Layout } from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TripsPage from "./pages/TripsPage";
import CreateTripPage from "./pages/CreateTripPage";
import TripDetailsPage from "./pages/TripDetailsPage";
import AddPhotoPage from "./pages/AddPhotoPage";
import AddExpensePage from "./pages/AddExpensePage";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <TripProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="trips" element={<TripsPage />} />
                <Route path="create-trip" element={<CreateTripPage />} />
                <Route path="trip/:tripId" element={<TripDetailsPage />} />
                <Route path="trip/:tripId/photos/add" element={<AddPhotoPage />} />
                <Route path="trip/:tripId/expenses/add" element={<AddExpensePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TripProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
