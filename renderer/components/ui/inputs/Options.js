import Store from "electron-store";
import Tippy from "@tippyjs/react";

import { useEffect, useState, useRef } from "react";
import s from "./inputs.module.scss";
import { ChevronBottom, ChevronLeft, ChevronRight } from "../../icons";

import * as Dropdown from "@radix-ui/react-dropdown-menu";

const store = new Store();

const Options = ({ item, options }) => {
  const [selected, setSelected] = useState(item.DEFAULT.VALUE);
  const triggerRef = useRef();
  useEffect(() => {
    let stored = store.get(item.NAME);
    let storedOption = Object.values(options).find((o) => {
      return o.KEY === stored;
    });
    let val = storedOption?.VALUE || item.DEFAULT.VALUE;
    setSelected(val);
  }, []);

  const [open, setOpen] = useState(false);
  const handleSelect = (option) => {
    setOpen(false);
    setSelected(option.VALUE);
    store.set(item.NAME, option.KEY);
  };

  return (
    <Dropdown.Root onOpenChange={setOpen}>
      <Dropdown.Trigger
        className={`${s.input} ${s.options}`}
        data-open={open}
        id={item.NAME}
        ref={triggerRef}
      >
        <Tippy
          content={
            <span className="tooltip">Default: {item.DEFAULT.VALUE}</span>
          }
          placement="bottom"
          delay={[1200, 0]}
          duration={[0, 0]}
        >
          <div>
            <span>{selected}</span>
            <span>
              <ChevronBottom size={9} />
            </span>
          </div>
        </Tippy>
      </Dropdown.Trigger>
      <Dropdown.Content
        className={s.options_content}
        align="start"
        style={{ width: triggerRef?.current?.offsetWidth || "" }}
      >
        {options &&
          Object.values(options).map((option) => {
            return (
              <Dropdown.Item
                key={option.KEY}
                className={s.options_item}
                onClick={() => handleSelect(option)}
              >
                {option.VALUE}
              </Dropdown.Item>
            );
          })}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

export default Options;
