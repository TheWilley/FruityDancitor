import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faFileExport, faInfoCircle, faPen } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const [tab, setTab] = useState(0);

    const tabs = [
        {
            name: 'App Settings',
            view: <div>Tab 1</div>,
            icon: <FontAwesomeIcon icon={faCog} />
        },
        {
            name: 'Editor Settings',
            view: <div>Tab 2</div>,
            icon: <FontAwesomeIcon icon={faPen} />
        },
        {
            name: 'Export',
            view: <div>Tab 3</div>,
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
            <div tabIndex={0} className="collapse collapse-arrow border border-base-200 bg-base-100 mb-2">
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
                                        <span className={`tab tab-bordered ${index === tab && 'tab-active text-primary !border-primary'}`}><span className='mr-1'> {item.icon} </span> {item.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='mt-3'>
                            {tabs[tab].view}
                        </div>
                    </nav>
                </div>
            </div>
        </>

    );
}

export default Navbar;