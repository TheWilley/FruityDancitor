import CardL1 from '../Components/CardL1';
import Navbar from './Navbar';
import { List, arrayMove } from 'react-movable';
import { useState } from 'react';
import Frame from '../Components/Frame';

function Editor() {
    const [items, setItems] = useState(Array.from(Array(10).keys()));

    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-[20%_60%_20%] gap-2" style={{ height: 'calc(100vh - 40px)', width: 'calc(100% - 1rem)' }}>
                <CardL1 className='min-h-full p-1'>
                    <ul className='h-full overflow-auto'>
                        {Array.from({ length: 30 }).map((_, i) => (
                            <li>
                                <Frame index={i} />
                            </li>
                        ))}
                    </ul>
                </CardL1>
                <div className="flex flex-col gap-2">
                    <CardL1 className="h-4/5 flex justify-center items-center">
                        <canvas width='500px' height='500px' className='bg-[url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.nWLpYSGP33IYGhcR1sFOHgAAAA%26pid%3DApi&f=1&ipt=5812f5c126591b3cde8929ba6262c2374c2a488462b03474da6bd2da7c3a5bab&ipo=images)]' />
                    </CardL1>
                    <CardL1 className='h-1/5 grid grid-cols-6 p-2 !overflow-auto'>
                        {Array.from({ length: 10 }).map(() => (
                            <div className='flex justify-center items-center text-center p-2'>
                                <div>
                                    <img width='120' height='120' src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngmart.com%2Ffiles%2F4%2FCool-PNG-Transparent-Image.png&f=1&nofb=1&ipt=d43a327115815008df0c98c1f14279f2da63b7957477e18da757cae735be6e41&ipo=images' />
                                    <div> Text </div>
                                </div>
                            </div>
                        ))}
                    </CardL1>
                </div>
                <CardL1>
                    <div className='flex justify-center p-5 bg-base-300 '>
                        <img width='150' height='150' src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngmart.com%2Ffiles%2F4%2FCool-PNG-Transparent-Image.png&f=1&nofb=1&ipt=d43a327115815008df0c98c1f14279f2da63b7957477e18da757cae735be6e41&ipo=images' />
                    </div>
                    <div className='p-2'>
                        <div>
                            <div className='items-center rounded mb-1'>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">ID</span>
                                    </label>
                                    <input type="text" placeholder="xxxxxxx" className="input input-bordered w-full" disabled />
                                </div>
                            </div>
                            <div className='items-center rounded mb-1'>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='items-center rounded mb-1'>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Render Mode</span>
                                    </label>
                                    <select className="select input-bordered w-full">
                                        <option disabled selected>Select Mode</option>
                                        <option>Normal</option>
                                        <option>Fast</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold mt-3 mb-3'> Frames </h2>
                            <input type="file" className="file-input file-input-bordered file-input-md w-full mb-2" />
                            <List
                                values={items}
                                onChange={({ oldIndex, newIndex }) =>
                                    setItems(arrayMove(items, oldIndex, newIndex))
                                }
                                renderList={({ children, props }) => <ul {...props}>{children}</ul>}
                                renderItem={({ value, props }) => <li {...props}><Frame {...props} index={value} draggable /></li>}
                            />
                        </div>
                    </div>
                </CardL1>
            </div>
        </div>
    );
}

export default Editor;