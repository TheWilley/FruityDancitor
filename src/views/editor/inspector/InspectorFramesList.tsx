import { arrayMove, List } from 'react-movable';
import { EditorData } from '../../../global/types.ts';
import CommonListItem from '../../../components/CommonListItem.tsx';
import useFrameList from '../../../hooks/utils/useFrameList.ts';
import useKeyPress from '../../../hooks/utils/useKeyPress.ts';

type Props = Pick<
  EditorData,
  | 'selectedFrame'
  | 'setSelectedFrame'
  | 'spriteSheetSequences'
  | 'setSpriteSheetSequences'
  | 'selectedSequence'
>;

/**
 * Component which represents the list of frames for a given sequence.
 * @param EProps A object containing component properties.
 */
function InspectorFramesList(EProps: Props) {
  const { callback, adjustSequence } = useFrameList(
    EProps.spriteSheetSequences,
    EProps.setSpriteSheetSequences,
    EProps.selectedSequence,
    EProps.selectedFrame,
    EProps.setSelectedFrame
  );

  const selectFrame = (index: number) => {
    if (
      EProps.selectedFrame !== index &&
      EProps.spriteSheetSequences[EProps.selectedSequence].sequence.length > index
    ) {
      EProps.setSelectedFrame(index);
    }
  };

  // Multiple handlers to select a certain frame
  useKeyPress(['1'], ['Control'], () => selectFrame(0));
  useKeyPress(['2'], ['Control'], () => selectFrame(1));
  useKeyPress(['3'], ['Control'], () => selectFrame(2));
  useKeyPress(['4'], ['Control'], () => selectFrame(3));
  useKeyPress(['5'], ['Control'], () => selectFrame(4));
  useKeyPress(['6'], ['Control'], () => selectFrame(5));
  useKeyPress(['7'], ['Control'], () => selectFrame(6));
  useKeyPress(['8'], ['Control'], () => selectFrame(7));

  return (
    <List
      values={EProps.spriteSheetSequences[EProps.selectedSequence].sequence}
      onChange={({ oldIndex, newIndex }) => {
        adjustSequence(
          arrayMove(
            EProps.spriteSheetSequences[EProps.selectedSequence].sequence,
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
            trashClickedCallback={() => callback(index || 0)}
            highlighted={EProps.selectedFrame === index}
            includeTrash
          />
        </li>
      )}
    />
  );
}

export default InspectorFramesList;
