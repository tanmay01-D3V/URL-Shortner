import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { User, Mail, Lock, UserPlus, Loader2, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/user', { username, email, password });
            if (response.data.status === 'success') {
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Try a different email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
            <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-black/40 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl shadow-black/80 border border-white/10">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 text-indigo-400 mb-8 border border-white/5 shadow-inner">
                            <UserPlus size={40} />
                        </div>
                        <h1 className="text-4xl font-black text-white tracking-tight">Join the Elite</h1>
                        <p className="text-gray-400 mt-3 font-medium">Create beautiful, professional short links today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-indigo-300 ml-1 uppercase tracking-[0.2em]">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <User className="text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-14 pr-4 py-4 bg-white/5 border border-white/5 focus:border-indigo-500/50 rounded-2xl text-white placeholder:text-gray-600 transition-all outline-none"
                                    placeholder="John Doe"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-indigo-300 ml-1 uppercase tracking-[0.2em]">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <Mail className="text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                </div>
                                <input
                                    type="email"
                                    className="block w-full pl-14 pr-4 py-4 bg-white/5 border border-white/5 focus:border-indigo-500/50 rounded-2xl text-white placeholder:text-gray-600 transition-all outline-none"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-indigo-300 ml-1 uppercase tracking-[0.2em]">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <Lock className="text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                </div>
                                <input
                                    type="password"
                                    className="block w-full pl-14 pr-4 py-4 bg-white/5 border border-white/5 focus:border-indigo-500/50 rounded-2xl text-white placeholder:text-gray-600 transition-all outline-none"
                                    placeholder="Minimum 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3">
                                <AlertCircle size={20} className="shrink-0" />
                                <span className="font-bold">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 py-5 bg-white text-black rounded-2xl font-black text-lg hover:bg-gray-200 shadow-xl shadow-white/5 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 group uppercase tracking-widest"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : 'Create My Account'}
                            {!loading && <CheckCircle2 size={20} className="group-hover:scale-110 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-10 text-center text-gray-500 text-sm font-medium">
                        Already joined?{' '}
                        <Link to="/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                            Login hrer
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
