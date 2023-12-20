import { ReactNode } from 'react';
import Card from '../../../components/Card.tsx';
import useAnchorKeyword from '../../../hooks/utils/useAnchorKeyword.ts';

type Props = { children: ReactNode | ReactNode[] };

/**
 * The left section of the editor.
 */
function SectionLeft(props: Props) {
  const { incorporateKeyword } = useAnchorKeyword();

  return (
    <Card
      className='p-1 max-md:carousel-item max-md:w-full mr-2'
      id={incorporateKeyword(0)}
    >
      {props.children}
    </Card>
  );
}

export default SectionLeft;
