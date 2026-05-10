import { Bed, Users, Star, ChevronRight } from 'lucide-react';
import type { Apartment } from '../hooks/useApartments';

interface ApartmentCardProps {
  apartment: Apartment;
  onSelect: (apartment: Apartment) => void;
  index: number;
}

export default function ApartmentCard({ apartment, onSelect, index }: ApartmentCardProps) {
  return (
    <div
      className={`apartment-card glass-card overflow-hidden cursor-pointer animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
      onClick={() => onSelect(apartment)}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={apartment.image_url}
          alt={apartment.name}
          className="apartment-image w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {apartment.featured && (
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#FF385C] text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
            <Star className="w-3.5 h-3.5 fill-current" />
            Featured
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{apartment.name}</h3>
          <p className="text-white/80 text-sm">{apartment.location}</p>
        </div>
      </div>

      <div className="p-5">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{apartment.description}</p>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" />
            {apartment.bedrooms} {apartment.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            {apartment.max_guests} Guests
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              K{apartment.price_per_night.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm"> /night</span>
          </div>
          <div className="flex items-center gap-1 text-[#FF385C] text-sm font-semibold group">
            Book
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
