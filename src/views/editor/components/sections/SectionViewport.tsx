type Props = { children: React.ReactNode[] };

/**
 * Component which represents the viewport (i.e, middle area).
 */
function SectionViewport(props: Props) {
  return <div className='flex flex-col gap-2'>{props.children}</div>;
}

export default SectionViewport;
