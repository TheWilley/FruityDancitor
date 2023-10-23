import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardL1 from '../Components/CardL1';
import Navbar from './Navbar';
import { List, arrayMove } from 'react-movable';
import { useState } from 'react';

function Editor() {
    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-[20%_60%_20%] gap-2" style={{ height: 'calc(100vh - 40px)' }}>
                <CardL1 className='min-h-full'>
                    <ul className='h-full overflow-auto'>
                        {Array.from({ length: 30 }).map((_, i) => (
                            <li className="p-1 mb-1 relative">
                                <img src="https://picsum.photos/40/40" className="border inline mr-1" />
                                <span> Frame {i} </span>
                                <span className='absolute right-3 top-3'>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                            </li>
                        ))}
                    </ul>
                </CardL1>
                <div className="flex flex-col gap-2">
                    <CardL1 className="h-4/5 flex justify-center items-center">
                        <canvas width='500px' height='500px' className='bg-[url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.nWLpYSGP33IYGhcR1sFOHgAAAA%26pid%3DApi&f=1&ipt=5812f5c126591b3cde8929ba6262c2374c2a488462b03474da6bd2da7c3a5bab&ipo=images)]' />
                    </CardL1>
                    <CardL1 className='h-1/5 grid grid-cols-6 p-2'>
                        {Array.from({ length: 10 }).map(() => (
                            <div className='flex justify-center items-center'>
                                <img width='120' height='120' src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngmart.com%2Ffiles%2F4%2FCool-PNG-Transparent-Image.png&f=1&nofb=1&ipt=d43a327115815008df0c98c1f14279f2da63b7957477e18da757cae735be6e41&ipo=images' />
                            </div>
                        ))}
                    </CardL1>
                </div>
                <CardL1>
                    <div className='flex justify-center'>
                        <img width='150' height='150' src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngmart.com%2Ffiles%2F4%2FCool-PNG-Transparent-Image.png&f=1&nofb=1&ipt=d43a327115815008df0c98c1f14279f2da63b7957477e18da757cae735be6e41&ipo=images' />
                    </div>
                    <div className='pt-3'>
                        <div className='grid grid-cols-2 items-center bg-base-200 p-2 rounded mb-1'>
                            <div>ID:</div>
                            <div>xxxxxxx</div>
                        </div>
                        <div className='grid grid-cols-2 items-center bg-base-200 p-2 rounded mb-1'>
                            <div>Name:</div>
                            <div><input className='input w-full' type='text' /></div>
                        </div>
                        <div className='grid grid-cols-2 items-center bg-base-200 p-2 rounded mb-1'>
                            <div>Renderd:</div>
                            <div><input className='input w-full' type='text' /></div>
                        </div>
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold'> Frames </h2>
                        <input type="file" className="file-input file-input-bordered file-input-md w-full max-w-xs mb-2" />
                        <List
                            values={items}
                            onChange={({ oldIndex, newIndex }) =>
                                setItems(arrayMove(items, oldIndex, newIndex))
                            }
                            renderList={({ children, props }) => <ul {...props}>{children}</ul>}
                            renderItem={({ value, props }) => <li className='bg-base-200 p-2 rounded mb-1' {...props}>{value}</li>}
                        />
                    </div>
                </CardL1>
            </div>
        </div>
    );
}

export default Editor;