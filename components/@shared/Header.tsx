import Image from 'next/image';
import logo from '@/public/logo/logo_main.png';
import noProfileImage from '@/public/icon/icon-no-profile.png';
import search from '@/public/icon/icon-search.png';
import menu from '@/public/icon/icon-menu.png';
import Link from 'next/link';
import styles from '@/components/@shared/Header.module.scss';
import { useAuth } from '@/contexts/AuthProvider';

export default function Header() {
  const { user, isLoggedIn } = useAuth();

  console.log('isLoggedIn:', isLoggedIn);

  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <Image src={logo} alt={'메인 로고 이미지'} height={30} width={107} />
      </Link>
      <section className={styles.nav}>
        <input className={'input input-search'} />
        <Link className={'link'} href={'/'}>
          모든 위키
        </Link>
        {isLoggedIn ? (
          <Image
            className={styles.profileImg}
            src={user?.profile?.image || noProfileImage}
            alt={'프로필 이미지'}
            height={32}
            width={32}
          />
        ) : (
          <Link className={'link'} href={'/login'}>
            로그인
          </Link>
        )}

        <button className={'button'}>내 위키 만들기</button>
      </section>

      <section className={styles.navMobile}>
        <Link className={'link'} href={'/wikilist'}>
          <Image src={search} alt={'검색 아이콘'} />
        </Link>
        <button>
          <Image src={menu} alt={'메뉴 아이콘'} />
        </button>
      </section>
    </header>
  );
}
