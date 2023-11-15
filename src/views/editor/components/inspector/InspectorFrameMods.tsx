import { produce } from 'immer';
import { SpriteSheetFrame } from '../../../../global/types';

function InspectorFrameMods(props: { spriteSheetFrames: SpriteSheetFrame[], setSpriteSheetFrames: React.Dispatch<React.SetStateAction<SpriteSheetFrame[]>>, selectedRow: number, selectedFrame: number, setSelectedFrame: React.Dispatch<React.SetStateAction<number>> }) {
    const mods = props.spriteSheetFrames[props.selectedRow]?.sequence[props.selectedFrame]?.modifications || { scale: 1, xoffset: 0, yoffset: 0 };

    /**
     * Resets mod params to default
     */
    const resetMods = () => {
        if (props.spriteSheetFrames[props.selectedRow].sequence[props.selectedFrame]) {
            props.setSpriteSheetFrames((prevFrames) => produce(prevFrames, (draft) => {
                draft[props.selectedRow].sequence[props.selectedFrame].modifications.scale = 1;
                draft[props.selectedRow].sequence[props.selectedFrame].modifications.xoffset = 0;
                draft[props.selectedRow].sequence[props.selectedFrame].modifications.yoffset = 0;
            }));
        }
    };

    return (
        <>
            <div>
                <label className="label">
                    <span className="label-text">Scale</span>
                </label>
                <input type='number' className='input input-md input-bordered w-full' step={0.1} min={0.1} value={mods.scale} onChange={(e) => props.setSpriteSheetFrames((prevFrames) => produce(prevFrames, (draft) => {
                    draft[props.selectedRow].sequence[props.selectedFrame].modifications.scale = parseFloat(e.target.value);
                }))} disabled={props.selectedFrame === -1} />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="label">
                        <span className="label-text">X-Offset</span>
                    </label>
                    <input type='number' className='input input-md input-bordered w-full' value={mods.xoffset} onChange={(e) => props.setSpriteSheetFrames((prevFrames) => produce(prevFrames, (draft) => {
                        draft[props.selectedRow].sequence[props.selectedFrame].modifications.xoffset = parseInt(e.target.value);
                    }))} disabled={props.selectedFrame === -1} />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Y-Offset</span>
                    </label>
                    <input type='number' className='input input-md input-bordered w-full' value={mods.yoffset} onChange={(e) => props.setSpriteSheetFrames((prevFrames) => produce(prevFrames, (draft) => {
                        draft[props.selectedRow].sequence[props.selectedFrame].modifications.yoffset = parseInt(e.target.value);
                    }))} disabled={props.selectedFrame === -1} />
                </div>
            </div>
            <button className='btn btn-md w-full mt-4' onClick={resetMods}> Reset </button>
        </>
    );
}

export default InspectorFrameMods;