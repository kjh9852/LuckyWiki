import { ReactNode } from 'react';
import AuthProvider from './AuthProvider';
import SnackBarProvider from './SnackbarProvider';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SnackBarProvider>
      <AuthProvider>{children}</AuthProvider>
    </SnackBarProvider>
  );
}
