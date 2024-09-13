import { useState } from 'react';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpen = () => {
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    onOpen,
    onClose,
  };
};
