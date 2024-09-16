import { useValidForm, ValidationConfig } from '@/hooks/useValidForm';
import styles from './MyPageForm.module.scss';
import classNames from 'classnames';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import ValidInput from '../@shared/input/ValidInput';
import { createProfile } from '@/apis/auth/createProfile';
import { useSnackBar } from '@/contexts/SnackbarProvider';
import { useAuth } from '@/contexts/AuthProvider';
import { sendMail } from '@/utils/sendMail';
import { VALID_OPTIONS } from '@/constants/validOptions';

const createWikiFormConfig: ValidationConfig = {
  securityAnswer: {
    required: '질문을 입력해주세요',
    minLength: VALID_OPTIONS.minLength2,
    maxLength: VALID_OPTIONS.maxLength10,
  },
  securityQuestion: {
    required: '답변을 입력해주세요',
    minLength: VALID_OPTIONS.minLength2,
    maxLength: VALID_OPTIONS.maxLength10,
  },
  toEmail: {
    required: false,
    pattern: VALID_OPTIONS.emailPattern,
  },
};

export default function CreateWikiForm() {
  const { syncUserAuthState, user } = useAuth();
  const { openSnackBar } = useSnackBar();
  const { register, errors, handleSubmit, setValue } = useValidForm({ validationConfig: createWikiFormConfig });

  const handleFormSubmit: SubmitHandler<FieldValues> = async formData => {
    if (formData.securityAnswer && formData.securityQuestion && user) {
      const { securityAnswer, securityQuestion } = formData;
      const response = await createProfile({ securityAnswer, securityQuestion });

      if (response) {
        openSnackBar({ type: 'success', content: '위키 생성이 완료되었습니다.' });
        if (formData.toEmail) {
          sendMail({
            answer: securityAnswer,
            question: securityQuestion,
            name: user.name,
            email: formData.toEmail,
          });
          setValue('toEmail', '');
        }
        setValue('securityAnswer', '');
        setValue('securityQuestion', '');
        syncUserAuthState();
      } else {
        openSnackBar({ type: 'error', content: '위키 생성에 실패하였습니다.' });
      }
    }
  };

  return (
    <form className={classNames('form', styles.myPageForm)} onSubmit={handleSubmit(handleFormSubmit)}>
      <h4 className={'text-md'}>나의 위키 편집 권한을 위한 퀴즈</h4>

      <ValidInput
        error={errors.securityQuestion}
        message={errors.securityQuestion?.message}
        register={register.securityQuestion}
        placeholder={'질문을 입력해주세요'}
      />
      <ValidInput
        error={errors.securityAnswer}
        message={errors.securityAnswer?.message}
        register={register.securityAnswer}
        placeholder={'답변을 입력해주세요'}
      />
      <ValidInput
        type="email"
        label={'이메일을 입력하면 인증 퀴즈 내용을 보내드려요'}
        placeholder={'비워두면 이메일은 가지 않아요..'}
        error={errors.toEmail}
        message={errors.toEmail?.message}
        register={register.toEmail}
      />

      <div className={styles.buttonWrapper}>
        <button className={'button'}>생성하기</button>
      </div>
    </form>
  );
}
