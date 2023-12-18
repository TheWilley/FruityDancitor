import { ReactNode } from 'react';
import Card from '../../../components/Card.tsx';

type Props = { children: ReactNode | ReactNode[] };

/**
 * The left section of the editor.
 */
function SectionLeft(props: Props) {
  return (
    <Card className='p-1 max-md:carousel-item max-md:w-full' id='item1'>
      {props.children}
    </Card>
  );
}

export default SectionLeft;
