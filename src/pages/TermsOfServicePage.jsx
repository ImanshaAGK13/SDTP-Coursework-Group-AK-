import React, { useEffect } from 'react';
import { ArrowLeft, Gavel, FileText, CheckCircle, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PublicPages.css';
import './NotificationsPage.css';

export default function TermsOfServicePage() {
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
                    <h1>Terms of Service</h1>
                    <p>Governance and ethical guidelines for all participants in the project allocation framework.</p>
                </div>

                <div className="public-card reveal">
                    <h2><Gavel size={24} className="feature-icon" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '10px' }} /> User Agreement</h2>
                    <p>
                        By accessing the Project Approval System, you agree to abide by the academic integrity policies of NSBM Green University and Plymouth University. This platform is strictly for academic research and coordination.
                    </p>
                </div>

                <div className="public-card reveal">
                    <h2><FileText size={24} className="feature-icon" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '10px' }} /> Proposal Submission</h2>
                    <p>
                        Students are responsible for the technical accuracy and originality of their submissions. Plagiarism in any form will lead to immediate disqualification and disciplinary action according to the university's research code of conduct.
                    </p>
                    <p>
                        The "Blind-Match" process is final. Once a supervisor evaluates and selects a proposal, the match is recorded as the primary research alignment for the semester.
                    </p>
                </div>

                <div className="public-card reveal">
                    <h2><Scale size={24} className="feature-icon" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '10px' }} /> Professional Conduct</h2>
                    <p>
                        Supervisors and Module Leaders must maintain impartial judgment. Any attempt to circumvent the blind-matching process or influence matches through external communication is strictly prohibited.
                    </p>
                </div>

                <div className="public-card reveal" style={{ textAlign: 'center' }}>
                    <p style={{ fontStyle: 'italic', color: '#64748b' }}>
                        Violation of these terms may result in revocation of system access. Last Updated: April 2024.
                    </p>
                </div>
            </main>
        </div>
    );
}
