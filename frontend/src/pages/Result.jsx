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
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
                <Loader2 className="animate-spin text-indigo-600" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] p-6 md:p-12 bg-gray-50/50">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Your History</h1>
                        <p className="text-gray-500 mt-2 text-lg">Manage and track your shortened URLs</p>
                    </div>
                    <div className="bg-indigo-600 px-6 py-3 rounded-2xl text-white font-bold shadow-lg shadow-indigo-100 flex items-center gap-2">
                        <MousePointer2 size={20} />
                        <span>Total Links: {urls.length}</span>
                    </div>
                </div>

                {error ? (
                    <div className="bg-white p-12 rounded-3xl border border-red-50 flex flex-col items-center text-center shadow-xl shadow-red-50/50">
                        <div className="bg-red-50 p-4 rounded-full text-red-600 mb-4">
                            <AlertCircle size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
                        <p className="text-gray-500 max-w-sm">{error}</p>
                    </div>
                ) : urls.length === 0 ? (
                    <div className="bg-white p-20 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center text-center">
                        <div className="bg-indigo-50 p-4 rounded-full text-indigo-600 mb-6">
                            <ExternalLink size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No URLs found</h2>
                        <p className="text-gray-500 max-w-xs mb-8">You haven't shortened any URLs yet. Hit the home page to get started!</p>
                        <a href="/" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100">
                            Create My First Link
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {urls.map((url, index) => (
                            <div
                                key={url._id}
                                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group animate-in fade-in slide-in-from-bottom-4 duration-500"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                                    <div className="space-y-2 flex-grow min-w-0">
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                                Shortened
                                            </span>
                                            <a
                                                href={`${window.location.origin}/api/url/${url.shortID}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-lg font-bold text-gray-900 hover:text-indigo-600 flex items-center gap-1 transition-colors truncate"
                                            >
                                                {url.shortID}
                                                <ExternalLink size={16} />
                                            </a>
                                        </div>
                                        <p className="text-gray-400 text-sm truncate flex items-center gap-2">
                                            <ExternalLink size={14} className="shrink-0" />
                                            Original: <span className="hover:text-gray-600 transition-colors">{url.redirectURL}</span>
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-6 shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8">
                                        <div className="text-center group-hover:transform group-hover:scale-110 transition-transform">
                                            <div className="flex items-center justify-center gap-1.5 text-indigo-600 mb-1">
                                                <BarChart3 size={20} />
                                                <span className="text-2xl font-black">{url.visitHistory.length}</span>
                                            </div>
                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Clicks</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-1.5 text-gray-600 mb-1">
                                                <Clock size={18} />
                                                <span className="text-sm font-semibold">
                                                    {new Date(url.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Created</p>
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
