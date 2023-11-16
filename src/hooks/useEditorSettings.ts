import { useState } from 'react';
import { IEditorSettings } from '../global/types';

export default function useEditorSettings(): IEditorSettings {
    const [numberOfSequences, setnumberOfSequences] = useState(1);
    const [width, setWidth] = useState(50);
    const [height, setHeight] = useState(50);

    return {
        numberOfSequences, setnumberOfSequences,
        width, setWidth,
        height, setHeight
    };
}
