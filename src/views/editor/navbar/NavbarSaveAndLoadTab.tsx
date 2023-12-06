import { useRef } from 'react';
import useSaveAndLoad from '../../../hooks/utils/useSaveAndLoad.ts';
import { LoadSettings, SaveSettings } from '../../../global/types.ts';

type Props = { saveSettings: SaveSettings; loadSettings: LoadSettings };

/**
 * Component used to save and load a FruityDancitor project.
 */
function NavbarSaveAndLoadTab(props: Props) {
  const [save, load] = useSaveAndLoad();
  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <input
        id='selectImage'
        type='file'
        onChange={(e) => {
          e.target.files && load(e.target.files[0], props.loadSettings);
        }}
        ref={fileRef}
        className='hidden'
      />
      <button
        className='btn btn-outline btn-warning w-full'
        onClick={() => fileRef.current && fileRef.current.click()}
      >
        {' '}
        Load Project
      </button>
      <button
        className='btn btn-outline btn-success w-full mt-1'
        onClick={() => save(props.saveSettings)}
      >
        {' '}
        Save Project
      </button>
    </div>
  );
}

export default NavbarSaveAndLoadTab;
