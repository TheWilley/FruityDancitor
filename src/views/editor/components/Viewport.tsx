function Viewport(props: {children: React.ReactNode[]}) {
    return (
        <div className="flex flex-col gap-2">
            {props.children}
        </div>
    );
}

export default Viewport;