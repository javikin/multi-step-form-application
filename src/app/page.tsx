"use client";

import { useRouter } from "next/navigation";
import { useFormContext } from "@/app/context/FormContext";

const Welcome = () => {
  const router = useRouter();
  const { dispatch } = useFormContext();

  const handleStart = () => {
    dispatch({ type: "NEXT_STEP" });
    router.push("/form");
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen text-center bg-white">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Bienvenido a Choiz</h1>
      <p className="text-lg text-gray-600 mb-6">
        Comienza tu tratamiento en tres pasos:
      </p>
      <ul className="list-disc list-inside text-left text-gray-600 mb-6">
        <li>Completa tu expediente médico (2 min)</li>
        <li>Explora las opciones de tratamiento</li>
        <li>Paga y recibe tu tratamiento</li>
      </ul>
      <button
        onClick={handleStart}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Continuar
      </button>
    </main>
  );
};

export default Welcome;
