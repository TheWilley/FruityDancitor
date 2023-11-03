import { useEffect, useRef, useState } from 'react';

function Preview(props: { originalCanvas: HTMLCanvasElement | undefined, selectedRow: number, width: number, height: number }) {
	const previewRef = useRef(null);
	const [keepTimer, setKeepTimer] = useState(0);
	const [currentFrame, setCurrentFrame] = useState(0);
	const [sx, setSx] = useState(0);

	// Rendering a frame
	const nextFrame = (context: CanvasRenderingContext2D) => {
		// Create params
		const drawParams = {
			sourceX: sx,
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
			context.drawImage(props.originalCanvas!, drawParams.sourceX, drawParams.sourceY, drawParams.sourceWidth, drawParams.sourceHeight, drawParams.destX, drawParams.destY, drawParams.destWidth, drawParams.destHeight);		}

		setSx((sx + props.width > props.width * 7) ? 0 : (sx + props.width));
		setCurrentFrame(Math.floor(sx / props.width + 1));
	};

	useEffect(() => {
		// Check if both canvases exist before continuing 
		if (props.originalCanvas && previewRef.current) {
			// Get context
			const context = (previewRef.current as HTMLCanvasElement).getContext('2d');

			// If context does not exist, return
			if(!context) return;

			// So that images does not appear blury
			context.imageSmoothingEnabled = false;

			// Create a timer which keeps timer going and updates frames
			const timer = setTimeout(() => {
				setKeepTimer(keepTimer + 1);
				nextFrame(context);
			}, 500);

			return () => clearTimeout(timer);
		}
	}, [keepTimer]);

	return (
		<div className='flex justify-center'>
			<div className='p-5 bg-base-300 text-center'>
				<canvas
					ref={previewRef}
					width={100}
					height={100}
					className='border'
				></canvas>
				{currentFrame}
			</div>
		</div>
	);
}

export default Preview;
