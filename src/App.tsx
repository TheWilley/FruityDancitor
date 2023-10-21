import Card from './Components/Card';
import Editor from './Components/Editor';

function App() {
  return (
    <>
      <div className='h-screen p-3'>
        <Card>
          <Editor />
        </Card>
      </div>
    </>
  );
}

export default App;
