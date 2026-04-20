import React from 'react';
import { ArrowLeft, Lightbulb, EyeOff, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PublicPages.css';
import './NotificationsPage.css';

export default function HowItWorksPage() {
    const navigate = useNavigate();

    return (
        <div className="public-page-layout">
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

            <main className="public-content-container">
                <div className="public-header">
                    <h1>How It Works</h1>
                    <p>A transparent, 3-step process ensuring merit-based project allocations without bias.</p>
                </div>

                <div className="public-card">
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                        <div style={{ background: '#dbeafe', padding: '1rem', borderRadius: '50%', color: '#1e40af' }}>
                            <Lightbulb size={32} />
                        </div>
                        <div>
                            <h2>1. Proposal Submission</h2>
                            <p>
                                Students create detailed project proposals outlining their problem statement, proposed solution, architecture, and technology stack. The system strictly enforces the omission of personal identifiers in the text.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="public-card">
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                        <div style={{ background: '#ffedd5', padding: '1rem', borderRadius: '50%', color: '#c2410c' }}>
                            <EyeOff size={32} />
                        </div>
                        <div>
                            <h2>2. Blind Review & Selection</h2>
                            <p>
                                Supervisors log in to find a pool of anonymized proposals that match their configured research expertises (e.g., Machine Learning, Cyber Security). They review the technical aspects and accept or reject projects purely based on quality.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="public-card">
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                        <div style={{ background: '#dcfce3', padding: '1rem', borderRadius: '50%', color: '#166534' }}>
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <h2>3. Secure Reveal & Match</h2>
                            <p>
                                Once a supervisor commits to a project, the system formally registers the match. The "Match Reveal" phase unlocks, allowing both the student and the supervisor to see each other's identities and initiate formal communication.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
