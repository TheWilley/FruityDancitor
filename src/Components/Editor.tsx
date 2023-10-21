import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function Editor() {
    return (
        <div className="grid grid-cols-[20%_60%_20%] gap-1" style={{height: 'calc(100vh - 40px)'}}>
            <div className='bg-gray-800 rounded p-1 min-h-full'>
                <ul className='h-full overflow-auto'>
                    {Array.from({ length: 30 }).map((_, i) => (
                        <li className="border-b-2 p-1 relative border-black bg-slate-200">
                            <img src="https://picsum.photos/40/40" className="border inline mr-1"  />
                            <span> Frame {i} </span>
                            <span className='absolute right-3 top-3'>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-gray-800 rounded p-1 flex flex-col">
                <div className="h-4/5">
                    Viewport
                </div>
                <div className="h-1/5">
                    Sprite Assets
                </div>
            </div>
            <div className='bg-gray-800 rounded p-1'>
                Inspector
            </div>
        </div>
    );
}

export default Editor;