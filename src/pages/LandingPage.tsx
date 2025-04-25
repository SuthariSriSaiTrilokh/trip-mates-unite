
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Camera, Map, Users, CreditCard, Hotel } from "lucide-react";

export default function LandingPage() {
  const { authState } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      title: "Photo Sharing",
      description:
        "Share photos with your travel group in real-time. Create memories together.",
      icon: Camera,
    },
    {
      title: "Location Tracking",
      description:
        "Keep track of each other's whereabouts during the trip for safety and convenience.",
      icon: Map,
    },
    {
      title: "Group Management",
      description:
        "Easy-to-use interface for managing trip participants and itineraries.",
      icon: Users,
    },
    {
      title: "Expense Sharing",
      description:
        "Track and split expenses fairly among group members. No more awkward money talks.",
      icon: CreditCard,
    },
    {
      title: "Hotel Suggestions",
      description:
        "Find nearby hotels based on your group's location with just a click.",
      icon: Hotel,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-teal-50 to-white">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-teal-400 via-blue-500 to-coral-400 bg-clip-text text-transparent">
                  Travel Together, Share the Journey
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  TripMates brings all your group travel needs into one app.
                  Share photos, track expenses, and never lose each other again.
                </p>
              </div>
              {authState.isAuthenticated ? (
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white"
                    onClick={() => navigate("/create-trip")}
                  >
                    Create Trip
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => navigate("/join-trip")}
                  >
                    Join Trip
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white"
                    onClick={() => navigate("/register")}
                  >
                    Get Started
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => navigate("/login")}>
                    Log In
                  </Button>
                </div>
              )}
            </div>
            <div className="relative flex items-center justify-center lg:justify-end">
              <img
                src="https://images.unsplash.com/photo-1525080517395-00cee65a79c2?q=80&w=1000&auto=format&fit=crop"
                alt="Group of friends traveling"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last shadow-xl"
                width={550}
                height={310}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32" id="features">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything You Need for Group Travel
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                TripMates combines all the essential tools for seamless group travel into one intuitive platform.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-4 p-6 rounded-lg border bg-white shadow-sm transition-all hover:shadow-md card-hover"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <feature.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-500 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-teal-100 to-blue-100">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to Transform Your Group Travel Experience?
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join TripMates today and make your next adventure with friends stress-free and unforgettable.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <Button
              className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white"
              onClick={() => navigate("/register")}
            >
              Sign Up for Free
            </Button>
            <p className="text-xs text-gray-500">
              No credit card required. Start planning your next trip today.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
