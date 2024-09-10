import { ReactNode, useEffect, useState } from 'react';
import BackDrop from './BackDrop';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Portal({ children, isOpen, onClose }: PortalProps) {
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById('portal'));
  }, []);

  return (
    <>
      {isOpen && (
        <>
          <BackDrop onClose={onClose} />
          {portalElement && createPortal(<>{children}</>, portalElement)}
        </>
      )}
    </>
  );
}
