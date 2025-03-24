
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
      });
    }, 1);

    return () => clearTimeout(timer);
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;

