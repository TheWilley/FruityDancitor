import { saveAs } from 'file-saver';
import { SpriteSheetFrame } from '../global/types';
import { DeriveSaveAndLoadSettings } from '../utils/settingsHelper';

type SpriteSheetFile = {
    type: string
    stringifiedSpriteSheetFrames: string
    numberOfSequences: DeriveSaveAndLoadSettings['numberOfSequences']
    width: DeriveSaveAndLoadSettings['width']
    height: DeriveSaveAndLoadSettings['height']
};

/**
 * Loads a Fruity Dance Generator JSON file
 */
function load(file: File, setSpriteSheetFrames: DeriveSaveAndLoadSettings['setSpriteSheetFrames'], setNumberOfSequences: DeriveSaveAndLoadSettings['setNumberOfSequences'], setWidth: DeriveSaveAndLoadSettings['setWidth'], setHeight: DeriveSaveAndLoadSettings['setHeight']) {
    if (file.type === 'application/json') {
        const reader = new FileReader();

        reader.onloadend = function () {
            const data = JSON.parse(reader.result as string) as SpriteSheetFile;
            if (data.type !== 'fruity_dance_generator_config') {
                new Error('Not a valid Fruity_Dance_Generator config file');
                alert('Not a valid Fruity_Dance_Generator config file');
            } else {
                setWidth(data.width);
                setHeight(data.height);
                setNumberOfSequences(data.numberOfSequences);
                setSpriteSheetFrames(JSON.parse(data.stringifiedSpriteSheetFrames));
                console.log('Loaded!');
            }
        };

        reader.onerror = function () {
            new Error('Failed to read the file');
            alert('Failed to read the file');
        };

        reader.readAsText(file);
    } else {
        alert('Not a JSON file');
    }
}

/**
 * Saves a Fruity Dance Generator JSON file
 */
function save(spriteSheetFrames: SpriteSheetFrame[], numberOfSequences: number, width: number, height: number) {
    // Create a object to collect data (empty sequences are removed from JSON)
    const json: SpriteSheetFile = {
        type: 'fruity_dance_generator_config',
        stringifiedSpriteSheetFrames: JSON.stringify(spriteSheetFrames),
        numberOfSequences: numberOfSequences,
        width: width,
        height: height
    };

    // Create a blob to be saved
    const blob = new Blob([JSON.stringify(json)], { type: 'text/plain;charset=utf-8' });

    // Save the blob (downloads file)
    saveAs(blob, 'savedSpriteSheet.json');
}

export default function useSaveAndLoad() {
    return [save, load] as const;
}