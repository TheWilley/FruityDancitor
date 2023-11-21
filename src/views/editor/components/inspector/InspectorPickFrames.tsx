import {PickDialogFrames} from '../../../../global/types.ts';
import {produce} from 'immer';

type Props = PickDialogFrames

export default function InspectorPickFrames(props: Props) {
    return (
        <>
            <dialog id="my_modal_1" className="modal" open={props.showDialog.value}
                    onClose={() => props.showDialog.setValue(false)}>
                <div className="modal-box">
                    <h1 className="text-2xl mb-2"> Select Frames </h1>
                    <div className="grid grid-cols-5 gap-2">
                        {props.dialogFrames.value.map((frame, index) => (
                            <img
                                key={index} // Added a unique key for each rendered element
                                src={frame}
                                alt={`Frame ${index}`}
                                width={150}
                                className={`border ${props.selectedDialogFrames.value.includes(index) ? 'border-primary' : ''}`}
                                onClick={() => {
                                    props.selectedDialogFrames.setValue(produce(props.selectedDialogFrames.value, (draftDialogFrames) => {
                                        const selectedIndex = draftDialogFrames.indexOf(index);
                                        if (selectedIndex !== -1) {
                                            // Remove frame
                                            draftDialogFrames.splice(selectedIndex, 1);
                                        } else {
                                            // Makes sure we don't upload too many frames
                                            if(draftDialogFrames.length - props.spriteSheetFrames.value[props.selectedSequence.value].sequence.length >= 8) {
                                                draftDialogFrames.pop();
                                            }

                                            // Push clicked frame
                                            draftDialogFrames.push(index);
                                        }
                                    }));
                                }}
                            />
                        ))}
                    </div>
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