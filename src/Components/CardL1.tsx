function CardL1(props: {children: React.ReactNode, className?: string}) {
    return (
        <div className={`bg-white-light dark:bg-black-dark text-black-light dark:text-white-dark rounded-md shadow-md p-2 ${props.className}`}>
            {props.children}
        </div>
    );
}

export default CardL1;