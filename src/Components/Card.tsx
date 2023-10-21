function Card(props: {children: React.ReactNode}) {
    return (
        <div className="rounded-md shadow-md p-2 bg-gray-100 overflow-hidden h-full">
            {props.children}
        </div>
    );
}

export default Card;