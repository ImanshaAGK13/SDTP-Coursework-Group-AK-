import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <SettingsContext.Provider value={{ theme, setTheme, toggleTheme, language, setLanguage, t }}>
            {children}
        </SettingsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
