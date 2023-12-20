import { ReactNode } from 'react';
import useAnchorKeyword from '../../../hooks/utils/useAnchorKeyword.ts';

type Props = { children: ReactNode[] };

/**
 * The middle section of the editor.
 */
function SectionMiddle(props: Props) {
  const { incorporateKeyword } = useAnchorKeyword();

  return (
    <div
      className='flex flex-col gap-2 max-md:carousel-item max-md:w-full'
      id={incorporateKeyword(1)}
    >
      {props.children}
    </div>
  );
}

export default SectionMiddle;
