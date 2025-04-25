
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const { authState, logout } = useAuth();
  const { user, isAuthenticated } = authState;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="inline-block font-poppins font-bold text-2xl bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              TripMates
            </span>
          </Link>
          {isAuthenticated && (
            <nav className="hidden gap-6 md:flex">
              <Link
                to="/trips"
                className="flex items-center text-lg font-medium transition-colors hover:text-primary"
              >
                My Trips
              </Link>
            </nav>
          )}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="font-medium">
                  {user?.name}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/trips">My Trips</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/register")}>Register</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
