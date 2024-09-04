import { FormInputValues, useValidForm } from '@/hooks/useValidForm';
import styles from './MyPageForm.module.scss';
import classNames from 'classnames';
import { SubmitHandler } from 'react-hook-form';
import ValidInput from '../@shared/Input/ValidInput';
import { createProfile } from '@/apis/auth/createProfile';

export default function WikiQuiz() {
  const { register, errors, handleSubmit } = useValidForm(['quizQuestion', 'quizAnswer']);

  const handleFormSubmit: SubmitHandler<FormInputValues> = async formData => {
    if (formData.quizQuestion && formData.quizAnswer) {
      const { quizQuestion, quizAnswer } = formData;
      await createProfile({ quizQuestion, quizAnswer });
    }
  };

  return (
    <form className={classNames('form', styles.myPageForm)} onSubmit={handleSubmit(handleFormSubmit)}>
      <h4 className={'text-md'}>나의 위키 편집 권한을 위한 퀴즈</h4>

      <ValidInput
        error={errors.quizQuestion}
        message={errors.quizQuestion?.message}
        register={register.quizQuestion}
        placeholder={'질문을 입력해주세요'}
      />
      <ValidInput
        error={errors.quizAnswer}
        message={errors.quizAnswer?.message}
        register={register.quizAnswer}
        placeholder={'답변을 입력해주세요'}
      />

      <div className={styles.buttonWrapper}>
        <button className={'button'}>생성하기</button>
      </div>
    </form>
  );
}
