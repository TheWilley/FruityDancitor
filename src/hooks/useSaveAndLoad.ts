import { saveAs } from 'file-saver';
import { SpriteSheetFrame } from '../global/types';

export type ISaveAndLoadSettings = {
    spriteSheetFrames: SpriteSheetFrame[]
    numberOfSequences: number
    width: number
    height: number
}

/**
 * Loads a Fruity Dance Generator JSON file
 */
function load(file: File) {
    if (file.type === 'application/json') {
        const reader = new FileReader();

        reader.onloadend = function () {
            const data = JSON.parse(reader.result as string);
            if(data.type !== 'fruity_dance_generator_config') {
                new Error('Not a valid Fruity_Dance_Generator config file');
                alert('Not a valid Fruity_Dance_Generator config file');
            } else {
                alert('loaded!');
            }
        };

        reader.onerror = function () {
            new Error('Failed to read the file');
            alert('Failed to read the file');
        };

        reader.readAsText(file);
    } else {
        alert('Not a valid sprite sheet file');
    }
}

/**
 * Saves a Fruity Dance Generator JSON file
 */
function save(spriteSheetFrames: SpriteSheetFrame[], numberOfSequences: number, width: number, height: number) {
    // Create a object to collect data (empty sequences are removed from JSON)
    const json = {
        type: 'fruity_dance_generator_config',
        spriteSheetFrames: JSON.stringify(spriteSheetFrames.filter(item => item.sequence.length > 0)),
        numberOfSequences: numberOfSequences,
        width: width,
        height: height
    };

    // Create a blob to be saved
    const blob = new Blob([JSON.stringify(json)], {type: 'text/plain;charset=utf-8'});

    // Save the blob (downloads file)
    saveAs(blob, 'savedSpriteSheet.json');
}

export default function useSaveAndLoad() {
    return [save, load] as const;
}