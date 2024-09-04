import styles from './MyPageForm.module.scss';
import classNames from 'classnames';

export default function WikiQuiz() {
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('formData: ', e);
  };

  return (
    <form className={classNames('form', styles.myPageForm)} onSubmit={handleFormSubmit}>
      <h4 className={'text-md'}>위키 생성하기</h4>

      <input className={'input'} placeholder={'질문을 입력해주세요'} />
      <input className={'input'} placeholder={'답을 입력해주세요'} />

      <div className={styles.buttonWrapper}>
        <button className={'button'}>생성하기</button>
      </div>
    </form>
  );
}
