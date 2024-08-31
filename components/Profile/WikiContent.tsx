import ProfileType from '@/types/types';
import styles from './WikiContent.module.scss';

interface WikiContentProps {
  profile: ProfileType;
}

export default function WikiContent({ profile }: WikiContentProps) {
  return <div className={styles.wikiContent}>{profile.content}</div>;
}
