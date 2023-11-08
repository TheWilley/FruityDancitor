import { useState } from 'react';

export type IAppSettings = {
    compressionRatio: number
    setCompressionRatio: React.Dispatch<React.SetStateAction<number>>;
}

export default function useAppSettings(): IAppSettings {
    const [compressionRatio, setCompressionRatio] = useState(1);

    return {
        compressionRatio, setCompressionRatio
    };
}