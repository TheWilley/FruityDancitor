import { ReactNode, useState } from 'react';

type Props = { label: string; children: ReactNode | ReactNode[] };

/**
 * Component which contains a label and can be collapsed.
 * @param props A object containing component properties.
 */
function Collapse(props: Props) {
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
