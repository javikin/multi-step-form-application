import React from 'react';
import Image from 'next/image';

interface ProgressHeaderProps {
  onBack: () => void;
  totalSteps: number;
  currentStep: number;
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  currentStep,
  totalSteps,
  onBack,
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="sticky top-0 z-10">
      <header className="relative flex items-center justify-between bg-white mx-16 pt-16  pb-20">
        <button onClick={onBack}>
          <Image
            src="/icons/arrow_left.svg"
            alt="Back"
            width={18}
            height={18}
          />
        </button>

        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Choiz Logo"
            width={60}
            height={20}
          />
        </div>

        <button onClick={() => window.open('https://wa.me/+525592256335')}>
          <Image
            src="/icons/icon_wa.svg"
            alt="WhatsApp"
            width={24}
            height={24}
          />
        </button>

        <div className="absolute bottom-0 w-full h-2 bg-gray">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </header>
    </div>
  );
};

export default ProgressHeader;
