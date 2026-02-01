import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link2, LogOut, User, Home, List } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="bg-indigo-600 p-2 rounded-lg">
                                <Link2 className="text-white w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                                BriefURL
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors flex items-center gap-1">
                            <Home size={18} /> Home
                        </Link>
                        {user && (
                            <Link to="/result" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors flex items-center gap-1">
                                <List size={18} /> History
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-gray-700">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold border border-indigo-200">
                                        {user.username?.[0].toUpperCase() || 'U'}
                                    </div>
                                    <span className="hidden sm:inline font-medium">{user.username}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors"
                                >
                                    <LogOut size={20} />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
