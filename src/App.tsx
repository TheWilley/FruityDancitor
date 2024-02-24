import appConfig from './appConfig.ts';
import Accordion from './views/Accordion';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Loader from './components/Loader.tsx';

/**
 * Component which ecapsulates all other components of the web page.
 */
function App() {
  return (
    <>
      <Loader />
      <ToastContainer />
      <div id='customBackground' className='fixed z-10 h-screen w-screen bg-cover' />
      <div className='flex justify-center bg-base-300/80 p-5'>
        <div style={{ maxWidth: appConfig.maxWidth }} className='z-20 w-full'>
          <Accordion />
        </div>
      </div>
    </>
  );
}

export default App;
