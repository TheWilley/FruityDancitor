import { useState } from 'react';
import CardL1 from '../../../components/CardL1';
import ItemList from './ItemList';

function Inspector() {
    // Array to store frames
    const [items, setItems] = useState(Array.from(Array(8).keys()));

    return (
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
                    <ItemList items={items} setItems={setItems} rows={8} />
                </div>
            </div>
        </CardL1>
    );
}

export default Inspector;