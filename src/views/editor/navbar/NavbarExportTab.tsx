import useExport from '../../../hooks/utils/useExport.ts';
import { useCallback } from 'react';
import { Refs } from '../../../global/types.ts';

type Props = Pick<Refs, 'viewport'>;

/**
 * Component which allows user to export their FruityDancitor project.
 * @param props A object containing component properties.
 */
function NavbarExportTab(props: Props) {
  const { fileName, setFileName, downloadFile } = useExport();

  const download = useCallback(() => {
    downloadFile({
      filename: fileName,
      viewport: props.viewport,
    });
  }, [fileName]);

  return (
    <div>
      <input
        type='text'
        className='input input-sm input-bordered mb-1 w-full text-center'
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder='File Name...'
      />
      <button className='btn btn-success w-full' onClick={download}>
        Download
      </button>
    </div>
  );
}

export default NavbarExportTab;
