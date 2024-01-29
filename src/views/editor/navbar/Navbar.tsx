import { faCog, faFileExport, faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import NavbarAppSettingsTab from './NavbarAppSettingsTab.tsx';
import NavbarEditorSettingsTab from './NavbarEditorSettingsTab.tsx';
import NavbarExportTab from './NavbarExportTab.tsx';
import NavbarSaveAndLoadTab from './NavbarSaveAndLoadTab.tsx';
import { Refs } from '../../../global/types.ts';

type Props = Pick<Refs, 'viewport'>;

/**
 * Component which represents a navbar which the user can use to navigate to different tabs.
 * @param props A object containing component properties.
 */
function Navbar(props: Props) {
  const [tab, setTab] = useState(0);
  const [hidden, setHidden] = useState(false);

  const tabs = [
    {
      name: 'App Settings',
      view: <NavbarAppSettingsTab />,
      icon: <FontAwesomeIcon icon={faCog} />,
    },
    {
      name: 'Editor Settings',
      view: <NavbarEditorSettingsTab />,
      icon: <FontAwesomeIcon icon={faPen} />,
    },
    {
      name: 'Save & Load',
      view: <NavbarSaveAndLoadTab />,
      icon: <FontAwesomeIcon icon={faSave} />,
    },
    {
      name: 'Export',
      view: <NavbarExportTab viewport={props.viewport} />,
      icon: <FontAwesomeIcon icon={faFileExport} />,
    },
  ];

  /**
   * Renders all tabs.
   */
  const renderTabs = () => {
    /**
     * Shows a given tab depending on which tab the user clicks.
     * @param index The index of the tab to display.
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
