import { faBars, faTextHeight, faTextWidth } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IEditorSettings } from '../../../global/types';

function EditorSettings(props: {editorSettings: IEditorSettings}) {
    return (
        <div className='grid grid-cols-3 gap-2'>
            <div className="join">
                <div className='bg-base-200 join-item p-1 pl-2 pr-2'> <FontAwesomeIcon icon={faBars} /> </div>
                <div className='w-full tooltip tooltip-bottom' data-tip="Rows - The amount of rows">
                    <input type="number" className="input input-bordered join-item input-sm w-full" placeholder='Rows' min={1} value={props.editorSettings.rows} onChange={(e) => props.editorSettings.setRows(Number(e.target.value))}/>
                </div>
            </div>
            <div className="join">
                <div className='bg-base-200 join-item p-1 pl-2 pr-2'> <FontAwesomeIcon icon={faTextWidth} /> </div>
                <div className='w-full tooltip tooltip-bottom' data-tip="Width - The width of every cell">
                    <input type="number" className="input input-bordered join-item input-sm w-full" placeholder='Width' min={50} value={props.editorSettings.width} onChange={(e) => props.editorSettings.setWidth(Number(e.target.value))} />
                </div>
            </div>
            <div className="join">
                <div className='bg-base-200 join-item p-1 pl-2 pr-2'> <FontAwesomeIcon icon={faTextHeight} /> </div>
                <div className='w-full tooltip tooltip-bottom' data-tip="Height - The height of every cell">
                    <input type="number" className="input input-bordered join-item input-sm w-full" placeholder='Height' min={50} value={props.editorSettings.height} onChange={(e) => props.editorSettings.setHeight(Number(e.target.value))} />
                </div>
            </div>
        </div>
    );
}

export default EditorSettings;