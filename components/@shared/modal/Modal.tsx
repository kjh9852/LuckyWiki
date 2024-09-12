import React, { ReactNode, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { Button, Modal } from 'antd';
import classNames from 'classnames';
import { postPing } from '@/apis/auth/updatePing';
import Image from 'next/image';
import styles from './Modal.module.scss';

export default function ModalComponent({
  title = '',
  message = '',
  subMessage = '',
  children,
  isOpen = false,
  onClose,
  userCode,
  isAnswer = false,
  timelimit = false,
}: {
  title?: string;
  message?: string;
  subMessage?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  userCode: string;
  isAnswer?: boolean;
  timelimit?: boolean;
}) {
  const [answer, setAnswer] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const fetchPostPing = async () => {
    try {
      const res = await postPing(userCode, answer);
      if (res.ok) {
        router.push(`/wiki/${userCode}/edit`);
      }
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  const handleOverTiemLimit = () => {
    setIsModalOpen(false);
    router.push(`/wiki/${userCode}`);
  };

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const answerValue = e.target.value;
    setAnswer(answerValue);
  };

  const handleSubmitAnswer = async (e: FormEvent) => {
    e.preventDefault();
    await fetchPostPing();
  };

  if (isAnswer) {
    return (
      <Modal
        centered
        open={isOpen}
        onCancel={onClose}
        destroyOnClose={true}
        getContainer={false}
        width={395}
        footer={[
          <div key="footer-container" style={{ textAlign: 'center' }}>
            <Button
              className={`${styles.modalButton}  ${styles.buttonColor}`}
              key="ok"
              type="primary"
              onClick={handleSubmitAnswer}
            >
              확인
            </Button>
            <div className={styles.footerMessage}>
              <span>
                럭키위키는 지인들과 함께하는 즐거운 공간입니다.
                <br />
                지인에게 상처를 주지 않도록 작성해 주세요.
              </span>
            </div>
          </div>,
        ]}
      >
        <div>
          <div className={styles.modalImageContainer}>
            <div className={styles.lockImage}>
              <Image width={20} height={20} src="/icon/icon-lock.png" alt="자물쇠 이미지" />
            </div>
            <span>
              다음 퀴즈를 맞추고
              <br /> 위키를 작성해 보세요.
            </span>
          </div>
          <form onSubmit={handleSubmitAnswer}>
            <div className={styles.modalFormContainer}>
              <label htmlFor="securityAnswer" className={'text-md'}>
                {title}
              </label>
              <input
                id="securityAnswer"
                type="text"
                className={classNames('input', { [styles.errorInput]: isError })}
                placeholder="답안을 입력해주세요."
                onChange={handleAnswerChange}
              />
              <p className={styles.errorMessage}>{isError && errorMessage}</p>
            </div>
          </form>
        </div>
      </Modal>
    );
  }

  if (timelimit) {
    return (
      <Modal
        title={title}
        centered
        open={isModalOpen}
        onCancel={handleOverTiemLimit}
        destroyOnClose={true}
        getContainer={false}
        width={350}
        footer={[
          <Button className={styles.buttonColor} key="ok" type="primary" onClick={handleOverTiemLimit}>
            확인
          </Button>,
        ]}
      >
        <div>
          <p className={styles.message}>{message}</p>
          <p className={styles.subMessage}>{subMessage}</p>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        title={title}
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose={true}
        getContainer={false}
        width={350}
        footer={[
          <Button className={styles.buttonColor} key="ok" type="primary" onClick={() => setIsModalOpen(false)}>
            확인
          </Button>,
        ]}
      >
        <p>{children}</p>
      </Modal>
    </>
  );
}
