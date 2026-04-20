import React from 'react';
import {
    Bell, Settings, LayoutDashboard, Database, Activity,
    Users, ScrollText, HelpCircle, LogOut, Search,
    Download, Calendar, ChevronDown, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './ModuleLeaderDashboard.css';
import './AuditLogs.css';

export default function AuditLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const data = await api.get('/auditlogs');
                setLogs(data);
            } catch (err) {
                console.error("Failed to fetch logs", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

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
                    <Link to="/user-management" className="mod-menu-item">
                        <Users size={20} />
                        <span>User Management</span>
                    </Link>
                    <Link to="/audit-logs" className="mod-menu-item active">
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
                            <input type="text" placeholder="Search system logs..." />
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

                <main className="mod-content-area audit-content">

                    <div className="mod-page-header">
                        <div className="header-text-block">
                            <h1>System Audit Logs</h1>
                            <p>Comprehensive monitoring of all administrative actions, system events, and security access logs.</p>
                        </div>
                        <div className="mod-header-actions">
                            <button className="mod-btn-primary action-btn">
                                <Download size={16} /> Export Logs (CSV)
                            </button>
                        </div>
                    </div>

                    <div className="audit-table-card">
                        <table className="audit-table">
                            <thead>
                                <tr>
                                    <th>TIMESTAMP</th>
                                    <th>USER</th>
                                    <th>ACTION</th>
                                    <th>IP ADDRESS</th>
                                    <th>STATUS</th>
                                    <th>DETAILS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="empty-table-row">
                                            <div className="empty-state-res">
                                                <ScrollText size={48} className="empty-icon-res" />
                                                <h3>No Audit Records Found</h3>
                                                <p>Perform system actions to populate the activity stream.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    logs.map(log => (
                                        <tr key={log.id}>
                                            <td className="col-time">{new Date(log.timestamp).toLocaleString()}</td>
                                            <td className="col-userid"><span className="id-link">{log.userId}</span></td>
                                            <td className="col-action">
                                                <span className="action-txt"><span className="dot blue"></span> {log.action}</span>
                                            </td>
                                            <td className="col-ip"><span className="code-font">{log.ipAddress}</span></td>
                                            <td className="col-status">
                                                <span className={`status-pill ${log.status.toLowerCase() === 'success' ? 'green' : 'red'}`}>
                                                    {log.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="col-details">{log.details}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <div className="audit-pagination">
                            <span className="showing-text">Showing {logs.length} entries</span>
                            <div className="pagination-group">
                                <button className="page-btn active-box">1</button>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="mod-footer audit-footer">
                    <div className="left-foot">
                        <span className="foot-brand">PAS</span>
                        <p>© 2024 Project Approval System (PAS). Institutional Precision.</p>
                    </div>
                    <div className="right-foot">
                        <Link to="#">Privacy Policy</Link>
                    </div>
                </footer>
            </div>
        </div>
    );
}
