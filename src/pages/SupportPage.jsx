import React, { useEffect } from 'react';
import { ArrowLeft, Headphones, Mail, MessageSquare, Laptop, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PublicPages.css';
import './NotificationsPage.css';

export default function SupportPage() {
    const navigate = useNavigate();

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

    return (
        <div className="public-page-layout">
            <div className="bg-orb orb-1"></div>
            <div className="bg-orb orb-2"></div>
            <div className="bg-orb orb-3"></div>

            <nav className="notif-top-nav">
                <div className="nav-left">
                    <button className="back-btn" onClick={() => navigate('/')}>
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </button>
                    <span className="nav-divider">|</span>
                    <span className="nav-brand">PAS</span>
                </div>
            </nav>

            <main className="public-content-container reveal">
                <div className="public-header">
                    <h1>IT Support</h1>
                    <p>We're here to help you navigate the Project Approval System. Reach out to our technical team for assistance.</p>
                </div>

                <div className="public-card reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    <div className="support-option">
                        <Mail size={32} className="feature-icon" />
                        <h3>Email Support</h3>
                        <p>For technical inquiries and account access issues.</p>
                        <p style={{ fontWeight: 700, color: '#7c3aed' }}>it-support@nsbm.ac.lk</p>
                    </div>
                    <div className="support-option">
                        <MessageSquare size={32} className="feature-icon" />
                        <h3>System Guidance</h3>
                        <p>For questions about the blind-matching process.</p>
                        <p style={{ fontWeight: 700, color: '#7c3aed' }}>pas-admin@plymouth.ac.uk</p>
                    </div>
                </div>

                <div className="public-card reveal">
                    <h2><Laptop size={24} className="feature-icon" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '10px' }} /> Technical Requirements</h2>
                    <p>
                        For the best experience, we recommend using the latest version of <strong>Google Chrome</strong> or <strong>Safari</strong>. Ensure that cookies and JavaScript are enabled.
                    </p>
                </div>

                <div className="public-card reveal">
                    <h2><HelpCircle size={24} className="feature-icon" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '10px' }} /> Frequently Asked Questions</h2>
                    <p>
                        Before contacting support, please check our <a href="/faq" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'none' }}>FAQ Page</a> for answers to common questions regarding proposal submissions and supervisor selection.
                    </p>
                </div>

                <div className="public-card reveal" style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                        Available Monday - Friday, 8:00 AM to 5:00 PM Institutional Time.
                    </p>
                </div>
            </main>
        </div>
    );
}
