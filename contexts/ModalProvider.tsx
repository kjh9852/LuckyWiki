import BackDrop from '@/components/@shared/modal/BackDrop';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalContextValues {
  onOpen: (content: ReactNode) => void;
  onClose: () => void;
  isModalOpen: boolean;
}

const ModalContext = createContext<ModalContextValues | null>(null);

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  const onOpen = (content: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const modalContextValues = {
    onOpen,
    onClose,
    isModalOpen,
  };

  useEffect(() => {
    if (document) {
      setPortalElement(document.getElementById('portal'));
    }
  }, []);

  return (
    <ModalContext.Provider value={modalContextValues}>
      {isModalOpen &&
        portalElement &&
        createPortal(
          <>
            <BackDrop onClose={onClose} />
            {modalContent}
          </>,
          portalElement,
        )}
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('반드시 ModalProvider 내부에서 사용해야 합니다.');
  }

  return context;
};
