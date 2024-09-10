import styles from '@/components/@shared/footer/Footer.module.scss';

export default function Footer() {
  return (
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
  );
}
