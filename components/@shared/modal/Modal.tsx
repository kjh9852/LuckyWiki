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
  isEdit = false,
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
  isEdit?: boolean;
  userCode?: string;
  isAnswer?: boolean;
  timelimit?: boolean;
}) {
  const [answer, setAnswer] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const fetchPostPing = async () => {
    const res = await postPing(userCode as string, answer);
    if (res) {
      router.push(`/wiki/${userCode}/edit`);
    } else if (res === undefined) {
      setIsError(true);
      setErrorMessage('정답이 아닙니다. 다시 시도해 주세요.');
    }
  };

  const handleOverTimeLimit = () => {
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

  const handleFinishEdit = async () => {
    router.push(`/wiki/${userCode}`);
  };

  if (isAnswer) {
    return (
      <Modal
        centered={true}
        open={isOpen}
        onCancel={onClose}
        destroyOnClose={true}
        width={395}
        mask={true}
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
        transitionName=""
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
        onCancel={handleOverTimeLimit}
        destroyOnClose={true}
        getContainer={false}
        width={350}
        footer={[
          <Button className={styles.buttonColor} key="ok" type="primary" onClick={handleOverTimeLimit}>
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

  if (isEdit) {
    return (
      <Modal
        title={title}
        centered
        open={isOpen}
        onCancel={onClose}
        destroyOnClose={true}
        getContainer={false}
        width={350}
        transitionName=""
        footer={[
          <Button className={styles.buttonColor} key="ok" type="primary" onClick={handleFinishEdit}>
            수정 완료
          </Button>,
        ]}
      >
        <p>{children}</p>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        title={title}
        centered
        open={isOpen}
        onCancel={onClose}
        destroyOnClose={true}
        getContainer={false}
        width={350}
        transitionName=""
        footer={[
          <Button className={styles.buttonColor} key="ok" type="primary" onClick={onClose}>
            확인
          </Button>,
        ]}
      >
        <p>{children}</p>
      </Modal>
    </>
  );
}
