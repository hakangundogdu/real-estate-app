import { useEffect, useState } from 'react';
import { FaCaretUp } from 'react-icons/fa';
import { IconButton } from '@chakra-ui/react';

const Up = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (
      window.pageYOffset > 300 &&
      window.matchMedia('(min-width: 1000px)').matches
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);
  return (
    <>
      {isVisible && (
        <IconButton
          bg="gray.100"
          shadow="lg"
          position="fixed"
          bottom="10"
          right="10"
          icon={<FaCaretUp />}
          z-index="10"
          onClick={scrollToTop}
        />
      )}
    </>
  );
};

export default Up;
