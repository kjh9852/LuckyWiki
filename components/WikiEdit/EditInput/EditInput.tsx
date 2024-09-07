import styles from './EditInput.module.scss';
import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

interface EditInputProps {
  label?: string;
  htmlFor?: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  name?: string;
  onValueChange: (name: string, value: string | undefined) => void;
}

export default function EditInput({ label, htmlFor, type = 'text', onValueChange, value }: EditInputProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onValueChange(name, value);
  };
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label htmlFor={htmlFor} className={`${styles.editInputLabel} text-md`}>
          {label}
        </label>
      )}
      <input
        id={htmlFor}
        name={htmlFor}
        type={type}
        className={`${styles.editInput} input`}
        onChange={handleInputChange}
        value={value}
      />
    </div>
  );
}
