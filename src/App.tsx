import appConfig from '../appConfig';
import Accordion from './views/Accordion';

/**
 * The primary app component, ecapsulates all other components on the web page
 */
function App() {
  return (
    <>
      <div className='bg-background-light dark:bg-background-dark p-5 flex justify-center'>
        <div style={{ maxWidth: appConfig.maxWidth }} className='w-full'>
          <Accordion />
        </div>
      </div>
    </>
  );
}

export default App;
