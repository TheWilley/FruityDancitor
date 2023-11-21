import {useState} from 'react';
import {PickDialogFrames} from '../global/types.ts';

export default function usePickDialogFrames(): PickDialogFrames {
    const [showDialog, setShowDialog] = useState(false);
    const [dialogFrames, setDialogFrames] = useState<string[]>([]);
    const [selectedDialogFrames, setSelectedDialogFrames] = useState<number[]>([0,1,2,3,4]);

    return {
        showDialog: {
            value: showDialog,
            setValue: setShowDialog
        },
        dialogFrames: {
            value: dialogFrames,
            setValue: setDialogFrames
        },
        selectedDialogFrames: {
            value: selectedDialogFrames,
            setValue: setSelectedDialogFrames
        }
    };
}