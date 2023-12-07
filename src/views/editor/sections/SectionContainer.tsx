import { ReactNode } from 'react';

type Props = { children: ReactNode | ReactNode[] };

/**
 * Container for all sections
 */
function SectionContainer(props: Props) {
  return (
    <div
      className='grid grid-cols-[20%_60%_20%] gap-2 w-full [&>*]:min-h-full'
      style={{ height: 'calc(100vh - 40px)' }}
    >
      {props.children}
    </div>
  );
}

export default SectionContainer;
