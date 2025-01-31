'use client';

import Image from 'next/image';
import { useFormContext } from '@/context/FormContext';

const WelcomePage = () => {
  const { nextStep } = useFormContext();

  const handleStart = () => {
    nextStep();
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-full max-w-[430px] h-full shadow-md overflow-hidden">
        <div className="relative w-full">
          <Image
            src="/images/welcome_hero.jpeg"
            alt="Bienvenido a Choiz"
            width={1920}
            height={1080}
          />
        </div>

        <div className="-translate-y-32 p-28 bg-white rounded-t-md">
          <h1 className="text-3xl font-26px text-primary mt-8">
            Bienvenido a Choiz
          </h1>
          <p className="text-gray-dark my-16 text-16px">
            Comienza tu tratamiento en tres pasos:
          </p>

          <ul className="mt-6 space-y-5">
            <li className="flex items-center space-x-4">
              <div className="flex flex-col items-center mr-2">
                <Image
                  src="/images/step-circle.png"
                  alt="Step 1"
                  width={14}
                  height={14}
                />
              </div>
              <span className="text-gray-light text-14px">
                Completa tu expediente médico
              </span>
              <div className="ml-auto text-purple text-12px flex items-center">
                <Image
                  src="/icons/icon_clock.svg"
                  alt="Clock"
                  width={10}
                  height={10}
                  className="mr-1 ml-2"
                />
                2 min
              </div>
            </li>

            <li className="flex items-center space-x-4">
              <div className="flex flex-col items-center mr-2">
                <Image
                  src="/images/step_circle.png"
                  alt="Step 2"
                  width={14}
                  height={14}
                />
              </div>
              <span className="text-gray-light text-14px">
                Explora las opciones de tratamiento
              </span>
            </li>

            <li className="flex items-center space-x-4">
              <div className="flex flex-col items-center mr-2">
                <Image
                  src="/images/step-circle.png"
                  alt="Step 3"
                  width={14}
                  height={1}
                />
              </div>
              <span className="text-gray-light text-14px">
                Paga y recibe tu tratamiento
              </span>
            </li>
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

export default WelcomePage;
