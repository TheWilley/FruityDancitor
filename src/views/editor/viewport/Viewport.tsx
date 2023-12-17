import { memo, useRef } from 'react';
import Card from '../../../components/Card.tsx';
import { EditorData, EditorSettings } from '../../../global/types.ts';
import useViewport from '../../../hooks/utils/useViewport.ts';
import opaque from '../../../media/opaque.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

type Props = Pick<EditorData, 'viewport' | 'spriteSheetSequences'> &
  Pick<EditorSettings, 'numberOfSequences' | 'height' | 'width'>;

/**
 * Component which show the sprite sheet.
 */
function Viewport(props: Props) {
  const grid = useRef<HTMLCanvasElement>(null);
  const { width, height, toggleDontHideGrid, dontHideGrid } = useViewport(
    grid,
    props.viewport,
    props.numberOfSequences,
    props.height,
    props.width,
    props.spriteSheetSequences
  );

  return (
    <>
      <Card className='w-full h-full'>
        <div className='overflow-auto m-auto relative group'>
          <div>
            {dontHideGrid ? (
              <FontAwesomeIcon
                icon={faLock}
                className='absolute text-2xl left-0 right-0 top-3 m-auto z-10 opacity-0 group-hover:opacity-100 bg-base-300 p-3 rounded'
              />
            ) : (
              <FontAwesomeIcon
                icon={faUnlock}
                className='absolute text-2xl left-0 right-0 top-3 m-auto z-10 opacity-0 group-hover:opacity-100 bg-base-300 p-3 rounded'
              />
            )}
          </div>
          <canvas
            ref={props.viewport}
            width={width}
            height={height}
            style={{ background: `url(${opaque})` }}
          />
          <canvas
            ref={grid}
            width={width}
            height={height}
            onClick={() => toggleDontHideGrid()}
            className='top-0 absolute cursor-pointer'
          />
        </div>
      </Card>
    </>
  );
}

export default memo(Viewport);
