type Props = { onClick: () => void };

/**
 * Component which represents a plus button to add a new sequence.
 * @param props A object containing component properties.
 */
function SequenceMinusButton(props: Props) {
  return (
    <div
      className='relative m-1 flex cursor-pointer items-center justify-center rounded bg-base-300 p-1 text-3xl transition hover:brightness-110'
      onClick={props.onClick}
    >
      -
    </div>
  );
}

export default SequenceMinusButton;
