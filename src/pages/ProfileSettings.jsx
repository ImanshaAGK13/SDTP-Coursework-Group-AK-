import React, { useState } from 'react';
import {
    Camera, ShieldCheck, Mail, User, BookOpen,
    ChevronRight, Sparkles, Save, X, Plus, Award, CheckCircle,
    Moon, Sun, Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import './ProfileSettings.css';

export default function ProfileSettings() {
    const navigate = useNavigate();
    const { theme, setTheme, language, setLanguage, t } = useSettings();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });

    const [profile, setProfile] = useState(() => {
        const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
        return {
            fullName: savedUser.fullName || 'User Name',
            studentId: savedUser.institutionalId || 'ID-0000',
            email: savedUser.email || 'user@pas.com',
            major: 'BSc (Hons) in Software Engineering',
            bio: 'Aspiring software architect with a passion for sustainable urban tech.',
            interests: ['AI', 'Sustainability', 'UX Design']
        };
    });

    const handleSave = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API update
        setTimeout(() => {
            // Update local storage to reflect changes
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            localStorage.setItem('user', JSON.stringify({ ...currentUser, fullName: profile.fullName }));

            setLoading(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }, 1500);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowPasswordModal(false);
            setSuccess(true);
            setPasswords({ old: '', new: '', confirm: '' });
            setTimeout(() => setSuccess(false), 3000);
        }, 1200);
    };

    const removeInterest = (tagToRemove) => {
        setProfile(prev => ({
            ...prev,
            interests: prev.interests.filter(tag => tag !== tagToRemove)
        }));
    };

    return (
        <div className="profile-settings-page">
            {success && (
                <div className="success-toast">
                    <CheckCircle size={20} />
                    <span>Profile updated successfully!</span>
                </div>
            )}

            <header className="page-header reveal">
                <span className="portal-tag">ACCOUNT SETTINGS</span>
                <h1>Personal Profile</h1>
                <p className="header-desc">Manage your academic identity, research interests, and account security preferences.</p>
            </header>

            <div className="profile-main-content">

                <aside className="profile-sidebar-card reveal">
                    <div className="avatar-editor">
                        <img
                            src="https://i.pravatar.cc/150?img=11"
                            alt="Profile"
                            className="main-profile-img"
                        />
                        <div className="change-photo-overlay">
                            <Camera size={24} />
                        </div>
                    </div>

                    <h2>{profile.fullName}</h2>
                    <p>{profile.major}</p>

                    <div className="sidebar-stats">
                        <div className="side-stat-item">
                            <span>Member Since</span>
                            <span>Oct 2023</span>
                        </div>
                        <div className="side-stat-item">
                            <span>Status</span>
                            <span>Active</span>
                        </div>
                    </div>
                </aside>

                <div className="profile-form-container">

                    <form className="profile-glass-form reveal" style={{ transitionDelay: '0.1s' }} onSubmit={handleSave}>
                        <div className="form-section-header">
                            <h2>General Information</h2>
                            <p>Update your personal identity and contact details.</p>
                        </div>

                        <div className="profile-form-grid">
                            <div className="input-group">
                                <label>FULL NAME</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '1.2rem', top: '1.2rem', color: '#94a3b8' }} />
                                    <input
                                        type="text"
                                        className="glow-input"
                                        value={profile.fullName}
                                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                        style={{ paddingLeft: '3.5rem' }}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>STUDENT ID (READONLY)</label>
                                <div style={{ position: 'relative' }}>
                                    <Award size={18} style={{ position: 'absolute', left: '1.2rem', top: '1.2rem', color: '#94a3b8' }} />
                                    <input
                                        type="text"
                                        className="glow-input"
                                        value={profile.studentId}
                                        disabled
                                        style={{ paddingLeft: '3.5rem' }}
                                    />
                                </div>
                            </div>

                            <div className="input-group full-width">
                                <label>UNIVERSITY EMAIL ADDRESS</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '1.2rem', top: '1.2rem', color: '#94a3b8' }} />
                                    <input
                                        type="email"
                                        className="glow-input"
                                        value={profile.email}
                                        disabled
                                        style={{ paddingLeft: '3.5rem' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section-header" style={{ marginTop: '4rem' }}>
                            <h2>Academic Profile</h2>
                            <p>Define your research interests and current major.</p>
                        </div>

                        <div className="profile-form-grid">
                            <div className="input-group full-width">
                                <label>CURRENT ACADEMIC MAJOR</label>
                                <div style={{ position: 'relative' }}>
                                    <BookOpen size={18} style={{ position: 'absolute', left: '1.2rem', top: '1.2rem', color: '#94a3b8' }} />
                                    <select
                                        className="glow-select"
                                        value={profile.major}
                                        onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                                        style={{ paddingLeft: '3.5rem' }}
                                    >
                                        <option>BSc (Hons) in Software Engineering</option>
                                        <option>BSc (Hons) in Computer Science</option>
                                        <option>BSc (Hons) in Cybersecurity</option>
                                        <option>BSc (Hons) in Data Science</option>
                                    </select>
                                </div>
                            </div>

                            <div className="input-group full-width">
                                <label>RESEARCH INTERESTS (TAGS)</label>
                                <div className="interest-tags-input">
                                    {profile.interests.map(tag => (
                                        <span key={tag} className="interest-tag">
                                            {tag}
                                            <X size={14} onClick={() => removeInterest(tag)} style={{ cursor: 'pointer' }} />
                                        </span>
                                    ))}
                                    <button type="button" className="add-tag-btn">
                                        <Plus size={14} /> Add New
                                    </button>
                                </div>
                            </div>

                            <div className="input-group full-width">
                                <label>PERSONAL BIOGRAPHY</label>
                                <textarea
                                    className="glow-textarea"
                                    rows="4"
                                    value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    placeholder="Tell us about your research goals..."
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-section-header" style={{ marginTop: '4rem' }}>
                            <h2>System Preferences</h2>
                            <p>Customize your workspace theme and primary language.</p>
                        </div>

                        <div className="profile-form-grid">
                            <div className="input-group">
                                <label>INTERFACE LANGUAGE</label>
                                <div style={{ position: 'relative' }}>
                                    <Globe size={18} style={{ position: 'absolute', left: '1.2rem', top: '1.2rem', color: '#94a3b8' }} />
                                    <select
                                        className="glow-select"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        style={{ paddingLeft: '3.5rem' }}
                                    >
                                        <option value="en">English (UK)</option>
                                        <option value="si">Sinhala (සිංහල)</option>
                                        <option value="ta">Tamil (தமிழ்)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>VISUAL THEME</label>
                                <div className="theme-toggle-group">
                                    <button
                                        type="button"
                                        className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                                        onClick={() => setTheme('light')}
                                    >
                                        <Sun size={18} /> Light
                                    </button>
                                    <button
                                        type="button"
                                        className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                                        onClick={() => setTheme('dark')}
                                    >
                                        <Moon size={18} /> Dark
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="profile-actions">
                            <button type="button" className="btn-secondary-glass" onClick={() => navigate('/student-dashboard')}>
                                {t('cancel') || 'Cancel'}
                            </button>
                            <button type="submit" className="btn-primary-premium" disabled={loading}>
                                {loading ? 'Processing...' : (
                                    <>
                                        <Save size={20} />
                                        {t('save_changes')}
                                    </>
                                )}
                                {!loading && <Sparkles size={16} />}
                            </button>
                        </div>
                    </form>

                    <div className="p-card reveal" style={{ transitionDelay: '0.2s', padding: '2.5rem', cursor: 'pointer' }} onClick={() => setShowPasswordModal(true)}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ width: '50px', height: '50px', background: 'rgba(124,58,237,0.1)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--royal-purple)' }}>
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{t('security')}</h3>
                                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('change_password')}</p>
                                </div>
                            </div>
                            <ChevronRight size={24} color="#94a3b8" />
                        </div>
                    </div>
                </div>
            </div>

            {/* PASSWORD MODAL */}
            {showPasswordModal && (
                <div className="modal-overlay">
                    <div className="p-card modal-card" style={{ maxWidth: '450px', padding: '2.5rem' }}>
                        <div className="modal-header">
                            <h2>{t('change_password')}</h2>
                            <button className="close-btn" onClick={() => setShowPasswordModal(false)}><X size={20} /></button>
                        </div>

                        <form onSubmit={handlePasswordChange} className="modal-form">
                            <div className="input-group">
                                <label>{t('current_password')}</label>
                                <input
                                    type="password"
                                    className="glow-input"
                                    required
                                    value={passwords.old}
                                    onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label>{t('new_password')}</label>
                                <input
                                    type="password"
                                    className="glow-input"
                                    required
                                    value={passwords.new}
                                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label>{t('confirm_password')}</label>
                                <input
                                    type="password"
                                    className="glow-input"
                                    required
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                />
                            </div>

                            <div className="modal-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                                <button type="submit" className="btn-primary-premium" style={{ flex: 1 }} disabled={loading}>
                                    {loading ? '...' : t('save_changes')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
