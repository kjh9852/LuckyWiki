import UpdatePasswordForm from '@/components/myPage/UpdatePasswordForm';

export default function MyPage() {
  return (
    <main className={'auth-container'}>
      <h3 className={'text-2xl'}>계정 설정</h3>
      <UpdatePasswordForm />
    </main>
  );
}
