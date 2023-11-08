import useSaveAndLoad from '../../../hooks/useSaveAndLoad';
import { ISaveAndLoadSettings } from '../../../utils/settingsHelper';

function SaveAndLoad(props: {saveAndLoadSettings: ISaveAndLoadSettings}) {
    const [save, load] = useSaveAndLoad();
    const {frames, rows, width, height} = props.saveAndLoadSettings;

    return (
        <div>
            <button className="btn btn-outline btn-warning w-full" onClick={() => load()}> Load </button>
            <button className="btn btn-outline btn-success w-full mt-1" onClick={() => save(frames, rows, width, height)}> Save </button>
        </div>
    );
}

export default SaveAndLoad;