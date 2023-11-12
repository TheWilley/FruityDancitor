import { useState } from 'react';
import { SpriteSheetFrame } from '../global/types';
import appConfig from '../../appConfig';

export type EditorData = {
    spriteSheetFrames: SpriteSheetFrame[];
    setSpriteSheetFrames: React.Dispatch<React.SetStateAction<SpriteSheetFrame[]>>;
    selectedSequence: number;
    setSelectedSequence: React.Dispatch<React.SetStateAction<number>>;
    selectedFrame: number
    setSelectedFrame: React.Dispatch<React.SetStateAction<number>>;
    viewport: HTMLCanvasElement | undefined
    setViewport: React.Dispatch<React.SetStateAction<HTMLCanvasElement | undefined>>;
}

function useSpriteSheetFrames(numberOfSequences: number) {
    const [spriteSheetFrames, setSpriteSheetFrames] = useState<SpriteSheetFrame[]>(new Array(appConfig.numberOfSequences).fill({ sequence: [], name: '' }));

    return [spriteSheetFrames.slice(0, numberOfSequences), setSpriteSheetFrames] as const;
}

function useSelectedSequence(numberOfSequences: number) {
    const [selectedSequence, setSelectedSequence] = useState(0);

    // Decrease the selected sequence index since the selected sequence no longer exists
    if (selectedSequence >= numberOfSequences) {
        setSelectedSequence(numberOfSequences - 1);
    }

    return [selectedSequence, setSelectedSequence] as const;
}

export default function useEditorData(numberOfSequences: number): EditorData {
    const [spriteSheetFrames, setSpriteSheetFrames] = useSpriteSheetFrames(numberOfSequences);
    const [selectedSequence, setSelectedSequence] = useSelectedSequence(numberOfSequences);
    const [selectedFrame, setSelectedFrame] = useState(0);
    const [viewport, setViewport] = useState<HTMLCanvasElement>();

    return {
        spriteSheetFrames, setSpriteSheetFrames,
        selectedSequence, setSelectedSequence,
        selectedFrame, setSelectedFrame,
        viewport, setViewport
    };
}
