import { ReactNode } from 'react';

type Props = { children: ReactNode[] };

/**
 * Component which represents the viewport (i.e, middle area).
 */
function Viewport(props: Props) {
  return <div className='flex flex-col gap-2'>{props.children}</div>;
}

export default Viewport;
