/**
 * Component which represents a loader.
 */
function Loader() {
  return (
    <dialog className='modal' id='loader'>
      <span className='rounded-md bg-base-200 p-3 text-2xl shadow-md'>Loading...</span>
    </dialog>
  );
}

export default Loader;
