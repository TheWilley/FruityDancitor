import { memo, useRef } from 'react';
import Card from '../../../components/Card.tsx';
import useViewport from '../../../hooks/utils/useViewport.ts';
import opaque from '../../../media/opaque.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { Refs } from '../../../global/types.ts';

type Props = Pick<Refs, 'viewport'>;

/**
 * Component which show the sprite sheet.
 * @param props A object containing component properties.
 */
function Viewport(props: Props) {
  const grid = useRef<HTMLCanvasElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const {
    width,
    height,
    togglePermanentlyShowGrid,
    permanentlyShowGrid,
    toggleShowGrid,
    showGrid,
  } = useViewport(grid, overlay, props.viewport);

  return (
    <>
      <Card className='h-full p-3'>
        <div>
          {showGrid &&
            (permanentlyShowGrid ? (
              <FontAwesomeIcon
                icon={faLock}
                className='absolute inset-x-0 top-3 z-10 m-auto rounded bg-base-300 p-3 text-2xl'
              />
            ) : (
              <FontAwesomeIcon
                icon={faUnlock}
                className='absolute inset-x-0 top-3 z-10 m-auto rounded bg-base-300 p-3 text-2xl'
              />
            ))}
        </div>
        <div className='relative m-auto'>
          <canvas
            ref={props.viewport}
            width={width}
            height={height}
            style={{ background: `url(${opaque})` }}
          />
          <div
            ref={overlay}
            style={{ width, height, background: `url(${opaque})` }}
            className='absolute top-0 cursor-pointer'
          />
          <canvas
            ref={grid}
            width={width}
            height={height}
            onClick={() => togglePermanentlyShowGrid()}
            onMouseOver={() => toggleShowGrid(true)}
            onMouseLeave={() => toggleShowGrid(false)}
            className='absolute top-0 cursor-pointer opacity-0'
          />
        </div>
      </Card>
    </>
  );
}

export default memo(Viewport);
