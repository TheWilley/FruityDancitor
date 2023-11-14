import Card from '../../../../components/Card';

function SectionInspector(props: { children: React.ReactNode[] }) {
    return (
        <Card>
            <div className='p-2'>
                {props.children}
            </div>
        </Card>
    );
}

export default SectionInspector;