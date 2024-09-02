import Image from 'next/image';
import logo from '@/public/logo/logo_main.png';
import search from '@/public/icon/icon-search.png';
import menu from '@/public/icon/icon-menu.png';
import Link from 'next/link';
import instance from '@/lib/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserType from '@/types/types';
import styles from '@/components/@shared/Header.module.scss';

export default function Header() {
  const router = useRouter();
  const { code } = router.query;
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await instance.get('/users/me');
        setUser(userRes.data);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };
    fetchUserData();
  }, []);

  const showAlarmIcon = user && user.profile.code === code;

  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <Image src={logo} alt={'메인 로고 이미지'} height={30} width={107} />
      </Link>
      <section className={styles.nav}>
        <input className={'input input-search'} />
        {showAlarmIcon ? (
          <Image src="/icon/icon-alarm.png" width={32} height={32} alt="알람 아이콘" />
        ) : (
          <Link className={'link'} href={'/wikilist'}>
            모든 위키
          </Link>
        )}
        <Link className={'link'} href={'/login'}>
          로그인
        </Link>
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
