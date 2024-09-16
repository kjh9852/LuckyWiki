import WikiEditForm from '@/components/wikiEdit/WikiEditForm';
import { useState, useEffect } from 'react';
import { getPing } from '@/apis/auth/updatePing';
import { useRouter } from 'next/router';
import ModalComponent from '@/components/@shared/modal/Modal';
// import { useWarnPageUnLoad } from '@/hooks/useWarnPageUnLoad';
import { usePingTimer } from '@/hooks/usePingTimer';

export default function WikiEdit() {
  const router = useRouter();
  const { code } = router.query;
  const [register, setResiter] = useState<string | null>('');
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const existingPing = localStorage.getItem('lastPingTime');
    setResiter(existingPing);
  }, []);

  usePingTimer(register, router.isReady, savePing);

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
