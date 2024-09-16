import { useAuth } from '@/contexts/AuthProvider';
import Link from 'next/link';
import noProfileImage from '@/public/icon/icon-no-profile.png';
import Image from 'next/image';
import LoggedInUserDropdown from './LoggedInUserDropdown';
import styles from './UserMenu.module.scss';
import Alarm from './Alarm';
import SearchForm from '../../listWiki/SearchForm';

export default function UserMenu() {
  const { user, isLoggedIn } = useAuth();

  return (
    <section className={styles.nav}>
      <SearchForm />
      <Link className={'link'} href={'/wikilist'}>
        모든 위키
      </Link>
      {user && isLoggedIn ? (
        <section className={styles.userProfileSection}>
          <LoggedInUserDropdown>
            <Image
              className={styles.profileImg}
              src={user?.profile?.image || noProfileImage}
              alt={'프로필 이미지'}
              height={32}
              width={32}
            />
          </LoggedInUserDropdown>
          <Alarm />
          {user.profile ? (
            <Link href={`/wiki/${user.profile.code}`}>
              <button className={'button'}>내 위키</button>
            </Link>
          ) : (
            <Link href={'/mypage'}>
              <button className={'button'}>내 위키 만들기</button>
            </Link>
          )}
        </section>
      ) : (
        <Link className={'link'} href={'/login'}>
          로그인
        </Link>
      )}
    </section>
  );
}
