import { useEffect, useRef, useState } from "react";
import styles from "./styles/App.module.scss";
import srcPlan2 from "./assets/plan-2.png";
import srcWaitingMarker from "./assets/markers/waiting.png";
import markerks from "./markers.json";

function App() {
  const [scaleIndex, setScaleIndex] = useState<any>(1);
  const [prevScaleIndex, setPrevScaleIndex] = useState<any>(1);

  const [isDraggable, setDraggable] = useState<boolean>(false);

  const [planLeft, setPlanLeft] = useState<any>();
  const [planTop, setPlanTop] = useState<any>();

  const [shiftX, setShiftX] = useState<any>();
  const [shiftY, setShiftY] = useState<any>();

  useEffect(() => {
    console.log("markerks", markerks);
  }, [markerks]);

  useEffect(() => {
    if (isDraggable) {
      setScaleIndex(1);
    }
  }, [isDraggable]);

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
    setPrevScaleIndex(scaleIndex);
    if (scaleIndex === 1) {
      let shiftX = e.clientX - planRef.current.getBoundingClientRect().left;
      let shiftY = e.clientY - planRef.current.getBoundingClientRect().top;

      setShiftX(shiftX);
      setShiftY(shiftY);

      setPlanLeft(e.pageX - shiftX + "px");
      setPlanTop(e.pageY - shiftY + "px");
    }
    setDraggable(true);
  };

  const onMouseUp = () => {
    setDraggable(false);
    setScaleIndex(prevScaleIndex);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDraggable && scaleIndex === 1) {
      setPlanLeft(e.pageX - shiftX + "px");
      setPlanTop(e.pageY - shiftY + "px");
    }
  };

  return (
    <div className={styles.wrapper}>
      <img
        style={{
          transform: `scale(${scaleIndex})`,
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
      <div className={styles.marker_wrapper}>
        {markerks[0].markers.map(({ x, y }, index) => (
          <img
            style={{ transform: `translate(${x}px, ${y}px)` }}
            key={index}
            className={styles.marker}
            src={srcWaitingMarker}
            alt="marker"
          />
        ))}
      </div>
    </div>
  );
}

export default App;
