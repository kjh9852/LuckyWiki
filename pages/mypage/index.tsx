import UpdatePasswordForm from '@/components/myPage/UpdatePasswordForm';
import CreateWikiForm from '../../components/myPage/CreateWikiForm';
import { useAuth } from '@/contexts/AuthProvider';
import UpdateSecurityQuizForm from '@/components/myPage/UpdateSecurityQuizForm';

export default function MyPage() {
  const { user } = useAuth();

  return (
    <main className={'auth-container'}>
      <h3 className={'text-2xl'}>계정 설정</h3>
      <UpdatePasswordForm />
      {user?.profile ? (
        <>
          <h3 className={'text-2xl'}>위키 생성 퀴즈 관리</h3>
          <UpdateSecurityQuizForm code={user.profile.code} currentSecurityQuestion={user.profile.securityQuestion} />
        </>
      ) : (
        <>
          <h3 className={'text-2xl'}>프로필 생성</h3>
          <CreateWikiForm />
        </>
      )}
    </main>
  );
}
