export default function NavbarInfoTab() {
    return (
        <div className="ml-2">
            <div className="text-2xl font-bold">
                FruityDancitor
                <div className='text-sm'>
                    By TheWilley
                </div>
            </div>
            <ul className="flex mt-2 [&>*]:mr-3">
                <li className="card">
                    <a href="https://github.com/TheWilley/FruityDancitor" target="_blank" className="link"> Source
                        Code </a>
                </li>
                <li className="card">
                    <a href="https://github.com/TheWilley/FruityDancitor/issues" target="_blank"
                       className="link"> Report a Bug </a>
                </li>
                <li className="card">
                    <a href="https://www.image-line.com/fl-studio-learning/fl-studio-online-manual/html/plugins/Fruity%20Dance.htm"
                       target="_blank" className="link"> Fruity Dance Docs </a>
                </li>
            </ul>
        </div>
    );
}

