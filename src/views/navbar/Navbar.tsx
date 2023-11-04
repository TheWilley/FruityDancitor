import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faFileExport, faInfoCircle, faPen } from '@fortawesome/free-solid-svg-icons';
import EditorSettings from './components/EditorSettings';
import { IEditorSettings, IExportSettings } from '../../global/types';
import Export from './components/Export';

function Navbar(props: {editorSettings: IEditorSettings, exportSettings: IExportSettings}) {
    const [tab, setTab] = useState(0);

    const tabs = [
        {
            name: 'App Settings',
            view: <div>Tab 1</div>,
            icon: <FontAwesomeIcon icon={faCog} />
        },
        {
            name: 'Editor Settings',
            view: <EditorSettings editorSettings={props.editorSettings}/>,
            icon: <FontAwesomeIcon icon={faPen} />
        },
        {
            name: 'Export',
            view: <Export exportSettings={props.exportSettings}/>,
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
            <div tabIndex={0} className="collapse collapse-arrow border border-base-200 bg-base-100">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                    Settings & Exporting
                </div>
                <div className="collapse-content">
                    <nav>
                        <div className='tabs'>
                            {tabs.map((item, index) => (
                                <div>
                                    <div onClick={() => setTab(index)}>
                                        <span className={`tab tab-bordered ${index === tab && 'tab-active'}`}><span className='mr-1'> {item.icon} </span> {item.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='mt-3 pb-5 w-full'>
                            {tabs[tab].view}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Navbar;