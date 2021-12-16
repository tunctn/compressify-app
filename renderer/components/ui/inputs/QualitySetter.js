import Store from "electron-store";
import Tippy from "@tippyjs/react";

import { useEffect, useState, useRef } from "react";
import s from "./inputs.module.scss";

import { ChevronLeft, ChevronRight } from "../../icons";

const store = new Store();

const findClosest = (counts, goal) => {
  return counts.reduce(function (prev, curr) {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
};

const QualitySetter = ({
  item,
  qualityLabel = "Default quality: %j",
  unlimited = false,
  max = 100,
  min = 0,
  steps = 1,
  fastSteps = 1,
  disableHoldPress = false,
  preSteps = [],
}) => {
  const intervalRef = useRef(null);

  const [quality, setQuality] = useState(parseInt(item.DEFAULT));
  max = unlimited ? undefined : max;
  min = unlimited ? undefined : min;

  const handleChange = (e) => {
    let val = parseInt(quality);

    if (e === "decrease") {
      val = val - steps;
      if (preSteps.length > 0) {
        let closest = findClosest(preSteps, val);
        let destination = preSteps.findIndex((s) => s === closest);
        if (destination >= 1) destination = destination - 1;
        val = preSteps[destination];
      }
    } else if (e === "increase") {
      val = val + steps;
      if (preSteps.length > 0) {
        let closest = findClosest(preSteps, val);
        let destination = preSteps.findIndex((s) => s === closest);
        if (destination <= preSteps.length - 2) destination = destination + 1;
        val = preSteps[destination];
      }
    } else {
      val = e.target.value;
    }

    if (max && val >= max) val = max;
    if ((min || `${min}` === `0`) && val < min) val = min;

    setQuality(val === 0 ? 0 : parseInt(val || ""));
    store.set(item.NAME, parseInt(val || 0));
  };

  useEffect(() => {
    let val = store.get(item.NAME) || item.DEFAULT;
    setQuality(val);
  }, []);

  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    e.target.select();
    setFocused(true);
  };
  const handleBlur = (e) => {
    if (e.target.value === "") {
      let val = item.DEFAULT;
      setQuality(val);
      store.set(item.NAME, val);
    }
    setFocused(false);
  };

  useEffect(() => {
    return () => stopCounter(); // when App is unmounted we should stop counter
  }, []);

  const startCounter = (action) => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      if (action === "decrease") {
        setQuality((prevQuality) => {
          let val = prevQuality - fastSteps;
          if ((min || `${min}` === `0`) && val < min) val = min;
          if (val === min) {
            stopCounter();
          }
          return val === 0 ? 0 : parseInt(val || "");
        });
      } else if (action === "increase") {
        setQuality((prevQuality) => {
          let val = prevQuality + fastSteps;
          if (max && val >= max) val = max;
          if (val === max) {
            stopCounter();
          }
          return val === 0 ? 0 : parseInt(val || "");
        });
      }
    }, 50);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      store.set(item.NAME, parseInt(quality || 0));
    }
  };

  return (
    <Tippy
      content={
        <span className="tooltip">
          {qualityLabel.replace("%j", item.DEFAULT)}
        </span>
      }
      placement="bottom"
      delay={[1200, 0]}
      duration={[0, 0]}
    >
      <div className={`${s.input} ${s.qualitySetter}`} data-focused={focused}>
        <button
          {...(disableHoldPress === true
            ? {
                onClick: () => handleChange("decrease"),
              }
            : {
                onMouseDown: () => startCounter("decrease"),
                onMouseUp: (e) => stopCounter(e),
                onMouseLeave: (e) => stopCounter(e),
              })}
          {...(min && { disabled: quality >= min || !quality })}
        >
          <ChevronLeft size={9} />
        </button>
        <input
          type="number"
          onChange={(e) => handleChange(e)}
          value={`${quality}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          max={max}
          min={min}
        />
        <button
          {...(disableHoldPress === true
            ? {
                onClick: () => handleChange("increase"),
              }
            : {
                onMouseDown: () => startCounter("increase"),
                onMouseUp: (e) => stopCounter(e),
                onMouseLeave: (e) => stopCounter(e),
              })}
          {...(max && { disabled: quality >= max || !quality === `` })}
        >
          <ChevronRight size={9} />
        </button>
      </div>
    </Tippy>
  );
};

export default QualitySetter;
