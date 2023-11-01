
import { useState } from 'react';
import CardL1 from '../../../components/CardL1';
import ItemList from './ItemList';

function RowsList(props: { rows: number }) {
    // Create a array with 1000 items to store data
    // We do this because we cannot create a new array everytime we update the state as:
    // 1. It does not work, as the state effectively already is set
    // 2. It would overide data
    // We instead splice the array during render, never messing with the state in the first place
    const [items, setItems] = useState(Array.from(Array(1000).keys()));

    return (
        <CardL1 className='p-1'>
            <ItemList items={items} setItems={setItems} rows={props.rows} />
        </CardL1>
    );
}

export default RowsList;