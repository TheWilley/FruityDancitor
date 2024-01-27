import { useRef } from 'react';
import usePreview from '../../../hooks/utils/UsePreview.ts';
import { AppSettings, EditorData } from '../../../global/types.ts';
import opaque from '../../../media/opaque.jpeg';

type Props = Pick<EditorData, 'viewport'> & Pick<AppSettings, 'previewFps'>;
/**
 * Component which represents a preview of a given sequence.
 *
 * Goes through all frames in the sequence one by one, showing what the sprite sheet will look like within FL Studio.
 * @param props A object containing component properties.
 */
function InspectorPreview(props: Props) {
  const previewRef = useRef(null);
  const [currentFrame] = usePreview(
    previewRef.current,
    props.viewport.current,
    props.previewFps
  );

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
