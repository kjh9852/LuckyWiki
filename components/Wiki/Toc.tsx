import { useEffect, useState } from 'react';
import styles from './Toc.module.scss';
import Link from 'next/link';

interface TocProps {
  content: string;
}

interface Item {
  id: string;
  text: string;
}

export default function Toc({ content }: TocProps) {
  //현재 보이는 목차(강조 표시)
  const [currentIndex, setCurrentIndex] = useState<string>('');
  // 목차 리스트
  const [indexList, setIndexList] = useState<{ id: string; text: string }[]>([]);

  //content내용 파싱하고 제목 찾기
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const parser = new DOMParser();
    const document = parser.parseFromString(content, 'text/html');
    const headings = Array.from(document.querySelectorAll('h1'));

    console.log('Headings found:', headings);

    //제목 요소에 id 생성하기
    const items: Item[] = headings.map(heading => {
      let id = heading.id;
      if (!id) {
        id = heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
        heading.id = id;
      }
      console.log('Heading ID:', id, 'Text:', heading.textContent);
      return {
        id,
        text: heading.textContent || '',
      };
    });

    setIndexList(items);
    console.log(items);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = entry.target.id;

          if (entry.isIntersecting) {
            console.log(entry);
            setCurrentIndex(id);
          }
          console.log('entry', entry);
        });
      },
      { threshold: 0.5 },
    );

    headings.forEach(heading => {
      console.log('heading', heading);
      observer.observe(heading);
    });

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
    };
  }, [content]);

  return (
    <nav className={styles.nav}>
      <h2>목차</h2>
      <ul>
        {indexList.map(item => (
          <li key={item.id} className={item.id === currentIndex ? styles.active : ''}>
            <Link href={`#${item.id}`}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
