import { useState } from 'react';
import { IFrame } from '../global/types';
import appConfig from '../../appConfig';

export type IEditorData = {
    frames: IFrame[];
    setFrames: React.Dispatch<React.SetStateAction<IFrame[]>>;
    selectedRow: number;
    setSelectedRow: React.Dispatch<React.SetStateAction<number>>;
    selectedFrame: number
    setSelectedFrame: React.Dispatch<React.SetStateAction<number>>;
    canvas: HTMLCanvasElement | undefined
    setCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | undefined>>;
}

function useFrames(rows: number) {
    const [frames, setFrames] = useState<IFrame[]>(new Array(appConfig.amountOfRows).fill({ row: [], name: '' }));

    return [frames.slice(0, rows), setFrames] as const;
}

function useSelectedRow(rows: number) {
    const [selectedRow, setSelectedRow] = useState(0);

    // Decrease the selected row index since the selected row no longer exists
    if (selectedRow >= rows) {
        setSelectedRow(rows - 1);
    }

    return [selectedRow, setSelectedRow] as const;
}

export default function useEditorData(rows: number): IEditorData {
    const [frames, setFrames] = useFrames(rows);
    const [selectedRow, setSelectedRow] = useSelectedRow(rows);
    const [selectedFrame, setSelectedFrame] = useState(0);
    const [canvas, setCanvas] = useState<HTMLCanvasElement>();

    return {
        frames, setFrames,
        selectedRow, setSelectedRow,
        selectedFrame, setSelectedFrame,
        canvas, setCanvas
    };
}
