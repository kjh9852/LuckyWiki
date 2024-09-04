import Image from 'next/image';
import styles from './Spinner.module.scss';

export default function Spinner() {
  return <Image className={styles.spinner} src={'/icon/icon-spinner.png'} width={45} height={45} alt="로딩중" />;
}
