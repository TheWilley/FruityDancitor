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
    // Initiate empty array containing SpriteSheetFrame objects
    const [spriteSheetFrames, setSpriteSheetFrames] = useState<SpriteSheetFrame[]>(new Array(appConfig.numberOfSequences).fill({ sequence: [], name: '' }));

    /**
     * Function to modify frames before returning the result
     * Used here to:
     * 1. Splice the sequences so that we don't return an unnecessary amount (i.e, more than the amount of sequences)
     * 2. Sets the last sequence name to "held" per the requirements of Fruity Dance
    */
    const modifiedFrames = () => {
        const frames = spriteSheetFrames.splice(0, numberOfSequences);
        frames[frames.length - 1].name = 'held';

        return frames;
    };

    return [modifiedFrames(), setSpriteSheetFrames] as const;
}

function useSelectedSequence(numberOfSequences: number) {
    const [selectedSequence, setSelectedSequence] = useState(0);

    // Decrease the selected sequence index since the selected sequence no longer exists (i.e the amount of sequences are lower than the selected sequence)
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
