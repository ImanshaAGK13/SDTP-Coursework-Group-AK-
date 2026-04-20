import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import './DashboardWidgets.css';
import { CloudRain, ChevronLeft, ChevronRight, Activity, Clock, CheckCircle2 } from 'lucide-react';

export function HeroClockWidget() {
  const { t } = useSettings();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });

  const dateString = time.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="hero-widget-row">
      <div className="hero-left-col">
        <span className="hero-greeting">{t('dashboard')}</span>
        <p className="hero-sub">The system is ready. No pending tasks for your research portfolio.</p>
        <div className="hero-time">{timeString}</div>
      </div>
      
      <div className="hero-weather-card">
        <div className="weather-header">
           <div className="weather-icon-box">
             <CloudRain size={32} color="white" />
           </div>
           <div className="temp-val">84°F</div>
        </div>
        <div className="weather-meta">
           <span className="condition">Light Rain</span>
           <p className="location">Colombo, Western Province, Sri Lanka</p>
           <span className="date-small">{dateString}</span>
        </div>
      </div>
    </div>
  );
}

export function CalendarWidget() {
  const currentDate = new Date();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const today = currentDate.getDate();

  const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const calendarDays = [
    29, 30, 31, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 1, 2
  ];

  return (
    <div className="calendar-widget">
      <header className="cal-header">
        <button className="cal-nav-btn"><ChevronLeft size={16} /></button>
        <span className="cal-month">{monthName} {year}</span>
        <button className="cal-nav-btn"><ChevronRight size={16} /></button>
      </header>
      
      <div className="cal-grid">
        {days.map(d => <div key={d} className="cal-day-label">{d}</div>)}
        {calendarDays.map((d, i) => (
          <div key={i} className={`cal-date ${d === today ? 'current-day' : ''} ${[12, 15, 22].includes(d) ? 'has-event' : ''}`}>
            {d}
            {[12, 15, 22].includes(d) && <span className="event-dot"></span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function InsightsWidget() {
  const stats = [
    { label: 'Complete Tasks', val: '64%', color: '#10b981' },
    { label: 'In Progress', val: '28%', color: '#6366f1' },
    { label: 'Not Started', val: '8%', color: '#f59e0b' }
  ];

  return (
    <div className="insights-widget">
      <div className="radial-overview">
         <div className="main-radial" style={{ background: 'conic-gradient(#e2e8f0 0deg 360deg)' }}>
            <div className="radial-inner">0%</div>
         </div>
      </div>
      
      <div className="insights-list">
        {stats.map(s => (
          <div key={s.label} className="insight-item">
            <div className="insight-dot" style={{ backgroundColor: '#e2e8f0' }}></div>
            <div className="insight-info">
              <span>{s.label}</span>
              <p>Awaiting data</p>
            </div>
            <div className="insight-val">0%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecentActivityWidget() {
  const activities = [];

  return (
    <div className="recent-activity-list">
      {activities.length > 0 ? (
        activities.map(a => (
          <div key={a.id} className="activity-item-compact">
            <div className={`activity-icon-box ${a.type}`}>{a.icon}</div>
            <div className="activity-details">
              <div className="activity-header-row">
                <span className="activity-title">{a.title}</span>
                <span className="activity-time">{a.time}</span>
              </div>
              <p className="activity-desc">{a.desc}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-activity-state">
           <p>No recent activity found. Items will appear here as the academic cycle progresses.</p>
        </div>
      )}
    </div>
  );
}
