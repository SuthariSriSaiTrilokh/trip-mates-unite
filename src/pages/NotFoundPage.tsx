
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-gray-700">Page not found</h2>
      <p className="mt-2 text-lg text-gray-600">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="mt-8">
        <Button onClick={() => navigate("/")}>Go back home</Button>
      </div>
    </div>
  );
}
