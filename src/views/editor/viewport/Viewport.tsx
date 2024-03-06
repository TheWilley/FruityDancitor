import { memo, useRef } from 'react';
import Card from '../../../components/Card.tsx';
import useViewport from '../../../hooks/utils/useViewport.ts';
import opaque from '../../../media/opaque.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { Refs } from '../../../global/types.ts';
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch';

type Props = Pick<Refs, 'viewport'>;

/**
 * Component which show the sprite sheet.
 * @param props A object containing component properties.
 */
function Viewport(props: Props) {
  const container = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLCanvasElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const {
    width,
    height,
    togglePermanentlyShowGrid,
    permanentlyShowGrid,
    toggleShowGrid,
    showGrid,
  } = useViewport(grid, overlay, props.viewport, transformComponentRef, container);

  return (
    <>
      <Card className='h-full overflow-hidden p-3'>
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
        <div className='flex h-full justify-center items-center' ref={container}>
          <TransformWrapper
            ref={transformComponentRef}
            minScale={0.1}
            centerZoomedOut={true}
          >
            <TransformComponent wrapperStyle={{ overflow: 'visible' }}>
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
            </TransformComponent>
          </TransformWrapper>
        </div>
      </Card>
    </>
  );
}

export default memo(Viewport);
