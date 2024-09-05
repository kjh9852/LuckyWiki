import Image from 'next/image';
import styles from './Landing.module.scss';
import profileImg from '@/public/landing/landing-profile.png';
import keyboardImg from '@/public/landing/landing-keyboard.png';
import chatDarkImg from '@/public/landing/landing-chat-dark.png';
import share1Img from '@/public/landing/landing-share1.png';
import share2Img from '@/public/landing/landing-share2.png';
import share3Img from '@/public/landing/landing-share3.png';
import share4Img from '@/public/landing/landing-share4.png';
import scriptGreenImg from '@/public/landing/landing-script-green.png';
import bellImg from '@/public/landing/landing-bell.png';
import chatLightImg from '@/public/landing/landing-chat-light.png';
import classNames from 'classnames';
import Link from 'next/link';

export default function Landing() {
  return (
    <main className={styles.LandingContainer}>
      <div className={styles.background}>
        <section className={classNames(styles.introSection, styles.common)}>
          <div className={styles.introParagraph}>
            <p className={styles.introLightText}>남들이 만드는</p>
            <p className={styles.introBoldText}>
              나만의 <span>위키</span>
            </p>
          </div>
          <Link href={'/'} className={classNames(styles.landingLink, styles.dark)}>
            위키 만들기
          </Link>
          <div className={styles.introImageWrapper}>
            <Image src={profileImg} alt={'프로필 소개 이미지'} height={590} width={498} />
          </div>
        </section>
      </div>
      <section className={classNames(styles.writeSection)}>
        <div className={styles.common}>
          <div className={styles.writeGridContainer}>
            <div className={styles.writeParagraph}>
              <p className={styles.upperSubText}>Write</p>
              <p className={styles.mainLightText}>친구의 위키,</p>
              <p className={styles.mainBoldText}>직접 작성해봐요</p>
            </div>
            <Image className={styles.keyboard} src={keyboardImg} alt={'키보드 이미지'} height={450} width={364} />
            <Image className={styles.chat} src={chatDarkImg} alt={'어두운 배경 채팅 이미지'} height={681} width={520} />
          </div>
        </div>
      </section>
      <section className={styles.shareSection}>
        <div className={styles.common}>
          <div className={styles.shareParagraph}>
            <p className={styles.upperSubText}>Share</p>
            <p className={styles.mainLightText}>내 위키 만들고</p>
            <p className={styles.mainBoldText}>친구에게 공유해요</p>
          </div>
        </div>
        <div className={styles.shareImageList}>
          <Image src={share1Img} alt={'어두운 배경 채팅 이미지'} height={360} width={360} />
          <Image src={share2Img} alt={'어두운 배경 채팅 이미지'} height={360} width={360} />
          <Image src={share3Img} alt={'어두운 배경 채팅 이미지'} height={360} width={360} />
          <Image src={share4Img} alt={'어두운 배경 채팅 이미지'} height={360} width={360} />
        </div>
      </section>
      <section className={classNames(styles.viewSection, styles.common)}>
        <div className={styles.viewParagraph}>
          <p className={styles.upperSubText}>View</p>
          <p className={styles.mainLightText}>친구들이 달아준</p>
          <p className={styles.mainBoldText}>내용을 확인해봐요</p>
        </div>
        <div className={styles.viewGridContainer}>
          <Image
            className={styles.scriptGreen}
            src={scriptGreenImg}
            alt={'초록 배경 채팅 이미지'}
            height={280}
            width={924}
          />
          <Image className={styles.bell} src={bellImg} alt={'종 이미지'} height={280} width={280} />
          <Image
            className={styles.chatLight}
            src={chatLightImg}
            alt={'밝은 배경 채팅 이미지'}
            height={280}
            width={604}
          />
        </div>
      </section>
      <section className={styles.startSection}>
        <p>나만의 위키 만들어보기</p>
        <Link href={'/'} className={classNames(styles.landingLink)}>
          지금 시작하기
        </Link>
      </section>
      <footer className={styles.footerContainer}>
        <p className={styles.footerCopyLight}>Copyright ⓒ Wikied. All Rights Reserved</p>
        <p className={styles.footerInfo}>
          사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호 | 대표 : 이지은
          <br />
          서울특별시 중구 청계천로 123, 위키드빌딩
        </p>
        <div className={styles.footerPolishContainer}>
          <span>서비스 이용약관</span>
          <span>개인정보 취급방침</span>
          <span>전자금융거래 기본약관</span>
        </div>
      </footer>
    </main>
  );
}
