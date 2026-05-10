import { useState } from 'react';
import { User, Phone, AlertCircle } from 'lucide-react';

interface StepDetailsProps {
  data: { fullName: string; phoneNumber: string };
  onChange: (data: { fullName: string; phoneNumber: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepDetails({ data, onChange, onNext, onBack }: StepDetailsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!data.fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (data.fullName.trim().length < 2) newErrors.fullName = 'Name must be at least 2 characters';
    if (!data.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (data.phoneNumber.replace(/[\s\-\+]/g, '').length < 7) {
      newErrors.phoneNumber = 'Enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (validate()) onNext();
  }

  return (
    <div className="animate-fade-in-up">
      <div className="space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 text-[#FF385C]" />
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={data.fullName}
            onChange={(e) => onChange({ ...data, fullName: e.target.value })}
            className={`w-full px-4 py-3.5 rounded-xl border-2 text-gray-900 font-medium placeholder:text-gray-300 transition-all focus:outline-none focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/10 ${
              errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          />
          {errors.fullName && (
            <p className="flex items-center gap-1 mt-1.5 text-red-500 text-xs">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Phone className="w-4 h-4 text-[#FF385C]" />
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="e.g. 097 123 4567"
            value={data.phoneNumber}
            onChange={(e) => onChange({ ...data, phoneNumber: e.target.value })}
            className={`w-full px-4 py-3.5 rounded-xl border-2 text-gray-900 font-medium placeholder:text-gray-300 transition-all focus:outline-none focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/10 ${
              errors.phoneNumber ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          />
          {errors.phoneNumber && (
            <p className="flex items-center gap-1 mt-1.5 text-red-500 text-xs">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.phoneNumber}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-400">
            We'll use this number for booking confirmations and Mobile Money payments.
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
        >
          Back
        </button>
        <button onClick={handleNext} className="flex-[2] btn-coral !w-full !py-4">
          Continue to Payment
        </button>
      </div>
    </div>
  );
}
