import Editor from './views/editor/Editor';
import appConfig from '../appConfig';

function App() {
  return (
    <>
      <div className='bg-background-light dark:bg-background-dark p-5 flex justify-center'>
        <div style={{ maxWidth: appConfig.maxWidth }} className='w-full'>
          <Editor />
        </div>
      </div>
    </>
  );
}

export default App;
