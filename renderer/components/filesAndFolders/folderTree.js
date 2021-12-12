import { useState } from "react";

import s from "./s.module.scss";
import { getFolderTree, formatBytes } from "../../src/helpers";
import { ChevronBottom, ChevronRight } from "../icons";

const folderLeftMargin = 20;

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

const handleRemove = (set, path) => {
  // set((current) => {
  //   let c = [...current];
  //   let index = c.indexOf(path);
  //   if (index > -1) {
  //     c.splice(index, 1);
  //   }
  //   return c;
  // });
};

const File = ({ name, set, path, index, level, type, size }) => {
  let ext = type ? `${type.split(".")[1]}` : "?";

  const handleDoubleClick = () => {};
  return (
    <button
      className={`
				${s.ft__line}
				${index % 2 ? s.ft__even : ""}
				${s.ft__file}
			`}
      style={{ paddingLeft: folderLeftMargin * level + "px" }}
      onClick={() => handleRemove(set, path)}
      onDoubleClick={handleDoubleClick}
    >
      <span className={s.ft__labelspan}>{name}</span>
      <div className={s.ft__file__right}>
        <span className={s.ft__mutedtext}>{formatBytes(size)}</span>
        <span className={s.ft__extension} data-filetype={ext}>
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

const Folder = ({
  name,
  set,
  path,
  children,
  branches,
  index,
  level,
  size,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const hasFile = branches.find((branch) => branch.type !== "folder");
  // const hasFile = true;
  return (
    <div className={`${hasFile ? s.ft__folder : ""}`}>
      {hasFile && (
        <button
          className={`
						${s.ft__line}
						${index % 2 ? s.ft__even : ""}
					`}
          style={{ paddingLeft: folderLeftMargin * level + "px" }}
        >
          <div className={s.ft__labelspan}>
            <div className={s.ft__folder__label}>
              <div className={s.ft__folder__left}>
                <span
                  className={`${s.ft__foldertogglebutton} reset-button`}
                  onClick={handleToggle}
                >
                  {isOpen ? <ChevronBottom /> : <ChevronRight />}
                </span>
                {name}
              </div>

              {/* <span className={s.ft__mutedtext}>{branches.length} items</span> */}
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
        >
          {/* Call the <TreeRecursive /> component with the current item.children */}
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
        />
      );
    }
  });
};

export default FolderTree;
