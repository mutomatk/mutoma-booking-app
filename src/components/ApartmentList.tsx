import { useApartments, type Apartment } from '../hooks/useApartments';
import ApartmentCard from './ApartmentCard';
import { Building2, Loader2 } from 'lucide-react';

interface ApartmentListProps {
  onSelectApartment: (apartment: Apartment) => void;
}

export default function ApartmentList({ onSelectApartment }: ApartmentListProps) {
  const { apartments, loading } = useApartments();

  if (loading) {
    return (
      <section id="apartments" className="py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#FF385C] animate-spin mb-4" />
          <p className="text-gray-500">Loading apartments...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="apartments" className="py-20 px-4 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF385C]/10 text-[#FF385C] text-sm font-semibold mb-4">
            <Building2 className="w-4 h-4" />
            Our Collection
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Premium Apartments
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Each residence is carefully curated for an exceptional stay in Ndola, Zambia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.map((apartment, index) => (
            <ApartmentCard
              key={apartment.id}
              apartment={apartment}
              onSelect={onSelectApartment}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
