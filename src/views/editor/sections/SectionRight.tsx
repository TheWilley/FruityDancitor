import Card from '../../../components/Card.tsx';
import { ReactNode } from 'react';

type Props = { children: ReactNode[] };

/**
 * The right section of the editor.
 */
function SectionRight(props: Props) {
  return (
    <Card className='max-md:carousel-item max-md:w-full' id='item3'>
      {props.children}
    </Card>
  );
}

export default SectionRight;
