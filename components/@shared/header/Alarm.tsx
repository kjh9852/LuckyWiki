import Image from 'next/image';
import alarmIcon from '@/public/icon/icon-alarm.png';
import styles from './Alarm.module.scss';
import classNames from 'classnames';
import { getNotifications, Notification } from '@/apis/auth/getNotifications';
import { useEffect, useState } from 'react';
import { useModal } from '@/contexts/ModalProvider';
import NotificationModal from '../modal/NotificatioinModal';

export default function Alarm() {
  const [notificationList, setNotificationList] = useState<Notification[]>([]);
  const { isModalOpen, onOpen, onClose } = useModal();

  const handleModalOpen = () => {
    if (isModalOpen) {
      onClose();
    } else {
      onOpen(<NotificationModal />);
    }
  };

  const dataApi = async () => {
    const response = await getNotifications();
    setNotificationList(response);
  };

  useEffect(() => {
    dataApi();

    const polling = setInterval(() => {
      dataApi();
    }, 60000);

    return () => {
      clearInterval(polling);
    };
  }, []);

  console.log('notificationList:', notificationList);

  return (
    <div className={styles.alarmContainer}>
      <div className={classNames(styles.notificationCircle, { [styles.hidden]: false })} />
      <button className={styles.bellButton} onClick={handleModalOpen}>
        <Image src={alarmIcon} alt={'알람 아이콘'} height={28} width={28} />
      </button>
    </div>
  );
}
