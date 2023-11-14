function Card(props: {children: React.ReactNode, className?: string}) {
    return (
        <div className={`bg-base-100 card overflow-auto ${props.className}`}>
            {props.children}
        </div>
    );
}

export default Card;