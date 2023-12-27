import { ExportSettings } from '../../../global/types.ts';
import useExport from '../../../hooks/utils/useExport.ts';
import { useCallback } from 'react';

type Props = { exportSettings: ExportSettings };

/**
 * Component which allows user to export their FruityDancitor project.
 * @param props A object containing component properties.
 */
function NavbarExportTab(props: Props) {
  const [fileName, setFileName, downloadFile] = useExport();
  const download = useCallback(() => {
    downloadFile({
      filename: fileName,
      spriteSheetSequences: props.exportSettings.spriteSheetSequences,
      viewport: props.exportSettings.viewport,
    });
  }, []);

  return (
    <div>
      <input
        type='text'
        className='input input-bordered mb-1 input-sm w-full text-center'
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder='File Name...'
      />
      <button className='btn btn-success w-full' onClick={download}>
        {' '}
        Download
      </button>
    </div>
  );
}

export default NavbarExportTab;
