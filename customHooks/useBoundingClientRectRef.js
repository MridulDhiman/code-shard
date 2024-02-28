import { useEffect, useRef } from "react";

const initialRect = {
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  toJSON: () => "",
};


export  function useBoundingClientRectRef(ref) {
  const rectRef = useRef(initialRect);

  useEffect(() => {
    const updateRect = () => {
      if (!(ref?.current)) {
        return;
      }
      rectRef.current = ref.current.getBoundingClientRect();
    };

    window.addEventListener("resize", updateRect);
    window.addEventListener("orientationchange", updateRect);
    updateRect();

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("orientationchange", updateRect);
    };
  }, [ref]);

  return rectRef;
}
