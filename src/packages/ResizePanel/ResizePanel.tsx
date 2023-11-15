import { ReactChild, useEffect, useRef } from "react";

type Props = {
  children: ReactChild;
  width: number;
  setInitialWidth: (a: any) => void;
};
const ResizePanel = ({ children, width, setInitialWidth }: Props) => {
  const ref = useRef<any>();

  useEffect(() => {
    if (ref.current) {
      setInitialWidth(ref.current.offsetWidth);
    }
  }, [ref]);

  return (
    <div ref={ref} style={{ width: width ? `${width}px` : "100%" }}>
      {children}
    </div>
  );
};

export default ResizePanel;
