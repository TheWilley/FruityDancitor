import { ReactNode } from 'react';

type Props = { children: ReactNode | ReactNode[] };

/**
 * Container for all sections
 */
function SectionContainer(props: Props) {
  return (
    <>
      <div
        className='grid grid-cols-[20%_60%_20%] gap-2 w-full [&>*]:min-h-full h-[calc(100vh-40px)] max-md:h-[calc(100vh-70px)] max-md:carousel max-md:overflow-hidden '
        style={{ height: '' }}
      >
        {props.children}
      </div>
      <div className='flex justify-center w-full py-2 gap-2 md:hidden '>
        <a href='#item1' className='btn btn-xs'>
          1
        </a>
        <a href='#item2' className='btn btn-xs'>
          2
        </a>
        <a href='#item3' className='btn btn-xs'>
          3
        </a>
      </div>
    </>
  );
}

export default SectionContainer;
