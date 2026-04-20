import React, { useState, useEffect } from 'react';
import { Bell, User, Activity, Lightbulb, EyeOff, ShieldCheck, GraduationCap, Building2, UserCog, Sparkles, Zap, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './WelcomePage.css';

export default function WelcomePage() {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="welcome-container">
            {/* DECORATIVE ORBS */}
            <div className="bg-orb orb-1"></div>
            <div className="bg-orb orb-2"></div>
            <div className="bg-orb orb-3"></div>

            {/* NAVBAR */}
            <nav className="navbar">
                <div className="nav-left">
                    <div className="logo-text">PAS</div>
                    <div className="logo-images">
                        <div className="logo-placeholder">
                            <GraduationCap size={16} color="#7c3aed" />
                        </div>
                        <div className="logo-placeholder">
                            <Building2 size={16} color="#475569" />
                        </div>
                    </div>
                </div>

                <div className="nav-center">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/how-it-works" className="nav-link">How it Works</Link>
                    <Link to="/faq" className="nav-link">FAQ / Help</Link>
                </div>

                <div className="nav-right" style={{ position: 'relative' }}>
                    <div className="icon-wrapper" onClick={() => setShowNotifications(!showNotifications)}>
                        <Bell className="nav-icon" size={32} />
                        <span className="notification-dot"></span>
                    </div>

                    {showNotifications && (
                        <div className="notifications-dropdown">
                            <div className="notif-header">
                                <h3>System Notifications</h3>
                                <span className="notif-badge">3 New</span>
                            </div>
                            <div className="notif-list">
                                <div className="notif-item">
                                    <div className="notif-icon-circle blue"><Bell size={16} /></div>
                                    <div className="notif-content">
                                        <p className="notif-title">System Maintenance</p>
                                        <p className="notif-time">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="notif-item">
                                    <div className="notif-icon-circle orange"><ShieldCheck size={16} /></div>
                                    <div className="notif-content">
                                        <p className="notif-title">New Security Policies Active</p>
                                        <p className="notif-time">Yesterday</p>
                                    </div>
                                </div>
                                <div className="notif-item">
                                    <div className="notif-icon-circle green"><GraduationCap size={16} /></div>
                                    <div className="notif-content">
                                        <p className="notif-title">Project Allocation Period Open</p>
                                        <p className="notif-time">Oct 12</p>
                                    </div>
                                </div>
                            </div>
                            <div className="notif-footer-link">
                                <Link to="/notifications">View All Notifications</Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="hero-section reveal">
                <div className="hero-visual-bg"></div>

                <div className="hero-content">
                    <div className="badge">
                        <span className="badge-dot"></span>
                        ACADEMIC EXCELLENCE & INNOVATION
                    </div>
                    <h1 className="hero-title">
                        Streamlining<br />Research<br /><span>Collaboration.</span>
                    </h1>
                    <p className="hero-desc">
                        A blind-match process for fair, merit-based project allocation and professional collaboration between NSBM and Plymouth University researchers.
                    </p>
                    <div className="hero-action-cards">
                        <button className="action-card" onClick={() => navigate('/login', { state: { role: 'Student' } })}>
                            <div className="action-icon">
                                <GraduationCap size={22} />
                            </div>
                            <span>Student Portal</span>
                        </button>
                        <button className="action-card" onClick={() => navigate('/login', { state: { role: 'Supervisor' } })}>
                            <div className="action-icon">
                                <User size={22} />
                            </div>
                            <span>Supervisor Portal</span>
                        </button>
                        <button className="action-card" onClick={() => navigate('/login', { state: { role: 'Module Leader' } })}>
                            <div className="action-icon">
                                <UserCog size={22} />
                            </div>
                            <span>Module Leader</span>
                        </button>
                    </div>
                </div>

                <div className="hero-visual">
                    {/* We generated this image and copied it into src/assets/ */}
                    <img
                        src="/src/assets/hero-image.png"
                        alt="Data Scientists working in office"
                        className="hero-image"
                    />
                    <div className="stats-card">
                        <div className="stats-icon">
                            <Activity size={24} />
                        </div>
                        <div className="stats-text">
                            <h4>Data-Driven Matching</h4>
                            <p>98% Accuracy in project-supervisor alignment</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WORKFLOW SECTION */}
            <section className="workflow-section reveal">

                <div className="workflow-header">
                    <h2>Precision Managed Workflow</h2>
                    <p>Our specialized framework ensures that technical excellence remains the only metric for success.</p>
                </div>

                <div className="workflow-cards">
                    <div className="workflow-card">
                        <div className="card-icon">
                            <Lightbulb size={24} color="#7c3aed" />
                        </div>
                        <h3>Innovative Proposals</h3>
                        <p>Students submit technical ideas through a standardized digital canvas, prioritizing methodology and potential impact over individual credentials.</p>
                    </div>

                    <div className="workflow-card">
                        <div className="card-icon">
                            <EyeOff size={24} color="#7c3aed" />
                        </div>
                        <h3>Blind Selection</h3>
                        <p>Supervisors review and select projects based purely on scientific merit. Identity markers are stripped to eliminate unconscious bias in the selection phase.</p>
                    </div>

                    <div className="workflow-card">
                        <div className="card-icon">
                            <ShieldCheck size={24} color="#7c3aed" />
                        </div>
                        <h3>Secure Reveal</h3>
                        <p>Automated identity reveal occurs only after match confirmation, ensuring a secure and transparent transition to the project execution phase.</p>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="footer-logos">
                    <div className="footer-logo-box">
                        <div className="footer-logo-icon">
                            <GraduationCap size={32} />
                        </div>
                        <span className="footer-logo-text">NSBM GREEN UNIVERSITY</span>
                    </div>

                    <div className="footer-logo-box">
                        <div className="footer-logo-icon">
                            <Building2 size={32} />
                        </div>
                        <span className="footer-logo-text">PLYMOUTH UNIVERSITY</span>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copy">
                        <h4>PAS COLLABORATION HUB</h4>
                        <p>© 2024 NSBM & PLYMOUTH UNIVERSITY. ALL RIGHTS RESERVED.</p>
                    </div>
                    <div className="footer-links">
                        <Link to="/support">TECHNICAL SUPPORT</Link>
                        <Link to="/faq">MODULE GUIDELINES</Link>
                        <Link to="/privacy">PRIVACY POLICY</Link>
                        <Link to="/terms">TERMS OF SERVICE</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
