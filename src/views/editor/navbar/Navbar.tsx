import {
  faCog,
  faFileExport,
  faKeyboard,
  faPen,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import NavbarAppSettingsTab from './NavbarAppSettingsTab.tsx';
import NavbarEditorSettingsTab from './NavbarEditorSettingsTab.tsx';
import NavbarExportTab from './NavbarExportTab.tsx';
import NavbarSaveAndLoadTab from './NavbarSaveAndLoadTab.tsx';
import {
  AppSettings,
  EditorData,
  EditorSettings,
  LoadSettings,
  SaveSettings,
} from '../../../global/types.ts';
import NavbarKeyboardShortcutsTab from './NavbarKeyboardShortcutsTab.tsx';

type Props = {
  appSettings: AppSettings;
  editorSettings: EditorSettings;
  exportSettings: Pick<EditorData, 'spriteSheetSequences' | 'viewport'>;
  saveSettings: SaveSettings;
  loadSettings: LoadSettings;
};

/**
 * Component which represents a navbar which the user can use to navigate to different tabs.
 */
function Navbar(props: Props) {
  const [tab, setTab] = useState(0);
  const [hidden, setHidden] = useState(false);

  const tabs = [
    {
      name: 'App Settings',
      view: <NavbarAppSettingsTab appSettings={props.appSettings} />,
      icon: <FontAwesomeIcon icon={faCog} />,
    },
    {
      name: 'Editor Settings',
      view: <NavbarEditorSettingsTab editorSettings={props.editorSettings} />,
      icon: <FontAwesomeIcon icon={faPen} />,
    },
    {
      name: 'Save & Load',
      view: (
        <NavbarSaveAndLoadTab
          saveSettings={props.saveSettings}
          loadSettings={props.loadSettings}
        />
      ),
      icon: <FontAwesomeIcon icon={faSave} />,
    },
    {
      name: 'Export',
      view: <NavbarExportTab exportSettings={props.exportSettings} />,
      icon: <FontAwesomeIcon icon={faFileExport} />,
    },
    {
      name: 'Keyboard Shortcuts',
      view: <NavbarKeyboardShortcutsTab />,
      icon: <FontAwesomeIcon icon={faKeyboard} />,
    },
  ];

  /**
   * Renders all tabs.
   */
  const renderTabs = () => {
    /**
     * Shows a given tab depending on which tab the user clicks.
     */
    const showTab = (index: number) => {
      if (tab === index) {
        if (hidden) {
          setHidden(false);
        } else {
          setHidden(true);
        }
      } else {
        setHidden(false);
        setTab(index);
      }
    };

    return tabs.map((item, index) => (
      <div key={index}>
        <div onClick={() => showTab(index)}>
          <span className={`tab ${!hidden ? index === tab && 'tab-active' : ''}`}>
            <span className='mr-1'> {item.icon} </span> {item.name}
          </span>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div tabIndex={0} className='card border border-base-200 bg-base-100 p-2'>
        <nav>
          <div className='tabs tabs-boxed'>{renderTabs()}</div>
          <div
            className='mt-3 w-full h-full p-2 pt-0'
            style={{ display: hidden ? 'none' : 'block' }}
          >
            {tabs[tab].view}
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
