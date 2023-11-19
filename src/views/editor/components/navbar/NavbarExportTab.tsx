import {ExportSettings} from '../../../../global/types';
import useExport from '../../../../hooks/useExport';

type Props = { exportSettings: ExportSettings }

function NavbarExportTab(props: Props) {
    const [fileName, setFileName, downloadFile] = useExport();

    return (
        <div>
            <input type="text" className="input input-bordered mb-1 input-sm w-full text-center" value={fileName}
                   onChange={(e) => setFileName(e.target.value)} placeholder="File Name..."/>
            <button className="btn btn-outline btn-success w-full"
                    onClick={() => downloadFile({filename: fileName, spriteSheetFrames: props.exportSettings.spriteSheetFrames, viewport: props.exportSettings.viewport})}> Download
            </button>
        </div>
    );
}

export default NavbarExportTab;