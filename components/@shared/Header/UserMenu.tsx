import { useAuth } from '@/contexts/AuthProvider';
import Link from 'next/link';
import noProfileImage from '@/public/icon/icon-no-profile.png';
import Image from 'next/image';
import LoggedInUserDropdown from './LoggedInUserDropdown';
import styles from '@/components/@shared/Header/Header.module.scss';

export default function UserMenu() {
  const { user, isLoggedIn } = useAuth();

  return (
    <>
      <input className={'input input-search'} />
      {/* TODO: 모든 위키 페이지 완성되면 해당 페이지로 연결 */}
      <Link className={'link'} href={'/home'}>
        모든 위키
      </Link>
      {isLoggedIn ? (
        <LoggedInUserDropdown>
          <Image
            className={styles.profileImg}
            src={user?.profile?.image || noProfileImage}
            alt={'프로필 이미지'}
            height={32}
            width={32}
          />
        </LoggedInUserDropdown>
      ) : (
        <Link className={'link'} href={'/login'}>
          로그인
        </Link>
      )}
      <button className={'button'}>내 위키 만들기</button>
    </>
  );
}
