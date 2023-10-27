import { faBars, faTextHeight, faTextWidth } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IEditorSettings } from '../../../global/types';

function EditorSettings(props: {editorSettings: IEditorSettings}) {
    return (
        <div className='grid grid-cols-3 gap-2 p-2 '>
            <div className="join">
                <div className='bg-base-200 join-item p-1 pl-2 pr-2'> <FontAwesomeIcon icon={faBars} /> </div>
                <div>
                    <input type="number" className="input input-bordered join-item input-sm w-full" placeholder='Rows' min={50} onChange={(e) => props.editorSettings.setRows(Number(e.target.value))}/>
                </div>
            </div>
            <div className="join">
                <div className='bg-base-200 join-item p-1 pl-2 pr-2'> <FontAwesomeIcon icon={faTextWidth} /> </div>
                <div>
                    <input type="number" className="input input-bordered join-item input-sm w-full" placeholder='Width' min={50} onChange={(e) => props.editorSettings.setWidth(Number(e.target.value))} />
                </div>
            </div>
            <div className="join">
                <div className='bg-base-200 join-item p-1 pl-2 pr-2'> <FontAwesomeIcon icon={faTextHeight} /> </div>
                <div>
                    <input type="number" className="input input-bordered join-item input-sm w-full" placeholder='Height' min={50} onChange={(e) => props.editorSettings.setHeight(Number(e.target.value))} />
                </div>
            </div>
        </div>
    );
}

export default EditorSettings;