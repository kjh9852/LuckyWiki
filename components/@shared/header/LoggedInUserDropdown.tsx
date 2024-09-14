import { useAuth } from '@/contexts/AuthProvider';
import { Dropdown, MenuProps } from 'antd';
import Link from 'next/link';
import { ReactNode } from 'react';

interface LoggedInUserDropdownProps {
  children: ReactNode;
  mobileDropdown?: boolean;
}

export default function LoggedInUserDropdown({ children, mobileDropdown = false }: LoggedInUserDropdownProps) {
  const { user, logOut } = useAuth();

  const loginItems: MenuProps['items'] = [
    {
      key: '3',
      label: <Link href={'/mypage'}>계정 설정</Link>,
    },
    {
      key: '4',
      label: <div onClick={() => logOut()}>로그아웃</div>,
    },
  ];

  if (mobileDropdown) {
    const mobileDropdown = [
      {
        key: '1',
        label: <Link href={`/wiki/${user?.profile?.code}`}>내 위키</Link>,
      },
      {
        key: '2',
        label: <Link href={`/wikilist`}>모든 위키</Link>,
      },
    ];

    // 모바일 사이즈에서는 헤더에 내 위키, 모든 위키 링크가 없기 때문에 추가
    loginItems.splice(0, 0, ...mobileDropdown);
  }

  return (
    <>
      <Dropdown menu={{ items: loginItems }} trigger={['click']} placement={mobileDropdown ? 'bottomLeft' : 'bottom'}>
        {children}
      </Dropdown>
    </>
  );
}
