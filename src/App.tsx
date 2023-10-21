import { faRocket } from '@fortawesome/free-solid-svg-icons/faRocket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <div className='p-5'>
          <h1 className='text-5xl mb-5'>Vite-Quick-Start <FontAwesomeIcon icon={faRocket} /></h1>
          <button onClick={() => setCount((count) => count + 1)} className='border rounded bg-blue-300 hover:bg-blue-500 hover:text-white transition p-3 m-2'>
            Count is {count}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
