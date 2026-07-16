import React, { useEffect, useRef } from 'react';

interface InfiniteScrollObserverProps {
  onLoadMore: () => void;
  hasMore: boolean;
  lang: 'cn' | 'en';
}

export default function InfiniteScrollObserver({ onLoadMore, hasMore, lang }: InfiniteScrollObserverProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    const currentRef = loaderRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onLoadMore, hasMore]);

  if (!hasMore) return null;

  return (
    <div ref={loaderRef} className="w-full flex justify-center py-12 text-xs font-mono tracking-[0.2em] text-neutral-400 select-none">
      {lang === 'cn' ? '正在加载更多...' : 'LOADING MORE...'}
    </div>
  );
}
