import Card from '../../../../components/Card';

type Props = { children: React.ReactNode[] }

function SectionInspector(props: Props) {
    return (
        <Card>
            <div className="p-2">
                {props.children}
            </div>
        </Card>
    );
}

export default SectionInspector;