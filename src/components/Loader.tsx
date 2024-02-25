/**
 * Component which represents a loader.
 */
function Loader() {
  return (
    <dialog className='modal' id='loader'>
      <span className='loading  loading-ring loading-lg text-primary'></span>
    </dialog>
  );
}

export default Loader;
