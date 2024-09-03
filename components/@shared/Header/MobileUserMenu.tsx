import { useAuth } from '@/contexts/AuthProvider';
import { Dropdown, MenuProps } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import menu from '@/public/icon/icon-menu.png';
import search from '@/public/icon/icon-search.png';

interface MobileUserMenuProps {
  styles: Record<string, string>;
}

export default function MobileUserMenu({ styles }: MobileUserMenuProps) {
  const { user, isLoggedIn, logOut } = useAuth();

  const loginItems: MenuProps['items'] = [
    {
      key: '1',
      label: <Link href={'/'}>계정 설정</Link>,
    },
    {
      key: '2',
      label: <Link href={`/wiki/${user?.profile?.code}`}>내 위키</Link>,
    },
    {
      key: '3',
      label: <div onClick={() => logOut()}>로그아웃</div>,
    },
  ];

  const notLogInItems: MenuProps['items'] = [
    {
      key: '1',
      label: <Link href={`/login`}>모든 위키</Link>,
    },
    {
      key: '2',
      label: <Link href={'/signup'}>로그인</Link>,
    },
    {
      key: '3',
      label: <Link href={`/login`}>회원가입</Link>,
    },
  ];
  return (
    <>
      <Link className={'link'} href={'/wikilist'}>
        <Image src={search} alt={'검색 아이콘'} />
      </Link>
      <button>
        {isLoggedIn ? (
          <Dropdown menu={{ items: loginItems }} trigger={['click']} placement="bottomRight">
            <Image src={menu} alt={'메뉴 아이콘'} />
          </Dropdown>
        ) : (
          <Dropdown menu={{ items: notLogInItems }} trigger={['click']} placement="bottomRight">
            <Image src={menu} alt={'메뉴 아이콘'} />
          </Dropdown>
        )}
      </button>
    </>
  );
}
