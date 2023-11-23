import Card from '../../../../components/Card';

type Props = { children: React.ReactNode[] };

/**
 * Component which displays the sprite sheet.
 */
function SectionInspector(props: Props) {
  return (
    <Card>
      <div className='p-2'>{props.children}</div>
    </Card>
  );
}

export default SectionInspector;
