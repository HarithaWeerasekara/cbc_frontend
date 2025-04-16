export default function Header() {
    return (
        <header className="w-full bg-blue-500 h-[60px] text-white flex items-center justify-between px-6 shadow-lg rounded-b-lg">
            <h1 className="text-2xl font-bold tracking-wider">My Store</h1>
            <nav>
                <ul className="flex space-x-6">
                    <li><a href="#" className="hover:text-gray-200">Home</a></li>
                    <li><a href="#" className="hover:text-gray-200">Shop</a></li>
                    <li><a href="#" className="hover:text-gray-200">About</a></li>
                    <li><a href="#" className="hover:text-gray-200">Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}
