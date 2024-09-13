import { MouseEvent, ChangeEvent, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './EditImageInput.module.scss';
import defaultProfile from '@/public/icon/icon-profile.png';
import { uploadImages } from '@/apis/auth/uploadImages';

interface EditImageInputProps {
  id: string;
  type: 'file';
  value?: string;
  previewImg?: string | null;
  onValueChange: (name: string, value: File | null) => void;
  className?: string;
}

export default function EditImageInput({ id, previewImg, onValueChange }: EditImageInputProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgValue = e.target.files?.[0];
    if (imgValue) {
      setFile(imgValue);
      try {
        const res = await uploadImages(imgValue);
        onValueChange('image', res);
        console.log(imgValue);
      } catch (error) {
        console.log('error');
      }
    }
  };

  useEffect(() => {
    if (!file) return;

    const nextPreviewImg = URL.createObjectURL(file);
    setPreview(nextPreviewImg);

    return () => {
      setPreview(null);
      URL.revokeObjectURL(nextPreviewImg);
    };
  }, [file]);

  return (
    <div className={styles.previewImgContainer}>
      <label htmlFor={id} className={styles.fileLabel} />
      <input
        id={id}
        name={id}
        type="file"
        className={styles.fileInput}
        onChange={handleChange}
        ref={fileInputRef}
        accept="image/png, image/jpeg"
      />
      <div className={styles.previewImg}>
        <Image width={200} height={200} src={preview || previewImg || defaultProfile} alt="이미지 미리보기" />
      </div>
    </div>
  );
}
