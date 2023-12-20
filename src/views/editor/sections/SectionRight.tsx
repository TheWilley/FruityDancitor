import Card from '../../../components/Card.tsx';
import { ReactNode } from 'react';
import useAnchorKeyword from '../../../hooks/utils/useAnchorKeyword.ts';

type Props = { children: ReactNode[] };

/**
 * The right section of the editor.
 */
function SectionRight(props: Props) {
  const { incorporateKeyword } = useAnchorKeyword();

  return (
    <Card className='max-md:carousel-item max-md:w-full' id={incorporateKeyword(2)}>
      {props.children}
    </Card>
  );
}

export default SectionRight;
