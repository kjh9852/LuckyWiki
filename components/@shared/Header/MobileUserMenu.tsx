import { useAuth } from '@/contexts/AuthProvider';
import { Dropdown, MenuProps } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import menu from '@/public/icon/icon-menu.png';
import search from '@/public/icon/icon-search.png';
import LoggedInUserDropdown from './LoggedInUserDropdown';
import styles from './MobileUserMenu.module.scss';

export default function MobileUserMenu() {
  const { isLoggedIn } = useAuth();

  const notLogInItems: MenuProps['items'] = [
    {
      key: '1',
      label: <Link href={`/`}>모든 위키</Link>,
    },
    {
      key: '2',
      label: <Link href={'/login'}>로그인</Link>,
    },
    {
      key: '3',
      label: <Link href={`/signup`}>회원가입</Link>,
    },
  ];

  return (
    <section className={styles.navMobile}>
      <Link className={'link'} href={'/wikilist'}>
        <Image src={search} alt={'검색 아이콘'} />
      </Link>
      <button>
        {isLoggedIn ? (
          <LoggedInUserDropdown mobileDropdown>
            <Image src={menu} alt={'메뉴 아이콘'} />
          </LoggedInUserDropdown>
        ) : (
          <Dropdown menu={{ items: notLogInItems }} trigger={['click']} placement="bottomRight">
            <Image src={menu} alt={'메뉴 아이콘'} />
          </Dropdown>
        )}
      </button>
    </section>
  );
}
