import React, { useState, useEffect } from 'react';
import {
    Bell, Settings, LayoutDashboard, Database, Activity,
    Users, ScrollText, HelpCircle, LogOut, Search, Plus,
    Download, ShieldAlert, Trash2, UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './ModuleLeaderDashboard.css';
import './UserManagement.css';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');

    const fetchUsers = async () => {
        try {
            const data = await api.get('/users');
            setUsers(data);
        } catch (err) {
            console.error("Failed to fetch users", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to deactivate this account?")) return;
        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
        } catch (err) {
            alert("Failed to deactivate user.");
        }
    };

    const filteredUsers = activeTab === 'All'
        ? users
        : users.filter(u => u.role === activeTab);

    const stats = {
        total: users.length,
        supervisors: users.filter(u => u.role === 'Supervisor').length,
        students: users.filter(u => u.role === 'Student').length
    };

    return (
        <div className="mod-layout">

            {/* Sidebar - Same as before */}
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
                    <Link to="/research-areas" className="mod-menu-item">
                        <Database size={20} />
                        <span>Research Areas</span>
                    </Link>
                    <Link to="/allocation-oversight" className="mod-menu-item">
                        <Activity size={20} />
                        <span>Allocation Oversight</span>
                    </Link>
                    <Link to="/user-management" className="mod-menu-item active">
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
                        <span className="mod-navbar-brand">PAS</span>
                        <div className="mod-search-wrapper">
                            <Search size={16} className="mod-search-icon" />
                            <input type="text" placeholder="Search accounts..." />
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
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026703d" alt="Profile" />
                        </div>
                    </div>
                </nav>

                <main className="mod-content-area um-content">
                    <div className="mod-page-header">
                        <div className="header-text-block">
                            <h1>User Management</h1>
                            <p>Centralized control for institutional roles and account access.</p>
                        </div>
                    </div>

                    <div className="um-metrics-row">
                        <div className="um-metric-card">
                            <span className="um-label">TOTAL ACCOUNTS</span>
                            <div className="um-val-row">
                                <span className="um-val text-darkblue">{stats.total}</span>
                                <span className="um-sub-pill gray">Managed</span>
                            </div>
                        </div>

                        <div className="um-metric-card">
                            <span className="um-label">ACTIVE SUPERVISORS</span>
                            <div className="um-val-row">
                                <span className="um-val text-darkblue">{stats.supervisors}</span>
                                <span className="um-sub gray">Faculty</span>
                            </div>
                        </div>

                        <div className="um-metric-card">
                            <span className="um-label">REGISTERED STUDENTS</span>
                            <div className="um-val-row">
                                <span className="um-val text-brown">{stats.students}</span>
                                <span className="um-sub-pill gray">Undergrads</span>
                            </div>
                        </div>
                    </div>

                    <div className="um-table-card">
                        <div className="um-tabs-header">
                            <button className={`um-tab ${activeTab === 'All' ? 'active' : ''}`} onClick={() => setActiveTab('All')}>All Users</button>
                            <button className={`um-tab ${activeTab === 'Supervisor' ? 'active' : ''}`} onClick={() => setActiveTab('Supervisor')}>Supervisors</button>
                            <button className={`um-tab ${activeTab === 'Student' ? 'active' : ''}`} onClick={() => setActiveTab('Student')}>Students</button>
                        </div>

                        <table className="um-table">
                            <thead>
                                <tr>
                                    <th>USER DETAILS</th>
                                    <th>INSTITUTIONAL ID</th>
                                    <th>ROLE</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="empty-table-row">
                                            <div className="empty-state-card-um">
                                                <Users size={48} className="empty-icon-um" />
                                                <h3>No institutional accounts found</h3>
                                                <p>No users match the current filter.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map(u => (
                                        <tr key={u.id}>
                                            <td>
                                                <div className="user-info-cell">
                                                    <span className="user-name">{u.fullName}</span>
                                                    <span className="user-email">{u.email}</span>
                                                </div>
                                            </td>
                                            <td>{u.institutionalId}</td>
                                            <td>
                                                <span className={`role-badge ${u.role === 'Supervisor' ? 'purple' : 'blue'}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="icon-action-btn reject" onClick={() => handleDelete(u.id)}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <div className="um-pagination">
                            <span className="showing-text">Showing 1 to 10 of 1,284 users</span>
                            <div className="pagination-group">
                                <button className="page-btn text">Previous</button>
                                <button className="page-btn active-box">1</button>
                                <button className="page-btn-pure">2</button>
                                <button className="page-btn-pure">3</button>
                                <button className="page-btn text">Next</button>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Cards */}
                    <div className="um-bottom-cards">

                        <div className="um-action-card">
                            <div className="um-ac-left">
                                <div className="ac-icon-box blue">
                                    <Download size={22} className="ac-icon" />
                                </div>
                                <div className="ac-text">
                                    <h3>Export Directory</h3>
                                    <p>Download user base in CSV or PDF format.</p>
                                </div>
                            </div>
                            <div className="ac-buttons">
                                <button className="ac-btn">CSV</button>
                                <button className="ac-btn">PDF</button>
                            </div>
                        </div>

                        <div className="um-action-card">
                            <div className="um-ac-left">
                                <div className="ac-icon-box orange">
                                    <ShieldAlert size={22} className="ac-icon stroke-bold" />
                                </div>
                                <div className="ac-text">
                                    <h3>Security Audit</h3>
                                    <p>Last scanned: Today at 09:12 AM</p>
                                </div>
                            </div>
                            <div className="ac-buttons">
                                <Link to="#" className="ac-link">Run Scan</Link>
                            </div>
                        </div>

                    </div>

                </main>

                <footer className="mod-footer um-footer">
                    <p className="foot-center">© 2024 Project Approval System (PAS). Institutional Precision.</p>
                    <div className="foot-links">
                        <Link to="#">Privacy Policy</Link>
                        <Link to="#">Terms of Service</Link>
                        <Link to="#">System Status</Link>
                    </div>
                </footer>
            </div>
        </div>
    );
}
