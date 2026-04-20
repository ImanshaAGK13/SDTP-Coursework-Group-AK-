import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PublicPages.css';
import './NotificationsPage.css';

export default function FAQPage() {
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
                    <h1>FAQ & Help Guidelines</h1>
                    <p>Common questions answered for Students, Supervisors, and Module Leaders.</p>
                </div>

                <div className="public-card">
                    <div className="faq-item">
                        <h3 className="faq-q">Can a student see which supervisors rejected their proposal?</h3>
                        <p className="faq-a">No, the reviewing process is entirely confidential. Students only receive notifications on acceptance or general feedback points without identifying the evaluator.</p>
                    </div>

                    <div className="faq-item">
                        <h3 className="faq-q">What happens if my proposal is not selected by any supervisor?</h3>
                        <p className="faq-a">If left unmatched after the primary allocation period, Module Leaders will review the unassigned pool and manually allocate based on faculty availability and related expertise.</p>
                    </div>

                    <div className="faq-item">
                        <h3 className="faq-q">As a supervisor, can I request specific students?</h3>
                        <p className="faq-a">PAS strictly enforces blind-matching to ensure fairness. You cannot "reserve" a student. You select based purely on the proposal merit presented to you anonymously.</p>
                    </div>

                    <div className="faq-item">
                        <h3 className="faq-q">How do I reset my password if I forget it?</h3>
                        <p className="faq-a">Use the "Forgot Password" link on the login page or contact your IT administrative team for an account reset link to be sent to your university email.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
