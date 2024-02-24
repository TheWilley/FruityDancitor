import { useRef } from 'react';
import useSaveAndLoad from '../../../hooks/utils/useSaveAndLoad.ts';

/**
 * Component used to save and load a FruityDancitor project.
 */
function NavbarSaveAndLoadTab() {
  const [save, load] = useSaveAndLoad();
  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <input
        id='selectImage'
        type='file'
        onChange={(e) => {
          e.target.files && load(e.target.files[0]);
        }}
        ref={fileRef}
        className='hidden'
      />
      <button
        className='btn btn-info w-full'
        onClick={() => fileRef.current && fileRef.current.click()}
      >
        Load Project
      </button>
      <button className='btn btn-success mt-1 w-full' onClick={() => save()}>
        Save Project
      </button>
    </div>
  );
}

export default NavbarSaveAndLoadTab;
