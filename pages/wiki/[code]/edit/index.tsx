import WikiEditForm from '@/components/WikiEdit/WikiEditForm';
import { useState, useEffect } from 'react';
import { getPing } from '@/apis/auth/updatePing';
import { useRouter } from 'next/router';
import ModalComponent from '@/components/@shared/modal/Modal';
// import { useWarnPageUnLoad } from '@/hooks/useWarnPageUnLoad';

export default function WikiEdit() {
  const router = useRouter();
  const { code } = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pingMessage, setPingMessage] = useState({
    message: '',
    subMessage: '',
  });

  // useWarnPageUnLoad();

  const savePing = async () => {
    try {
      const res = await getPing(code as string);
      if (res?.message) {
        setPingMessage({
          message: res.message,
          subMessage: res.subMessage,
        });
        setIsModalOpen(true);
      }
      if (res) {
        const registeredAt = new Date(res?.registeredAt);
        const dateIsoString = registeredAt.getTime().toString();
        localStorage.setItem('lastPingTime', dateIsoString);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const lastPingTime = localStorage.getItem('lastPingTime'); // api 호출 시 엔드포인트에서 받아온 시간

    if (router.isReady) {
      if (lastPingTime) {
        const now = new Date().getTime();
        const elapsedTime = parseInt(lastPingTime) + 5 * 60 * 1000; // 엔드포인트에서 5분 후
        console.log(new Date(), new Date(elapsedTime));
        const remainingTime = elapsedTime - now;

        console.log(remainingTime);

        if (remainingTime > 0) {
          console.log('확인');
          timer = setTimeout(() => {
            console.log('타이머 확인');
            savePing();
            // 5분마다 반복
            localStorage.removeItem('lastPingTime');
          }, remainingTime);
        } else {
          // remainingTime이 0보다 작으면 즉시 실행 후 lastPingTime제거
          savePing();
          localStorage.removeItem('lastPingTime');
        }
      } else {
        // lastPingTime이 없으면 즉시 핑을 저장
        savePing();
      }
    }
    return () => {
      clearTimeout(timer); // 타이머 정리
    };
  }, [router.isReady]);

  return (
    <>
      {isModalOpen && (
        <ModalComponent
          timelimit={true}
          userCode={code as string}
          message={pingMessage.message}
          subMessage={pingMessage.subMessage}
        />
      )}
      <WikiEditForm />
    </>
  );
}
