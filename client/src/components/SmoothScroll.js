import { useEffect } from "react";
import Scrollbar from "smooth-scrollbar";
const Scroll = () => {
    const options = {
        damping: 0.07,
      };
      
      useEffect(() => {
        Scrollbar.init(document.body, options);
      
        return () => {
          if (Scrollbar) Scrollbar.destroy(document.body);
        };
      }, []);
  return null;
};

export default Scroll;
