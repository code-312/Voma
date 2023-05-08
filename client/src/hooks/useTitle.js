import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    // eslint-disable-next-line no-return-assign
    return () => (document.title = prevTitle);
  }, [title]);
};

export default useTitle;