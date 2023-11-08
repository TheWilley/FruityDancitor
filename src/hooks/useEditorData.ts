import { useState } from 'react';
import appConfig from '../../appConfig';
import { IFrame } from '../global/types';

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

export default function useEditorData(): IEditorData {
    const [frames, setFrames] = useState<IFrame[]>(new Array(appConfig.amountOfRows).fill({ row: [], name: '' }));
    const [selectedRow, setSelectedRow] = useState(0);
    const [selectedFrame, setSelectedFrame] = useState(0);
    const [canvas, setCanvas] = useState<HTMLCanvasElement>();

    return {
        frames, setFrames,
        selectedRow, setSelectedRow,
        selectedFrame, setSelectedFrame,
        canvas, setCanvas
    };
}
