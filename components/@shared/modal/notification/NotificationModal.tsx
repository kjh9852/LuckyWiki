import styles from './NotificationModal.module.scss';
import { Notification } from '@/types/types';
import NotificationCard from './NotificationCard';
import closeImg from '../../../../public/icon/icon-close.png';
import Image from 'next/image';

interface NotificationModalProps {
  onClose: () => void;
  notificationList: Notification[];
  onDelete: (id: number) => Promise<void>;
}

export default function NotificationModal({ notificationList, onClose, onDelete }: NotificationModalProps) {
  return (
    <div className={styles.notificationModalContainer}>
      <div className={styles.modalTitle}>
        <p>알림 {notificationList.length}개</p>
        <button>
          <Image src={closeImg} alt={'닫기 이미지'} width={24} height={24} onClick={onClose} />
        </button>
      </div>
      {notificationList.length > 0 && (
        <>
          <div className={styles.cardContainer}>
            {notificationList.map(notification => (
              <NotificationCard
                key={notification.id}
                id={notification.id}
                createdAt={notification.createdAt}
                message={notification.content}
                onNotificationDelete={() => onDelete(notification.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
