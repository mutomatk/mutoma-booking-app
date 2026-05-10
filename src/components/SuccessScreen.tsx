import { Check, Home } from 'lucide-react';

interface SuccessScreenProps {
  onGoHome: () => void;
}

export default function SuccessScreen({ onGoHome }: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in-up">
      <div className="success-icon w-24 h-24 rounded-full bg-gradient-to-br from-[#FF385C] to-[#E0294A] flex items-center justify-center mb-8 shadow-xl shadow-[#FF385C]/30">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path
            className="check-path"
            d="M12 24L21 33L36 15"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-3">Booking Confirmed!</h2>
      <p className="text-gray-500 text-center max-w-sm mb-2">
        Your reservation has been successfully submitted.
      </p>
      <p className="text-gray-400 text-sm text-center max-w-sm mb-8">
        You will receive a confirmation on your phone shortly. Please keep your phone nearby for the payment prompt.
      </p>

      <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm font-medium mb-8">
        <Check className="w-4 h-4" />
        Confirmation sent to your phone
      </div>

      <button
        onClick={onGoHome}
        className="btn-coral flex items-center gap-2 !px-8"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </button>
    </div>
  );
}
