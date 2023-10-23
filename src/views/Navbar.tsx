import CardL1 from '../Components/CardL1';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faFileExport, faInfoCircle, faPen } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const [tab, setTab] = useState(0);

    const tabs = [
        {
            name: 'App Settings',
            view: <div></div>,
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
        <CardL1 className='mb-2 w-full'>
            <nav>
                <ul className='flex border-b-2 border-gray-dark border-opacity-30 justify-between pb-2'>
                    {tabs.map((item, index) => {
                        // Check if the current index represent the current tab
                        const currentTab = index === tab;

                        // Create a onclick handler to set tab index 
                        const onclick = () => setTab(index);

                        // Classes for a item in the navbar
                        const itemClasses = [
                            'hover:cursor-pointer',
                            'text-gray-light dark:text-gray-dark',
                        ];

                        // Classes for the border of a item in the navbar
                        const borderClasses = [
                            currentTab ? 'border-b-2 border-b-blue-light !text-blue-light pb-2' : '',

                        ];

                        return (
                            <div>
                                <li onClick={onclick} className={itemClasses.join(' ')}>
                                    <span className={borderClasses.join(' ')}><span className='mr-1'> {item.icon} </span> {item.name}</span>
                                </li>
                            </div>
                        );
                    })}
                </ul>
                
                <div className='mt-3'>
                    {tabs[tab].view}
                </div>
            </nav>
        </CardL1>
    );
}

export default Navbar;