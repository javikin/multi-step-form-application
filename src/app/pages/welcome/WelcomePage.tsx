'use client';

import Image from 'next/image';
import { useFormContext } from '@/context/FormContext';

const WelcomePage = () => {
  const { nextStep } = useFormContext();

  const handleStart = () => {
    nextStep();
  };

  return (
    <main className="flex items-center justify-center h-screen bg-white ">
      <div className="w-full h-full overflow-auto max-w-[530px]">
        <div className="relative w-full lg:mt-24 lg:w-[280px] lg:h-[400px] mx-auto">
          <Image
            src="/images/welcome_hero.jpeg"
            alt="Bienvenido a Choiz"
            width={1920}
            height={1080}
            className="lg:rounded-xl"
          />
        </div>

        <div className="-translate-y-32 p-28 bg-white rounded-t-md">
          <h1 className="text-3xl font-26px text-primary mt-8">
            Bienvenido a Choiz
          </h1>
          <p className="text-gray-dark my-16 text-16px">
            Comienza tu tratamiento en tres pasos:
          </p>

          <ul className="mt-6">
            <StepItem
              text="Completa tu expediente médico"
              showLine
              time="2 min"
              active
            />
            <StepItem text="Explora las opciones de tratamiento" showLine />
            <StepItem text="Paga y recibe tu tratamiento" />
          </ul>

          <button
            onClick={handleStart}
            className="mt-28 w-full py-16 bg-black text-white rounded-full text-16px hover:bg-gray-light"
          >
            Continuar
          </button>
        </div>
      </div>
    </main>
  );
};

const StepItem = ({
  text,
  showLine = false,
  time = null,
  active = false,
}: {
  text: string;
  showLine?: boolean;
  time?: string | null;
  active?: boolean;
}) => (
  <li className="flex items-start space-x-8">
    <div className="flex flex-col items-center">
      <div
        className={`w-14 h-14 rounded-full border-2 border-gray ${active ? 'bg-gray-alt' : 'bg-white'}`}
      ></div>
      {showLine && <div className="h-24 border-l-2 border-gray"></div>}
    </div>

    <div className="flex">
      <span className="text-gray-light text-14px mx-8 mt-[-2px]">{text}</span>
    </div>

    {time && (
      <div className="flex items-center text-purple text-12px">
        <Image
          src="/icons/icon_clock.svg"
          alt="Clock"
          width={10}
          height={10}
          className="mr-2"
        />
        {time}
      </div>
    )}
  </li>
);

export default WelcomePage;
