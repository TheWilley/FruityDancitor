import { faBars, faTextHeight, faTextWidth } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditorSettings } from '../../../../global/types';

type Props = { editorSettings: EditorSettings }

function NavbarEditorSettingsTab(props: Props) {
    return (
        <div className='grid grid-cols-3 gap-2'>
            <div className="join">
                <div className='bg-base-200 join-item p-1 pl-2 pr-2'> <FontAwesomeIcon icon={faBars} /> </div>
                <div className='w-full tooltip tooltip-bottom' data-tip="Sequences - The number of Sequences">
                    <input type="number" className="input input-bordered join-item input-sm w-full" placeholder='Sequences' min={1} value={props.editorSettings.numberOfSequences.value} onChange={(e) => props.editorSettings.numberOfSequences.setValue(Number(e.target.value))}/>
                </div>
            </div>
            <div className="join">
                <div className='bg-base-200 join-item p-1 pl-2 pr-2'> <FontAwesomeIcon icon={faTextWidth} /> </div>
                <div className='w-full tooltip tooltip-bottom' data-tip="Width - The width of every cell">
                    <input type="number" className="input input-bordered join-item input-sm w-full" placeholder='Width' min={50} value={props.editorSettings.width.value} onChange={(e) => props.editorSettings.width.setValue(Number(e.target.value))} />
                </div>
            </div>
            <div className="join">
                <div className='bg-base-200 join-item p-1 pl-2 pr-2'> <FontAwesomeIcon icon={faTextHeight} /> </div>
                <div className='w-full tooltip tooltip-bottom' data-tip="Height - The height of every cell">
                    <input type="number" className="input input-bordered join-item input-sm w-full" placeholder='Height' min={50} value={props.editorSettings.height.value} onChange={(e) => props.editorSettings.height.setValue(Number(e.target.value))} />
                </div>
            </div>
        </div>
    );
}

export default NavbarEditorSettingsTab;