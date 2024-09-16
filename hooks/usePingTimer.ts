import dayjs from 'dayjs';
import { useEffect } from 'react';
import { getServerTime } from '@/apis/getServerTime';

export const usePingTimer = (
  register: string | null,
  isReady: boolean,
  savePing: () => void,
  dependencies: any[] = [],
) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    getServerTime();

    const setTime = () => {
      if (!isReady) return;

      const lastPingTime = register; // api 호출 시 엔드포인트에서 받아온 시간
      const nowTime = localStorage.getItem('nowTime');

      if (lastPingTime) {
        const now = dayjs().valueOf();
        const elapsedTime = parseInt(lastPingTime) + 5 * 60 * 1000; // 엔드포인트에서 5분 후
        const remainingTime = elapsedTime - now;

        console.log(new Date(now), new Date(elapsedTime), new Date(parseInt(register)));

        if (remainingTime > 0) {
          console.log('여긴가');
          timer = setTimeout(() => {
            savePing();
            localStorage.removeItem('lastPingTime');
          }, remainingTime);
          // 5분뒤 실행
        } else {
          console.log('여긴가2');
          // remainingTime이 0보다 작으면 즉시 실행 후 lastPingTime제거
          savePing();
          localStorage.removeItem('lastPingTime');
        }
      } else {
        // lastPingTime이 없으면 즉시 핑을 저장
        savePing();
      }
    };

    setTime();

    return () => {
      clearTimeout(timer);
    };
  }, [isReady, register, ...dependencies]);
};
