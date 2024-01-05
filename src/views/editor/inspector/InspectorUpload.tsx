import useUpload from '../../../hooks/utils/useUpload.ts';
import useFileUpload from '../../../hooks/utils/useFileUpload.ts';
import { Upload } from '../../../global/types.ts';
import useLinkUpload from '../../../hooks/utils/useLinkUpload.ts';

/**
 *  Component which handles image uploads via file or URL.
 * @param props A object containing component properties.
 */
function InspectorUpload(props: Upload) {
  const { disabled, handleFileUpload, handleURLUpload } = useUpload(
    props.spriteSheetSequences,
    props.setSpriteSheetSequences,
    props.selectedSequence,
    props.dialogFrames,
    props.setDialogFrames,
    props.dialogIsShown,
    props.setDialogIsShown,
    props.selectedDialogFrames,
    props.setSelectedDialogFrames
  );

  /**
   * Component which displays a file upload box which can be clicked or file dropped.
   */
  const FileUpload = () => {
    const { getRootProps, getInputProps, placeholder, styles, classes } = useFileUpload(
      handleFileUpload,
      disabled
    );

    return (
      <div {...getRootProps()} className={classes} style={styles}>
        <input {...getInputProps()} disabled={disabled} />
        <p>{placeholder}</p>
      </div>
    );
  };

  /**
   * Compnent which displays a text box where a URL can be entered.
   */
  const LinkUpload = () => {
    const { handleSubmit, link, handleChange, borderStyling, enterStyling } =
      useLinkUpload(handleURLUpload);
    return (
      <form onSubmit={handleSubmit}>
        <div className='join w-full'>
          <div className={enterStyling}>↵</div>
          <input
            type='text'
            value={link}
            onChange={handleChange}
            className={borderStyling}
            placeholder='Image URL'
          />
        </div>
        <button type='submit' className='hidden' />
      </form>
    );
  };

  return (
    <>
      <LinkUpload />
      <div className='m-2' />
      <FileUpload />
    </>
  );
}

export default InspectorUpload;
