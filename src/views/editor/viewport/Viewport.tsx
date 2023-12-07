import { memo } from 'react';
import Card from '../../../components/Card.tsx';
import { EditorData, EditorSettings } from '../../../global/types.ts';
import useViewport from '../../../hooks/utils/useViewport.ts';

type Props = Pick<EditorData, 'viewport' | 'spriteSheetSequences'> &
  Pick<EditorSettings, 'numberOfSequences' | 'height' | 'width'>;

/**
 * Component which show the sprite sheet.
 */
function Viewport(props: Props) {
  const [width, height, className] = useViewport(
    props.viewport,
    props.numberOfSequences,
    props.height,
    props.width,
    props.spriteSheetSequences
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

export default memo(Viewport);
