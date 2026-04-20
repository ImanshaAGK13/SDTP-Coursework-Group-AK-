import React, { useState, useEffect } from 'react';
import {
    Search, Bell, Settings, LayoutDashboard, Search as BrowseIcon,
    FolderGit2, ShieldCheck, X, Plus, Sparkles, Ban, LogOut, CheckCircle2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './SupervisorDashboard.css';
import './ExpertiseSettings.css';

export default function ExpertiseSettings() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [allAreas, setAllAreas] = useState([]);
    const [activeAreas, setActiveAreas] = useState([]);
    const [customKeyword, setCustomKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profile, areasData] = await Promise.all([
                    api.get('/users/profile'),
                    api.get('/researchareas')
                ]);
                setUser(profile);
                setAllAreas(areasData);
                if (profile.expertise) {
                    setActiveAreas(profile.expertise.split(',').map(s => s.trim()).filter(s => s));
                }
            } catch (err) {
                console.error("Failed to fetch profile settings", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleArea = (area) => {
        if (activeAreas.includes(area)) {
            setActiveAreas(activeAreas.filter(a => a !== area));
        } else {
            setActiveAreas([...activeAreas, area]);
        }
    };

    const handleAddCustom = () => {
        if (customKeyword && !activeAreas.includes(customKeyword)) {
            setActiveAreas([...activeAreas, customKeyword]);
            setCustomKeyword('');
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            await api.patch('/users/profile', {
                expertise: activeAreas.join(', ')
            });
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            alert(err.message || 'Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="loading-state">Loading Profile...</div>;

    return (
        <div className="sup-layout">
            <nav className="sup-top-nav">
                <div className="top-nav-left">
                    <span className="sup-nav-brand">PAS</span>
                    <span className="sup-nav-divider">|</span>
                    <span className="sup-nav-title">Expertise Management</span>
                </div>

                <div className="top-nav-right">
                    <div className="sup-search-wrapper">
                        <Search size={16} className="sup-search-icon" />
                        <input type="text" placeholder="Search parameters..." />
                    </div>
                    <button className="sup-icon-btn">
                        <Bell size={20} />
                        <span className="sup-dot-indicator"></span>
                    </button>
                    <button className="sup-icon-btn">
                        <Settings size={20} />
                    </button>
                </div>
            </nav>

            {message && (
                <div className="success-toast">
                    <CheckCircle2 size={18} />
                    <span>{message}</span>
                </div>
            )}

            <div className="sup-main-container">
                <aside className="sup-sidebar">
                    <div className="sup-sidebar-brand mod-sidebar-brand">
                        <div className="mod-logo-box">PAS</div>
                        <div className="mod-brand-text">
                            <h2>PAS Portal</h2>
                            <p>SUPERVISOR</p>
                        </div>
                    </div>

                    <div className="sup-sidebar-menu">
                        <Link to="/supervisor-dashboard" className="sup-menu-item">
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/browse-proposals" className="sup-menu-item">
                            <BrowseIcon size={20} />
                            <span>Browse Proposals</span>
                        </Link>
                        <Link to="/my-projects" className="sup-menu-item">
                            <FolderGit2 size={20} />
                            <span>My Projects</span>
                        </Link>
                        <Link to="/expertise-settings" className="sup-menu-item active">
                            <ShieldCheck size={20} />
                            <span>Expertise Settings</span>
                        </Link>
                    </div>

                    <div className="sup-sidebar-bottom">
                        <div className="profile-widget">
                            <img src={`https://i.pravatar.cc/150?u=${user?.email}`} alt="Profile" className="prof-avatar" />
                            <div className="prof-info">
                                <span className="prof-name">{user?.fullName}</span>
                                <span className="prof-title" style={{ textTransform: 'uppercase' }}>ID: {user?.institutionalId}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '1.5rem 0', borderTop: '1px solid #f1f5f9', marginTop: 'auto' }}>
                        <Link to="/login" className="sup-menu-item text-gray" style={{ color: '#64748b' }}>
                            <LogOut size={20} />
                            <span>Logout</span>
                        </Link>
                    </div>
                </aside>

                <main className="sup-content-area exp-content">
                    <header className="exp-header">
                        <span className="exp-sub-label">RESEARCHER PROFILE</span>
                        <h1>Curate Your <span className="text-blue">Research Domain</span></h1>
                        <p className="exp-desc">
                            Define the pillars of your institutional expertise. This metadata ensures relevant project proposals are routed to your dossier.
                        </p>
                    </header>

                    <div className="exp-form-card">
                        <div className="exp-form-row pt-0">
                            <div className="exp-form-left">
                                <h3>Active Domains</h3>
                                <p>Select the technical keywords that best describe your current supervision capacity.</p>
                            </div>

                            <div className="exp-form-right">
                                <div className="exp-tags-group">
                                    {activeAreas.map(area => (
                                        <span key={area} className="exp-tag-active" onClick={() => toggleArea(area)}>
                                            {area} <X size={14} className="ml-1 tag-icon" />
                                        </span>
                                    ))}

                                    {allAreas.filter(a => !activeAreas.includes(a.name)).map(area => (
                                        <span key={area.id} className="exp-tag-suggest" onClick={() => toggleArea(area.name)}>
                                            {area.name} <Plus size={14} className="ml-1 tag-icon" />
                                        </span>
                                    ))}
                                </div>

                                <div className="custom-keyword-section">
                                    <label className="input-label">CUSTOM KEYWORD ENTRY</label>
                                    <div className="custom-keyword-input-row">
                                        <input
                                            type="text"
                                            placeholder="e.g. Distributed Systems"
                                            className="keyword-input"
                                            value={customKeyword}
                                            onChange={(e) => setCustomKeyword(e.target.value)}
                                        />
                                        <button className="add-keyword-btn" onClick={handleAddCustom}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="exp-divider" />

                        <div className="exp-form-row pb-0">
                            <div className="exp-form-left">
                                <h3>Submission Portal Control</h3>
                                <p>Manage the institutional window for new student project proposals.</p>
                            </div>

                            <div className="exp-form-right">
                                <div className="submission-control-grid">
                                    <div className="date-input-group">
                                        <label>PORTAL OPENING DATE</label>
                                        <input type="date" defaultValue="2024-10-01" className="premium-date-input" />
                                    </div>
                                    <div className="date-input-group">
                                        <label>PORTAL CLOSING DATE</label>
                                        <input type="date" defaultValue="2024-12-15" className="premium-date-input" />
                                    </div>
                                </div>

                                <div className="portal-status-toggle-box">
                                    <div className="toggle-text">
                                        <h4>Manual Override</h4>
                                        <p>Instantly lock or unlock the portal regardless of dates.</p>
                                    </div>
                                    <div className="status-toggle-premium active">
                                        <span className="toggle-status-text">PORTAL OPEN</span>
                                        <div className="toggle-switch"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="exp-action-bar">
                        <button className="exp-reset-btn" onClick={() => setActiveAreas([])}>Clear All</button>
                        <button className="exp-save-btn" onClick={handleSave} disabled={saving}>
                            {saving ? 'Saving...' : 'Update Archive Profile'}
                        </button>
                    </div>
                </main>
            </div>

            <footer className="sup-footer">
                <p>© 2024 GLOBAL ACADEMIC INSTITUTION. ALL RIGHTS RESERVED.</p>
                <div className="footer-links">
                    <Link to="#">INSTITUTIONAL POLICY</Link>
                    <Link to="#">PRIVACY ARCHIVE</Link>
                    <Link to="#">TECHNICAL SUPPORT</Link>
                </div>
            </footer>
        </div>
    );
}
