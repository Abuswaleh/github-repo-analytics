import { useEffect, useCallback } from 'react';

const useInfiniteScroll = (callback, loading, margin = 200) => {
  const handleScroll = useCallback(() => {
    if (loading) return;
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight + margin >= scrollHeight) {
      callback();
    }
  }, [callback, loading, margin]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
};

export default useInfiniteScroll;
