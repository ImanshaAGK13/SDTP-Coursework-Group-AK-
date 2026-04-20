import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, Sparkles, Lock, ArrowLeft } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import api from '../utils/api';
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    const { theme, t } = useSettings();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                }
            });
        }, { threshold: 0.1 });

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', { email: email.toLowerCase(), password });

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response));

            if (response.role === 'Student') {
                navigate('/student-dashboard');
            } else if (response.role === 'Supervisor') {
                navigate('/supervisor-dashboard');
            } else if (response.role === 'Module Leader') {
                navigate('/module-leader-dashboard');
            }
        } catch (err) {
            setError(err.message || 'Invalid login credentials.');
            setLoading(false);
        }
    };


    return (
        <div className="login-page-container" data-theme={theme}>
            {/* DECORATIVE ORBS */}
            <div className="mesh-orb orb-1"></div>
            <div className="mesh-orb orb-2"></div>
            <div className="mesh-orb orb-3"></div>

            <div className="login-card reveal">
                <div className="login-visual">
                    <div className="mesh-gradient-overlay"></div>
                    <div className="visual-content">
                        <div className="portal-badge"><Sparkles size={14} /> INSTITUTIONAL AUTHORITY</div>
                        <h1 className="system-title">ACALINK<span>PAS</span></h1>
                        <p className="system-desc">
                            Secure gateway for project approvals, peer review coordination, and academic milestone tracking.
                        </p>
                    </div>
                </div>

                <div className="login-form-section">
                    <Link to="/" className="back-link-top"><ArrowLeft size={16} /> Home</Link>

                    <div className="form-header">
                        <h2>{t('welcome_back')}</h2>
                        <p>{t('sign_in_desc')}</p>
                    </div>

                    <form className="unified-login-form" onSubmit={handleSubmit}>
                        <div className="input-block">
                            <label>{t('email_address')}</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g. j.doe@nsbm.ac.lk"
                                required
                            />
                        </div>

                        <div className="input-block">
                            <div className="label-with-link">
                                <label>{t('password')}</label>
                                <Link to="/forgot-password" className="forgot-pwd-link">{t('forgot_password')}</Link>
                            </div>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    className="pwd-toggle-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && <div className="form-error">{error}</div>}

                        <button type="submit" className="sign-in-btn" disabled={loading}>
                            {loading ? t('signing_in') : t('sign_in')}
                        </button>
                    </form>

                    <div className="security-banner">
                        <ShieldCheck size={16} />
                        <span>SECURE ENCRYPTION ACTIVE</span>
                    </div>
                </div>
            </div>

            <footer className="page-footer-outer">
                <p className="footer-copy">© 2024 NSBM & PLYMOUTH UNIVERSITY. SECURE ENCRYPTION ACTIVE.</p>
                <div className="footer-links-outer">
                    <Link to="/privacy">PRIVACY POLICY</Link>
                    <Link to="/terms">TERMS OF SERVICE</Link>
                    <Link to="/support">IT SUPPORT</Link>
                </div>
            </footer>
        </div>
    );
}
