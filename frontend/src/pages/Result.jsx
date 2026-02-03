import React, { useEffect, useState } from 'react';
import api from '../api';
import { ExternalLink, BarChart3, Clock, Loader2, MousePointer2, AlertCircle } from 'lucide-react';

const Result = () => {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUrls();
    }, []);

    const fetchUrls = async () => {
        try {
            const response = await api.get('/url');
            setUrls(response.data.urls);
        } catch (err) {
            setError('Failed to fetch your URLs. Please make sure you are logged in.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
                <Loader2 className="animate-spin text-indigo-400" size={64} />
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <h1 className="text-5xl font-black text-white tracking-tight leading-none">Your History</h1>
                        <p className="text-gray-400 mt-4 text-xl font-medium">Insights and management for your premium links</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md px-8 py-4 rounded-[2rem] text-white font-bold border border-white/10 flex items-center gap-3 shadow-xl">
                        <MousePointer2 className="text-indigo-400" size={24} />
                        <span className="text-lg">Total Links: {urls.length}</span>
                    </div>
                </div>

                {error ? (
                    <div className="bg-black/40 backdrop-blur-2xl p-16 rounded-[3rem] border border-white/10 flex flex-col items-center text-center shadow-2xl">
                        <div className="bg-red-500/10 p-6 rounded-full text-red-400 mb-6 border border-red-500/20">
                            <AlertCircle size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-3">Access Denied</h2>
                        <p className="text-gray-400 max-w-sm font-medium">{error}</p>
                    </div>
                ) : urls.length === 0 ? (
                    <div className="bg-black/40 backdrop-blur-2xl p-24 rounded-[3rem] border border-dashed border-white/10 flex flex-col items-center text-center shadow-2xl">
                        <div className="bg-indigo-500/10 p-6 rounded-full text-indigo-400 mb-8 border border-indigo-500/20">
                            <ExternalLink size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-3">No URLs Found</h2>
                        <p className="text-gray-400 max-w-md mb-10 text-lg font-medium tracking-wide">Your history is clear. Ready to create your first premium short link?</p>
                        <a href="/" className="px-10 py-4 bg-white text-black font-black rounded-full hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5 uppercase tracking-widest text-sm">
                            Create First Link
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {urls.map((url, index) => (
                            <div
                                key={url._id}
                                className="bg-black/30 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 shadow-lg hover:shadow-2xl hover:border-white/10 transition-all group animate-in fade-in slide-in-from-bottom-4 duration-500"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex flex-col md:flex-row gap-8 md:items-center justify-between">
                                    <div className="space-y-3 flex-grow min-w-0">
                                        <div className="flex items-center gap-4">
                                            <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-300 text-[10px] font-black rounded-full uppercase tracking-widest border border-indigo-500/20">
                                                Active
                                            </span>
                                            <a
                                                href={`${window.location.origin}/api/url/${url.shortID}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-2xl font-black text-white hover:text-indigo-400 flex items-center gap-2 transition-colors truncate tracking-tight"
                                            >
                                                {url.shortID}
                                                <ExternalLink size={20} />
                                            </a>
                                        </div>
                                        <p className="text-gray-500 text-sm truncate flex items-center gap-2 font-medium">
                                            <ExternalLink size={16} className="shrink-0 text-gray-600" />
                                            Target: <span className="text-gray-400 hover:text-gray-300 transition-colors uppercase tracking-tight text-xs">{url.redirectURL}</span>
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-10 shrink-0 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-10">
                                        <div className="text-center group-hover:transform group-hover:translate-y-[-4px] transition-transform duration-300">
                                            <div className="flex items-center justify-center gap-2 text-indigo-400 mb-1">
                                                <BarChart3 size={24} />
                                                <span className="text-3xl font-black text-white">{url.visitHistory.length}</span>
                                            </div>
                                            <p className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em]">Total Clicks</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
                                                <Clock size={20} />
                                                <span className="text-base font-bold text-white">
                                                    {new Date(url.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                            <p className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em]">Created At</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Result;
