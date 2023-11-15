import React, { useEffect, useRef, useState } from "react";

const InsideClickHandler = ({ children, onInsideClick }: any) => {
  const wrapperRef = useRef<any>(null);

  const handleClickInside = () => {
    onInsideClick();
  };

  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      if (wrapperRef.current && wrapperRef.current.contains(event.target)) {
        onInsideClick();
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div ref={wrapperRef} onClick={handleClickInside}>
      {children}
    </div>
  );
};

export default InsideClickHandler;
