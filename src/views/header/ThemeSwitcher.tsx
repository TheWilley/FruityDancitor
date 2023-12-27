import useTheme from '../../hooks/utils/useTheme.ts';

/**
 * Component which handles theme switching.
 */
function ThemeSwitcher() {
  const { changeTheme } = useTheme();

  return (
    <div className='dropdown'>
      <div tabIndex={0} role='button' className='btn m-1'>
        Theme
        <svg
          width='12px'
          height='12px'
          className='h-2 w-2 fill-current opacity-60 inline-block'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 2048 2048'
        >
          <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
        </svg>
      </div>
      <form onChange={(e) => changeTheme((e.target as HTMLInputElement).value)}>
        <ul
          tabIndex={0}
          className='dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box [&>*]:mb-1'
        >
          <li>
            <input
              type='radio'
              name='theme-dropdown'
              className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
              aria-label='Default'
              value='default'
            />
          </li>{' '}
          <li>
            <input
              type='radio'
              name='theme-dropdown'
              className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
              aria-label='Light'
              value='light'
            />
          </li>
          <li>
            <input
              type='radio'
              name='theme-dropdown'
              className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
              aria-label='Dark'
              value='dark'
            />
          </li>
          <li>
            <input
              type='radio'
              name='theme-dropdown'
              className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
              aria-label='Dracula'
              value='dracula'
            />
          </li>
          <li>
            <input
              type='radio'
              name='theme-dropdown'
              className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
              aria-label='Aqua'
              value='aqua'
            />
          </li>
          <li>
            <input
              type='radio'
              name='theme-dropdown'
              className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
              aria-label='Lofi'
              value='lofi'
            />
          </li>
        </ul>
      </form>
    </div>
  );
}

export default ThemeSwitcher;
