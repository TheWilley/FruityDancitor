import { arrayMove, List } from 'react-movable';
import { EditorData } from '../../../../global/types';
import CommonListItem from '../common/CommonListItem';
import useFrameList from '../../../../hooks/utils/useFrameList.ts';

type Props = Pick<
  EditorData,
  | 'selectedFrame'
  | 'setSelectedFrame'
  | 'spriteSheetFrames'
  | 'setSpriteSheetFrames'
  | 'selectedSequence'
>;

/**
 * Component which represents the list of frames for a given sequence.
 */
function InspectorFramesList(EProps: Props) {
  const { callback, adjustSequence } = useFrameList(
    EProps.spriteSheetFrames,
    EProps.setSpriteSheetFrames,
    EProps.selectedSequence,
    EProps.selectedFrame,
    EProps.setSelectedFrame
  );

  return (
    <List
      values={EProps.spriteSheetFrames[EProps.selectedSequence].sequence}
      onChange={({ oldIndex, newIndex }) => {
        adjustSequence(
          arrayMove(
            EProps.spriteSheetFrames[EProps.selectedSequence].sequence,
            oldIndex,
            newIndex
          )
        );
        EProps.setSelectedFrame(newIndex);
      }}
      renderList={({ children, props }) => <ul {...props}>{children}</ul>}
      renderItem={({ value, props, index }) => (
        <li
          {...props}
          onMouseDown={() => EProps.setSelectedFrame(index || 0)}
          className='z-30'
        >
          <CommonListItem
            {...props}
            objectURL={value.objectURL}
            text={`Frame ${(index || 0) + 1}`}
            alt=''
            callback={() => callback(index || 0)}
            highlighted={EProps.selectedFrame === index}
            includeTrash
          />
        </li>
      )}
    />
  );
}

export default InspectorFramesList;
