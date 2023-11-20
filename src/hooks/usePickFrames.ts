import {useState} from 'react';
import {PickFrames} from '../global/types.ts';

export default function usePickFrames(): PickFrames {
    const [showDialog, setShowDialog] = useState(false);
    const [dialogFrames, setDialogFrames] = useState<string[]>([]);

    return {
        showDialog: {
            value: showDialog,
            setValue: setShowDialog
        },
        dialogFrames: {
            value: dialogFrames,
            setValue: setDialogFrames
        }
    };
}