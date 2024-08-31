import classNames from 'classnames';
import styles from './signup.module.scss';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <main className={styles.container}>
      <div className={styles.signupSection}>
        <h3 className={classNames('text-2xl')}>회원가입</h3>

        <form className={styles.form}>
          <div className={styles.inputArea}>
            <label htmlFor={'name'} className={'text-md'}>
              이름
            </label>
            <input id={'name'} className={'input'} placeholder={'이름을 입력해 주세요'} />
            <p className={classNames('text-xs error', styles.message)}>에러 메시지</p>
          </div>

          <div className={styles.inputArea}>
            <label htmlFor={'name'} className={'text-md'}>
              이름
            </label>
            <input id={'name'} className={'input'} placeholder={'이름을 입력해 주세요'} />
            <p className={'text-xs error'}>에러 메시지</p>
          </div>

          <div className={styles.inputArea}>
            <label htmlFor={'name'} className={'text-md'}>
              이름
            </label>
            <input id={'name'} className={'input'} placeholder={'이름을 입력해 주세요'} />
            <p className={'text-xs error'}>에러 메시지</p>
          </div>

          <div className={styles.inputArea}>
            <label htmlFor={'name'} className={'text-md'}>
              이름
            </label>
            <input id={'name'} className={'input'} placeholder={'이름을 입력해 주세요'} />
            <p className={'text-xs error'}>에러 메시지</p>
          </div>

          <button className={'button'}>가입하기</button>

          <p className={'text-xs'}>
            이미 회원이신 가요?<Link href={'login'}>로그인하기</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
