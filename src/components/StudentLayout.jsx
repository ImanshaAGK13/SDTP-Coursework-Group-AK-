import React, { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { 
  LayoutDashboard, PlusCircle, FolderGit2, 
  Settings, LogOut, Bell, 
  Moon, Globe, Rocket, Crown
} from 'lucide-react';
import './StudentLayout.css';

export default function StudentLayout() {
  const location = useLocation();
  const { theme, toggleTheme, language, setLanguage, t } = useSettings();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname]);

  const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = savedUser.fullName || 'Professional Student';
  const firstName = userName.split(' ')[0];
  const userRole = savedUser.role || 'Elite Student';

  const menuItems = [
    { path: '/student-dashboard', icon: <LayoutDashboard size={22} />, label: t('dashboard'), short: t('dashboard').split(' ')[0] },
    { path: '/new-proposal', icon: <PlusCircle size={22} />, label: t('submit_new'), short: t('new') },
    { path: '/manage-proposals', icon: <FolderGit2 size={22} />, label: t('projects'), short: t('projects') },
    { path: '/notifications', icon: <Bell size={22} />, label: t('updates'), short: t('updates') }
  ];

  return (
    <div className="student-layout">
      {/* VANGUARD SIDEBAR */}
      <aside className="sidebar reveal">
        <Link to="/" className="sidebar-logo">
           <Rocket size={24} />
        </Link>
        
        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <div className="icon-box-p">
                {item.icon}
              </div>
              <span className="sidebar-label-p">{item.short}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/profile" className={`sidebar-item ${location.pathname === '/profile' ? 'active' : ''}`}>
            <div className="icon-box-p">
              <Settings size={22} />
            </div>
            <span className="sidebar-label-p">{t('settings')}</span>
          </Link>
          <Link to="/login" className="sidebar-item" style={{ color: '#ef4444' }}>
            <div className="icon-box-p">
              <LogOut size={22} />
            </div>
            <span className="sidebar-label-p">{t('logout')}</span>
          </Link>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <div className="main-viewport">
        {/* TOP NAVBAR (ADVANCED GALAXY THEME) */}
        <header className="top-bar-advanced reveal">
          <div className="header-glass-wrap">
            <div className="top-bar-left">
              <span className="hub-tag">PAS INTELLIGENCE HUB</span>
              <h2 className="hub-title">Welcome Back, {firstName}</h2>
            </div>

            <div className="top-bar-right">
              <div className="widgets-cluster">
                <div className="top-widget-v2" onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </div>
                <div 
                  className="top-widget-v2" 
                  onClick={() => {
                    const langs = ['en', 'si', 'ta'];
                    const next = langs[(langs.indexOf(language) + 1) % langs.length];
                    setLanguage(next);
                  }}
                >
                  <Globe size={18} />
                  <span className="lang-indicator">{language.toUpperCase()}</span>
                </div>
              </div>
              
              <div className="profile-identity-hub" onClick={() => navigate('/profile')}>
                <div className="avatar-shield">
                   <img 
                    src={`https://ui-avatars.com/api/?name=${userName}&background=7c3aed&color=fff&bold=true`} 
                    alt="Profile" 
                   />
                </div>
                <div className="hub-info">
                  <span className="hub-name">
                     {userName} <Crown size={12} className="crown-glow" />
                  </span>
                  <span className="hub-role">{userRole.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* CINEMATIC CONTENT AREA */}
        <main className="content-overflow">
          <Outlet />
        </main>
      </div>

      {/* INTERACTIVE BACKGROUND ELEMENTS */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
    </div>
  );
}
