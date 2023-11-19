import {produce} from 'immer';
import {EditorData} from '../../../../global/types';

type Props = Pick<EditorData, 'spriteSheetFrames' | 'selectedSequence' | 'selectedFrame'>

function InspectorFrameMods(props: Props) {
    const mods = props.spriteSheetFrames.value[props.selectedSequence.value]?.sequence[props.selectedFrame.value]?.modifications || {scale: 1, xoffset: 0, yoffset: 0};

    /**
     * Resets mod params to default
     */
    const resetMods = () => {
        if (props.spriteSheetFrames.value[props.selectedSequence.value].sequence[props.selectedFrame.value]) {
            props.spriteSheetFrames.setValue((prevFrames) => produce(prevFrames, (draft) => {
                draft[props.selectedSequence.value].sequence[props.selectedFrame.value].modifications.scale = 1;
                draft[props.selectedSequence.value].sequence[props.selectedFrame.value].modifications.xoffset = 0;
                draft[props.selectedSequence.value].sequence[props.selectedFrame.value].modifications.yoffset = 0;
            }));
        }
    };

    return (
        <>
            <div>
                <label className="label">
                    <span className="label-text">Scale</span>
                </label>
                <input type="number" className="input input-md input-bordered w-full" step={0.1} min={0.1}
                       value={mods.scale}
                       onChange={(e) => props.spriteSheetFrames.setValue((prevFrames) => produce(prevFrames, (draft) => {
                           draft[props.selectedSequence.value].sequence[props.selectedFrame.value].modifications.scale = parseFloat(e.target.value);
                       }))} disabled={props.selectedFrame.value === -1}/>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="label">
                        <span className="label-text">X-Offset</span>
                    </label>
                    <input type="number" className="input input-md input-bordered w-full" value={mods.xoffset}
                           onChange={(e) => props.spriteSheetFrames.setValue((prevFrames) => produce(prevFrames, (draft) => {
                               draft[props.selectedSequence.value].sequence[props.selectedFrame.value].modifications.xoffset = parseInt(e.target.value);
                           }))} disabled={props.selectedFrame.value === -1}/>
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Y-Offset</span>
                    </label>
                    <input type="number" className="input input-md input-bordered w-full" value={mods.yoffset}
                           onChange={(e) => props.spriteSheetFrames.setValue((prevFrames) => produce(prevFrames, (draft) => {
                               draft[props.selectedSequence.value].sequence[props.selectedFrame.value].modifications.yoffset = parseInt(e.target.value);
                           }))} disabled={props.selectedFrame.value === -1}/>
                </div>
            </div>
            <button className="btn btn-md w-full mt-4" onClick={resetMods}> Reset</button>
        </>
    );
}

export default InspectorFrameMods;