import keybindings from '../../../data/keybindings.json';

/**
 *
 */
function PopupKeyboardBindings() {
  return (
    <>
      <dialog id='keyboardBindingsDialog' className='modal backdrop-brightness-50'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Keyboard Bindings</h3>
          <ul>
            {keybindings.map((item, index) => (
              <li key={index} className='mb-2 mt-2'>
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
