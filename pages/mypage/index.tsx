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
        <UpdateSecurityQuizForm code={user.profile.code} currentSecurityQuestion={user.profile.securityQuestion} />
      ) : (
        <CreateWikiForm />
      )}
    </main>
  );
}
