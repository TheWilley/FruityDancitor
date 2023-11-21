import { useRef } from 'react';
import usePreview from '../../../../hooks/utils/UsePreview.ts';
import { EditorData, EditorSettings } from '../../../../global/types';

type Props = Pick<EditorData, 'selectedSequence' | 'viewport'> &
  Pick<EditorSettings, 'width' | 'height'>;

function InspectorPreview(props: Props) {
  const previewRef = useRef(null);
  const [currentFrame] = usePreview(
    previewRef.current,
    props.viewport.value,
    props.selectedSequence.value,
    props.width.value,
    props.height.value
  );

  return (
    <div className='flex justify-center'>
      <div className='p-5 bg-base-300 text-center'>
        <canvas ref={previewRef} width={100} height={100} className='border'></canvas>
        {currentFrame}
      </div>
    </div>
  );
}

export default InspectorPreview;
