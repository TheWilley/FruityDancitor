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
 * Loads a FruityDancitor JSON file
 */
function load(file: File, setSpriteSheetFrames: DeriveSaveAndLoadSettings['setSpriteSheetFrames'], setNumberOfSequences: DeriveSaveAndLoadSettings['setNumberOfSequences'], setWidth: DeriveSaveAndLoadSettings['setWidth'], setHeight: DeriveSaveAndLoadSettings['setHeight']) {
    if (file.type === 'application/json') {
        // Create a new reader to read JSON file
        const reader = new FileReader();

        // Define data variable here as we assign it later within the 
        let data: SpriteSheetFile;

        reader.onloadend = function () {
            try {
                data = JSON.parse(reader.result as string);
            } catch (e) {
                console.error('Parsing Error: ' + e);
                alert('Error parsing project file');
                return;
            }
            if (data.type !== 'FruityDancitorProject') {
                alert('Not a valid  FruityDancitor project file');
            } else {
                try {
                    setWidth(data.width);
                    setHeight(data.height);
                    setNumberOfSequences(data.numberOfSequences);
                    setSpriteSheetFrames(JSON.parse(data.stringifiedSpriteSheetFrames));
                    alert('Project loaded');
                } catch (e) {
                    console.error('Error: ' + e);
                    alert('Could not load project');
                    return;
                }
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
 * Saves a FruityDancitor JSON file
 */
function save(spriteSheetFrames: SpriteSheetFrame[], numberOfSequences: number, width: number, height: number) {
    // Create a object to collect data (empty sequences are removed from JSON)
    const json: SpriteSheetFile = {
        type: 'FruityDancitorProject',
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