import styles from './NotificationModal.module.scss';
import { Notification } from '@/types/types';
import NotificationCard from './NotificationCard';
import closeImg from '../../../../public/icon/icon-close.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getNotifications } from '@/apis/auth/getNotifications';
import { deleteNotifications } from '@/apis/auth/deleteNotification';

interface NotificationModalProps {
  onClose: () => void;
}

export default function NotificationModal({ onClose }: NotificationModalProps) {
  const [notificationList, setNotificationList] = useState<Notification[]>([]);

  const handleNotificationDelete = async (id: number) => {
    await deleteNotifications(id);
    setNotificationList(prevState => prevState.filter(v => v.id !== id));
  };

  const fetchNotification = async () => {
    const response = await getNotifications();
    if (response) {
      setNotificationList(response);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

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
                onNotificationDelete={handleNotificationDelete}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
