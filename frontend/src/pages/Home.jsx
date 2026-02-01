import React, { useState } from 'react';
import api from '../api';
import { Link2, Copy, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

const Home = () => {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

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
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-indigo-50/30">
            <div className="w-full max-w-2xl text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                    Shorten Your <span className="text-indigo-600">Links</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-md mx-auto">
                    Create short, memorable links in seconds. Perfect for social media and sharing.
                </p>
            </div>

            <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50 animate-in fade-in zoom-in-95 duration-500 delay-150">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Link2 className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                        </div>
                        <input
                            type="url"
                            placeholder="Paste your long URL here..."
                            className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 rounded-2xl text-gray-900 placeholder:text-gray-400 transition-all outline-none"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={24} /> : 'Shorten Now'}
                        {!loading && <ArrowRight size={20} />}
                    </button>
                </form>

                {error && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                        {error}
                    </div>
                )}

                {shortUrl && (
                    <div className="mt-8 p-6 bg-indigo-50/50 border border-indigo-100 rounded-2xl animate-in zoom-in-95 duration-300">
                        <label className="block text-sm font-semibold text-indigo-900 mb-2">Your Short Link</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                readOnly
                                value={shortUrl}
                                className="block w-full bg-white border border-indigo-100 px-4 py-3 rounded-xl text-indigo-700 font-medium outline-none"
                            />
                            <button
                                onClick={copyToClipboard}
                                className={`px-4 rounded-xl flex items-center gap-2 transition-all ${copied
                                    ? 'bg-green-500 text-white shadow-lg shadow-green-100'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    }`}
                            >
                                {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                                <span>{copied ? 'Copied' : 'Copy'}</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                <div className="p-4">
                    <div className="text-3xl font-bold text-indigo-600 mb-1">Fast</div>
                    <p className="text-gray-500">Shorten links instantly</p>
                </div>
                <div className="p-4 border-x border-indigo-50">
                    <div className="text-3xl font-bold text-indigo-600 mb-1">Secure</div>
                    <p className="text-gray-500">Protected user accounts</p>
                </div>
                <div className="p-4">
                    <div className="text-3xl font-bold text-indigo-600 mb-1">Stats</div>
                    <p className="text-gray-500">Track click analytics</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
