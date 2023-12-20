import { Children, ReactNode, useState } from 'react';
import useAnchorKeyword from '../../../hooks/utils/useAnchorKeyword.ts';

type Props = { children: ReactNode | ReactNode[] };

/**
 * Container for all sections
 */
function SectionContainer(props: Props) {
  const { incorporateKeyword, getAnchorIndex } = useAnchorKeyword();
  const [activeTab, setActiveTab] = useState(getAnchorIndex());

  /**
   * Generates tabs based on the amount of children passed.
   */
  const navigationLinks = Children.map(props.children, (_, index) => {
    const sectionId = incorporateKeyword(index, true);

    return (
      <a
        key={sectionId}
        href={sectionId}
        className={activeTab === index ? 'active' : ''}
        onClick={() => setActiveTab(index)}
      >
        {index}
      </a>
    );
  });

  return (
    <>
      <div
        className='grid grid-cols-[20%_60%_20%] w-full [&>*]:min-h-full h-[calc(100vh-40px)] max-md:h-[calc(100vh-70px)] max-md:carousel max-md:overflow-hidden max-md:pb-10'
        style={{ height: '' }}
      >
        {props.children}
      </div>
      <div className='btm-nav md:hidden'>{navigationLinks}</div>
    </>
  );
}

export default SectionContainer;
