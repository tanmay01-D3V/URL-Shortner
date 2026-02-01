import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { Mail, Lock, LogIn, Loader2, AlertCircle, ArrowRight } from 'lucide-react';

const Login = () => {
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
            const response = await api.post('/user/login', { email, password });
            if (response.data.status === 'success') {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-gray-50/50">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white p-10 rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mb-6">
                            <LogIn size={32} />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
                        <p className="text-gray-500 mt-2">Login to manage your short links</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
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
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Password</label>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                </div>
                                <input
                                    type="password"
                                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 rounded-2xl text-gray-900 placeholder:text-gray-400 transition-all outline-none"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle size={20} className="shrink-0" />
                                <span className="font-semibold">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 group"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : 'Login to Account'}
                            {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-gray-500 text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-indigo-600 font-bold hover:underline underline-offset-4">
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
