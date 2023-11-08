import { useState } from 'react';

export type IEditorSettings = {
    rows: number;
    setRows: React.Dispatch<React.SetStateAction<number>>;
    width: number;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
    height: number;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
};

export default function useEditorSettings(): IEditorSettings {
    const [rows, setRows] = useState(1);
    const [width, setWidth] = useState(50);
    const [height, setHeight] = useState(50);

    return {
        rows, setRows,
        width, setWidth,
        height, setHeight
    };
}
