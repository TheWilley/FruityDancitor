import { Children, ReactNode, useState } from 'react';
import useAnchorKeyword from '../../../hooks/utils/useAnchorKeyword.ts';

type Props = { children: ReactNode | ReactNode[] };

/**
 * Component acting as a container for all sections.
 * @param props A object containing component properties.
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
        className='grid h-[calc(100vh-40px)] w-full grid-cols-[20%_60%_20%] max-md:carousel max-md:h-[calc(100vh-70px)] max-md:overflow-hidden max-md:pb-10'
        style={{ height: '' }}
      >
        {props.children}
      </div>
      <div className='btm-nav md:hidden'>{navigationLinks}</div>
    </>
  );
}

export default SectionContainer;
