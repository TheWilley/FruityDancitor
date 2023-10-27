function Viewport(props: {Navbar: React.ReactNode, Canvas: React.ReactNode}) {
    return (
        <div className="flex flex-col gap-2">
            {props.Navbar}
            {props.Canvas}
        </div>
    );
}

export default Viewport;