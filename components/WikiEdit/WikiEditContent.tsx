import dynamic from 'next/dynamic';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadImages } from '@/apis/auth/uploadImages';
import styles from './WikiEditContent.module.scss';

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

interface WikiEditProps {
  onQuillChange: (content: string) => void;
  value: string;
  userName: string | undefined;
}

const QuillWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill');
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );
    return Quill;
  },
  { loading: () => <div>...loading</div>, ssr: false },
);

export default function WikiEditContent({ onQuillChange, value }: WikiEditProps) {
  const quillRef = useRef<ReactQuill | null>(null);

  // 이미지 업로드 핸들러
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        try {
          const res = await uploadImages(file);
          const editor = quillRef.current?.getEditor();
          if (editor !== undefined) {
            const range = editor.getSelection();
            if (range !== null) {
              editor.insertEmbed(range.index, 'image', res);
              editor.setSelection({ index: range.index + 1, length: 0 });
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('파일이 없습니다.');
      }
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [],
          ['bold', 'italic', 'underline'],
          [{ header: [1, 2, false] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote'],
          ['align'],
          ['image'],
          ['video'],
          ['link'],
        ],
        handlers: { image: imageHandler },
      },
    }),
    [],
  );

  const formats = [
    'bold',
    'italic',
    'underline',
    'header',
    'bullet',
    'list',
    'link',
    'image',
    'video',
    'blockquote',
    'superscript',
  ];

  const handleQuillChange = (content: string) => {
    onQuillChange(content);
  };

  return (
    <>
      <div className={styles.contentContainer}>
        <QuillWrapper
          className="custom"
          forwardedRef={quillRef}
          theme="snow"
          modules={modules}
          value={value}
          onChange={handleQuillChange}
          formats={formats}
          style={{ width: '100%', minHeight: 'calc(100vh - 60px)' }}
          placeholder="내용을 입력하세요."
        />
      </div>
    </>
  );
}
