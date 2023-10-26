import Navbar from '../navbar/Navbar';
import Frames from './Frames';
import Inspector from './Inspector';
import Viewport from './Viewport';

function Editor() {

    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-[20%_60%_20%] gap-2" style={{ height: 'calc(100vh - 40px)', width: 'calc(100% - 1rem)' }}>
                <Frames />
                <Viewport />
                <Inspector />
            </div>
        </div>
    );
}

export default Editor;