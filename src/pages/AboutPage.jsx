import React, { useEffect } from 'react';
import { ArrowLeft, Building2, GraduationCap, ShieldCheck, Target, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PublicPages.css';
import './NotificationsPage.css'; // For the top nav styles

export default function AboutPage() {
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
            {/* DECORATIVE ORBS */}
            <div className="bg-orb orb-1"></div>
            <div className="bg-orb orb-2"></div>
            <div className="bg-orb orb-3"></div>

            {/* Top Navbar */}
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
                    <h1>About the System</h1>
                    <p>The Blind-Match Project Approval System (PAS) bridges the gap between student aspirations and academic expertise.</p>
                </div>

                <div className="public-card reveal">

                    <h2>Our Mission</h2>
                    <p>
                        Developed as a collaborative initiative between NSBM Green University and Plymouth University, our mission is to ensure absolute fairness and technical meritocracy during the final year project allocation phase.
                    </p>
                    <p>
                        We realized that students often struggle to find supervisors whose research interests align perfectly with their innovative ideas, and inherent biases can occasionally affect selection. PAS mitigates this completely.
                    </p>
                </div>

                <div className="public-card reveal" style={{ display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div className="feature-item">
                        <GraduationCap size={44} className="feature-icon" />
                        <h3>For Students</h3>
                        <p>A fair playing field</p>
                    </div>
                    <div className="feature-item">
                        <Building2 size={44} className="feature-icon" />
                        <h3>For Institution</h3>
                        <p>Quality research output</p>
                    </div>
                </div>

            </main>
        </div>
    );
}
