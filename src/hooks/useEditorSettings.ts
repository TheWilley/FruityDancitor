import {useState} from 'react';
import {EditorSettings} from '../global/types';

export default function useEditorSettings(): EditorSettings {
    const [numberOfSequences, setnumberOfSequences] = useState(1);
    const [width, setWidth] = useState(50);
    const [height, setHeight] = useState(50);

    return {
        numberOfSequences: {
            value: numberOfSequences,
            setValue: setnumberOfSequences
        },
        width: {
            value: width,
            setValue: setWidth
        },
        height: {
            value: height,
            setValue: setHeight
        }
    };
}
