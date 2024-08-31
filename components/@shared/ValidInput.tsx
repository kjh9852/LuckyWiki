import classNames from 'classnames';
import styles from './ValidInput.module.scss';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface ValidInputProps {
  label: string;
  htmlFor: string;
  error: FieldError | undefined;
  message: string | undefined;
  register: UseFormRegisterReturn;
}

export default function ValidInput({ label, htmlFor, error, message, register }: ValidInputProps) {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label htmlFor={htmlFor} className={'text-md'}>
          {label}
        </label>
      )}
      <input
        id={htmlFor}
        className={classNames('input', error && styles.error)}
        placeholder={'이름을 입력해 주세요'}
        {...register}
      />
      {error && <p className={classNames('text-xs', styles.message)}>{message}</p>}
    </div>
  );
}
