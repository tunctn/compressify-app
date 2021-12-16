import electron from "electron";

import { useState, useEffect } from "react";
import s from "./s.module.scss";

const Store = require("electron-store");
const store = new Store();

import { Dir } from "../icons";
import { TYPES, SETTINGS } from "../../contants";

import { Checkmark } from "../ui/buttons";
import { Options, QualitySetter } from "../ui/inputs";

const Settings = () => {
  const [folder, setFolder] = useState("");
  useEffect(() => {
    let f = store.get(SETTINGS.OUTPUT.DIR.NAME) || SETTINGS.OUTPUT.DIR.DEFAULT;
    setFolder(f);
  }, []);
  const handleFolderSelect = async () => {
    const dialog = window.Electron.dialog;
    let properties = ["dontAddToRecent", "createDirectory", "openDirectory"];

    let folder = await dialog
      .showOpenDialog({
        buttonLabel: `Select folder`,
        properties: properties,
      })
      .then((result) => result)
      .catch(console.log);

    if (folder.canceled) return;

    folder = folder.filePaths[0];
    setFolder(folder);
    store.set(SETTINGS.OUTPUT.DIR.NAME, folder);
  };

  const handleFolderOpen = (e) => {
    e.preventDefault();
    if (folder) {
      electron.shell.openPath(folder);
    }
  };

  return (
    <div className={`area ${s.settingsarea}`}>
      <div className="area-title">Settings</div>
      <div className="area-scrollable">
        {/* Output */}
        <div className={s.area}>
          <div className={s.title}>Output</div>
          <div className={s.output}>
            {/* Output dir */}
            <div className={s.dir} onClick={handleFolderSelect}>
              <span className={s.foldername} onDoubleClick={handleFolderOpen}>
                {folder.split("/").pop()}
                <span className={s.tooltip}>{folder}</span>
              </span>
              <button>
                <Dir />
              </button>
            </div>

            <div className={s.checks}>
              <div className={s.check} data-disabled="true">
                <Checkmark
                  label="Deal with duplicate files"
                  name={SETTINGS.OUTPUT.DEAL_WITH_DUPLICATE.NAME}
                  defaultValue={SETTINGS.OUTPUT.DEAL_WITH_DUPLICATE.DEFAULT}
                />
              </div>
              <div className={s.check} data-disabled="true">
                <Checkmark
                  label="Delete logs after finished"
                  name={SETTINGS.OUTPUT.DELETE_LOGS_AFTER_FINISHED.NAME}
                  defaultValue={
                    SETTINGS.OUTPUT.DELETE_LOGS_AFTER_FINISHED.DEFAULT
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Compression settings */}
        <div className={s.areainfo}>Compression</div>

        {/* Image */}
        <div className={s.area}>
          <div className={s.titleflex}>
            <div className={s.title}>Image</div>
            <Checkmark
              label=""
              name={SETTINGS.IMAGE.ENABLED.NAME}
              defaultValue={SETTINGS.IMAGE.ENABLED.DEFAULT}
            />
          </div>
          <div className={s.settings}>
            {Object.entries(SETTINGS.IMAGE.QUALITY).map(([key, val]) => {
              return (
                <div className={s.setting} key={key}>
                  <div className={s.label}>{key}</div>
                  <div className={s.val}>
                    <QualitySetter item={val} />
                  </div>
                </div>
              );
            })}

            <div className={s.setting}>
              <div className={s.label}>Resize</div>
              <div className={s.val}>
                <Checkmark
                  label=""
                  name={SETTINGS.IMAGE.RESIZE.ENABLED.NAME}
                  defaultValue={SETTINGS.IMAGE.RESIZE.ENABLED.DEFAULT}
                />
              </div>
            </div>

            <div className={s.setting}>
              <div className={s.label}>Resize max width</div>
              <div className={s.val}>
                <QualitySetter
                  item={SETTINGS.IMAGE.RESIZE.MAX_WIDTH}
                  qualityLabel="Default max width: %j pixels"
                  max={7680}
                  disableHoldPress={true}
                  preSteps={[360, 480, 720, 1366, 1920, 2560, 3840, 7680]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Raw */}
        <div className={s.area}>
          <div className={s.titleflex}>
            <div className={s.title}>RAW</div>
            <Checkmark
              label=""
              name={SETTINGS.RAW.ENABLED.NAME}
              defaultValue={SETTINGS.RAW.ENABLED.DEFAULT}
            />
          </div>
          <div className={s.settings}>
            {/* <div className={s.setting}>
              <div className={s.label}>RAW quality</div>
              <div className={s.val}>
                <QualitySetter item={SETTINGS.RAW.QUALITY} />
              </div>
            </div> */}
            <div className={s.setting}>
              <div className={s.label}>Convert to</div>
              <div className={s.val}>
                <Options
                  item={SETTINGS.RAW.CONVERT_TO}
                  options={SETTINGS.RAW.CONVERT_TO.OPTIONS}
                />
              </div>
            </div>

            <div className={s.setting}>
              <div className={s.label}>Resize</div>
              <div className={s.val}>
                <Checkmark
                  label=""
                  name={SETTINGS.RAW.RESIZE.ENABLED.NAME}
                  defaultValue={SETTINGS.RAW.RESIZE.ENABLED.DEFAULT}
                />
              </div>
            </div>

            <div className={s.setting}>
              <div className={s.label}>Resize max width</div>
              <div className={s.val}>
                <QualitySetter
                  item={SETTINGS.RAW.RESIZE.MAX_WIDTH}
                  qualityLabel="Default max width: %j pixels"
                  max={7680}
                  disableHoldPress={true}
                  preSteps={[360, 480, 720, 1366, 1920, 2560, 3840, 7680]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Video */}
        <div className={s.area}>
          <div className={s.titleflex}>
            <div className={s.title}>Video</div>
            <Checkmark
              label=""
              name={SETTINGS.VIDEO.ENABLED.NAME}
              defaultValue={SETTINGS.VIDEO.ENABLED.DEFAULT}
            />
          </div>
          <div className={s.settings}>
            <div className={s.setting}>
              <div className={s.label}>Birate</div>
              <div className={s.val}>
                <QualitySetter
                  item={SETTINGS.VIDEO.BITRATE}
                  unlimited
                  min={0}
                  steps={100}
                  fastSteps={10}
                />
              </div>
            </div>
            <div className={s.setting}>
              <div className={s.label}>Quality</div>
              <div className={s.val}>
                <QualitySetter item={SETTINGS.VIDEO.QUALITY} />
              </div>
            </div>

            <div className={s.setting}>
              <div className={s.label}>Preset</div>
              <div className={s.val}>
                <Options
                  item={SETTINGS.VIDEO.PRESET}
                  options={SETTINGS.VIDEO.PRESET.OPTIONS}
                />
              </div>
            </div>

            <div className={s.setting}>
              <div className={s.label}>Convert</div>
              <div className={s.val}>
                <Checkmark
                  label=""
                  name={SETTINGS.VIDEO.ENABLED.NAME}
                  defaultValue={SETTINGS.VIDEO.ENABLED.DEFAULT}
                />
              </div>
            </div>

            <div className={s.setting}>
              <div className={s.label}>Convert to</div>
              <div className={s.val}>
                <Options
                  item={SETTINGS.VIDEO.CONVERT.TO}
                  options={SETTINGS.VIDEO.CONVERT.TO.OPTIONS}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
