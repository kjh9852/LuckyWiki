import Image from 'next/image';
import alarmIcon from '@/public/icon/icon-alarm.png';
import styles from './Alarm.module.scss';
import classNames from 'classnames';
import { getNotifications } from '@/apis/auth/getNotifications';
import { useEffect, useState } from 'react';
import { useModal } from '@/contexts/ModalProvider';
import NotificationModal from '../modal/notification/NotificationModal';

export default function Alarm() {
  const [isRestNotification, setIsRestNotification] = useState(false);
  const { isModalOpen, onOpen, onClose } = useModal();

  const handleModalOpen = () => {
    if (isModalOpen) {
      onClose();
    } else {
      onOpen(<NotificationModal onClose={onClose} />);
    }
  };

  useEffect(() => {
    // 기본 delay값 60초
    let delay = 60000;
    let timer: NodeJS.Timeout;

    // 남은 Notification 유무 확인을 위한 함수
    const fetchNotification = async () => {
      const notificationList = await getNotifications();
      if (!notificationList) {
        // 요청 실패가 서버 부하 문제일 수 있으므로 딜레이 1.2배 증가
        delay *= 1.2;
      } else if (notificationList.length > 0) {
        // response 길이가 0보다 크면 삭제되지 않은 알림이 있다는 것
        setIsRestNotification(true);
      }
    };

    // 폴링 연결을 위한 함수
    const startPolling = () => {
      timer = setTimeout(async function polling() {
        await fetchNotification();
        // 주기적으로 재요청
        // setInterval과 달리 setTimeout 중첩은 api 요청 시간을 타이머 시간에 포함하지 않음 =>  지연 간격을 보장
        timer = setTimeout(fetchNotification, delay);
      }, delay);
    };

    // 첫 렌더링 시에 fetchNotification이 한 번 실행되고, 응답 이후부터 폴링 적용
    fetchNotification().then(() => startPolling());

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={styles.alarmContainer}>
      <div className={classNames(styles.notificationCircle, { [styles.hidden]: !isRestNotification })} />
      <button className={styles.bellButton} onClick={handleModalOpen}>
        <Image src={alarmIcon} alt={'알람 아이콘'} height={28} width={28} />
      </button>
    </div>
  );
}
