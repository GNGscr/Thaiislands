import { useEffect } from 'react';

export default function useNavbarMedia(setCurrentMedia) {
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const media = width < 680 ? 'mobile' : width < 1080 ? 'tablet' : 'desktop';
      setCurrentMedia(media);
      localStorage.setItem("media", media);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setCurrentMedia]);
}
