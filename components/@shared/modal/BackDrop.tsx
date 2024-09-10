import styles from './BackDrop.module.scss';

interface BackdropProps {
  onClose: () => void;
}

export default function BackDrop({ onClose }: BackdropProps) {
  return <div className={styles.backdrop} onClick={onClose} />;
}
