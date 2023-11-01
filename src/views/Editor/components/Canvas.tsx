import { useEffect, useRef } from 'react';
import CardL1 from '../../../components/CardL1';
import { drawImageOnTile } from '../../../utils/canvas';

function Canvas(props: { rows: number, height: number, width: number }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            const context = canvas.getContext('2d');
            drawImageOnTile(context, 0, 0, props.height, props.width);
        }
    }, [props.rows]);

    return (
        <CardL1 className="flex justify-center items-center h-full">
            <canvas ref={canvasRef} width={props.width * 8} height={props.height * props.rows} className='bg-[url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.nWLpYSGP33IYGhcR1sFOHgAAAA%26pid%3DApi&f=1&ipt=5812f5c126591b3cde8929ba6262c2374c2a488462b03474da6bd2da7c3a5bab&ipo=images)]' />
        </CardL1>
    );
}

export default Canvas;