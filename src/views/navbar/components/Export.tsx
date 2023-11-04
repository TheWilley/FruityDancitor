import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IExportSettings } from '../../../global/types';
import { donwload } from '../../../utils/download';
import { faFileText } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Export(props: { exportSettings: IExportSettings }) {
    const [fileName, setFileName] = useState('');

    return (
        <div>
            <div className="join">
                <div className='bg-base-200 join-item p-1 pl-2 pr-2'> <FontAwesomeIcon icon={faFileText} /> </div>
                <div className='w-full mb-2'>
                    <input type="text" className="input input-bordered join-item input-sm w-full" value={fileName} onChange={(e) => setFileName(e.target.value)} />
                </div>
            </div>
            <button className="btn btn-outline btn-success w-full" onClick={() => donwload(props.exportSettings, fileName)}> Download </button>
        </div>
    );
}

export default Export;