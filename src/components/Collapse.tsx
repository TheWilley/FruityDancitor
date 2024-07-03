import { ReactNode, useState } from 'react';
import useStyle from '../hooks/utils/useStyle';

type Props = { label: string; children: ReactNode | ReactNode[] };

/**
 * Component which contains a label and can be collapsed.
 * @param props A object containing component properties.
 */
function Collapse(props: Props) {
  const [hide, setHide] = useState(false);
  const [hiddenClass, hiddenCss] = useStyle('h-auto overflow-hidden', undefined, [{
    condition: hide,
    result: 'opacity-50'
  }], [
    {
      condition: hide,
      cssProperty: 'WebkitMask',
      result: 'linear-gradient(black, transparent)'
    },
    {
      condition: hide,
      cssProperty: 'height',
      result: '40px'
    }
  ]);

  return (
    <>
      <div
        className='divider cursor-pointer hover:underline'
        onClick={() => setHide(!hide)}
      >
        {props.label}
      </div>
      <div className={hiddenClass} style={hiddenCss}>{props.children}</div>
    </>
  );
}

export default Collapse;
