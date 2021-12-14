import Store from "electron-store";

import { useEffect, useState } from "react";
import { Checkmark as Icon } from "../../icons";
import s from "./buttons.module.scss";

const store = new Store();

const Checkmark = ({
  label = "Checkmark",
  name = "",
  defaultValue,
  ...props
}) => {
  const [bool, setBool] = useState(defaultValue);

  const toggle = () => {
    setBool(!bool);
    store.set(name, !bool);
  };

  useEffect(() => {
    let val = store.get(name);
    setBool(val);
  }, []);

  const checked = `${bool ? "true" : "false"}` === "true";

  return (
    <div className={s.checkmark}>
      <button
        className={`${s.button} ${checked ? s.checked : ""}`}
        id={name}
        onClick={toggle}
        {...props}
      >
        <span className={s.icon}>{checked ? <Icon /> : ""}</span>
      </button>
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default Checkmark;
