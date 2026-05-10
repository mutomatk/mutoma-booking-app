import { useState } from 'react';
import { Smartphone, Building, AlertCircle, Check, ChevronRight } from 'lucide-react';

type PaymentMethod = 'airtel_momo' | 'mtn_momo' | 'zamtel_momo' | 'bank_transfer';
type PaymentCategory = 'mobile_money' | 'bank_transfer' | '';

interface StepPaymentProps {
  data: { paymentMethod: PaymentMethod | '' };
  onChange: (data: { paymentMethod: PaymentMethod | '' }) => void;
  onNext: () => void;
  onBack: () => void;
}

const mobileMoneyNetworks: { id: PaymentMethod; label: string; prefixes: string; color: string }[] = [
  {
    id: 'airtel_momo',
    label: 'Airtel Money',
    prefixes: '097 / 07 / 057',
    color: '#FF0000',
  },
  {
    id: 'mtn_momo',
    label: 'MTN Mobile Money',
    prefixes: '096 / 076',
    color: '#FFC300',
  },
  {
    id: 'zamtel_momo',
    label: 'Zamtel Kwacha',
    prefixes: '095 / 075',
    color: '#00A651',
  },
];

export default function StepPayment({ data, onChange, onNext, onBack }: StepPaymentProps) {
  const [category, setCategory] = useState<PaymentCategory>(() => {
    if (data.paymentMethod === 'bank_transfer') return 'bank_transfer';
    if (data.paymentMethod) return 'mobile_money';
    return '';
  });
  const [error, setError] = useState('');

  function handleCategory(cat: PaymentCategory) {
    setCategory(cat);
    setError('');
    if (cat === 'bank_transfer') {
      onChange({ paymentMethod: 'bank_transfer' });
    } else {
      onChange({ paymentMethod: '' });
    }
  }

  function handleNext() {
    if (!category) {
      setError('Please select a payment option');
      return;
    }
    if (category === 'mobile_money' && !data.paymentMethod) {
      setError('Please select a mobile money network');
      return;
    }
    setError('');
    onNext();
  }

  return (
    <div className="animate-fade-in-up">
      <div className="space-y-3 mb-4">
        <p className="text-sm font-semibold text-gray-700">Choose payment method</p>

        <div
          onClick={() => handleCategory('mobile_money')}
          className={`payment-card flex items-center gap-4 ${category === 'mobile_money' ? 'selected' : ''}`}
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF385C] to-[#E0294A] flex items-center justify-center shrink-0">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm">Mobile Money</p>
            <p className="text-xs text-gray-400">Airtel, MTN, or Zamtel</p>
          </div>
          {category === 'mobile_money' ? (
            <div className="w-6 h-6 rounded-full bg-[#FF385C] flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-white" />
            </div>
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-300 shrink-0" />
          )}
        </div>

        <div
          onClick={() => handleCategory('bank_transfer')}
          className={`payment-card flex items-center gap-4 ${category === 'bank_transfer' ? 'selected' : ''}`}
        >
          <div className="w-12 h-12 rounded-xl bg-[#1A1A6C] flex items-center justify-center shrink-0">
            <Building className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm">Bank Transfer</p>
            <p className="text-xs text-gray-400">Direct deposit to our account</p>
          </div>
          {category === 'bank_transfer' ? (
            <div className="w-6 h-6 rounded-full bg-[#FF385C] flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-white" />
            </div>
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-300 shrink-0" />
          )}
        </div>
      </div>

      {category === 'mobile_money' && (
        <div className="animate-fade-in-up">
          <p className="text-sm font-semibold text-gray-700 mb-3">Select network</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {mobileMoneyNetworks.map((network) => {
              const isSelected = data.paymentMethod === network.id;
              return (
                <div
                  key={network.id}
                  onClick={() => {
                    onChange({ paymentMethod: network.id });
                    setError('');
                  }}
                  className={`payment-card flex flex-col items-center text-center p-4 ${isSelected ? 'selected' : ''}`}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-3 shrink-0"
                    style={{ background: network.color }}
                  >
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{network.label}</p>
                  <p className="text-xs text-gray-400">{network.prefixes}</p>
                  {isSelected && (
                    <div className="mt-2 w-5 h-5 rounded-full bg-[#FF385C] flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {category === 'bank_transfer' && (
        <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-blue-700 animate-fade-in-up">
          Bank transfer details will be provided after booking confirmation. Please complete payment within 24 hours.
        </div>
      )}

      {category === 'mobile_money' && data.paymentMethod && data.paymentMethod !== 'bank_transfer' && (
        <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-600 animate-fade-in-up">
          A payment prompt will be sent to your phone number. Please have your phone ready to confirm the transaction.
        </div>
      )}

      {error && (
        <p className="flex items-center gap-1 mt-3 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
        >
          Back
        </button>
        <button onClick={handleNext} className="flex-[2] btn-coral !w-full !py-4">
          Review Booking
        </button>
      </div>
    </div>
  );
}
