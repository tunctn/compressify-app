import electron from "electron";
import { useState } from "react";

import s from "./s.module.scss";
import { getFolderTree, formatBytes } from "../../src/helpers";
import { ChevronBottom, ChevronRight } from "../icons";
import Tippy from "@tippyjs/react";

import randomColor from "randomcolor";

const folderLeftMargin = 20;

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

const FolderTree = ({ setFilePaths, filePaths }) => {
  let { baselevel, tree } = getFolderTree(filePaths);
  return <Tree data={tree} baselevel={baselevel} set={setFilePaths} />;
};

const Tree = ({ set, data, baselevel }) => {
  return (
    <div className={s.ft}>
      <TreeRecursive data={data} set={set} baselevel={baselevel} />
    </div>
  );
};

const File = ({ name, set, path, level, type, size, isValid }) => {
  let ext = type ? `${type.split(".")[1]}` : "?";

  const handleDoubleClick = () => electron.shell.openPath(path);
  let rgb = Object.values(
    hexToRgb(randomColor({ seed: type + " seedmebunchofagoodcolors" }))
  ).join(", ");

  return (
    <button
      className={s.ft__line}
      style={{ paddingLeft: folderLeftMargin * level + "px" }}
      onDoubleClick={handleDoubleClick}
      data-valid={isValid}
    >
      <Tippy
        content={
          <span className="tooltip tooltip-start tooltip-important">
            Invalid file type: {type}
          </span>
        }
        disabled={isValid}
        placement="bottom-start"
        delay={[0, 0]}
        duration={[0, 0]}
      >
        <span className={s.ft__labelspan}>
          {name
            .replace(type, type.toLowerCase())
            .replace(type.toUpperCase(), type.toLowerCase())}
        </span>
      </Tippy>
      <div className={s.ft__file__right}>
        <span className={s.ft__mutedtext}>{formatBytes(size)}</span>
        <span
          className={s.ft__extension}
          style={{ backgroundColor: `rgba(${rgb}, 0.15)` }}
          data-filetype={ext}
          data-valid={isValid}
        >
          {ext.toUpperCase()}
        </span>
      </div>
    </button>
  );
};

const Collapsible = ({ isOpen, children }) => {
  return (
    <div
      className={s.ft__collapsible}
      style={{ height: isOpen ? "auto" : "0" }}
    >
      {children}
    </div>
  );
};

const Folder = ({ name, children, branches, level, baselevel }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  let show = level >= 0;
  return (
    <div className={`${show ? s.ft__folder : ""}`}>
      {show && (
        <button
          className={s.ft__line}
          style={{ paddingLeft: folderLeftMargin * level + "px" }}
        >
          <div className={s.ft__labelspan}>
            <div className={s.ft__folder__labelholder}>
              <div className={s.ft__folder__left}>
                <span
                  className={`${s.ft__foldertogglebutton} reset-button`}
                  onClick={handleToggle}
                >
                  {isOpen ? <ChevronBottom /> : <ChevronRight />}
                </span>
                <span className={s.ft__folder__label}>{name}</span>
              </div>
            </div>
          </div>
        </button>
      )}

      <Collapsible isOpen={isOpen}>{children}</Collapsible>
    </div>
  );
};

Tree.File = File;
Tree.Folder = Folder;

const TreeRecursive = ({ data, set, baselevel }) => {
  return data.map((item, index) => {
    let level = item.level - baselevel - 1;
    if (item.type === "folder") {
      return (
        <Folder
          name={item.name}
          branches={item.children}
          path={item.path}
          level={level}
          key={index}
          set={set}
          size={item.size}
          index={item.index}
          baselevel={baselevel}
        >
          <TreeRecursive data={item.children} set={set} baselevel={baselevel} />
        </Folder>
      );
    } else {
      return (
        <File
          name={item.name}
          path={item.path}
          level={level}
          key={index}
          type={item.type}
          index={item.index}
          set={set}
          size={item.size}
          isValid={item.isValid}
        />
      );
    }
  });
};

export default FolderTree;
