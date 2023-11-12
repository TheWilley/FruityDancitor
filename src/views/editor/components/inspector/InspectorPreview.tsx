import { useRef } from 'react';
import usePreview from '../../../../hooks/UsePreview';


function InspectorPreview(props: { originalCanvas: HTMLCanvasElement | undefined, selectedRow: number, width: number, height: number }) {
	const previewRef = useRef(null);
	const [currentFrame] = usePreview(previewRef.current, props.originalCanvas, props.selectedRow, props.width, props.height);

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

export default InspectorPreview;
