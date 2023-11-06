function SaveAndLoad() {
    return (
        <div>
            <button className="btn btn-outline btn-warning w-full" onClick={() => donwload(props.exportSettings, fileName)}> Load </button>
            <button className="btn btn-outline btn-success w-full mt-1" onClick={() => donwload(props.exportSettings, fileName)}> Save </button>
        </div>
    );
}

export default SaveAndLoad;