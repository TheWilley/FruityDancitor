import { useEffect, useRef, useState } from 'react';

function Preview(props: { originalCanvas: HTMLCanvasElement | undefined, selectedRow: number, width: number, height: number, setCurrentFrame: React.Dispatch<React.SetStateAction<number>> }) {
	const previewRef = useRef(null);
	const [keepTimer, setKeepTimer] = useState(0);
	const [sx, setSx] = useState(0);

	// Rendering a frame
	const nextFrame = () => {
		// Get context
		const context = previewRef.current.getContext('2d');
		context.imageSmoothingEnabled = false;

		// Create params
		const drawParams = {
			sourceX: sx ,
			sourceY: props.height * (props.selectedRow + 1) - props.height,
			sourceWidth: props.width,
			sourceHeight: props.height,
			destX: 0,
			destY: 0,
			destWidth: 100,
			destHeight: 100,
		};

		// If context exists, clear and show relevant frame
		if (context) {
			context.clearRect(0, 0, 100, 100);
			context.drawImage(props.originalCanvas, ...Object.values(drawParams));
		}

		setSx((sx + props.width > props.width * 7) ? 0 : (sx + props.width));
		props.setCurrentFrame(Math.floor(sx / props.width + 1));
	};

	useEffect(() => {
		// Check if both canvases exist before continuing 
		if (props.originalCanvas && previewRef.current) {
			// Create a timer which keeps timer going and updates frames
			const timer = setTimeout(() => {
				setKeepTimer(keepTimer + 1);
				nextFrame();
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [keepTimer]);

	return (
		<div>
			{}
			<canvas
				ref={previewRef}
				width={100}
				height={100}
				className='border'
			></canvas>
		</div>
	);
}

export default Preview;
