import { ReactNode } from 'react';
import useAnchorKeyword from '../../../hooks/utils/useAnchorKeyword.ts';

type Props = { children: ReactNode[] };

/**
 * Component for the middle section of the editor.
 * @param props A object containing component properties.
 */
function SectionMiddle(props: Props) {
  const { incorporateKeyword } = useAnchorKeyword();

  return (
    <div
      className='flex flex-col gap-2 overflow-auto max-md:carousel-item max-md:w-full'
      id={incorporateKeyword(1)}
    >
      {props.children}
    </div>
  );
}

export default SectionMiddle;
