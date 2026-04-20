import React, { useState, useEffect } from 'react';
import {
    Bell, Settings, LayoutDashboard, Database, Activity,
    Users, ScrollText, HelpCircle, LogOut, Download, Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './ModuleLeaderDashboard.css';

export default function ModuleLeaderDashboard() {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalSupervisors: 0,
        totalProposals: 0,
        totalMatched: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [users, proposals] = await Promise.all([
                    api.get('/users'),
                    api.get('/proposals')
                ]);
                setStats({
                    totalStudents: users.filter(u => u.role === 'Student').length,
                    totalSupervisors: users.filter(u => u.role === 'Supervisor').length,
                    totalProposals: proposals.length,
                    totalMatched: proposals.filter(p => p.status === 'Matched').length
                });
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            }
        };
        fetchData();
    }, []);

    const matchRate = stats.totalProposals > 0 ? Math.round((stats.totalMatched / stats.totalProposals) * 100) : 0;

    return (
        <div className="mod-layout">

            {/* Sidebar - Same as before */}
            <aside className="mod-sidebar">
                <div className="mod-sidebar-brand">
                    <div className="mod-logo-box">PAS</div>
                    <div className="mod-brand-text">
                        <h2>PAS Admin</h2>
                        <p>MODULE LEADER</p>
                    </div>
                </div>

                <div className="mod-sidebar-menu">
                    <Link to="/module-leader-dashboard" className="mod-menu-item active">
                        <LayoutDashboard size={20} />
                        <span>Master Dashboard</span>
                    </Link>
                    <Link to="/research-areas" className="mod-menu-item">
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
                    <Link to="/login" className="mod-menu-item text-gray">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>

            <div className="mod-main-container">
                {/* Top Navbar */}
                <nav className="mod-top-nav">
                    <div className="mod-nav-left">
                        <span>Faculty Administration</span>
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
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026703d" alt="Profile" />
                        </div>
                    </div>
                </nav>

                <main className="mod-content-area">
                    <div className="mod-page-header">
                        <div>
                            <h1>Master Dashboard</h1>
                            <p>Academic Year 2023/24 • Project Allocation Cycle Alpha</p>
                        </div>
                        <div className="mod-header-actions">
                            <button className="mod-btn-secondary">
                                <Download size={16} /> Export Report
                            </button>
                        </div>
                    </div>

                    <div className="mod-metrics-row">
                        <div className="mod-metric-card">
                            <span className="metric-label">TOTAL STUDENTS</span>
                            <div className="metric-value-row">
                                <span className="metric-val">{stats.totalStudents}</span>
                                <span className="metric-tag gray">Active</span>
                            </div>
                            <div className="metric-bar" style={{ width: '100%', background: 'var(--blue-light)' }}></div>
                        </div>

                        <div className="mod-metric-card">
                            <span className="metric-label">ACTIVE SUPERVISORS</span>
                            <div className="metric-value-row">
                                <span className="metric-val">{stats.totalSupervisors}</span>
                                <span className="metric-tag gray">Faculty</span>
                            </div>
                            <div className="metric-bar" style={{ width: '100%', background: 'var(--purple-light)' }}></div>
                        </div>

                        <div className="mod-metric-card">
                            <span className="metric-label">SUBMITTED PROPOSALS</span>
                            <div className="metric-value-row">
                                <span className="metric-val">{stats.totalProposals}</span>
                                <span className="metric-tag blue">Awaiting</span>
                            </div>
                            <div className="metric-bar" style={{ width: '100%', background: 'var(--accent-silver)' }}></div>
                        </div>

                        <div className="mod-metric-card">
                            <span className="metric-label">SUCCESSFUL MATCHES</span>
                            <div className="metric-value-row">
                                <span className="metric-val">{stats.totalMatched}</span>
                                <span className="metric-tag green-outline">Matches</span>
                            </div>
                            <div className="metric-bar" style={{ width: `${matchRate}%`, background: '#10b981' }}></div>
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="mod-charts-row">
                        {/* Donut Chart Card */}
                        <div className="mod-chart-card donut-card">
                            <h3>Match Completion Rate</h3>

                            <div className="donut-wrapper">
                                <svg viewBox="0 0 36 36" className="circular-chart">
                                    <path className="circle-bg"
                                        d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path className="circle"
                                        strokeDasharray="35, 100"
                                        d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="19" className="percentage">35%</text>
                                    <text x="18" y="23" className="sublabel">MATCHED</text>
                                </svg>
                            </div>

                            <div className="donut-legend">
                                <span className="legend-item"><span className="dot blue"></span> Matched</span>
                                <span className="legend-item"><span className="dot gray"></span> Pending</span>
                            </div>
                        </div>

                        {/* Bars Card */}
                        <div className="mod-chart-card bars-card">
                            <div className="card-header-flex">
                                <h3>Submissions by Research Area</h3>
                                <Link to="#" className="text-link">View Full Distribution <ArrowRightIcon /></Link>
                            </div>

                            <div className="horizontal-bars">
                                <div className="hbar-item">
                                    <div className="hbar-labels">
                                        <span>Artificial Intelligence</span>
                                        <span>112</span>
                                    </div>
                                    <div className="hbar-track"><div className="hbar-fill" style={{ width: '90%' }}></div></div>
                                </div>

                                <div className="hbar-item">
                                    <div className="hbar-labels">
                                        <span>Cybersecurity</span>
                                        <span>78</span>
                                    </div>
                                    <div className="hbar-track"><div className="hbar-fill" style={{ width: '65%' }}></div></div>
                                </div>

                                <div className="hbar-item">
                                    <div className="hbar-labels">
                                        <span>Data Science</span>
                                        <span>94</span>
                                    </div>
                                    <div className="hbar-track"><div className="hbar-fill" style={{ width: '80%' }}></div></div>
                                </div>

                                <div className="hbar-item">
                                    <div className="hbar-labels">
                                        <span>Software Engineering</span>
                                        <span>58</span>
                                    </div>
                                    <div className="hbar-track"><div className="hbar-fill" style={{ width: '45%' }}></div></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activity Table */}
                    <div className="mod-activity-card">
                        <div className="card-header-flex">
                            <div>
                                <h3>Recent System Activity</h3>
                                <p>Real-time audit log of administrative actions.</p>
                            </div>
                            <Link to="#" className="text-link">View All Logs</Link>
                        </div>

                        <table className="mod-table">
                            <thead>
                                <tr>
                                    <th>ACTION</th>
                                    <th>USER</th>
                                    <th>ENTITY</th>
                                    <th>TIMESTAMP</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="empty-table-row">
                                        <div className="empty-state-content">
                                            <ScrollText size={32} />
                                            <p>No recent system activity. All operational logs are clear.</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </main>

                <footer className="mod-footer">
                    <p>© 2024 Project Approval System (PAS). Institutional Precision.</p>
                    <a href="#">Privacy Policy</a>
                </footer>
            </div>
        </div>
    );
}

function ArrowRightIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
    );
}
