function Editor() {
    return (
        <div className="grid grid-cols-[20%_60%_20%] h-full">
            <div>
                Frames
            </div>
            <div className="flex flex-col">
                <div className="h-4/5">
                    Viewport
                </div>
                <div className="h-1/5">
                    Sprite Assets
                </div>
            </div>
            <div>
                Inspector
            </div>
        </div>
    );
}

export default Editor;