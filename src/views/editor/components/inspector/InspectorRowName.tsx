import { produce } from 'immer';
import { IFrame } from '../../../../global/types';

function InspectorRowName(props: { frames: IFrame[], setFrames: React.Dispatch<React.SetStateAction<IFrame[]>>, selectedRow: number }) {
    return (
        <div>
            <div className='items-center rounded mb-1'>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input value={props.frames[props.selectedRow].name} type="text" placeholder="Type here" className="input input-bordered w-full" onChange={(e) => {
                        props.setFrames(produce(props.frames, (draft) => {
                            draft[props.selectedRow].name = e.target.value;
                        }));
                    }} />
                </div>
            </div>
        </div>
    );
}

export default InspectorRowName;