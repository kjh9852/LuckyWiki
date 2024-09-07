import styles from './WikiEditProfile.module.scss';
import EditInput from './EditInput/EditInput';
import EditImageInput from './EditInput/EditImageInput';
import { FormValue } from './types/EditTypes';

interface WidiEditProfileProps {
  onWikiValueChange: (name: string, value: File | string | undefined | null) => void;
  value?: FormValue | undefined;
}

export default function WikiEditProfile({ onWikiValueChange, value }: WidiEditProfileProps) {
  console.log(value);
  return (
    <div className={styles.profileDetail}>
      <section className={styles.profileImage}>
        <EditImageInput id="image" type="file" onValueChange={onWikiValueChange} previewImg={value?.image ?? null} />
      </section>
      <div className={styles.profileInfo}>
        <section className={styles.profileKey}>
          <EditInput label="거주 도시" htmlFor="city" onValueChange={onWikiValueChange} value={value?.city ?? ''} />
          <EditInput label="MBTI" htmlFor="mbti" onValueChange={onWikiValueChange} value={value?.mbti ?? ''} />
          <EditInput label="직업" htmlFor="job" onValueChange={onWikiValueChange} value={value?.job ?? ''} />
          <EditInput label="SNS 계정" htmlFor="sns" onValueChange={onWikiValueChange} value={value?.sns ?? ''} />
          <EditInput label="생일" htmlFor="birthday" onValueChange={onWikiValueChange} value={value?.birthday ?? ''} />
          <EditInput label="별명" htmlFor="nickname" onValueChange={onWikiValueChange} value={value?.nickname ?? ''} />
          <EditInput
            label="혈액형"
            htmlFor="bloodType"
            onValueChange={onWikiValueChange}
            value={value?.bloodType ?? ''}
          />
          <EditInput
            label="국적"
            htmlFor="nationality"
            onValueChange={onWikiValueChange}
            value={value?.nationality ?? ''}
          />
        </section>
      </div>
    </div>
  );
}
