import { useAuth } from '@/contexts/AuthProvider';
import Link from 'next/link';
import noProfileImage from '@/public/icon/icon-no-profile.png';
import Image from 'next/image';
import LoggedInUserDropdown from './LoggedInUserDropdown';
import styles from './UserMenu.module.scss';
import Alarm from './Alarm';
import SearchForm from '../../WikiList/SearchForm';
import { useLatestSearch } from '@/hooks/WikiList/useLatestSearch';

export default function UserMenu() {
  const { user, isLoggedIn } = useAuth();
  const { handleAddKeyword } = useLatestSearch();

  return (
    <section className={styles.nav}>
      <SearchForm onAddKeyword={handleAddKeyword} />
      {/* TODO: 모든 위키 페이지 완성되면 해당 페이지로 연결 */}
      <Link className={'link'} href={'/home'}>
        모든 위키
      </Link>
      {isLoggedIn ? (
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
        </section>
      ) : (
        <Link className={'link'} href={'/login'}>
          로그인
        </Link>
      )}
      <button className={'button'}>내 위키 만들기</button>
    </section>
  );
}
