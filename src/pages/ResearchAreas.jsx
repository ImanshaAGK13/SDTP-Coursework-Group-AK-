import React, { useState, useEffect } from 'react';
import {
    Bell, Settings, LayoutDashboard, Database, Activity,
    Users, ScrollText, HelpCircle, LogOut, Search, Plus,
    Trash2, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './ModuleLeaderDashboard.css';
import './ResearchAreas.css';

export default function ResearchAreas() {
    const [areas, setAreas] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newArea, setNewArea] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [areasData, proposalsData] = await Promise.all([
                api.get('/researchareas'),
                api.get('/proposals')
            ]);
            setAreas(areasData);
            setProposals(proposalsData);
        } catch (err) {
            console.error("Failed to fetch dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newArea.trim()) return;
        try {
            await api.post('/researchareas', { name: newArea });
            setNewArea('');
            setShowAddModal(false);
            fetchData();
        } catch (err) {
            alert("Failed to add research area.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this research area?")) return;
        try {
            await api.delete(`/researchareas/${id}`);
            fetchData();
        } catch (err) {
            alert("Failed to delete research area.");
        }
    };

    // Metrics calculation
    const totalAreas = areas.length;
    const usedAreas = new Set(proposals.map(p => p.researchArea)).size;
    const utilization = totalAreas > 0 ? Math.round((usedAreas / totalAreas) * 100) : 0;
    const unassignedCount = proposals.filter(p => !p.supervisorId).length;

    if (loading) return <div className="loading-state">Loading Research Data...</div>;

    return (
        <div className="mod-layout">

            {/* Sidebar */}
            <aside className="mod-sidebar">
                <div className="mod-sidebar-brand">
                    <div className="mod-logo-box">PAS</div>
                    <div className="mod-brand-text">
                        <h2>PAS Admin</h2>
                        <p>Module Leader</p>
                    </div>
                </div>

                <div className="mod-sidebar-menu">
                    <Link to="/module-leader-dashboard" className="mod-menu-item">
                        <LayoutDashboard size={20} />
                        <span>Master Dashboard</span>
                    </Link>
                    <Link to="/research-areas" className="mod-menu-item active">
                        <Database size={20} />
                        <span>Research Areas</span>
                    </Link>
                    <Link to="/allocation-oversight" className="mod-menu-item">
                        <Activity size={20} />
                        <span>Allocation Oversight</span>
                    </Link>
                    <Link to="/user-management" className="mod-menu-item">
                        <Users size={20} />
                        <span>User Management</span>
                    </Link>
                    <Link to="/audit-logs" className="mod-menu-item">
                        <ScrollText size={20} />
                        <span>Audit Logs</span>
                    </Link>
                </div>

                <div className="mod-sidebar-bottom">
                    <Link to="#" className="mod-menu-item text-gray">
                        <HelpCircle size={20} />
                        <span>Help Center</span>
                    </Link>
                    <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }} className="mod-menu-item text-gray" style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <div className="mod-main-container">
                {/* Top Navbar */}
                <nav className="mod-top-nav">
                    <div className="mod-nav-left">
                        <span className="mod-navbar-brand">PAS</span>
                        <div className="mod-search-wrapper">
                            <Search size={16} className="mod-search-icon" />
                            <input type="text" placeholder="Search system configuration..." />
                        </div>
                    </div>
                    <div className="mod-nav-right">
                        <button className="mod-icon-btn active-bell">
                            <Bell size={20} />
                            <span className="mod-dot-indicator"></span>
                        </button>
                        <button className="mod-icon-btn">
                            <Settings size={20} />
                        </button>
                        <div className="mod-avatar">
                            <img src="https://i.pravatar.cc/150?u=admin@pas.com" alt="Profile" />
                        </div>
                    </div>
                </nav>

                <main className="mod-content-area res-areas-content">
                    <div className="mod-page-header">
                        <div className="header-text-block">
                            <h1>Research Areas</h1>
                            <p>Manage taxonomies used to categorize student projects and faculty expertise.</p>
                        </div>
                        <div className="mod-header-actions">
                            <button className="mod-btn-primary" onClick={() => setShowAddModal(true)}>
                                <Plus size={16} /> Create New Area
                            </button>
                        </div>
                    </div>

                    {showAddModal && (
                        <div className="modal-overlay">
                            <div className="glass-card modal-content" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h3>Add New Research Area</h3>
                                    <button className="icon-btn" onClick={() => setShowAddModal(false)}><X size={20} /></button>
                                </div>
                                <form onSubmit={handleAdd}>
                                    <div className="form-group">
                                        <label className="input-label">AREA NAME</label>
                                        <input
                                            type="text"
                                            className="glow-input"
                                            placeholder="e.g. Distributed Ledger Technology"
                                            value={newArea}
                                            onChange={(e) => setNewArea(e.target.value)}
                                            required
                                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', padding: '0.75rem', borderRadius: '8px', width: '100%' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                        <button type="button" className="mod-btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                                        <button type="submit" className="mod-btn-primary">Save Category</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="res-table-card">
                        <table className="res-table">
                            <thead>
                                <tr>
                                    <th>RESEARCH AREA</th>
                                    <th>IDENTIFIER</th>
                                    <th>CONTROL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {areas.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="empty-table-row">
                                            <div className="empty-state-res">
                                                <Database size={48} className="empty-icon-res" />
                                                <h3>Taxonomy Database Empty</h3>
                                                <p>Define research areas to enable automated matching.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    areas.map(area => (
                                        <tr key={area.id}>
                                            <td style={{ fontWeight: 600 }}>{area.name}</td>
                                            <td style={{ color: '#64748b', fontFamily: 'monospace' }}>AREA-{area.id}</td>
                                            <td>
                                                <button className="icon-action-btn reject" title="Delete Area" onClick={() => handleDelete(area.id)}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <div className="res-pagination-footer">
                            <span className="showing-text">Showing {areas.length} of {areas.length} research areas</span>
                            <div className="pagination-group">
                                <button className="page-btn active">1</button>
                            </div>
                        </div>
                    </div>

                    <div className="res-metrics-row">
                        <div className="res-metric-card">
                            <span className="rm-label">TAG UTILIZATION</span>
                            <div className="rm-value-block">
                                <span className="rm-val">{utilization}%</span>
                                <span className="rm-tag gray-text">Applied</span>
                            </div>
                            <p className="rm-desc">Percentage of defined categories currently occupied by student projects.</p>
                        </div>

                        <div className="res-metric-card">
                            <span className="rm-label">UNMATCHED QUEUE</span>
                            <div className="rm-value-block">
                                <span className="rm-val">{unassignedCount}</span>
                                <span className="rm-tag gray-text">Proposals</span>
                            </div>
                            <p className="rm-desc">Proposals awaiting confirmation or faculty pairing.</p>
                        </div>

                        <div className="res-metric-card">
                            <span className="rm-label">TAXONOMY SCALE</span>
                            <div className="rm-value-block">
                                <span className="rm-val text-blue">{totalAreas}</span>
                                <span className="rm-tag gray-text">Domains</span>
                            </div>
                            <p className="rm-desc">Total unique research specializations registered in the system.</p>
                        </div>
                    </div>
                </main>

                <footer className="mod-footer res-footer">
                    <div className="left-foot">
                        <span className="foot-brand">PAS ADMIN</span>
                        <p>© 2024 Project Approval System. Institutional Intelligence.</p>
                    </div>
                    <div className="right-foot">
                        <Link to="#">Institutional Policy</Link>
                        <Link to="#">System Status</Link>
                    </div>
                </footer>
            </div>
        </div>
    );
}
