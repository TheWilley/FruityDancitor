import { List } from 'react-movable';
import CommonListItem from '../../../components/ListItem.tsx';
import useFrameList from '../../../hooks/utils/useFrameList.ts';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import {
  frameMovePosition,
  selectedFrameUpdate,
} from '../../../redux/spriteSheetSlice.ts';
import { Else, If, Then } from 'react-if';

/**
 * Component which represents the list of frames for a given sequence.
 */
function InspectorFramesList() {
  const {
    selectedSequence,
    selectedFrame,
    spriteSheetSequences,
    modifyAllFrames,
    numberOfFrames,
  } = useAppSelector((state) => state.spriteSheet);
  const dispatch = useAppDispatch();
  const { callback } = useFrameList();

  return (
    <If condition={spriteSheetSequences[selectedSequence].sequence.length}>
      <Then>
        <List
          values={spriteSheetSequences[selectedSequence].sequence}
          onChange={({ oldIndex, newIndex }) => {
            dispatch(frameMovePosition({ from: oldIndex, to: newIndex }));
            dispatch(selectedFrameUpdate(newIndex));
          }}
          renderList={({ children, props }) => <ul {...props}>{children}</ul>}
          renderItem={({ value, props, index }) => (
            <>
              <li
                {...props}
                onMouseDown={() => dispatch(selectedFrameUpdate(index || 0))}
                className={`z-30 ${Number(index) > numberOfFrames - 1 && 'opacity-50'}`}
              >
                <CommonListItem
                  {...props}
                  objectURL={value.objectURL}
                  text={`Frame ${(index || 0) + 1}`}
                  alt=''
                  trashClickedCallback={() => callback(index || 0)}
                  highlighted={selectedFrame === index || modifyAllFrames === true}
                  includeTrash
                />
              </li>
            </>
          )}
        />
      </Then>
      <Else>
        <div className='text-center'>
          <i> No uploaded frames </i>
        </div>
      </Else>
    </If>
  );
}

export default InspectorFramesList;
