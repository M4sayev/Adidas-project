import { Link, useNavigate, useLocation } from 'react-router'
import { FaHome, FaBoxOpen, FaTags, FaClipboardList, FaUsers, FaChartBar, FaCommentDots, FaPhotoVideo, FaCog } from 'react-icons/fa'

const SideBar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogOut = () => {
        localStorage.clear()
        navigate('/login')
    }

    const menuItems = [
        { label: 'Dashboard', to: '/admin', icon: <FaHome /> },
        { label: 'Products', to: '/admin/products', icon: <FaBoxOpen /> },
        { label: 'Categories', to: '/admin/category', icon: <FaTags /> },
        { label: 'Orders', to: '/admin/orders', icon: <FaClipboardList /> },
        { label: 'Users', to: '/admin/users', icon: <FaUsers /> },
        { label: 'Analytics', to: '/admin/analytics', icon: <FaChartBar /> },
        { label: 'Reviews', to: '/admin/reviews', icon: <FaCommentDots /> },
        { label: 'Campaigns', to: '/admin/campaigns', icon: <FaTags /> },
        { label: 'Media', to: '/admin/media', icon: <FaPhotoVideo /> },
        { label: 'Settings', to: '/admin/settings', icon: <FaCog /> },
        ]

    return (
        <div className="h-screen w-48 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-lg">
            <div className="text-2xl font-bold p-6 border-b border-gray-700">
                Adidas Admin
            </div>

            <ul className="flex-1 px-4 py-6 space-y-2">
               {menuItems.map(({ label, to, icon }) => {
                const isActive = location.pathname === to
                return (
                    <li key={label}>
                        <Link
                            to={to}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                                ${isActive
                                    ? 'bg-gray-700 text-white shadow-md'
                                    : 'hover:bg-gray-700 hover:shadow hover:text-white text-gray-300'}`}
                        >
                            <span className="text-lg">{icon}</span>
                            <span className="text-sm font-medium">{label}</span>
                        </Link>
                    </li>
                )
            })}


                <li className="mt-auto pt-4 border-t border-gray-700">
                    <button
                        onClick={handleLogOut}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition-all duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-5 h-5 fill-current"
                        >
                            <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424Z" />
                            <rect width="32" height="64" x="256" y="232" />
                        </svg>
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default SideBar
