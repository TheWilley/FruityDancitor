import useExport from '../../../hooks/utils/useExport.ts';
import { useCallback } from 'react';
import { useAppSelector } from '../../../redux/hooks.ts';
import { Refs } from '../../../global/types.ts';

type Props = Pick<Refs, 'viewport'>;

/**
 * Component which allows user to export their FruityDancitor project.
 * @param props A object containing component properties.
 */
function NavbarExportTab(props: Props) {
  const { downloadFile } = useExport();
  const spriteSheetSequences = useAppSelector(
    (state) => state.spriteSheet.spriteSheetSequences
  );

  const download = useCallback(() => {
    downloadFile({
      filename: 'exportedSpriteSheet',
      sequencesRetail: spriteSheetSequences,
      viewport: props.viewport,
    });
  }, []);

  return (
    <div>
      <button className='btn btn-success w-full' onClick={download}>
        Download
      </button>
    </div>
  );
}

export default NavbarExportTab;
