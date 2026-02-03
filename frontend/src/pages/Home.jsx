import React, { useState, useEffect, useRef } from 'react';
import api from '../api';
import { Link2, Copy, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

const Home = () => {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const cardRef = useRef(null);
    const featuresRef = useRef(null);

    useEffect(() => {
        if (typeof window.gsap === 'undefined' && typeof gsap === 'undefined') return;

        const gsapLib = window.gsap || gsap;
        const ctx = gsapLib.context(() => {
            const tl = gsapLib.timeline({ delay: 1.2 });

            tl.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            })
                .from(subtitleRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6")
                .from(cardRef.current, {
                    y: 40,
                    opacity: 0,
                    scale: 0.95,
                    duration: 1,
                    ease: "elastic.out(1, 0.75)"
                }, "-=0.4")
                .from(".feature-item", {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.3,
                    ease: "back.out(1.7)",
                    clearProps: "all"
                }, "-=0.2");
        });
        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setShortUrl('');

        try {
            const response = await api.post('/url', { url });
            setShortUrl(`${window.location.origin}/api/url/${response.data.id}`);
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong. Make sure you are logged in.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center p-6 pt-10 pb-32">
            <div ref={heroRef} className="w-full max-w-3xl text-center mb-16 px-4">
                <h1 ref={titleRef} className="text-6xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight">
                    Shorten Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Links</span>, Expand Your Reach
                </h1>
                <p ref={subtitleRef} className="text-xl text-gray-300 max-w-xl mx-auto font-medium leading-relaxed">
                    The premium URL shortener for professionals. Create good, memorable links in seconds.
                </p>
            </div>

            <div ref={cardRef} className="w-full max-w-xl bg-black/40 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl shadow-black/80 border border-white/10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <Link2 className="text-indigo-400 group-focus-within:text-cyan-400 transition-colors" size={24} />
                        </div>
                        <input
                            type="url"
                            placeholder="Paste your long URL here..."
                            className="block w-full pl-14 pr-4 py-5 bg-white/5 border border-white/5 focus:border-indigo-500/50 rounded-2xl text-white placeholder:text-gray-500 transition-all outline-none text-lg"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-black text-xl hover:from-indigo-500 hover:to-violet-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-3 uppercase tracking-wider"
                    >
                        {loading ? <Loader2 className="animate-spin" size={28} /> : 'Create Short Link'}
                        {!loading && <ArrowRight size={24} />}
                    </button>
                </form>

                {error && (
                    <div className="mt-8 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-semibold flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                        {error}
                    </div>
                )}

                {shortUrl && (
                    <div className="mt-10 p-8 bg-indigo-500/10 border border-indigo-500/30 rounded-3xl shadow-2xl">
                        <label className="block text-xs font-black text-indigo-300 uppercase tracking-widest mb-3">Successfully Shortened</label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                readOnly
                                value={shortUrl}
                                className="block w-full bg-black/40 border border-white/10 px-5 py-4 rounded-xl text-indigo-300 font-bold outline-none"
                            />
                            <button
                                onClick={copyToClipboard}
                                className={`px-6 rounded-xl flex items-center gap-2 transition-all font-bold ${copied
                                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20'
                                    }`}
                            >
                                {copied ? <CheckCircle size={22} /> : <Copy size={22} />}
                                <span>{copied ? 'Copied' : 'Copy'}</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-32 w-full max-w-5xl">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Features</h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="feature-item p-10 bg-white/5 rounded-[2rem] border border-white/5 transition-all hover:scale-105 hover:bg-white/10 hover:border-white/10">
                        <div className="text-4xl font-black text-white mb-2">Fast</div>
                        <p className="text-gray-400 font-medium">Shorten links instantly</p>
                    </div>
                    <div className="feature-item p-10 bg-white/5 rounded-[2rem] border border-white/5 transition-all hover:scale-105 hover:bg-white/10 hover:border-white/10">
                        <div className="text-4xl font-black text-white mb-2">Secure</div>
                        <p className="text-gray-400 font-medium">Protected user accounts</p>
                    </div>
                    <div className="feature-item p-10 bg-white/5 rounded-[2rem] border border-white/5 transition-all hover:scale-105 hover:bg-white/10 hover:border-white/10">
                        <div className="text-4xl font-black text-white mb-2">Stats</div>
                        <p className="text-gray-400 font-medium">Track click analytics</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
