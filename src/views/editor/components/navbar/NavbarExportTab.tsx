import useExport from '../../../../hooks/useExport';
import { IExportSettings } from '../../../../utils/settingsHelper';

function NavbarExportTab(props: { exportSettings: IExportSettings }) {
    const [fileName, setFileName, downloadFile] = useExport();

    return (
        <div>
            <input type="text" className="input input-bordered mb-1 input-sm w-full text-center" value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder='File Name...' />
            <button className="btn btn-outline btn-success w-full" onClick={() => downloadFile(props.exportSettings, fileName)}> Download </button>
        </div>
    );
}

export default NavbarExportTab;