import CardL1 from '../../../components/CardL1';

function Inspector(props: { children: React.ReactNode[] }) {
    return (
        <CardL1>
            <div className='p-2'>
                <div className='flex justify-center p-5 bg-base-300 '>
                    <img width='150' height='150' src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngmart.com%2Ffiles%2F4%2FCool-PNG-Transparent-Image.png&f=1&nofb=1&ipt=d43a327115815008df0c98c1f14279f2da63b7957477e18da757cae735be6e41&ipo=images' />
                </div>
                <div>
                    {props.children}
                </div>
            </div>
        </CardL1>
    );
}

export default Inspector;