import { useRef } from 'react';
import usePreview from '../../../hooks/utils/UsePreview.ts';
import opaque from '../../../media/opaque.jpeg';
import { Refs } from '../../../global/types.ts';

type Props = Pick<Refs, 'viewport'>;
/**
 * Component which represents a preview of a given sequence.
 *
 * Goes through all frames in the sequence one by one, showing what the sprite sheet will look like within FL Studio.
 * @param props A object containing component properties.
 */
function InspectorPreview(props: Props) {
  const previewRef = useRef(null);
  const [currentFrame] = usePreview(previewRef.current, props.viewport.current);

  return (
    <div className='flex justify-center bg-base-300'>
      <div className='p-5 text-center'>
        <canvas
          ref={previewRef}
          width={100}
          height={100}
          className='border'
          style={{ background: `url(${opaque})` }}
        ></canvas>
        {currentFrame}
      </div>
    </div>
  );
}

export default InspectorPreview;
