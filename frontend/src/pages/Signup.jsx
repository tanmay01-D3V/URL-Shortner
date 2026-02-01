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
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-gray-50/50">
            <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white p-10 rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mb-6">
                            <UserPlus size={32} />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create Account</h1>
                        <p className="text-gray-500 mt-2">Join BriefURL and start sharing better links</p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 rounded-2xl text-gray-900 placeholder:text-gray-400 transition-all outline-none"
                                    placeholder="John Doe"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                </div>
                                <input
                                    type="email"
                                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 rounded-2xl text-gray-900 placeholder:text-gray-400 transition-all outline-none"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                </div>
                                <input
                                    type="password"
                                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 rounded-2xl text-gray-900 placeholder:text-gray-400 transition-all outline-none"
                                    placeholder="Minimum 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm flex items-center gap-3">
                                <AlertCircle size={20} className="shrink-0" />
                                <span className="font-semibold">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 group"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : 'Create Account'}
                            {!loading && <CheckCircle2 size={20} className="group-hover:scale-110 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-gray-500 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-600 font-bold hover:underline underline-offset-4">
                            Login here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
