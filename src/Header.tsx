import React from 'react';
import { Theme } from './types';

type HeaderProps = {
  openSearchModal: () => void;
  isMobile: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  theme: Theme;
};

export default function Header({
  openSearchModal,
  isMobile,
  isSidebarOpen,
  setIsSidebarOpen,
  isDarkMode,
  setIsDarkMode,
  theme,
}: HeaderProps) {
  return (
    <div
      style={{
        padding: '16px 24px',
        borderBottom: `1px solid ${theme.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        backgroundColor: theme.bg,
        flexShrink: 0,
      }}
    >
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: `1px solid ${theme.searchButtonBorder}`,
            backgroundColor: theme.searchButtonBg,
            color: theme.text,
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Menu
        </button>
      )}
      <button
        onClick={openSearchModal}
        style={{
          flex: 1,
          maxWidth: '500px',
          padding: '8px 12px',
          borderRadius: '6px',
          border: `1px solid ${theme.searchButtonBorder}`,
          backgroundColor: theme.searchButtonBg,
          color: theme.searchButtonText,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'all 0.2s',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.7 }}>
          <path fillRule="evenodd" d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z" />
        </svg>
        <span>Search...</span>
        <span style={{ marginLeft: 'auto', fontSize: '12px', border: `1px solid ${theme.border}`, borderRadius: '4px', padding: '0 4px' }}>Ctrl K</span>
      </button>

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{
          padding: '8px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: 'transparent',
          color: theme.text,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isDarkMode ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        )}
      </button>
    </div>
  );
}