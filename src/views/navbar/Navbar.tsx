import { faCog, faFileExport, faInfoCircle, faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { IAppSettings } from '../../hooks/useAppSettings';
import { IEditorSettings } from '../../hooks/useEditorSettings';
import { IExportSettings, ISaveAndLoadSettings } from '../../utils/settingsHelper';
import AppSettings from './components/AppSettings';
import EditorSettings from './components/EditorSettings';
import Export from './components/Export';
import SaveAndLoad from './components/SaveAndLoad';

function Navbar(props: { appSettings: IAppSettings, editorSettings: IEditorSettings, exportSettings: IExportSettings, saveAndLoadSettings: ISaveAndLoadSettings }) {
    const [tab, setTab] = useState(0);
    const [hidden, setHidden] = useState(false);

    const tabs = [
        {
            name: 'App Settings',
            view: <AppSettings appSettings={props.appSettings}/>,
            icon: <FontAwesomeIcon icon={faCog} />
        },
        {
            name: 'Editor Settings',
            view: <EditorSettings editorSettings={props.editorSettings} />,
            icon: <FontAwesomeIcon icon={faPen} />
        },
        {
            name: 'Save & Load',
            view: <SaveAndLoad saveAndLoadSettings={props.saveAndLoadSettings} />,
            icon: <FontAwesomeIcon icon={faSave} />
        },
        {
            name: 'Export',
            view: <Export exportSettings={props.exportSettings} />,
            icon: <FontAwesomeIcon icon={faFileExport} />
        },
        {
            name: 'Information',
            view: <div>Tab 4</div>,
            icon: <FontAwesomeIcon icon={faInfoCircle} />
        },
    ];

    return (
        <>
            <div tabIndex={0} className="card border border-base-200 bg-base-100 p-2">
                <nav>
                    <div className='tabs tabs-boxed'>
                        {tabs.map((item, index) => (
                            <div>
                                <div
                                    onClick={() => {
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
                                    }}>
                                    <span className={`tab ${!hidden ? index === tab && 'tab-active': ''}`}><span className='mr-1'> {item.icon} </span> {item.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='mt-3 w-full h-full' style={{ display: hidden ? 'none' : 'block' }}>
                        {tabs[tab].view}
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;