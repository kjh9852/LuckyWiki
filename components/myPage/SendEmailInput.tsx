export default function SendEmailInput() {
  return (
    <>
      <label className={'text-md'}>질문과 답변을 받을 이메일</label>
      <input className={'input'} type="email" name={'toEmail'} placeholder={'비워두면 이메일은 가지 않아요..'} />
    </>
  );
}
