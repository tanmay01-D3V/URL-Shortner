import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link2, LogOut, User, Home, List } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const navRef = useRef(null);
    const linksRef = useRef([]);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.2 });

            // 1. Navbar slide down
            tl.from(navRef.current, {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            })
                // 2. Logo pop in
                .from(".nav-logo", {
                    scale: 0.5,
                    opacity: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                }, "-=0.6")
                // 3. Staggered nav links
                .from(".nav-link", {
                    y: -20,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out"
                }, "-=0.3")
                // 4. Auth section pop in
                .from(".nav-auth", {
                    x: 30,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power3.out"
                }, "-=0.4");
        });
        return () => ctx.revert();
    }, []);

    const handleHover = (e, isEnter) => {
        gsap.to(e.currentTarget, {
            scale: isEnter ? 1.05 : 1,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/login');
    };

    return (
        <nav
            ref={navRef}
            className={`sticky top-0 z-50 transition-all duration-500 w-full ${isScrolled
                    ? 'bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-0'
                    : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className={`flex justify-between items-center transition-all duration-500 ${isScrolled ? 'h-20' : 'h-40'}`}>
                    <div className="flex items-center">
                        <Link to="/" className="nav-logo flex items-center group">
                            <div className={`flex items-center justify-center transition-all duration-500 group-hover:scale-105 ${isScrolled ? 'scale-75 origin-left' : 'scale-100'}`}>
                                <img src={logo} alt="BriefURL Logo" className="w-68 h-64 object-contain" />
                            </div>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            onMouseEnter={(e) => handleHover(e, true)}
                            onMouseLeave={(e) => handleHover(e, false)}
                            className="nav-link text-gray-200 hover:text-white font-semibold transition-colors flex items-center gap-1.5 uppercase tracking-wider text-xs text-size-100"
                        >
                            <Home size={36} /> Home
                        </Link>
                        {user && (
                            <Link
                                to="/result"
                                onMouseEnter={(e) => handleHover(e, true)}
                                onMouseLeave={(e) => handleHover(e, false)}
                                className="nav-link text-gray-200 hover:text-white font-semibold transition-colors flex items-center gap-1.5 uppercase tracking-wider text-xs"
                            >
                                <List size={36} /> History
                            </Link>
                        )}
                    </div>

                    <div className="nav-auth flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2 text-white/90">
                                    <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white font-bold border border-white/20 shadow-lg">
                                        {user.username?.[0].toUpperCase() || 'U'}
                                    </div>
                                    <span className="hidden sm:inline font-semibold">{user.username}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1.5 text-gray-400 hover:text-red-400 transition-colors font-bold uppercase tracking-widest text-[10px]"
                                >
                                    <LogOut size={18} />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-gray-200 font-bold hover:text-white transition-colors uppercase tracking-widest text-[10px]"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-6 py-2.5 bg-white text-black font-black rounded-full hover:bg-gray-200 transition-all active:scale-95 uppercase tracking-widest text-[10px] shadow-xl shadow-white/10"
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
