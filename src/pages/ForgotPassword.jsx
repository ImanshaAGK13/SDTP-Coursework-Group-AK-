import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, ArrowRight, ShieldCheck, HelpCircle, KeyRound, Lock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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

    const handleSendCode = (e) => {
        e.preventDefault();
        if (!email) return;
        setStep(2);
    };

    const handleVerifyCode = (e) => {
        e.preventDefault();
        if (!code) return;
        setStep(3);
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (!newPassword || newPassword !== confirmPassword) {
            alert("Passwords do not match or are empty!");
            return;
        }
        setStep(4);
    };

    return (
        <div className="pwd-page-container">
            {/* DECORATIVE ORBS */}
            <div className="bg-orb orb-1"></div>
            <div className="bg-orb orb-2"></div>
            <div className="bg-orb orb-3"></div>

            {/* Main Content */}
            <main className="pwd-main reveal">
                <div className="pwd-card">

                    {/* Icon Area */}
                    <div className="icon-area">
                        <div className="shield-wrapper">
                            {step === 4 ? (
                                <CheckCircle2 size={36} color="#16a34a" />
                            ) : step === 3 ? (
                                <Lock size={32} color="#1d4ed8" />
                            ) : step === 2 ? (
                                <KeyRound size={32} color="#1d4ed8" />
                            ) : (
                                <ShieldCheck size={32} color="#1d4ed8" />
                            )}
                        </div>
                    </div>

                    {/* Dynamic Content Based on Step */}

                    {/* STEP 1: Enter Email */}
                    {step === 1 && (
                        <>
                            <div className="pwd-titles">
                                <span className="pwd-subtitle">STEP 1 OF 3</span>
                                <h1>Forgot Password?</h1>
                                <p>Enter your university email address below and we will send you a verification code to reset your password.</p>
                            </div>

                            <form className="pwd-form" onSubmit={handleSendCode}>
                                <div className="pwd-input-group">
                                    <label>UNIVERSITY EMAIL ADDRESS</label>
                                    <div className="pwd-input-wrapper">
                                        <input
                                            type="email"
                                            placeholder="e.g. j.doe@nsbm.ac.lk"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <Mail className="input-icon-left" size={18} />
                                    </div>
                                </div>

                                <button type="submit" className="pwd-submit-btn">
                                    Send Verification Code
                                    <ArrowRight size={18} />
                                </button>
                            </form>
                        </>
                    )}

                    {/* STEP 2: Enter Verification Code */}
                    {step === 2 && (
                        <>
                            <div className="pwd-titles">
                                <span className="pwd-subtitle">STEP 2 OF 3</span>
                                <h1>Verify Code</h1>
                                <p>We've sent a 6-digit verification code to <strong>{email}</strong>. Enter the code below to continue.</p>
                            </div>

                            <form className="pwd-form" onSubmit={handleVerifyCode}>
                                <div className="pwd-input-group">
                                    <label>VERIFICATION CODE</label>
                                    <div className="pwd-input-wrapper">
                                        <input
                                            type="text"
                                            placeholder="Enter 6-digit code"
                                            className="code-input"
                                            maxLength={6}
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            required
                                        />
                                        <KeyRound className="input-icon-left" size={18} />
                                    </div>
                                </div>

                                <button type="submit" className="pwd-submit-btn">
                                    Verify Code
                                    <ArrowRight size={18} />
                                </button>
                                <button type="button" className="resend-link" onClick={() => alert('Code resent!')}>
                                    Didn't receive a code? Resend
                                </button>
                            </form>
                        </>
                    )}

                    {/* STEP 3: Create New Password */}
                    {step === 3 && (
                        <>
                            <div className="pwd-titles">
                                <span className="pwd-subtitle">STEP 3 OF 3</span>
                                <h1>Create Password</h1>
                                <p>Your identity has been verified. Please create a strong and secure new password for your account.</p>
                            </div>

                            <form className="pwd-form" onSubmit={handleResetPassword}>
                                <div className="pwd-input-group">
                                    <label>NEW PASSWORD</label>
                                    <div className="pwd-input-wrapper">
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            minLength={6}
                                        />
                                        <Lock className="input-icon-left" size={18} />
                                    </div>
                                </div>

                                <div className="pwd-input-group">
                                    <label>CONFIRM NEW PASSWORD</label>
                                    <div className="pwd-input-wrapper">
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            minLength={6}
                                        />
                                        <Lock className="input-icon-left" size={18} />
                                    </div>
                                </div>

                                <button type="submit" className="pwd-submit-btn">
                                    Reset Password
                                    <CheckCircle2 size={18} />
                                </button>
                            </form>
                        </>
                    )}

                    {/* STEP 4: Success */}
                    {step === 4 && (
                        <>
                            <div className="pwd-titles">
                                <span className="pwd-subtitle" style={{ color: '#16a34a' }}>SUCCESS</span>
                                <h1>Password Reset!</h1>
                                <p>Your password has been successfully reset. You can now securely log in to the Project Approval System using your new credentials.</p>
                            </div>

                            <button className="pwd-submit-btn success-btn reveal" onClick={() => navigate('/login')}>
                                Proceed to Login
                                <ArrowRight size={18} />
                            </button>

                        </>
                    )}

                    {/* Back Action - Only show if not on Success step */}
                    {step !== 4 && (
                        <button className="back-login-btn" onClick={() => step > 1 ? setStep(step - 1) : navigate('/login')}>
                            <ArrowLeft size={16} />
                            {step > 1 ? "Go Back" : "Back to Login"}
                        </button>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="pwd-footer">
                <p>© 2024 UNIVERSITY PROJECT APPROVAL SYSTEM. INSTITUTIONAL AUTHORITY.</p>
                <div className="pwd-footer-links">
                    <a href="#">PRIVACY POLICY</a>
                    <a href="#">TERMS OF SERVICE</a>
                    <a href="#">CONTACT SUPPORT</a>
                </div>
            </footer>
        </div>
    );
}
