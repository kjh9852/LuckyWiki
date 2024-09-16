import dayjs from 'dayjs';
import { useEffect } from 'react';

export const usePingTimer = (
  register: string | null,
  isReady: boolean,
  savePing: () => void,
  dependencies: any[] = [],
) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const setTime = () => {
      if (!isReady) return;
      const lastPingTime = register; // api 호출 시 엔드포인트에서 받아온 시간

      if (lastPingTime) {
        const now = dayjs().valueOf();
        const elapsedTime = parseInt(lastPingTime) + 5 * 60 * 1000; // 엔드포인트에서 5분 후
        const remainingTime = elapsedTime - now;
        if (remainingTime > 0) {
          timer = setTimeout(() => {
            savePing();
            // 5분뒤 실행
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
    };

    setTime();

    return () => {
      clearTimeout(timer); // 타이머 정리
    };
  }, [isReady, register, ...dependencies]);
};
