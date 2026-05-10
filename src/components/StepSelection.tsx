import { useState } from 'react';
import { Calendar, Users, AlertCircle } from 'lucide-react';
import type { Apartment } from '../hooks/useApartments';

interface StepSelectionProps {
  apartment: Apartment;
  data: { checkIn: string; checkOut: string; guests: number };
  onChange: (data: { checkIn: string; checkOut: string; guests: number }) => void;
  onNext: () => void;
}

export default function StepSelection({ apartment, data, onChange, onNext }: StepSelectionProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const today = new Date().toISOString().split('T')[0];

  const nights =
    data.checkIn && data.checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const totalPrice = nights * apartment.price_per_night;

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!data.checkIn) newErrors.checkIn = 'Please select a check-in date';
    if (!data.checkOut) newErrors.checkOut = 'Please select a check-out date';
    if (data.checkIn && data.checkOut && new Date(data.checkOut) <= new Date(data.checkIn)) {
      newErrors.checkOut = 'Check-out must be after check-in';
    }
    if (data.guests < 1) newErrors.guests = 'At least 1 guest is required';
    if (data.guests > apartment.max_guests) {
      newErrors.guests = `Maximum ${apartment.max_guests} guests for this apartment`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (validate()) onNext();
  }

  return (
    <div className="animate-fade-in-up">
      <div className="mb-6 p-4 rounded-2xl bg-gray-50 border border-gray-100">
        <div className="flex items-center gap-4">
          <img
            src={apartment.image_url}
            alt={apartment.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 truncate">{apartment.name}</h3>
            <p className="text-sm text-gray-500">{apartment.location}</p>
            <p className="text-lg font-bold text-[#FF385C] mt-1">
              K{apartment.price_per_night.toLocaleString()}
              <span className="text-sm font-normal text-gray-400">/night</span>
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 text-[#FF385C]" />
              Check-in Date
            </label>
            <input
              type="date"
              min={today}
              value={data.checkIn}
              onChange={(e) => onChange({ ...data, checkIn: e.target.value })}
              className={`w-full px-4 py-3.5 rounded-xl border-2 text-gray-900 font-medium transition-all focus:outline-none focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/10 ${
                errors.checkIn ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            />
            {errors.checkIn && (
              <p className="flex items-center gap-1 mt-1.5 text-red-500 text-xs">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.checkIn}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 text-[#FF385C]" />
              Check-out Date
            </label>
            <input
              type="date"
              min={data.checkIn || today}
              value={data.checkOut}
              onChange={(e) => onChange({ ...data, checkOut: e.target.value })}
              className={`w-full px-4 py-3.5 rounded-xl border-2 text-gray-900 font-medium transition-all focus:outline-none focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/10 ${
                errors.checkOut ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            />
            {errors.checkOut && (
              <p className="flex items-center gap-1 mt-1.5 text-red-500 text-xs">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.checkOut}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Users className="w-4 h-4 text-[#FF385C]" />
            Number of Guests
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onChange({ ...data, guests: Math.max(1, data.guests - 1) })}
              disabled={data.guests <= 1}
              className="counter-btn"
            >
              -
            </button>
            <span className="text-2xl font-bold text-gray-900 w-12 text-center">{data.guests}</span>
            <button
              onClick={() =>
                onChange({ ...data, guests: Math.min(apartment.max_guests, data.guests + 1) })
              }
              disabled={data.guests >= apartment.max_guests}
              className="counter-btn"
            >
              +
            </button>
            <span className="text-sm text-gray-400 ml-2">
              (max {apartment.max_guests})
            </span>
          </div>
          {errors.guests && (
            <p className="flex items-center gap-1 mt-1.5 text-red-500 text-xs">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.guests}
            </p>
          )}
        </div>

        {nights > 0 && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FF385C]/5 to-[#FF385C]/10 border border-[#FF385C]/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">
                K{apartment.price_per_night.toLocaleString()} x {nights} night{nights > 1 ? 's' : ''}
              </span>
              <span className="font-semibold text-gray-900">
                K{totalPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-[#FF385C]/10">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-[#FF385C]">
                K{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>

      <button onClick={handleNext} className="btn-coral w-full mt-6 !py-4">
        Continue to Details
      </button>
    </div>
  );
}
