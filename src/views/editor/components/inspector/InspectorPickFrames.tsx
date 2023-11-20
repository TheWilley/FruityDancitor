import {PickFrames} from '../../../../global/types.ts';

type Props = PickFrames

export default function InspectorPickFrames(props: Props) {
    return (
        <>
            <dialog id="my_modal_1" className="modal" open={props.showDialog.value} onClose={() => props.showDialog.setValue(false)}>
                <div className="modal-box">
                    {props.dialogFrames.value.map((frame, index) => (
                        <img src={frame} alt={`Frame ${index}`} />
                    ))}
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}