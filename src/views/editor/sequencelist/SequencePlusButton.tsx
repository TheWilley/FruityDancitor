type Props = { onClick: () => void };

/**
 * Component which represents a plus button to add a new sequence.
 * @param props A object containing component properties.
 */
function SequencePlusButton(props: Props) {
  return (
    <div
      className='flex items-center justify-center text-3xl p-1 m-1 relative bg-base-300 rounded cursor-pointer hover:brightness-110 transition'
      onClick={props.onClick}
    >
      +
    </div>
  );
}

export default SequencePlusButton;
