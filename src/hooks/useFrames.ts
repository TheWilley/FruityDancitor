import { useState } from 'react';
import { IFrame } from '../global/types';
import appConfig from '../../appConfig';

export default function useFrames(rows: number) {
    const [frames, setFrames] = useState<IFrame[]>(new Array(appConfig.amountOfRows).fill({ row: [], name: '' }));

    return [frames.slice(0, rows), setFrames] as const;
}