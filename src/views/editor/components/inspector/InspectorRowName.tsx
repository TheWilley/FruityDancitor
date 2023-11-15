import { produce } from 'immer';
import { SpriteSheetFrame } from '../../../../global/types';

function InspectorRowName(props: { spriteSheetFrames: SpriteSheetFrame[], setSpriteSheetFrames: React.Dispatch<React.SetStateAction<SpriteSheetFrame[]>>, selectedRow: number }) {
    return (
        <div>
            <div className='items-center rounded mb-1'>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input value={props.spriteSheetFrames[props.selectedRow].name} type="text" placeholder="Type here" className="input input-bordered w-full" onChange={(e) => {
                        props.setSpriteSheetFrames(produce(props.spriteSheetFrames, (draft) => {
                            draft[props.selectedRow].name = e.target.value;
                        }));
                    }} />
                </div>
            </div>
        </div>
    );
}

export default InspectorRowName;