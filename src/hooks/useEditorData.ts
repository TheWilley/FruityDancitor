import { useState } from 'react';
import { IFrame } from '../global/types';
import useFrames from './useFrames';

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

export default function useEditorData(rows: number): IEditorData {
    const [frames, setFrames] = useFrames(rows);
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
