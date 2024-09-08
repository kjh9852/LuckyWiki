import Image from 'next/image';
import logo from '@/public/logo/logo_main.png';
import Link from 'next/link';
import styles from '@/components/@shared/Header/Header.module.scss';
import MobileUserMenu from './MobileUserMenu';
import dynamic from 'next/dynamic';

const UserMenu = dynamic(() => import('./UserMenu'), { ssr: false });

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href={'/home'}>
        <Image src={logo} alt={'메인 로고 이미지'} height={30} width={107} priority />
      </Link>

      <section className={styles.nav}>
        <UserMenu />
      </section>

      <section className={styles.navMobile}>
        <MobileUserMenu />
      </section>
    </header>
  );
}
