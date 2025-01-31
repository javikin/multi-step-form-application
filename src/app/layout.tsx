import './globals.css';
import { FormProvider } from '../context/FormContext';
import { Suspense } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Cargando...</div>}>
          <FormProvider>{children}</FormProvider>
        </Suspense>
      </body>
    </html>
  );
}
