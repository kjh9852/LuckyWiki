import { useState } from 'react';
import { act, createContext, ReactNode, useContext } from 'react';
import { message, Space } from 'antd';
import iconSuccess from '@/public/icon/icon-success.png';
import iconError from '@/public/icon/icon-error.png';
import Image from 'next/image';

type SnackBarType = 'success' | 'error';

interface SnackBarParams {
  type: SnackBarType;
  content: string;
}

interface SnackBarContextValue {
  openSnackBar: ({ type, content }: SnackBarParams) => void;
}

const SnackbarContext = createContext<SnackBarContextValue | undefined>(undefined);

export default function SnackBarProvider({ children }: { children: ReactNode }) {
  const [messageApi, contextHolder] = message.useMessage({ top: 120, maxCount: 3 });

  const iconSrc: Record<SnackBarType, ReactNode> = {
    success: <Image src={iconSuccess} alt={'성공 메시지 아이콘'} height={20} width={20} />,
    error: <Image src={iconError} alt={'실패 메시지 아이콘'} height={20} width={20} />,
  };

  const openSnackBar = ({ type, content }: SnackBarParams) => {
    return messageApi.open({
      type,
      content,
      className: `custom-snackbar custom-snackbar-${type}`,
      icon: iconSrc[type],
    });
  };

  return (
    <SnackbarContext.Provider value={{ openSnackBar }}>
      {contextHolder}
      {children}
    </SnackbarContext.Provider>
  );
}

export const useSnackBar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error('반드시 SnackBarProvider 안에서 사용해야 합니다.');
  }

  return context;
};
