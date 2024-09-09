import Image from 'next/image';
import alarmIcon from '@/public/icon/icon-alarm.png';
import styles from './Alarm.module.scss';
import classNames from 'classnames';

export default function Alarm() {
  return (
    <div className={styles.alarmContainer}>
      <div className={classNames(styles.notificationCircle, { [styles.hidden]: false })} />
      <button className={styles.bellButton}>
        <Image src={alarmIcon} alt={'알람 아이콘'} height={28} width={28} />
      </button>
    </div>
  );
}
