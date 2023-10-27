import Frames from './components/Frames';
import Inspector from './components/Inspector';
import Viewport from './components/Viewport';

function Editor() {

    return (
        <div className="grid grid-cols-[20%_60%_20%] gap-2 w-full [&>*]:min-h-full" style={{ height: 'calc(100vh - 40px)' }}>
            <Frames />
            <Viewport />
            <Inspector />
        </div>
    );
}

export default Editor;