import { saveAs } from 'file-saver';
import { IFrame } from '../global/types';

/**
 * Loads a Fruity Dance Generator JSON file
 */
function load() {
    console.log('load');
}

/**
 * Saves a Fruity Dance Generator JSON file
 */
function save(frames: IFrame[], rows: number, width: number, height: number) {
    console.log(frames)
    // Create a object to collect data (empty rows are removed from JSON)
    const json = {
        frames: JSON.stringify(frames.filter(item => item.row.length > 0)),
        rows: rows,
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