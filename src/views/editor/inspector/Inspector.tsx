import Card from '../../../components/Card.tsx';
import { ReactNode } from 'react';

type Props = { children: ReactNode[] };

/**
 * Component which displays settings for a selected sequence and frame.
 */
function Inspector(props: Props) {
  return <Card>{props.children}</Card>;
}

export default Inspector;
