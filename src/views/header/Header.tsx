import logotype from '../../media/logotype.svg';
import ThemeSwitcher from './ThemeSwitcher.tsx';
import useHeader from '../../hooks/utils/useHeader.ts';

/**
 * Component representing the header of the webpage.
 */
function Header() {
  const { showHeader, version } = useHeader();

  return (
    <div
      className='navbar relative z-30 mb-2 rounded-md bg-base-100 transition-all max-md:hidden'
      style={{
        opacity: showHeader ? '100%' : '0%',
        transform: showHeader ? 'translateY(0px)' : 'translateY(-120px)',
      }}
    >
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='size-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
        </div>
        <div className='flex items-center'>
          <img src={logotype} alt='logotype' width='60' height='60' className='mr-2' />
          <div>
            <div className='text-xl font-bold'>
              FruityDancitor{' '}
              <sup className='font-light'>
                {' '}
                <a href='https://github.com/TheWilley/FruityDancitor/releases/latest'>
                  {version}
                </a>
              </sup>
            </div>
            <div className='text-sm'>By TheWilley</div>
          </div>
        </div>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <a
              href='https://github.com/TheWilley/FruityDancitor'
              target='_blank'
              rel='noreferrer'
            >
              Source Code
            </a>
          </li>
          <li>
            <a
              href='https://github.com/TheWilley/FruityDancitor/blob/main/LICENSE'
              target='_blank'
              rel='noreferrer'
            >
              License
            </a>
          </li>
          <li>
            <a
              href='https://github.com/TheWilley/FruityDancitor/issues'
              target='_blank'
              rel='noreferrer'
            >
              Report a Bug
            </a>
          </li>
          <li>
            <a
              href='https://www.image-line.com/fl-studio-learning/fl-studio-online-manual/html/plugins/Fruity%20Dance.htm'
              target='_blank'
              rel='noreferrer'
            >
              Fruity Dance Docs
            </a>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>{<ThemeSwitcher />}</div>
    </div>
  );
}

export default Header;
