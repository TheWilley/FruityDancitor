import { List } from 'react-movable';
import CommonListItem from '../../../components/CommonListItem.tsx';
import useFrameList from '../../../hooks/utils/useFrameList.ts';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import {
  frameMovePosition,
  selectedFrameUpdate,
} from '../../../redux/spriteSheetSlice.ts';

/**
 * Component which represents the list of frames for a given sequence.
 */
function InspectorFramesList() {
  const { selectedSequence, selectedFrame, spriteSheetSequences } = useAppSelector(
    (state) => state.spriteSheet.present
  );
  const dispatch = useAppDispatch();
  const { callback } = useFrameList();

  return (
    <List
      values={spriteSheetSequences[selectedSequence].sequence}
      onChange={({ oldIndex, newIndex }) => {
        dispatch(frameMovePosition({ from: oldIndex, to: newIndex }));
        dispatch(selectedFrameUpdate(newIndex));
      }}
      renderList={({ children, props }) => <ul {...props}>{children}</ul>}
      renderItem={({ value, props, index }) => (
        <li
          {...props}
          onMouseDown={() => dispatch(selectedFrameUpdate(index || 0))}
          className='z-30'
        >
          <CommonListItem
            {...props}
            objectURL={value.objectURL}
            text={`Frame ${(index || 0) + 1}`}
            alt=''
            trashClickedCallback={() => callback(index || 0)}
            highlighted={selectedFrame === index}
            includeTrash
          />
        </li>
      )}
    />
  );
}

export default InspectorFramesList;
