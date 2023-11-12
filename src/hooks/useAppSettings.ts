import { useState } from 'react';

export type AppSettings = {
    imageCompressionRatio: number
    setImageCompressionRatio: React.Dispatch<React.SetStateAction<number>>;
}

export default function useAppSettings(): AppSettings {
    const [imageCompressionRatio, setImageCompressionRatio] = useState(1);

    return {
        imageCompressionRatio, setImageCompressionRatio
    };
}