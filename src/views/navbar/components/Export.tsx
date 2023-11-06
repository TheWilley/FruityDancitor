import { IExportSettings } from '../../../global/types';
import { donwload } from '../../../utils/download';
import { useState } from 'react';

function Export(props: { exportSettings: IExportSettings }) {
    const [fileName, setFileName] = useState('');

    return (
        <div>
            <input type="text" className="input input-bordered mb-1 input-sm w-full text-center" value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder='File Name...' />
            <button className="btn btn-outline btn-success w-full" onClick={() => donwload(props.exportSettings, fileName)}> Download </button>
        </div>
    );
}

export default Export;