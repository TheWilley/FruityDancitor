import { useState } from 'react';
import { EditorSettings } from '../global/types';

export default function useEditorSettings(): EditorSettings {
    const [numberOfSequences, setnumberOfSequences] = useState(1);
    const [width, setWidth] = useState(50);
    const [height, setHeight] = useState(50);

    return {
        numberOfSequences, setnumberOfSequences,
        width, setWidth,
        height, setHeight
    };
}
