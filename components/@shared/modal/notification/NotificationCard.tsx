import styles from './NotificationCard.module.scss';
import closeImg from '../../../../public/icon/icon-close-gray.png';
import Image from 'next/image';
import getElapsedPeriod from '../../../../utils/getElapsedPeriod';
import { deleteNotifications } from '@/apis/auth/deleteNotification';

interface NotificationCardProps {
  id: number;
  message: string;
  createdAt: Date;
  onNotificationDelete: (id: number) => void;
}

export default function NotificationCard({ id, message, createdAt, onNotificationDelete }: NotificationCardProps) {
  const handleDeleteClick = async () => {
    onNotificationDelete(id);
    await deleteNotifications(id);
  };

  return (
    <div className={styles.notificationContainer}>
      <div className={styles.closeButtonWrapper}>
        <div className={styles.message}>{message}</div>
        <button onClick={handleDeleteClick}>
          <Image src={closeImg} alt={'닫기 이미지'} width={24} height={24} />
        </button>
      </div>
      <div className={styles.createdTime}>{getElapsedPeriod(createdAt.toString())}</div>
    </div>
  );
}
