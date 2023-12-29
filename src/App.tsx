import appConfig from '../appConfig';
import Accordion from './views/Accordion';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

/**
 * Component which ecapsulates all other components of the web page.
 */
function App() {
  return (
    <>
      <ToastContainer />
      <div id='customBackground' className='z-10 fixed w-screen h-screen bg-cover' />
      <div className='bg-base-300/80 p-5 flex justify-center'>
        <div style={{ maxWidth: appConfig.maxWidth }} className='w-full z-20'>
          <Accordion />
        </div>
      </div>
    </>
  );
}

export default App;
