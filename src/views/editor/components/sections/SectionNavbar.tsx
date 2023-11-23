import {
  faCog,
  faFileExport,
  faInfoCircle,
  faPen,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import NavbarAppSettingsTab from '../navbar/NavbarAppSettingsTab';
import NavbarEditorSettingsTab from '../navbar/NavbarEditorSettingsTab';
import NavbarExportTab from '../navbar/NavbarExportTab';
import NavbarSaveAndLoadTab from '../navbar/NavbarSaveAndLoadTab';
import NavbarInfoTab from '../navbar/NavbarInfoTab';
import {
  AppSettings,
  EditorData,
  EditorSettings,
  SaveAndLoadSettings,
} from '../../../../global/types';

type Props = {
  appSettings: AppSettings;
  editorSettings: EditorSettings;
  exportSettings: Pick<EditorData, 'spriteSheetFrames' | 'viewport'>;
  saveAndLoadSettings: SaveAndLoadSettings;
};

/**
 * Component which represents a navbar which the user can use to navigate to different tabs.
 */
function SectionNavbar(props: Props) {
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
      view: <NavbarSaveAndLoadTab saveAndLoadSettings={props.saveAndLoadSettings} />,
      icon: <FontAwesomeIcon icon={faSave} />,
    },
    {
      name: 'Export',
      view: <NavbarExportTab exportSettings={props.exportSettings} />,
      icon: <FontAwesomeIcon icon={faFileExport} />,
    },
    {
      name: 'Information',
      view: <NavbarInfoTab />,
      icon: <FontAwesomeIcon icon={faInfoCircle} />,
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
            className='mt-3 w-full h-full'
            style={{ display: hidden ? 'none' : 'block' }}
          >
            {tabs[tab].view}
          </div>
        </nav>
      </div>
    </>
  );
}

export default SectionNavbar;
