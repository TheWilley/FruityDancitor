import Card from '../../../components/Card.tsx';
import { ReactNode } from 'react';
import useAnchorKeyword from '../../../hooks/utils/useAnchorKeyword.ts';

type Props = { children: ReactNode[] };

/**
 * Component for the right section of the editor.
 * @param props A object containing component properties.
 */
function SectionRight(props: Props) {
  const { incorporateKeyword } = useAnchorKeyword();

  return (
    <Card
      className='ml-2 overflow-x-hidden max-md:carousel-item max-md:w-full'
      id={incorporateKeyword(2)}
    >
      {props.children}
    </Card>
  );
}

export default SectionRight;
