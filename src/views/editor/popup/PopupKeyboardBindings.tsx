import keybindings from '../../../data/keybindings.json';

/**
 *
 */
function PopupKeyboardBindings() {
  return (
    <>
      <dialog id='keyboardBindingsDialog' className='modal backdrop-brightness-50'>
        <div className='modal-box'>
          <h3 className='text-lg font-bold'>Keyboard Bindings</h3>
          <ul>
            {keybindings.map((item, index) => (
              <li key={index} className='my-2'>
                <kbd className='kbd'> {item.displayedShortcut} </kbd> -{' '}
                <span>{item.description} </span>
              </li>
            ))}
          </ul>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default PopupKeyboardBindings;
