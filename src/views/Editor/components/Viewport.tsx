import CardL1 from '../../../components/CardL1';
import Navbar from '../../navbar/Navbar';

function Viewport() {
    return (
        <div className="flex flex-col gap-2">
            <Navbar />
            <CardL1 className="flex justify-center items-center h-full">
                <canvas width='500px' height='500px' className='bg-[url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.nWLpYSGP33IYGhcR1sFOHgAAAA%26pid%3DApi&f=1&ipt=5812f5c126591b3cde8929ba6262c2374c2a488462b03474da6bd2da7c3a5bab&ipo=images)]' />
            </CardL1>
        </div>
    );
}

export default Viewport;