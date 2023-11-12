import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppSettings } from '../../../../hooks/useAppSettings';

function NavbarAppSettingsTab(props: {appSettings: AppSettings}) {
    return (
        <div className='grid grid-cols-3 gap-2'>
            <div className="join">
                <div className='bg-base-200 join-item p-1 pl-2 pr-2'> <FontAwesomeIcon icon={faPercent} /> </div>
                <div className='w-full tooltip tooltip-bottom' data-tip="Compression Ratio - Effects the resolution when uploading images">
                    <input type="number" className="input input-bordered join-item input-sm w-full" placeholder='Sequences' min={0.1} max={1} step={0.1} value={props.appSettings.imageCompressionRatio} onChange={(e) => props.appSettings.setImageCompressionRatio(Number(e.target.value))}/>
                </div>
            </div>
        </div>
    );
}

export default NavbarAppSettingsTab;