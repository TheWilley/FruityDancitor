import { memo } from 'react';
import Card from '../../../../components/Card';
import { EditorData, EditorSettings } from '../../../../global/types';
import useViewport from '../../../../hooks/utils/useViewport.ts';

type Props = {
  numberOfSequences: EditorSettings['numberOfSequences']['value'];
  height: EditorSettings['height']['value'];
  width: EditorSettings['width']['value'];
  spriteSheetFrames: EditorData['spriteSheetFrames']['value'];
  viewport: EditorData['viewport'];
};

/**
 * Component which show the sprite sheet.
 */
function SpriteSheetCanvas(props: Props) {
  const [width, height, className] = useViewport(
    props.viewport,
    props.numberOfSequences,
    props.height,
    props.width,
    props.spriteSheetFrames
  );

  return (
    <>
      <Card className='w-full h-full'>
        <div className='overflow-auto m-auto'>
          <canvas
            ref={props.viewport}
            width={width}
            height={height}
            className={className}
          />
        </div>
      </Card>
    </>
  );
}

export default memo(SpriteSheetCanvas);
