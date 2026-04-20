import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PublicPages.css';
import './NotificationsPage.css';

export default function PrivacyPolicyPage() {
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
                    <h1>Privacy Policy</h1>
                    <p>Commitment to data integrity and researcher anonymity in the PAS ecosystem.</p>
                </div>

                <div className="public-card reveal">
                    <h2><Shield size={24} className="feature-icon" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '10px' }} /> Data Protection</h2>
                    <p>
                        The Project Approval System (PAS) is designed with privacy at its core. Our unique blind-match algorithm ensures that student identities are completely decoupled from their technical proposals during the initial review phase.
                    </p>
                    <p>
                        All uploaded documents are processed through our sanitization engine to remove metadata, personal identifiers, and demographic information before they are presented to potential supervisors.
                    </p>
                </div>

                <div className="public-card reveal">
                    <h2><Database size={24} className="feature-icon" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '10px' }} /> Information We Collect</h2>
                    <p>
                        We collect only the necessary data required for academic coordination:
                    </p>
                    <ul style={{ textAlign: 'left', color: '#4b5563', lineHeight: '1.8', marginBottom: '1rem' }}>
                        <li>Institutional credentials (University Email, ID)</li>
                        <li>Academic records relevant to research eligibility</li>
                        <li>Technical project proposals and research drafts</li>
                        <li>Supervisor research interests and expertise settings</li>
                    </ul>
                </div>

                <div className="public-card reveal">
                    <h2><Lock size={24} className="feature-icon" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '10px' }} /> Security Standards</h2>
                    <p>
                        Your data is protected using industry-standard TLS encryption during transit and AES-256 encryption at rest. Access to the system is strictly limited to authorized academic staff and registered students.
                    </p>
                </div>

                <div className="public-card reveal" style={{ textAlign: 'center' }}>
                    <p style={{ fontStyle: 'italic', color: '#64748b' }}>
                        Last Updated: April 2024. For more information, contact the University IT Department.
                    </p>
                </div>
            </main>
        </div>
    );
}
