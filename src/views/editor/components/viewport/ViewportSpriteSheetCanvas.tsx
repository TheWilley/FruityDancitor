import { memo, useRef } from 'react';
import Card from '../../../../components/Card';
import { EditorData, EditorSettings } from '../../../../global/types';
import useViewport from '../../../../hooks/utils/useViewport.ts';

type Props = {
  numberOfSequences: EditorSettings['numberOfSequences']['value'];
  height: EditorSettings['height']['value'];
  width: EditorSettings['width']['value'];
  spriteSheetFrames: EditorData['spriteSheetFrames']['value'];
  viewport: EditorData['viewport']['setValue'];
};

/**
 * Component which show the sprite sheet.
 */
function SpriteSheetCanvas(props: Props) {
  const viewportRef = useRef<HTMLCanvasElement>(null);
  const [width, height, className] = useViewport(
    viewportRef,
    props.numberOfSequences,
    props.height,
    props.width,
    props.spriteSheetFrames,
    props.viewport
  );

  return (
    <>
      <Card className='w-full h-full'>
        <div className='overflow-auto m-auto'>
          <canvas ref={viewportRef} width={width} height={height} className={className} />
        </div>
      </Card>
    </>
  );
}

export default memo(SpriteSheetCanvas);
