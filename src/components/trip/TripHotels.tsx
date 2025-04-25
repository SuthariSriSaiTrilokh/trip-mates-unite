
import { Button } from "@/components/ui/button";
import { Hotel as HotelIcon } from "lucide-react";
import { Hotel } from "@/types";

interface TripHotelsProps {
  hotels: Hotel[];
  onFindHotels: () => void;
}

export function TripHotels({ hotels, onFindHotels }: TripHotelsProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Nearby Hotels</h2>
        <Button onClick={onFindHotels}>Find Hotels</Button>
      </div>

      {hotels.length === 0 ? (
        <div className="text-center py-12">
          <HotelIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">No hotels found</h3>
          <p className="mt-1 text-gray-500">
            Click "Find Hotels" to search for accommodations near your trip location.
          </p>
          <Button className="mt-4" onClick={onFindHotels}>
            Find Hotels
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="border rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
            >
              <div className="h-48">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{hotel.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{hotel.address}</p>
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{hotel.rating}</span>
                  </div>
                  <div className="font-medium text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                    {hotel.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
