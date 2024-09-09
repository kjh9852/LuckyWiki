import { ReactNode } from 'react';
import AuthProvider from './AuthProvider';
import SnackBarProvider from './SnackbarProvider';
import ModalProvider from './ModalProvider';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ModalProvider>
      <SnackBarProvider>
        <AuthProvider>{children}</AuthProvider>
      </SnackBarProvider>
    </ModalProvider>
  );
}
