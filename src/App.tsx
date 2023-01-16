import styles from "./styles/App.module.scss";
import srcPlan2 from "./assets/plan-2.png";
import { useEffect, useRef, useState } from "react";

function App() {
  const [scaleIndex, setScaleIndex] = useState<any>(1);
  const [isDraggable, setDraggable] = useState<boolean>(false);

  const [planLeft, setPlanLeft] = useState<any>();
  const [planTop, setPlanTop] = useState<any>();

  const [shiftX, setShiftX] = useState<any>();
  const [shiftY, setShiftY] = useState<any>();

  useEffect(() => {
    console.log("planLeft", planLeft, "planTop", planTop);
  }, [planLeft, planTop]);

  const planRef: any = useRef();

  const handleScroll = (e: any) => {
    if (e.deltaY > 0) {
      setScaleIndex((prev: any) => prev - 0.05);
    } else {
      setScaleIndex((prev: any) => prev + 0.05);
    }

    return false;
  };

  const onMouseDown = (e: React.MouseEvent) => {
    let shiftX = e.clientX - planRef.current.getBoundingClientRect().left;
    let shiftY = e.clientY - planRef.current.getBoundingClientRect().top;

    setShiftX(shiftX);
    setShiftY(shiftY);

    setPlanLeft(e.pageX - shiftX);
    setPlanTop(e.pageY - shiftY);

    setDraggable(true);
  };

  const onMouseUp = () => {
    setDraggable(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDraggable) {
      setPlanLeft(e.pageX - shiftX + "px");
      setPlanTop(e.pageY - shiftY + "px");
    }
  };

  return (
    <div className={styles.wrapper}>
      <img
        style={{
          transform: ` scale(${scaleIndex})`,
          WebkitTransform: `scale(${scaleIndex})`,
          msTransform: `scale(${scaleIndex})`,
          left: `${planLeft}`,
          top: `${planTop}`,
          position: `absolute`,
        }}
        className={styles.plan}
        src={srcPlan2}
        alt="plan"
        ref={planRef}
        onWheel={handleScroll}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onDragStart={(e) => e.preventDefault()}
      />
    </div>
  );
}

export default App;
