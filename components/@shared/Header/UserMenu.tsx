import { useAuth } from '@/contexts/AuthProvider';
import { Dropdown, MenuProps } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import noProfileImage from '@/public/icon/icon-no-profile.png';

interface UserMenuProps {
  styles: Record<string, string>;
}

export default function UserMenu({ styles }: UserMenuProps) {
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

  return (
    <>
      <input className={'input input-search'} />
      <Link className={'link'} href={'/'}>
        모든 위키
      </Link>
      {isLoggedIn ? (
        <Dropdown menu={{ items: loginItems }} trigger={['click']} placement="bottom">
          <Image
            className={styles.profileImg}
            src={user?.profile?.image || noProfileImage}
            alt={'프로필 이미지'}
            height={32}
            width={32}
          />
        </Dropdown>
      ) : (
        <Link className={'link'} href={'/login'}>
          로그인
        </Link>
      )}
      <button className={'button'}>내 위키 만들기</button>
    </>
  );
}
