import Card from '../../../../components/Card';
import { ReactNode } from 'react';

type Props = { children: ReactNode[] };

/**
 * Component which displays the sprite sheet.
 */
function SectionInspector(props: Props) {
  return <Card>{props.children}</Card>;
}

export default SectionInspector;
