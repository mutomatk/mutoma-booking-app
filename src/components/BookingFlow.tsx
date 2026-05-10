import { useState } from 'react';
import { X } from 'lucide-react';
import type { Apartment } from '../hooks/useApartments';
import StepIndicator from './StepIndicator';
import StepSelection from './StepSelection';
import StepDetails from './StepDetails';
import StepPayment from './StepPayment';
import StepVerification from './StepVerification';
import SuccessScreen from './SuccessScreen';

type PaymentMethod = 'airtel_momo' | 'mtn_momo' | 'zamtel_momo' | 'bank_transfer';

interface BookingFlowProps {
  apartment: Apartment;
  onClose: () => void;
  onGoHome: () => void;
}

const STEPS = ['Selection', 'Details', 'Payment', 'Verify'];

export default function BookingFlow({ apartment, onClose, onGoHome }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const [selection, setSelection] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const [details, setDetails] = useState({
    fullName: '',
    phoneNumber: '',
  });

  const [payment, setPayment] = useState<{
    paymentMethod: PaymentMethod | '';
  }>({
    paymentMethod: '',
  });

  function handleSuccess() {
    setShowSuccess(true);
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
          <SuccessScreen onGoHome={onGoHome} />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="max-w-lg mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Book Your Stay</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <StepIndicator currentStep={currentStep} steps={STEPS} />

        {currentStep === 1 && (
          <StepSelection
            apartment={apartment}
            data={selection}
            onChange={setSelection}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <StepDetails
            data={details}
            onChange={setDetails}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <StepPayment
            data={payment}
            onChange={setPayment}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <StepVerification
            apartment={apartment}
            selection={selection}
            details={details}
            payment={payment}
            onBack={() => setCurrentStep(3)}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
}
