type Props = { children: React.ReactNode[] };

function SectionViewport(props: Props) {
  return <div className='flex flex-col gap-2'>{props.children}</div>;
}

export default SectionViewport;
