import { useState } from 'react';
import { Calendar, Users, User, Phone, CreditCard, Check, Loader2 } from 'lucide-react';
import type { Apartment } from '../hooks/useApartments';
import { supabase } from '../lib/supabase';

type PaymentMethod = 'airtel_momo' | 'mtn_momo' | 'zamtel_momo' | 'bank_transfer';

interface StepVerificationProps {
  apartment: Apartment;
  selection: { checkIn: string; checkOut: string; guests: number };
  details: { fullName: string; phoneNumber: string };
  payment: { paymentMethod: PaymentMethod | '' };
  onBack: () => void;
  onSuccess: () => void;
}

const paymentLabels: Record<string, string> = {
  airtel_momo: 'Airtel Money',
  mtn_momo: 'MTN Mobile Money',
  zamtel_momo: 'Zamtel Kwacha',
  bank_transfer: 'Bank Transfer',
};

export default function StepVerification({
  apartment,
  selection,
  details,
  payment,
  onBack,
  onSuccess,
}: StepVerificationProps) {
  const [submitting, setSubmitting] = useState(false);

  const nights = Math.ceil(
    (new Date(selection.checkOut).getTime() - new Date(selection.checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const totalPrice = nights * apartment.price_per_night;

  async function handleConfirm() {
    setSubmitting(true);

    const { error } = await supabase.from('bookings').insert({
      apartment_id: apartment.id,
      full_name: details.fullName,
      phone_number: details.phoneNumber,
      check_in: selection.checkIn,
      check_out: selection.checkOut,
      guests: selection.guests,
      payment_method: payment.paymentMethod,
      total_price: totalPrice,
      status: 'pending',
    });

    setSubmitting(false);

    if (!error) {
      onSuccess();
    }
  }

  const summaryItems = [
    {
      icon: Calendar,
      label: 'Dates',
      value: `${new Date(selection.checkIn).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} — ${new Date(selection.checkOut).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} (${nights} night${nights > 1 ? 's' : ''})`,
    },
    {
      icon: Users,
      label: 'Guests',
      value: `${selection.guests} guest${selection.guests > 1 ? 's' : ''}`,
    },
    {
      icon: User,
      label: 'Name',
      value: details.fullName,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: `+260 ${details.phoneNumber}`,
    },
    {
      icon: CreditCard,
      label: 'Payment',
      value: paymentLabels[payment.paymentMethod] || payment.paymentMethod,
    },
  ];

  return (
    <div className="animate-fade-in-up">
      <div className="space-y-3 mb-6">
        {summaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#FF385C]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FF385C]/5 to-[#FF385C]/10 border border-[#FF385C]/10 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 text-sm">
            {apartment.name} x {nights} night{nights > 1 ? 's' : ''}
          </span>
          <span className="font-semibold text-gray-900 text-sm">
            K{totalPrice.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-[#FF385C]/10">
          <span className="font-bold text-gray-900">Total Amount</span>
          <span className="text-2xl font-bold text-[#FF385C]">
            K{totalPrice.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={submitting}
          className="flex-1 py-4 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleConfirm}
          disabled={submitting}
          className="flex-[2] btn-coral !w-full !py-4 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              Confirm & Pay
            </>
          )}
        </button>
      </div>
    </div>
  );
}
