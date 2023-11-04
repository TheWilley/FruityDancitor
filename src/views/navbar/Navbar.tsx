import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faFileExport, faInfoCircle, faPen } from '@fortawesome/free-solid-svg-icons';
import EditorSettings from './components/EditorSettings';
import { IEditorSettings, IExportSettings } from '../../global/types';
import Export from './components/Export';

function Navbar(props: { editorSettings: IEditorSettings, exportSettings: IExportSettings }) {
    const [tab, setTab] = useState(0);
    const [hidden, setHidden] = useState(false);

    const tabs = [
        {
            name: 'App Settings',
            view: <div>Tab 1</div>,
            icon: <FontAwesomeIcon icon={faCog} />
        },
        {
            name: 'Editor Settings',
            view: <EditorSettings editorSettings={props.editorSettings} />,
            icon: <FontAwesomeIcon icon={faPen} />
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