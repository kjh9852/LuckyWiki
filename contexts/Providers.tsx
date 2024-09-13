import { ReactNode } from 'react';
import AuthProvider from './AuthProvider';
import SnackBarProvider from './SnackbarProvider';
import SearchProvider from './SearchProvider';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SearchProvider>
      <SnackBarProvider>
        <AuthProvider>{children}</AuthProvider>
      </SnackBarProvider>
    </SearchProvider>
  );
}
