import ProfileType from '@/types/types';
import styles from './WikiContent.module.scss';

interface WikiContentProps {
  profile: ProfileType;
}

function EmptyContent() {
  return (
    <div className={styles.emptyContent}>
      <p>
        아직 작성한 내용이 없네요.<br>위키에 참여해 보세요!</br>
      </p>
      <button>시작하기</button>
    </div>
  );
}

export default function WikiContent({ profile }: WikiContentProps) {
  if (!profile.content) {
    return <EmptyContent />;
  }
  return <div className={styles.wikiContent}>{profile.content}</div>;
}
