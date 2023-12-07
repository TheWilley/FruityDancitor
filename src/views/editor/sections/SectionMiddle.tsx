import { ReactNode } from 'react';

type Props = { children: ReactNode[] };

/**
 * The middle section of the editor.
 */
function SectionMiddle(props: Props) {
  return <div className='flex flex-col gap-2'>{props.children}</div>;
}

export default SectionMiddle;
