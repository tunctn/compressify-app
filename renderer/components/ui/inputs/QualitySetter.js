import Store from "electron-store";
import Tippy from "@tippyjs/react";

import { useEffect, useState } from "react";
import s from "./inputs.module.scss";

import { ChevronLeft, ChevronRight } from "../../icons";

const store = new Store();

const QualitySetter = ({ item, unlimited = false, max = 100, min = 0 }) => {
  const [quality, setQuality] = useState(parseInt(item.DEFAULT));
  max = unlimited ? undefined : max;
  min = unlimited ? undefined : min;

  const handleChange = (e) => {
    let val = parseInt(quality);

    if (e === "decrease") {
      val = val - 1;
    } else if (e === "increase") {
      val = val + 1;
    } else {
      val = e.target.value;
    }

    if (max && val >= max) val = max;
    if (min && val < min) val = min;
    setQuality(parseInt(val || ""));
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

  return (
    <Tippy
      content={<span className="tooltip">Default quality: {item.DEFAULT}</span>}
      placement="bottom"
      delay={[1200, 0]}
      duration={[0, 0]}
    >
      <div className={`${s.input} ${s.qualitySetter}`} data-focused={focused}>
        <button
          onClick={() => handleChange("decrease")}
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
          onClick={() => handleChange("increase")}
          {...(max && { disabled: quality >= max || !quality })}
        >
          <ChevronRight size={9} />
        </button>
      </div>
    </Tippy>
  );
};

export default QualitySetter;
