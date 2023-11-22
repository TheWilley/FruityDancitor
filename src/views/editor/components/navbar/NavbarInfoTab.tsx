import logotype from '../../../../media/logotype.svg';

export default function NavbarInfoTab() {
  return (
    <div className='ml-2'>
      <div className='flex items-center'>
        <img src={logotype} alt='logotype' width='120' height='120' className='mr-2' />
        <div>
          <div className='text-2xl font-bold'>FruityDancitor</div>
          <div className='text-sm'>By TheWilley</div>
        </div>
      </div>
      <ul className='flex mt-2 [&>*]:mr-3 ml-4'>
        <li className='card'>
          <a
            href='https://github.com/TheWilley/FruityDancitor'
            target='_blank'
            className='link' rel="noreferrer"
          >
            {' '}
            Source Code{' '}
          </a>
        </li>
        <li className='card'>
          <a
            href='https://github.com/TheWilley/FruityDancitor/blob/main/LICENSE'
            target='_blank'
            className='link' rel="noreferrer"
          >
            {' '}
            License{' '}
          </a>
        </li>
        <li className='card'>
          <a
            href='https://github.com/TheWilley/FruityDancitor/issues'
            target='_blank'
            className='link' rel="noreferrer"
          >
            {' '}
            Report a Bug{' '}
          </a>
        </li>
        <li className='card'>
          <a
            href='https://www.image-line.com/fl-studio-learning/fl-studio-online-manual/html/plugins/Fruity%20Dance.htm'
            target='_blank'
            className='link' rel="noreferrer"
          >
            {' '}
            Fruity Dance Docs{' '}
          </a>
        </li>
      </ul>
    </div>
  );
}
