import Card from '../../../../components/Card';

type Props = { children: React.ReactNode[] };

/**
 * Component which displays the sprite sheet.
 */
function SectionInspector(props: Props) {
  return <Card>{props.children}</Card>;
}

export default SectionInspector;
