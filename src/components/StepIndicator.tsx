import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center w-full max-w-md mx-auto mb-8">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`step-dot flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-500 ${
                  isCompleted
                    ? 'bg-[#FF385C] text-white shadow-lg shadow-[#FF385C]/20'
                    : isActive
                    ? 'bg-[#FF385C] text-white shadow-lg shadow-[#FF385C]/30 scale-110'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : stepNum}
              </div>
              <span
                className={`mt-2 text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'text-[#FF385C]' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`step-line mx-2 mt-[-20px] ${
                  stepNum < currentStep ? 'active' : 'inactive'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
