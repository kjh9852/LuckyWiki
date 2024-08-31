import Image from 'next/image';
import logo from '@/public/logo/logo_main.png';
import search from '@/public/icon/icon-search.png';
import menu from '@/public/icon/icon-menu.png';
import Link from 'next/link';
import style from '@/components/@shared/Header.module.scss';

export default function Header() {
  return (
    <header className={`${style.header}`}>
      <Link href={'/'}>
        <Image src={logo} alt={'메인 로고 이미지'} height={30} width={107} />
      </Link>
      <section className={style.nav}>
        <input className={'input input-search'} />
        <Link className={'link'} href={'/'}>
          모든 위키
        </Link>
        <Link className={'link'} href={'/'}>
          로그인
        </Link>
        <button className={'button'}>내 위키 만들기</button>
      </section>
      <section className={style.navMobile}>
        <Link className={'link'} href={'/'}>
          <Image src={search} alt={'검색 아이콘'} />
        </Link>
        <button>
          <Image src={menu} alt={'메뉴 아이콘'} />
        </button>
      </section>
    </header>
  );
}
