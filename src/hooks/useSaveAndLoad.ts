import {saveAs} from 'file-saver';
import {SaveAndLoadSettings} from '../global/types';

// TODO: This project file needs to be changed as it assumes we use an object value, which is currently not true
type ProjectFile = {
    type: string
    stringifiedSpriteSheetFrames: string
    imageCompressionRatio: SaveAndLoadSettings['imageCompressionRatio']['value']
    width: SaveAndLoadSettings['width']['value']
    height: SaveAndLoadSettings['height']['value']
    numberOfSequences: SaveAndLoadSettings['numberOfSequences']['value']
}

/**
 * Loads a FruityDancitor JSON file
 */
function load(file: File, saveAndLoadSettings: SaveAndLoadSettings) {
    if (file.type === 'application/json') {
        // Create a new reader to read JSON file
        const reader = new FileReader();

        // Define data variable here as we assign it later within the 
        let data: ProjectFile;

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
                    saveAndLoadSettings.imageCompressionRatio.setValue(data.imageCompressionRatio);
                    saveAndLoadSettings.width.setValue(data.width);
                    saveAndLoadSettings.height.setValue(data.height);
                    saveAndLoadSettings.numberOfSequences.setValue(data.numberOfSequences);
                    saveAndLoadSettings.spriteSheetFrames.setValue(JSON.parse(data.stringifiedSpriteSheetFrames));
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
function save(saveAndLoadSettings: SaveAndLoadSettings) {
    // Create an object to collect data (empty sequences are removed from JSON)
    const json: ProjectFile = {
        type: 'FruityDancitorProject',
        imageCompressionRatio: saveAndLoadSettings.imageCompressionRatio.value,
        stringifiedSpriteSheetFrames: JSON.stringify(saveAndLoadSettings.spriteSheetFrames.value),
        numberOfSequences: saveAndLoadSettings.numberOfSequences.value,
        width: saveAndLoadSettings.width.value,
        height: saveAndLoadSettings.height.value
    };

    // Create a blob to be saved
    const blob = new Blob([JSON.stringify(json)], {type: 'text/plain;charset=utf-8'});

    // Save the blob (downloads file)
    saveAs(blob, 'savedFruityDancitorProject.json');
}

export default function useSaveAndLoad() {
    return [save, load] as const;
}