import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { patchUser } from '@/apis/auth/patchUser';
import { useRouter } from 'next/router';
import { getProfile } from '@/apis/auth/getProfile';
import WikiEditProfile from './WikiEditProfile';
import styles from './WIkiEditForm.module.scss';
import { FormValue } from './types/EditTypes';
import { useAuth } from '@/contexts/AuthProvider';
import ModalComponent from '../@shared/modal/Modal';

const QuillEditor = dynamic(() => import('./WikiEditContent'), { ssr: false });

type handleChangeType = (name: string, value: File | string | undefined | null) => void;

type editUserType = (code: string, data: FormValue) => void;

const INITIAL_FORM_VALUE: FormValue = {
  content: '',
  nationality: '',
  family: '',
  bloodType: '',
  nickname: '',
  birthday: '',
  sns: '',
  job: '',
  mbti: '',
  city: '',
  image: '',
};

export default function WikiEditForm() {
  const router = useRouter();
  const { code } = router.query;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [contentValue, setContentValue] = useState<FormValue | undefined>(INITIAL_FORM_VALUE);
  const [wikiUserName, setWikiUserName] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [formValue, setFormValue] = useState(contentValue ?? INITIAL_FORM_VALUE);
  const { user } = useAuth();

  const editUser: editUserType = async (code, data) => {
    const res = await patchUser(code, data);
  };

  useEffect(() => {
    if (userId !== undefined && user?.profile && user?.profile.id !== userId) {
      setIsModalOpen(true);
    }
    if (user?.profile && user?.profile.id === userId) return;
  }, [userId]);

  const getValue = async () => {
    try {
      const res = await getProfile(code as string);
      setContentValue(res);
      setUserId(res?.id);
      setWikiUserName(res?.name);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getValue();
    }
  }, [code]);

  useEffect(() => {
    if (contentValue !== undefined) {
      setFormValue(contentValue);
    }
  }, [contentValue]);

  const handleChange: handleChangeType = (name, value) => {
    setFormValue(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    editUser(code as string, formValue);
  };

  return (
    <section className={styles.editContiner}>
      {isModalOpen && <ModalComponent title="주의">본인이 아닌 프로필은 수정이 불가합니다</ModalComponent>}
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <QuillEditor
          userName={wikiUserName}
          onQuillChange={(content: string) => handleChange('content', content)}
          value={formValue.content ?? ''}
        />
        <div className={styles.profileContainer}>
          <WikiEditProfile value={formValue} onWikiValueChange={(name, value) => handleChange(name, value)} />
          <div className={styles.buttonContainer}>
            <Link href={`/wiki/${code}`} className={`${styles.secondaryButton} button`}>
              취소
            </Link>
            <button className={`button`}>수정</button>
          </div>
        </div>
      </form>
    </section>
  );
}
