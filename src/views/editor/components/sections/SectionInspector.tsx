import CardL1 from '../../../../components/CardL1';

function SectionInspector(props: { children: React.ReactNode[] }) {
    return (
        <CardL1>
            <div className='p-2'>
                {props.children}
            </div>
        </CardL1>
    );
}

export default SectionInspector;