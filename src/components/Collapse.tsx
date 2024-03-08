import { ReactNode, useState } from 'react';

type CollapseProps = {
  /** The label to display for the collapsible section. */
  label: string;
  /** Child nodes to be rendered within component. */
  children: ReactNode | ReactNode[];
};

/**
 * Component which represents a collapsible section.
 * @param props A object containing component properties.
 */
function Collapse(props: CollapseProps) {
  const [hide, setHide] = useState(false);

  return (
    <>
      <div
        className='divider cursor-pointer hover:underline'
        onClick={() => setHide(!hide)}
      >
        {props.label}
      </div>
      {!hide && <div>{props.children}</div>}
    </>
  );
}

export default Collapse;
