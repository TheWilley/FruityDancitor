import { db } from '../../../../utils/db.ts';
import { useLiveQuery } from 'dexie-react-hooks';

/**
 *
 */
export default function Test() {
  const frames = useLiveQuery(() => db.frames.toArray());

  const addData = async () => {
    // Add the new friend!
    const id = await db.frames.add({
      base64: 'd',
      modifications: { scale: 0, xoffset: 0, yoffset: 0 },
    });

    console.log(id);
  };

  return (
    <>
      <button onClick={addData}> Add data </button>
      {frames?.map((frame) => frame.id)}
    </>
  );
}
