import { useEffect } from 'react';

const useEscapeListener = (onEscape) => {
  const escListener = (e) => {
    const key = e.code;
    if (key === 'Escape') {
      onEscape();
    }
  };

  useEffect(() => {
    // Bind
    document.addEventListener('keydown', escListener);
    return () => {
      // dispose
      document.removeEventListener('keydown', escListener);
    };
  }, [onEscape, escListener]);
};

export default useEscapeListener;
