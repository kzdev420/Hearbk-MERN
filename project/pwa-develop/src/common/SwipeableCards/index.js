import React, { useCallback, useState } from "react";
import cx from "classnames";
import { Swipeable as SwipeableViews } from "react-swipeable";

import "./styles.scss";

const SwipeableCards = ({
  children,
  onSwipeEnd,
  swipeThreshold,
  className,
}) => {
  const [style, setStyle] = useState({});
  const [swipeText, setSwipeText] = useState("");
  const handleSwiping = useCallback(
    (e) => {
      if (e.absX >  50 || e.absY > 50) {
        if (e.dir === "Up") {
          setSwipeText("POTENTIAL");
          setStyle({
            bottom: `${e.absY}px`,
          });
        }
        if (e.dir === "Right") {
          setSwipeText("HIT");
          setStyle({
            left: `${e.absX}px`,
          });
        }
        if (e.dir === "Left") {
          setSwipeText("MISS");
          setStyle({
            left: `-${e.absX}px`,
          });
        }
      }
    },
    [setStyle]
  );

  const handleSwipeEnd = useCallback(
    (e) => {
      if (
        (e.absX > swipeThreshold || e.absY > swipeThreshold) &&
        e.dir !== "Down"
      ) {
        onSwipeEnd(e);
        setStyle({});
      }
      setSwipeText("");
    },
    [onSwipeEnd, swipeThreshold]
  );

  return (
    <SwipeableViews
      delta={100}
      onSwiping={() => {}}
      preventDefaultTouchmoveEvent
      trackMouse
      trackTouch
      onSwiped={() => {}}
    >
      <div className={className} style={style}>
        {children}
      </div>
      {swipeText.length > 0 && (
        <div
          className={cx(
            "swipeTextLabel",
            swipeText.length > 0 && swipeText.toLowerCase()
          )}
        >
          {swipeText}
        </div>
      )}
    </SwipeableViews>
  );
};

export default SwipeableCards;
