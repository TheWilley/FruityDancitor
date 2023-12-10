import appConfig from '../appConfig';
import Accordion from './views/Accordion';

/**
 * The primary app component, ecapsulates all other components on the web page
 */
function App() {
  return (
    <>
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
